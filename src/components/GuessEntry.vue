<script setup lang="ts">
import { GuessState, type Guess, type GuessChar } from "../utils/GameTypes";
import { NUM_LETTERS } from "@/utils/Logic";
import LetterBlock from "./LetterBlock.vue";
import GuessRow from "./GuessRow.vue";

defineProps<{
  guess: Guess;
}>();

const isCorrect = (char?: GuessChar) => char?.state === GuessState.CORRECT;
const inWord = (char?: GuessChar) => char?.state === GuessState.IN_WORD;
</script>

<template>
  <GuessRow>
    <LetterBlock
      v-for="(_, i) in NUM_LETTERS"
      v-bind:key="i"
      :correct="isCorrect(guess[i])"
      :inWord="inWord(guess[i])"
      :letter="guess[i]?.letter"
    ></LetterBlock>
  </GuessRow>
</template>
