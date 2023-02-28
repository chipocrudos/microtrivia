import { createContext, useEffect, useState } from "react";
import { TriviaContextProps, TriviaProviderProps } from ".";
import { COMMANDS } from "../../config";
import { useSocket } from "../../hooks";

export const TriviaContext = createContext({} as TriviaContextProps);

export function TriviaProvider({ children }: TriviaProviderProps) {
  const { trivia, playing, scores, sendMessage } = useSocket();

  const [admin, setAdmin] = useState(false);
  const [manage, setManage] = useState(false);
  const [change, setChange] = useState(false);

  useEffect(() => {
    if (admin && (scores.roundEnd || scores.gameEnd)) setManage(true);
    setChange(admin && !scores.errors && !scores.total && !scores.roundEnd);
  }, [scores]);

  const toggleAdmin = () => {
    setAdmin((prev) => !prev);
  };

  const toggleManage = () => {
    setManage((prev) => !prev);
  };

  const startGame = () => {
    setAdmin(true);
    setManage(true);
  };

  const newTrivia = () => {
    setManage(false);
    sendMessage(COMMANDS.newTrivia);
  };

  const changeTrivia = () => {
    sendMessage(COMMANDS.changeTrivia);
  };

  const correctAnswer = (id: number) => {
    sendMessage({ ...COMMANDS.correctAnswer, id });
  };

  const wrongAnswer = () => {
    sendMessage(COMMANDS.wrongAnswer);
  };

  const addPoints = (team: string) => {
    sendMessage({ ...COMMANDS.addPoints, team });
  };

  const setTeamName = (team: string, name: string) => {
    sendMessage({ ...COMMANDS.teamName, team, name });
  };

  return (
    <TriviaContext.Provider
      value={{
        trivia,

        playing,
        scores,
        admin,
        manage,
        change,

        newTrivia,
        changeTrivia,
        toggleAdmin,
        toggleManage,
        startGame,
        correctAnswer,
        wrongAnswer,
        addPoints,
        setTeamName,
      }}
    >
      {children}
    </TriviaContext.Provider>
  );
}
