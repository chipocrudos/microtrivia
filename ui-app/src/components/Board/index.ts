import { ReactElement } from "react";

export { Board } from "./Board";


export interface TriviaProviderProps {
    children: ReactElement
}

export interface TriviaContextProps {
    trivia: TriviaProps
    playing: Boolean
    scores: ScoresProps
    admin: Boolean
    manage: Boolean
    change: Boolean
    newTrivia: () => void
    changeTrivia: () => void
    toggleAdmin: () => void
    toggleManage: () => void
    startGame: () => void
    correctAnswer: (id: number) => void
    wrongAnswer: () => void
    addPoints: (team: string) => void
    setTeamName: (team: string, name: string) => void
}

export interface TriviaProps {
    question?: string
    answers: [AnswerProps]
}

export interface AnswerProps {
    answer: string
    correct: boolean
    id: number
    value: number
}


export interface ScoresProps {
    errors: number
    gameEnd: boolean
    round: number
    roundEnd: boolean
    team1: TeamProps
    team2: TeamProps
    total: number
}


export interface TeamProps {
    name: string
    score: number
}

export interface WelcomeProps {
    actionButton: () => void;
}
