import { GameHistory } from "./GameHistory";
import type { GameState, IGameHistory } from "./GameTypes";
import { randomWord } from "./Logic";

const LSKEY_PREFIX = "fws_";
const LSKEY_CURRENT_GAME = LSKEY_PREFIX + "current_game";
const LSKEY_HISTORY = LSKEY_PREFIX + "history";

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

  saveToHistory(game: GameState): void {
    const entry = GameHistory.createFromGame(game);
    const history = this.loadHistory();
    history.unshift(entry.data);
    this.storage.localStorage.setItem(LSKEY_HISTORY, JSON.stringify(history));
  }

  loadHistory(): IGameHistory[] {
    const raw = this.storage.localStorage.getItem(LSKEY_HISTORY);
    try {
      return JSON.parse(raw || "[]");
    } catch (err) {
      console.error("Unable to parse history!", raw);
      return [];
    }
  }

  clearHistory(): void {
    this.storage.localStorage.setItem(LSKEY_HISTORY, JSON.stringify([]));
  }

  loadEntry(id: string): GameHistory | undefined {
    const lastDash = id.lastIndexOf("-");
    const dateString = id.substring(0, lastDash);
    const word = id.substring(lastDash + 1);
    const history = this.loadHistory();
    const record = history.find(
      (h) =>
        h.word === word &&
        (h.datePlayed as unknown as string).substring(0, 10) === dateString
    );
    return record ? GameHistory.createFromData(record) : undefined;
  }

  exportHistory(): string {
    return this.storage.localStorage.getItem(LSKEY_HISTORY) || "[]";
  }

  importHistory(rawData: string | undefined) {
    if (typeof rawData !== "string") {
      rawData = JSON.stringify(rawData);
    }
    this.storage.localStorage.setItem(LSKEY_HISTORY, rawData);
  }
}
