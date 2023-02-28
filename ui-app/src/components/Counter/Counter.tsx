import { CounterProps } from ".";
import styles from "./counter.module.css";

export function Counter({ score = 0 }: CounterProps) {
  const addLeadingZeros = (num: number) => {
    return String(num).padStart(3, "0");
  };

  //   console.log(score);

  return <div className={`${styles.numbers}`}>{addLeadingZeros(score)}</div>;
}
