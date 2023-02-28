import { useContext } from "react";
import { TriviaContext } from "./TriviaContext";

import { Dash } from "../Dash";
import { Answers } from "./Answers";
import { Welcome } from "./Welcome";

import styles from "./board.module.css";

export function Content() {
  const { playing, startGame, manage } = useContext(TriviaContext);

  if (manage)
    return (
      <div className={`${styles.content}`}>
        <Dash />
      </div>
    );

  return playing ? (
    <div className={`${styles.content}`}>
      <Answers />
    </div>
  ) : (
    <Welcome actionButton={startGame} />
  );
}
