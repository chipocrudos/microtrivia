import { useEffect, useRef, useState } from "react";
import { ScoresProps, TriviaProps } from "../components/Board";
import { AUDIOS, SERVER } from "../config";



interface SendMessage {
  message: string
}


interface SendCommand {
  command: string
}

interface AnswerCommand extends SendCommand {
  id: number
}

interface TeamCommand extends SendCommand {
  team: string
}

interface TeamNameCommand extends TeamCommand {
  name: string
}


type MessageObject = SendCommand | AnswerCommand | TeamCommand | SendMessage | TeamNameCommand;


export const useSocket = () => {

    const [trivia, setTrivia] = useState<TriviaProps>({} as TriviaProps);
    const [action, setAction] = useState();
    const [playing, setPlaying] = useState<Boolean>(false);
    const [scores, setScores] = useState<ScoresProps>({} as ScoresProps);


    const webSocket = useRef<WebSocket | null>(null);


    useEffect(() => {

        webSocket.current = new WebSocket(`ws://${SERVER}/echo`);
    
        webSocket.current.onopen = () => {
          console.log("connected");
          setTimeout(() =>{
            sendMessage({message: "initial"});

          }, 100)
        };
    
        webSocket.current.onmessage = (event) => {
          const data = JSON.parse(event.data);
          if (data?.question)
            setTrivia(data)
          else if (data?.action)
            setAction(data.action)
          else if (typeof data?.round == "number")
            setScores(data)
          
          console.log(data);
          
        };
    
        return () => {
          
          if (webSocket.current && webSocket.current.OPEN) webSocket.current.close();
          
        };
      }, []);
      
      
         useEffect(() => {
           let counterWin = 0;
           if (!trivia?.question) {
             setPlaying(false);
             return;
           };
           
           setPlaying(true);
   
           trivia.answers?.forEach(ans => {
             counterWin += ans.correct ? 1:  0;
           })
           
           if(counterWin == trivia.answers?.length) playAudio(AUDIOS["playWin"])
   
           //console.log(counterWin, trivia.answers?.length);
           
         }, [trivia])

      useEffect(() => {
        
        if (action &&  action in AUDIOS){
          setAction(undefined)
          playAudio(AUDIOS[action])
        }
        
      }, [action])


      
      const playAudio = (audio: string) => {
        
        const playAudio = new Audio(audio);
        playAudio.play();

      }

      const sendMessage = async (messaObject:MessageObject) => {

        if (!webSocket.current || webSocket.current.CONNECTING) return

          webSocket.current.send(JSON.stringify(messaObject))
      }

    return {
        trivia,
        sendMessage,
        playing,
        scores
    }

}


