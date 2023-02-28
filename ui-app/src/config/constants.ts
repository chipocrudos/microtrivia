import playCorrect from "../assets/correct.mp3";
import playError from "../assets/error.mp3";
import playStart from "../assets/start.mp3";
import playWin from "../assets/win.wav";

export const AUDIOS = {
    playStart,
    playError,
    playCorrect,
    playWin
}

export const COMMANDS = {
    newTrivia: {"command": "newTrivia"},
    changeTrivia: {"command": "changeTrivia"},
    correctAnswer: {"command": "correctAnswer"},
    wrongAnswer: {"command": "wrongAnswer"},
    addPoints: {"command": "addPoints"},
    teamName: {"command": "teamName"},
}