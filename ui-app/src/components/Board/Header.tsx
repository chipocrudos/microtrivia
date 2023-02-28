import { useContext } from "react";
import { ManageButton } from "./ManageButton";
import { TriviaContext } from "./TriviaContext";

import styles from "./board.module.css";

export function Header() {
  const { trivia, playing, manage, admin } = useContext(TriviaContext);

  return (
    <div className={`${styles.header}`}>
      {playing ? (
        <h2 className={`${styles.question}`}>{trivia?.question}</h2>
      ) : (
        <h2 className={`${styles.title}`}>Micro Trivia</h2>
      )}
      {admin && <ManageButton />}
    </div>
  );
}
