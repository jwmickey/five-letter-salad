import type { GameState } from "./GameTypes";
import { randomWord } from "./Logic";

const LSKEY_PREFIX = "fws_";
const LSKEY_CURRENT_GAME = LSKEY_PREFIX + "current_game";

export class GameManager {
  constructor(private storage: WindowLocalStorage) {}

  createGame(): GameState {
    const game = {
      guesses: [],
      currentGuess: [],
      word: randomWord(),
    };
    this.save(game);
    return game;
  }

  load(): GameState {
    const gameAsJson = this.storage.localStorage.getItem(LSKEY_CURRENT_GAME);
    let game: GameState;
    if (gameAsJson) {
      game = JSON.parse(gameAsJson);
      game.word = atob(game.word);
    } else {
      game = this.createGame();
    }
    return game;
  }

  save(game: GameState): void {
    const copy = { ...game };
    copy.word = btoa(copy.word); // you are only cheating yourself!
    this.storage.localStorage.setItem(LSKEY_CURRENT_GAME, JSON.stringify(copy));
  }
}
