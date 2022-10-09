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
import { GameManager } from "../utils/GameManager";
import GuessEntry from "./GuessEntry.vue";
import CurrentGuess from "./CurrentGuess.vue";
import RemainingGuesses from "./RemainingGuesses.vue";
import KeyBoard from "./KeyBoard.vue";
import GameOver from "./GameOver.vue";

const manager = new GameManager(window);
const guesses = ref<Guess[]>([]);
const guessInProgress = ref<GuessInProgress>([]);
const showNotAWord = ref<boolean>(false);
let word = ref("");

onMounted(init);

function init() {
  const game = manager.load();
  guesses.value = game.guesses;
  guessInProgress.value = game.currentGuess;
  word.value = game.word;
}

function saveGame() {
  manager.save({
    guesses: guesses.value,
    currentGuess: guessInProgress.value,
    word: word.value,
  });
}

function reset() {
  manager.createGame();
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
    <div v-if="showNotAWord" class="wrong">
      <strong>Sorry, this word is not in my dictionary.</strong>
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

<style scoped>
.board {
  margin: 10px 10px 40px 10px;
  color: #000;
  display: flex;
  flex-flow: column nowrap;
}
.wrong {
  text-align: center;
  color: yellow;
}
</style>
