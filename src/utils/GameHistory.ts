import type { IGameHistory, GameState, Guess } from "./GameTypes";
import { analyzeGuess } from "./Logic";

export class GameHistory implements IGameHistory {
  constructor(
    readonly word: string,
    readonly guessesAsString: string,
    readonly numAttempts: number,
    readonly datePlayed: Date
  ) {}

  static createFromGame(game: GameState): GameHistory {
    const guesses = game.guesses
      .map((guess) => guess.map((char) => char.letter).join(""))
      .join("|");
    return new GameHistory(game.word, guesses, game.guesses.length, new Date());
  }

  static createFromData(data: IGameHistory): GameHistory {
    return new GameHistory(
      data.word,
      data.guessesAsString,
      data.numAttempts,
      new Date(data.datePlayed)
    );
  }

  get guesses(): Guess[] {
    return this.guessesAsString.split("|").map((word: string) => {
      return analyzeGuess(this.word, word.split(""));
    });
  }

  get win(): boolean {
    return (
      this.word.toLowerCase() ===
      this.guessesAsString
        .slice((this.guessesAsString.lastIndexOf("|") ?? 0) + 1)
        .toLowerCase()
    );
  }

  get lose(): boolean {
    return !this.win;
  }

  get attempts(): number {
    return this.numAttempts;
  }

  get data(): IGameHistory {
    return {
      word: this.word,
      guessesAsString: this.guessesAsString,
      numAttempts: this.numAttempts,
      datePlayed: this.datePlayed,
    };
  }
}
