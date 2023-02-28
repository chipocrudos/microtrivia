import { useContext } from "react";
import { TriviaContext } from "../Board/TriviaContext";

import styles from "./dash.module.css";

export function Dash() {
  const { scores, change, newTrivia, changeTrivia, addPoints } =
    useContext(TriviaContext);

  const disable = !!scores.total;

  return (
    <div>
      <div className={`${styles.row}`}>
        <div className={`${styles.round}`}>
          {scores.round ? (
            <>
              <h2>Ronda</h2>
              <h4 className={`${styles.roundNumber}`}>{scores.round}</h4>
            </>
          ) : (
            <>
              <h2>Iniciar</h2>
              <h4>Juego</h4>
            </>
          )}
        </div>
      </div>
      <div className={`${styles.row}`}>
        <button
          disabled={!disable || !scores.roundEnd}
          className={`btn btn-success ${
            (!disable || !scores.roundEnd) && "disabled"
          }`}
          onClick={() => addPoints("team1")}
        >
          Puntos para: {scores?.team1?.name}
        </button>

        <button
          disabled={!disable || !scores.roundEnd}
          className={`btn btn-primary ${
            (!disable || !scores.roundEnd) && "disabled"
          }`}
          onClick={() => addPoints("team2")}
        >
          Puntos para: {scores?.team2?.name}
        </button>
      </div>

      <div className={`${styles.row} ${styles.rowSpace}`}>
        {change ? (
          <button
            disabled={disable}
            className={`btn btn-alert ${disable && "disabled"}`}
            onClick={() => changeTrivia()}
          >
            Cambiar trivia
          </button>
        ) : (
          <button
            disabled={disable}
            className={`btn btn-info ${disable && "disabled"}`}
            onClick={() => newTrivia()}
          >
            {scores.round >= 3 || !scores.round
              ? "Iniciar juego"
              : `Iniciar ronda  ${scores.round + 1}`}
          </button>
        )}
      </div>
    </div>
  );
}
