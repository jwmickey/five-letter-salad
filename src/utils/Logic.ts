import WORD_LIST from "./words-subset";
import BIG_DICTIONARY from "./words";
import { GuessState, type Guess, type GuessInProgress } from "./GameTypes";

export const NUM_ALLOWED_ATTEMPTS = 6;
export const NUM_LETTERS = 5;
export const ALL_LETTERS = "abcdefghijklmnopqrstuvwxyz";

/**
 * Chooses a random word from the subset of words.  Checks to make sure the word is in the main dictionary
 */
export function randomWord(): string {
  const pos = Math.floor(Math.random() * WORD_LIST.length);
  const candidate = WORD_LIST[pos];
  if (!isAWord(candidate)) {
    return randomWord();
  }
  return candidate;
}

/**
 * Check to see if a word is in the known dictionary.  Note the big dictionary is only used for
 * word validation, but not word selection.
 */
export function isAWord(candidate: string): boolean {
  return BIG_DICTIONARY.includes(candidate);
}

/**
 * Creates a guess with determined GuessState for each letter based on the target word.
 */
export function analyzeGuess(word: string, inProgress: GuessInProgress): Guess {
  const guess = inProgress.map((letter, i) => ({
    state: word.charAt(i) === letter ? GuessState.CORRECT : GuessState.WRONG,
    letter,
  }));

  guess.forEach((entry) => {
    if (entry.state === GuessState.WRONG && word.includes(entry.letter)) {
      word.split("").forEach((wordLetter, j) => {
        if (
          wordLetter === entry.letter &&
          guess[j].state !== GuessState.CORRECT
        ) {
          entry.state = GuessState.IN_WORD;
        }
      });
    }
  });

  return guess;
}

/**
 * Determines letters in the given state.  Note that letters that are correct are inherently
 * in-word. These can be differentiated via CSS rules.
 */
export function lettersOfState(
  guesses: Guess[],
  targetState: GuessState
): string[] {
  const letters: string[] = [];
  guesses.forEach((guess) => {
    guess.forEach(({ letter, state }) => {
      if (state === targetState && !letters.includes(letter)) {
        letters.push(letter);
      }
    });
  });
  return letters;
}
