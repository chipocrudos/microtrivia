import { useContext } from "react";
import { TriviaContext } from "./TriviaContext";

import { AnswerProps } from ".";

import styles from "./board.module.css";

interface Props {
  answer: AnswerProps;
  index: number;
  admin: Boolean;
  correctAction: (id: number) => void;
}

export function Answers() {
  const { trivia, admin, correctAnswer } = useContext(TriviaContext);

  return (
    <div className={`${styles.answers}`}>
      {trivia.answers.map((answer: AnswerProps, index: number) => (
        <Answer
          index={index}
          answer={answer}
          key={answer.id}
          admin={admin}
          correctAction={correctAnswer}
        />
      ))}
    </div>
  );
}

function Answer({ answer, index, admin, correctAction }: Props) {
  return answer.correct || admin ? (
    <div className={`${styles.answerCorrect} ${styles.answer}`}>
      <div className={`${styles.answerNumber}`}>{index + 1}</div>
      <div className={`${styles.answerResponse}`}>{answer.answer}</div>
      {answer.correct ? (
        <div className={`${styles.answerPoints}`}>{answer.value}</div>
      ) : (
        <div
          className={`${styles.btnCorrect}`}
          onClick={() => correctAction(answer.id)}
        >
          Correcta
        </div>
      )}
    </div>
  ) : (
    <div className={`${styles.answer}`}>
      <div className={`${styles.answerNumber}`}>{index + 1}</div>
      <div className={`${styles.answerResponse}`}> </div>
      <div className={`${styles.answerPoints}`}></div>
    </div>
  );
}
