<script setup lang="ts">
import { computed } from "vue";
import { NUM_LETTERS } from "@/utils/Logic";
import type { GuessInProgress } from "../utils/GameTypes";

const props = defineProps<{
  guessInProgress: GuessInProgress;
}>();

const remaining = computed(() => NUM_LETTERS - props.guessInProgress.length);
</script>

<template>
  <div class="guess active">
    <div v-for="letter in guessInProgress" v-bind:key="letter" class="letter">
      {{ letter }}
    </div>
    <div v-for="i in remaining" v-bind:key="i" class="letter"></div>
  </div>
</template>

<style>
.active {
  border-color: rgb(45, 146, 255);
}
</style>
