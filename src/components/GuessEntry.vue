<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { GuessState, type Guess, type GuessChar } from "../utils/GameTypes";
import { NUM_LETTERS } from "@/utils/Logic";
import LetterBlock from "./LetterBlock.vue";
import GuessRow from "./GuessRow.vue";

const props = defineProps<{
  guess: Guess;
  isLatestGuess?: boolean;
}>();

const isRevealing = ref(false);

const isCorrect = (char?: GuessChar) => char?.state === GuessState.CORRECT;
const inWord = (char?: GuessChar) => char?.state === GuessState.IN_WORD;

onMounted(async () => {
  if (props.isLatestGuess) {
    await nextTick();
    isRevealing.value = true;

    // Stop the revealing animation after all letters are done
    setTimeout(() => {
      isRevealing.value = false;
    }, 600 + (NUM_LETTERS - 1) * 100 + 100);
  }
});
</script>

<template>
  <GuessRow>
    <LetterBlock
      v-for="(_, i) in NUM_LETTERS"
      v-bind:key="i"
      :correct="isCorrect(guess[i])"
      :inWord="inWord(guess[i])"
      :letter="guess[i]?.letter"
      :isRevealing="isRevealing"
      :animationDelay="i * 100"
    ></LetterBlock>
  </GuessRow>
</template>
