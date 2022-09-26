import { describe, it, expect, beforeEach } from "vitest";
import { GuessState, type Guess } from "../GameTypes";
import { analyzeGuess, lettersOfState } from "../Logic";

describe("Logic", () => {
  describe("analyzeGuess", () => {
    it("determines a guess is correct when all letters match", () => {
      const word = "SMILE";
      const inProgress = word.split("");
      const guess = analyzeGuess(word, inProgress);
      guess.forEach(({ state }) => {
        expect(state).toEqual(GuessState.CORRECT);
      });
    });

    it("determines when letters are in the correct position", () => {
      const word = "SMILE";
      const inProgress = ["S", "M", "A", "R", "T"];
      const guess = analyzeGuess(word, inProgress);
      expect(guess[0].state).toEqual(GuessState.CORRECT);
      expect(guess[1].state).toEqual(GuessState.CORRECT);
      expect(guess[2].state).toEqual(GuessState.WRONG);
      expect(guess[3].state).toEqual(GuessState.WRONG);
      expect(guess[4].state).toEqual(GuessState.WRONG);
    });

    it("determines when letters are in the word but not in the correct position", () => {
      const word = "SMILE";
      const inProgress = ["S", "L", "I", "M", "E"];
      const guess = analyzeGuess(word, inProgress);
      expect(guess[0].state).toEqual(GuessState.CORRECT);
      expect(guess[1].state).toEqual(GuessState.IN_WORD);
      expect(guess[2].state).toEqual(GuessState.CORRECT);
      expect(guess[3].state).toEqual(GuessState.IN_WORD);
      expect(guess[4].state).toEqual(GuessState.CORRECT);
    });

    it("determines when duplicated letters are in the word but not in the correct position", () => {
      const word = "PEACE";
      const inProgress = ["S", "E", "E", "D", "S"];
      const guess = analyzeGuess(word, inProgress);
      expect(guess[0].state).toEqual(GuessState.WRONG);
      expect(guess[1].state).toEqual(GuessState.CORRECT);
      expect(guess[2].state).toEqual(GuessState.IN_WORD);
      expect(guess[3].state).toEqual(GuessState.WRONG);
      expect(guess[4].state).toEqual(GuessState.WRONG);
    });

    it("does not identify a letter as in-word when it is duplicated but not in the word twice", () => {
      const word = "SPACE";
      const inProgress = ["T", "H", "E", "R", "E"];
      const guess = analyzeGuess(word, inProgress);
      expect(guess[0].state).toEqual(GuessState.WRONG);
      expect(guess[1].state).toEqual(GuessState.WRONG);
      expect(guess[2].state).toEqual(GuessState.WRONG);
      expect(guess[3].state).toEqual(GuessState.WRONG);
      expect(guess[4].state).toEqual(GuessState.CORRECT);
    });

    it("does not identify a letter as in-word when it there are no more valid spaces for the letter", () => {
      const word = "PULPA";
      const inProgress = ["P", "U", "P", "P", "Y"];
      const guess = analyzeGuess(word, inProgress);
      expect(guess[0].state).toEqual(GuessState.CORRECT);
      expect(guess[1].state).toEqual(GuessState.CORRECT);
      expect(guess[2].state).toEqual(GuessState.WRONG);
      expect(guess[3].state).toEqual(GuessState.CORRECT);
      expect(guess[4].state).toEqual(GuessState.WRONG);
    });
  });

  describe("lettersOfState", () => {
    let guesses: Guess[];
    beforeEach(() => {
      // sample word is "CHARM"
      guesses = [
        [
          { letter: "S", state: GuessState.WRONG },
          { letter: "M", state: GuessState.WRONG },
          { letter: "A", state: GuessState.CORRECT },
          { letter: "R", state: GuessState.CORRECT },
          { letter: "T", state: GuessState.WRONG },
        ],
        [
          { letter: "T", state: GuessState.WRONG },
          { letter: "R", state: GuessState.IN_WORD },
          { letter: "A", state: GuessState.CORRECT },
          { letter: "I", state: GuessState.WRONG },
          { letter: "N", state: GuessState.WRONG },
        ],
        [
          { letter: "S", state: GuessState.WRONG },
          { letter: "H", state: GuessState.CORRECT },
          { letter: "A", state: GuessState.CORRECT },
          { letter: "R", state: GuessState.CORRECT },
          { letter: "K", state: GuessState.WRONG },
        ],
      ];
    });

    it("returns wrong letters", () => {
      const letters = lettersOfState(guesses, GuessState.WRONG);
      expect(letters).toEqual(["S", "M", "T", "I", "N", "K"]);
    });

    it("returns correct letters", () => {
      const letters = lettersOfState(guesses, GuessState.CORRECT);
      expect(letters).toEqual(["A", "R", "H"]);
    });

    it("returns in-word letters", () => {
      const letters = lettersOfState(guesses, GuessState.IN_WORD);
      expect(letters).toEqual(["R"]);
    });
  });
});
