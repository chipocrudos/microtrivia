import { useContext } from "react";
import { BackIcon, ManageIcon } from "../Icons";
import style from "./board.module.css";
import { TriviaContext } from "./TriviaContext";

export function ManageButton() {
  const { toggleManage, manage } = useContext(TriviaContext);

  return (
    <a
      type="button"
      onClick={() => toggleManage()}
      className={`${style.float}`}
    >
      {manage ? (
        <BackIcon
          className={`${style.floatIcon} ${style.iconWhite}`}
          width="30px"
          height="30px"
        />
      ) : (
        <ManageIcon
          className={`${style.floatIcon}`}
          width="25px"
          height="25px"
        />
      )}
    </a>
  );
}
