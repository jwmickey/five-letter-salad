<script setup lang="ts">
import { NUM_LETTERS } from "@/utils/Logic";

defineProps<{
  remaining: number;
  gameOver: boolean;
}>();
</script>

<template>
  <div v-for="i in remaining - (gameOver ? 0 : 1)" v-bind:key="i" class="guess">
    <div v-for="j in NUM_LETTERS" v-bind:key="j" class="letter"></div>
  </div>
</template>
