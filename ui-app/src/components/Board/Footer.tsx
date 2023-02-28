import { useContext } from "react";
import { Counter } from "../Counter";
import { Team } from "../Team";
import { TriviaContext } from "./TriviaContext";

import { Fails } from "../Fails";
import styles from "./board.module.css";

export function Footer() {
  const { playing, scores } = useContext(TriviaContext);

  return (
    <div className={`${styles.footer}`}>
      {playing ? (
        <div className={`${styles.footerContent}`}>
          <div className={`${styles.footerTeam}`}>
            <Team teamSelector="team1" team={scores.team1} />
          </div>
          <div className={`${styles.footerTotal}`}>
            <div className={`${styles.footerTotal} ${styles.counter}`}>
              <Counter score={scores?.total} />
            </div>
            <div className={`${styles.footerTotal} ${styles.fails}`}>
              <Fails />
            </div>
          </div>
          <div className={`${styles.footerTeam}`}>
            <Team teamSelector="team2" team={scores.team2} />
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
