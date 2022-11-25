export interface GuessChar {
  letter: string;
  state: GuessState;
}

export interface GameState {
  guesses: Guess[];
  currentGuess: GuessInProgress;
  word: string;
}

export interface IGameHistory {
  guessesAsString: string;
  word: string;
  numAttempts: number;
  datePlayed: Date;
}

export enum GuessState {
  CORRECT,
  IN_WORD,
  WRONG,
}

export enum Keys {
  ENTER = "⏎",
  BACKSPACE = "⌫",
}

export type Guess = GuessChar[];

export type GuessInProgress = string[];
