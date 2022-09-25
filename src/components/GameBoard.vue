<script setup lang="ts">
import { computed, ref } from "vue";

import {
  GuessState,
  type Guess,
  type GuessChar,
  type GuessInProgress,
  Keys,
} from "../utils/GameTypes";
import {
  isCorrect,
  inWord,
  randomWord,
  isAWord,
  NUM_ALLOWED_ATTEMPTS,
  NUM_LETTERS,
  ALL_LETTERS,
} from "../utils/Logic";
import GuessEntry from "./GuessEntry.vue";
import CurrentGuess from "./CurrentGuess.vue";
import RemainingGuesses from "./RemainingGuesses.vue";
import KeyBoard from "./KeyBoard.vue";
import GameOver from "./GameOver.vue";

const guesses = ref<GuessChar[][]>([]);
const guessInProgress = ref<GuessInProgress>([]);
const showNotAWord = ref<boolean>(false);
let word = ref("");

reset();

function reset() {
  word.value = randomWord();
  guesses.value = [];
  guessInProgress.value = [];
}

function typeLetter(letter: string): void {
  if (["Backspace", Keys.BACKSPACE].includes(letter)) {
    deleteLetter();
  } else if (["Enter", Keys.ENTER].includes(letter)) {
    submitGuess();
  } else {
    const lower = letter.toLowerCase();
    if (
      lower.length === 1 &&
      ALL_LETTERS.includes(lower) &&
      guessInProgress.value.length < NUM_LETTERS
    ) {
      guessInProgress.value.push(letter);
    }
  }
}

function deleteLetter(): void {
  if (guessInProgress.value.length > 0) {
    guessInProgress.value.pop();
    showNotAWord.value = false;
  }
}

function submitGuess(): void {
  if (guessInProgress.value.length === NUM_LETTERS) {
    const candidate = guessInProgress.value.join("");
    if (!isAWord(candidate)) {
      showNotAWord.value = true;
      return;
    }

    const nextGuess: Guess = guessInProgress.value.map((letter, slot) => {
      let state = GuessState.WRONG;
      if (isCorrect(word.value, slot, letter)) {
        state = GuessState.CORRECT;
      } else if (inWord(word.value, slot, letter)) {
        state = GuessState.IN_WORD;
      }
      return { letter, state };
    });

    guessInProgress.value = [];
    guesses.value.push(nextGuess);
  }
}

const isGameOver = computed((): boolean => {
  return guesses.value.length >= NUM_ALLOWED_ATTEMPTS || winner.value === true;
});

const remaining = computed((): number => {
  return NUM_ALLOWED_ATTEMPTS - guesses.value.length;
});

const winner = computed((): boolean => {
  return guesses.value.length
    ? guesses.value
        .slice(-1)[0]
        .map(({ letter }) => letter)
        .join("")
        .toLowerCase() === word.value.toLowerCase()
    : false;
});

const wrongLetters = computed((): string[] => {
  const letters: string[] = [];
  guesses.value.forEach((guess) => {
    guess.forEach(({ letter }, slot) => {
      if (!letters.includes(letter) && !inWord(word.value, slot, letter)) {
        letters.push(letter);
      }
    });
  });
  return letters;
});

const correctLetters = computed((): string[] => {
  const letters: string[] = [];
  guesses.value.forEach((guess) => {
    guess.forEach(({ letter }, slot) => {
      if (!letters.includes(letter) && isCorrect(word.value, slot, letter)) {
        letters.push(letter);
      }
    });
  });
  return letters;
});

const lettersInWord = computed((): string[] => {
  const letters: string[] = [];
  guesses.value.forEach((guess) => {
    guess.forEach(({ letter }, slot) => {
      if (
        !letters.includes(letter) &&
        inWord(word.value, slot, letter) &&
        !isCorrect(word.value, slot, letter)
      ) {
        letters.push(letter);
      }
    });
  });
  return letters;
});

function handleKeyUp(event: KeyboardEvent) {
  if (isGameOver.value) {
    return;
  }

  typeLetter(event.key);
}

window.addEventListener("keyup", handleKeyUp);
</script>

<template>
  <div class="board">
    <GuessEntry
      v-bind:key="i"
      v-for="(guess, i) in guesses"
      :guess="guess"
    ></GuessEntry>
    <CurrentGuess
      v-if="!isGameOver"
      :guessInProgress="guessInProgress"
    ></CurrentGuess>
    <RemainingGuesses
      :remaining="remaining"
      :gameOver="isGameOver"
    ></RemainingGuesses>
  </div>
  <div>
    <KeyBoard
      :wrongLetters="wrongLetters"
      :lettersInWord="lettersInWord"
      :correctLetters="correctLetters"
      @type-letter="typeLetter"
    ></KeyBoard>
    <div v-if="showNotAWord">
      <strong>Sorry, this word is not in my (abbreviated) dictionary.</strong>
    </div>
  </div>
  <GameOver
    v-if="isGameOver"
    :word="word"
    :winner="winner"
    :numAttempts="guesses.length"
    @reset="reset"
  ></GameOver>
</template>

<style>
.board {
  margin: 10px 10px 40px 10px;
  color: #000;
  display: flex;
  flex-flow: column nowrap;
}
</style>
