<script setup lang="ts">
import { computed } from "vue";
import { NUM_LETTERS } from "@/utils/Logic";
import type { GuessInProgress } from "../utils/GameTypes";
import LetterBlock from "./LetterBlock.vue";
import GuessRow from "./GuessRow.vue";

const props = defineProps<{
  guessInProgress: GuessInProgress;
}>();

const remaining = computed(() => NUM_LETTERS - props.guessInProgress.length);
</script>

<template>
  <GuessRow>
    <LetterBlock
      v-for="letter in guessInProgress"
      v-bind:key="letter"
      :letter="letter"
    >
    </LetterBlock>
    <LetterBlock v-for="i in remaining" v-bind:key="i"></LetterBlock>
  </GuessRow>
</template>
