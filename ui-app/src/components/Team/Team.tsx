import { useCallback, useContext, useState } from "react";
import ContentEditable from "react-contenteditable";
import { TeamProps } from ".";
import { TriviaContext } from "../Board/TriviaContext";
import { Counter } from "../Counter";

import styles from "./team.module.css";

interface Props {
  team: TeamProps;
  teamSelector: string;
}

export function Team({ team, teamSelector }: Props) {
  const { change, setTeamName } = useContext(TriviaContext);

  return (
    <div className={`${styles.container}`}>
      {change ? (
        <EditableTeam
          teamSelector={teamSelector}
          name={team?.name}
          setTeamName={setTeamName}
        />
      ) : (
        <div className={`${styles.teamName}`}>{team?.name}</div>
      )}

      <div className={`${styles.teamScore}`}>
        <Counter score={team?.score} />
      </div>
    </div>
  );
}

interface EditableTeamProps {
  teamSelector: string;
  name: string;
  setTeamName: (team: string, name: string) => void;
}

const EditableTeam = ({
  teamSelector,
  name,
  setTeamName,
}: EditableTeamProps) => {
  const [content, setContent] = useState(name);
  const [timer, setTimer] = useState(0);

  const onContentChange = useCallback(
    (evt: { currentTarget: { innerText: any } }) => {
      const updateName = evt.currentTarget.innerText;
      setContent(updateName);

      if (timer != 0) {
        clearTimeout(timer);
        setTimer(0);
      }

      const timeout = setTimeout(() => {
        setTeamName(teamSelector, updateName);
      }, 3000);

      setTimer(timeout);
    },
    []
  );

  return (
    <ContentEditable
      className={`${styles.teamName}`}
      onChange={onContentChange}
      onBlur={onContentChange}
      html={content}
    />
  );
};
