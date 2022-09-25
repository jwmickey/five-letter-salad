<script setup lang="ts">
import { NUM_ALLOWED_ATTEMPTS } from "../utils/Logic";
defineProps<{
  winner: boolean;
  word: string;
  numAttempts: number;
}>();

const emit = defineEmits(["reset"]);
</script>

<template>
  <div :class="{ outcome: true, winner }">
    <h1>{{ winner ? "You win!" : "Better luck next time" }}</h1>
    <p>The word is:</p>
    <p class="word">
      <strong>{{ word }}</strong>
    </p>
    <p v-if="winner">
      You found the word in {{ numAttempts }} out of
      {{ NUM_ALLOWED_ATTEMPTS }} allowed tries.
    </p>
    <div class="play-again">
      <button @click="emit('reset')">Play Again</button>
    </div>
  </div>
</template>

<style scoped>
.outcome {
  position: absolute;
  background: #fff;
  color: #000;
  border: 2px solid #999;
  left: 10%;
  top: 10vh;
  width: 80%;
  height: 80vh;
  padding: 20px;
  text-align: center;
  font-size: 1.2em;
}
.winner h1 {
  color: rgb(46, 147, 46);
}
.word {
  font-size: 2em;
  font-weight: bold;
  text-transform: uppercase;
}
.play-again {
  margin-top: 50px;
}
button {
  color: rgb(46, 147, 46);
  font-size: 2em;
  padding: 10px;
}
</style>
