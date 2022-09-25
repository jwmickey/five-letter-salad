import WORD_LIST from "./words-subset";
import BIG_DICTIONARY from "./words";

export const NUM_ALLOWED_ATTEMPTS = 6;
export const NUM_LETTERS = 5;
export const ALL_LETTERS = "abcdefghijklmnopqrstuvwxyz";

export function isCorrect(word: string, slot: number, letter: string): boolean {
  return word.charAt(slot)?.toLowerCase() === letter.toLowerCase();
}

export function inWord(word: string, slot: number, letter: string): boolean {
  if (letter.length === 0 || !word.includes(letter)) {
    return false;
  }
  const otherPositions = word
    .split("")
    .map((l, i) => (l === letter && !isCorrect(word, slot, letter) ? i : -1))
    .filter((x) => x >= 0);
  return otherPositions.length > 0;
}

export function randomWord(): string {
  const pos = Math.floor(Math.random() * WORD_LIST.length);
  return WORD_LIST[pos];
}

export function isAWord(candidate: string): boolean {
  return BIG_DICTIONARY.includes(candidate);
}
