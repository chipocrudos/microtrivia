import { WelcomeProps } from ".";
import styles from "./board.module.css";

export function Welcome({ actionButton }: WelcomeProps) {
  return (
    <div className={`${styles.content}`}>
      <div className={`${styles.welcome}`}>
        <h1>Bienvenido</h1>
        <p>Inicie el juego como administrador para controlar el juego</p>
        <div className={`${styles.welcomeRow}`}>
          <button className={"btn btn-primary"} onClick={() => actionButton()}>
            Presentador
          </button>
        </div>
      </div>
    </div>
  );
}
