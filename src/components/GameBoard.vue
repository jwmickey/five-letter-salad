<script setup lang="ts">
import { computed, ref, onMounted } from "vue";

import {
  type Guess,
  type GuessInProgress,
  Keys,
  GuessState,
} from "../utils/GameTypes";
import {
  analyzeGuess,
  isAWord,
  lettersOfState,
  ALL_LETTERS,
  NUM_ALLOWED_ATTEMPTS,
  NUM_LETTERS,
} from "../utils/Logic";
import GuessEntry from "./GuessEntry.vue";
import CurrentGuess from "./CurrentGuess.vue";
import RemainingGuesses from "./RemainingGuesses.vue";
import KeyBoard from "./KeyBoard.vue";
import GameOver from "./GameOver.vue";
import NavBar from "./NavBar.vue";
import { useGameManager } from "@/utils/providers";

const gm = useGameManager();
const guesses = ref<Guess[]>([]);
const guessInProgress = ref<GuessInProgress>([]);
const showNotAWord = ref<boolean>(false);
let word = ref("");

onMounted(init);

function init() {
  const game = gm.load();
  guesses.value = game.guesses;
  guessInProgress.value = game.currentGuess;
  word.value = game.word;
}

function saveGame() {
  gm.save({
    guesses: guesses.value,
    currentGuess: guessInProgress.value,
    word: word.value,
  });
}

function reset() {
  gm.saveToHistory(gm.load());
  gm.createGame();
  init();
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

    const nextGuess: Guess = analyzeGuess(word.value, guessInProgress.value);
    guessInProgress.value = [];
    guesses.value.push(nextGuess);

    saveGame();
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
  return lettersOfState(guesses.value, GuessState.WRONG);
});

const correctLetters = computed((): string[] => {
  return lettersOfState(guesses.value, GuessState.CORRECT);
});

const lettersInWord = computed((): string[] => {
  return lettersOfState(guesses.value, GuessState.IN_WORD);
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
  <NavBar title="Five Letter Salad"></NavBar>
  <div class="flex flex-1 flex-col justify-between">
    <div class="board">
      <GuessEntry
        v-bind:key="i"
        v-for="(guess, i) in guesses"
        :guess="guess"
        :isLatestGuess="i === guesses.length - 1"
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
    <div class="pb-2">
      <div v-if="showNotAWord" class="text-red-500 text-center py-2">
        <strong>Sorry, this word is not in my dictionary.</strong>
      </div>
      <KeyBoard
        :wrongLetters="wrongLetters"
        :lettersInWord="lettersInWord"
        :correctLetters="correctLetters"
        @type-letter="typeLetter"
      ></KeyBoard>
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
