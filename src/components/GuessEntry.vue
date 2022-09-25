<script setup lang="ts">
import { GuessState, type Guess, type GuessChar } from "../utils/GameTypes";
import { NUM_LETTERS } from "@/utils/Logic";

defineProps<{
  guess: Guess;
}>();

const isCorrect = (char?: GuessChar) => char?.state === GuessState.CORRECT;
const inWord = (char?: GuessChar) => char?.state === GuessState.IN_WORD;
</script>

<template>
  <div class="guess">
    <div
      v-for="(_, i) in NUM_LETTERS"
      v-bind:key="i"
      :class="{
        letter: true,
        correct: isCorrect(guess[i]),
        inword: inWord(guess[i]),
      }"
    >
      {{ guess[i]?.letter }}
    </div>
  </div>
</template>

<style>
.guess {
  display: flex;
  flex: 0 0 auto;
  align-self: center;
  border: 2px solid transparent;
  padding: 4px 0;
  border-radius: 5px;
}
.letter {
  display: inline-flex;
  font-size: 10vmin;
  width: 13vmin;
  height: 13vmin;
  margin: 0 4px;
  border: 1px solid gray;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  background-color: #999;
}
.correct {
  background-color: rgb(46, 147, 46) !important;
}
.inword {
  background-color: rgb(255, 255, 122);
}
</style>
