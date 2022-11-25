<script setup lang="ts">
import { NUM_LETTERS } from "@/utils/Logic";
import LetterBlock from "./LetterBlock.vue";
import GuessRow from "./GuessRow.vue";

defineProps<{
  remaining: number;
  gameOver: boolean;
}>();
</script>

<template>
  <GuessRow v-for="i in remaining - (gameOver ? 0 : 1)" v-bind:key="i">
    <LetterBlock v-for="j in NUM_LETTERS" v-bind:key="j"></LetterBlock>
  </GuessRow>
</template>
