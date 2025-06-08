import { describe, it, expect, beforeEach } from "vitest";
import {
  GameManager,
  DEFAULT_PREFERENCES,
  type IPreferences,
} from "../GameManager";

// Mock window.localStorage
const mockStorage = {
  data: {} as Record<string, string>,
  getItem: function (key: string): string | null {
    return this.data[key] || null;
  },
  setItem: function (key: string, value: string): void {
    this.data[key] = value;
  },
  clear: function (): void {
    this.data = {};
  },
};

const mockWindow = {
  localStorage: mockStorage,
} as unknown as WindowLocalStorage;

describe("GameManager Preferences", () => {
  let gameManager: GameManager;

  beforeEach(() => {
    mockStorage.clear();
    gameManager = new GameManager(mockWindow);
  });

  describe("loadPreferences", () => {
    it("returns default preferences when no preferences stored", () => {
      const preferences = gameManager.loadPreferences();
      expect(preferences).toEqual(DEFAULT_PREFERENCES);
    });

    it("returns stored preferences when they exist", () => {
      const testPreferences: IPreferences = {
        useLargeWordDatabase: true,
      };
      mockStorage.setItem("fws_preferences", JSON.stringify(testPreferences));

      const preferences = gameManager.loadPreferences();
      expect(preferences).toEqual(testPreferences);
    });

    it("merges with defaults for partial preferences", () => {
      mockStorage.setItem("fws_preferences", JSON.stringify({}));

      const preferences = gameManager.loadPreferences();
      expect(preferences).toEqual(DEFAULT_PREFERENCES);
    });

    it("handles invalid JSON gracefully", () => {
      mockStorage.setItem("fws_preferences", "invalid json");

      const preferences = gameManager.loadPreferences();
      expect(preferences).toEqual(DEFAULT_PREFERENCES);
    });
  });

  describe("savePreferences", () => {
    it("saves preferences to localStorage", () => {
      const testPreferences: IPreferences = {
        useLargeWordDatabase: true,
      };

      gameManager.savePreferences(testPreferences);

      const stored = mockStorage.getItem("fws_preferences");
      expect(stored).toBe(JSON.stringify(testPreferences));
    });
  });

  describe("createGame with preferences", () => {
    it("uses preference setting when creating new game", () => {
      // Set preference to use large word database
      const preferences: IPreferences = {
        useLargeWordDatabase: true,
      };
      gameManager.savePreferences(preferences);

      const game = gameManager.createGame();

      // Game should be created successfully
      expect(game).toBeDefined();
      expect(game.word).toBeTruthy();
      expect(game.guesses).toEqual([]);
      expect(game.currentGuess).toEqual([]);
    });
  });
});
