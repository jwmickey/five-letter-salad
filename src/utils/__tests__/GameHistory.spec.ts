import { describe, it, expect, beforeEach } from "vitest";
import { GameHistory } from "../GameHistory";

describe("GameHistory", () => {
  let history: GameHistory;

  describe("Win Scenario", () => {
    beforeEach(() => {
      history = new GameHistory(
        "TRAIN",
        "RAISE|TRAMP|TRACK|TRAIN",
        4,
        new Date()
      );
    });

    it("creates", () => {
      expect(history).toBeDefined();
    });

    it("determines win", () => {
      expect(history.win).toBe(true);
    });

    it("determines lose", () => {
      expect(history.lose).toBe(false);
    });

    it("get num attempts", () => {
      expect(history.numAttempts).toEqual(4);
    });
  });

  describe("Lose Scenario", () => {
    beforeEach(() => {
      history = new GameHistory(
        "TRAIN",
        "SPEAK|BREAD|PIZZA|CRAVE|SMILE|PEACE",
        6,
        new Date()
      );
    });

    it("creates", () => {
      expect(history).toBeDefined();
    });

    it("determines win", () => {
      expect(history.win).toBe(false);
    });

    it("determines lose", () => {
      expect(history.lose).toBe(true);
    });

    it("get num attempts", () => {
      expect(history.numAttempts).toEqual(6);
    });
  });
});
