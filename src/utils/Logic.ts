import WORD_LIST_SUBSET from "./words-subset";
import BIG_DICTIONARY from "./words";
import { GuessState, type Guess, type GuessInProgress } from "./GameTypes";

export const NUM_ALLOWED_ATTEMPTS = 6;
export const NUM_LETTERS = 5;
export const ALL_LETTERS = "abcdefghijklmnopqrstuvwxyz";

/**
 * Chooses a random word from the subset of words.  Checks to make sure the word is in the main dictionary
 */
export function randomWord(useBigWordList = false): string {
  let wordList = WORD_LIST_SUBSET;
  if (useBigWordList) {
    wordList = BIG_DICTIONARY;
  }
  const pos = Math.floor(Math.random() * wordList.length);
  const candidate = wordList[pos];
  if (!isAWord(candidate)) {
    return randomWord(useBigWordList);
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
  const targetLetters = word.split("");
  const guess = inProgress.map((letter, i) => ({
    state: word.charAt(i) === letter ? GuessState.CORRECT : GuessState.WRONG,
    letter,
  }));

  // Create a count of available letters (excluding those already matched correctly)
  const availableLetters: { [key: string]: number } = {};
  targetLetters.forEach((letter, i) => {
    if (guess[i].state !== GuessState.CORRECT) {
      availableLetters[letter] = (availableLetters[letter] || 0) + 1;
    }
  });

  // Mark IN_WORD letters, but only up to the available count
  guess.forEach((entry) => {
    if (
      entry.state === GuessState.WRONG &&
      availableLetters[entry.letter] > 0
    ) {
      entry.state = GuessState.IN_WORD;
      availableLetters[entry.letter]--;
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
