import { useContext } from "react";
import { FailProps } from ".";
import { TriviaContext } from "../Board/TriviaContext";
import styles from "./fails.module.css";

export function Fails() {
  const {
    scores: { errors, roundEnd },
    admin,
    wrongAnswer,
  } = useContext(TriviaContext);

  const drawFail = () => {
    const fails = [];
    const nErrors = admin && !roundEnd ? 3 : errors;

    for (let f = 0; f < nErrors; f++)
      fails.push(
        <Fail
          key={f}
          action={admin ? !!(f + 1 > errors) : false}
          acctionButton={wrongAnswer}
        />
      );

    return fails;
  };

  return <div className={`${styles.container}`}>{drawFail()}</div>;
}
function Fail({ action, acctionButton }: FailProps) {
  return action ? (
    <div
      className={`${styles.fail} ${styles.failLeft}`}
      onClick={() => acctionButton()}
    />
  ) : (
    <div className={`${styles.fail}`} />
  );
}
