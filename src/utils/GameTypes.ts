export interface GuessChar {
  letter: string;
  state: GuessState;
}

export enum GuessState {
  CORRECT,
  IN_WORD,
  WRONG,
}

export type Guess = GuessChar[];

export type GuessInProgress = string[];

export enum Keys {
  ENTER = "⏎",
  BACKSPACE = "⌫",
}
