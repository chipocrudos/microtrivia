import json
from time import sleep

from microdot_asyncio import Microdot, send_file
from microdot_asyncio_websocket import with_websocket
from trivias import TRIVIAS

try:
    from urandom import randint
except ImportError:
    from random import randint


ACTIONS = {
    "playCorrect": {"action": "playCorrect"},
    "playError": {"action": "playError"},
    "playStart": {"action": "playStart"},
    "playWin": {"action": "playWin"},
}

tvdata = {}
scores = {
    "errors": 0,
    "gameEnd": True,
    "round": 0,
    "roundEnd": True,
    "total": 0,
    "team1": {"name": "Equipo 1", "score": 0},
    "team2": {"name": "Equipo 2", "score": 0},
}
clients_all = []


def get_trivia():
    q = randint(0, len(TRIVIAS) - 1)
    trv = TRIVIAS[q]
    return trv.copy()


def close_ws(ws):
    global clients_all
    clients_all.remove(ws)


async def send_message(message, ws=None):
    global clients_all
    message = json.dumps(message)

    for client in clients_all:
        try:
            if not client == ws:
                await client.send(message)
        except Exception as e:
            print(e)
            close_ws(client)


async def command(ws, receive):
    global tvdata, scores

    print("⚙", " ", receive)
    if receive.get("command") == "close":
        close_ws(ws)
    elif receive.get("command") == "newTrivia":
        tvdata = get_trivia()
        answers = tvdata.get("answers")

        for value in answers:
            value.update({"correct": False})

        if scores.get("round") >= 3:
            scores["team1"].update({"score": 0})
            scores["team2"].update({"score": 0})
            scores.update({"round": 0})

        scores.update(
            {
                "total": 0,
                "errors": 0,
                "gameEnd": False,
                "roundEnd": False,
                "round": scores.get("round") + 1,
            }
        )

        fanPrint(tvdata)  # Eliminar al finalizar
        await send_message(ACTIONS.get("playStart"), ws)
        sleep(0.1)
        await send_message(scores)
        await send_message(tvdata)

    elif receive.get("command") == "changeTrivia":

        if scores.get("errors") or scores.get("total"):
            return

        tvdata = get_trivia()
        answers = tvdata.get("answers")

        for value in answers:
            value.update({"correct": False})

        fanPrint(tvdata)  # Eliminar al finalizar
        await send_message(scores)
        await send_message(tvdata)

    elif receive.get("command") == "correctAnswer":

        if scores.get("rounend"):
            return

        answers = tvdata.get("answers")
        total = 0
        corrects = 0
        for index, value in enumerate(answers):
            if value.get("id") == receive.get("id"):
                value.update({"correct": True})
                answers[index] = value
                await send_message(ACTIONS.get("playCorrect"), ws)
            if value.get("correct"):
                total += value.get("value")
                corrects += 1

        roundEnd = True if corrects > index else False
        fanPrint(tvdata)  # Eliminar al finalizar
        scores.update(
            {
                "total": total,
                "roundEnd": roundEnd,
                "gameEnd": True if scores.get("round") == 3 and roundEnd else False,
            }
        )
        await send_message(tvdata)
        await send_message(scores)

    elif receive.get("command") == "wrongAnswer":

        if scores.get("roundEnd"):
            return

        if scores.get("errors") < 3:
            scores.update({"errors": scores.get("errors") + 1})
            await send_message(ACTIONS.get("playError"), ws)

        if scores.get("errors") == 3:
            scores.update(
                {
                    "roundEnd": True,
                    "gameEnd": True if scores.get("round") == 3 else False,
                }
            )

    elif receive.get("command") == "addPoints":
        if not scores.get("roundEnd"):
            return

        scores[f"{receive.get('team')}"].update(
            {
                "score": scores[f"{receive.get('team')}"].get("score")
                + scores.get("total") * scores.get("round")
            }
        )
        scores.update({"total": 0})

    elif receive.get("command") == "teamName":
        scores[f"{receive.get('team')}"].update(
            {
                "name": receive.get("name"),
            }
        )

    await send_message(scores)


def fanPrint(trivia):
    print("=" * 40)
    print(trivia.get("question"))
    print("-" * 40)
    for ans in trivia.get("answers"):
        print(
            "{:2d} - {:30} {}".format(
                ans.get("id"), ans.get("answer"), ans.get("correct")
            )
        )

    print("-" * 40)


def create_app():
    app = Microdot()

    @app.route("/")
    async def home(request):
        return send_file("dist/index.html")

    @app.route("/assets/<path:path>")
    def static(request, path):
        if ".." in path:
            # directory traversal is not allowed
            return "Not found", 404
        return send_file("dist/assets/" + path)

    @app.route("/echo")
    @with_websocket
    async def echo(request, ws):
        global tvdata, clients_all
        clients_all.append(ws)
        print("-" * 60)
        print("Clients number: ", len(clients_all))

        while True:
            data = await ws.receive()
            receive = json.loads(data)
            print("-" * 60)

            if receive.get("command"):
                await command(ws, receive)
            else:
                await send_message(scores)
                print(scores)
                if not scores.get("gameEnd"):
                    await send_message(tvdata)

    return app


if __name__ == "__main__":
    try:
        app = create_app()
        app.run()
    except KeyboardInterrupt:
        pass
