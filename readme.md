# MicroTrivia

#### Server run on docker
Strart with docker from make files ``` make run ``` this start a server on port 5000


Copy a local production code ```make copylocal``` to make a copy file on  AppFiles, use a flag FOLDER to change the destination folder ```make copylocal FOLDER=other```

#### Manual instalation
###### Config the backend
Copy all next files in to microserver folder

Microdot
- [microdot.py](https://github.com/miguelgrinberg/microdot/blob/main/src/microdot.py)
- [microdot_websocket.py](https://github.com/miguelgrinberg/microdot/blob/main/src/microdot_websocket.py)
- [microdot_asyncio/py](https://github.com/miguelgrinberg/microdot/blob/main/src/microdot_asyncio.py)
- [microdot_asyncio_websocket.py](https://github.com/miguelgrinberg/microdot/blob/main/src/microdot_asyncio_websocket.py)


Enter to the microserver folder and run:
```
python3 app.py
```


###### Config Frontend
Create a .env into ui-app folder whit the next content

```
# ui-app/.env
# change whit your local ip local network or localhost for local only
VITE_SERVER=192.168.1.1:5000
```

Enter to a ui-app folder and run ```yarn install``` to install modules and ```yarn dev``` for local or ```yarn dev --host``` to expose a local network.

Visit: http://local-ip:5173 or http://localhost:5173


###### External libraries:

https://github.com/miguelgrinberg/microdot
https://github.com/nickovs/slimDNS


###### References

Audios Files, Questions from [100-Mexicanos-Dijeron](https://github.com/arojasmx/100-Mexicanos-Dijeron)
[MicroDot](https://github.com/miguelgrinberg/microdot/)
