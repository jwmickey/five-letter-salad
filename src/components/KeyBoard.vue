<script setup lang="ts">
import { Keys } from "@/utils/GameTypes";
defineProps<{
  wrongLetters: string[];
  lettersInWord: string[];
  correctLetters: string[];
}>();

const emit = defineEmits(["typeLetter", "submit", "delete"]);
const rows: string[][] = [
  "qwertyuiop".split(""),
  "asdfghjkl".split(""),
  `${Keys.ENTER}zxcvbnm${Keys.BACKSPACE}`.split(""),
];
</script>

<template>
  <div class="keyboard">
    <div class="row" v-bind:key="i" v-for="(row, i) in rows">
      <div
        @click="emit('typeLetter', key)"
        :class="{
          key: true,
          wrong: wrongLetters.includes(key),
          correct: correctLetters.includes(key),
          inword: lettersInWord.includes(key),
        }"
        v-bind:key="key"
        v-for="key in row"
      >
        {{ key }}
      </div>
    </div>
  </div>
  <div class="debug" v-if="false">
    <p>Wrong: {{ wrongLetters.join(", ") }}</p>
    <p>In Word: {{ lettersInWord.join(", ") }}</p>
    <p>Correct: {{ correctLetters.join(", ") }}</p>
  </div>
</template>

<style scoped>
.debug {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.row {
  justify-content: center;
  align-items: center;
  align-self: center;
  display: flex;
  margin: 4px 0;
}
.key {
  flex: 0;
  padding: 10px 5px;
  margin: 0 2px;
  min-width: 8vw;
  border: 1px solid #999;
  background-color: #666;
  color: #fff;
  text-align: center;
  text-transform: uppercase;
  cursor: pointer;
}
.key.wrong {
  background-color: #333;
  color: #ccc;
}
.key.correct {
  background-color: rgb(46, 147, 46) !important;
  color: #fff !important;
}
.key.inword {
  background-color: rgb(255, 255, 122);
  color: #333;
}
.row:last-child .key:first-child,
.row:last-child .key:last-child {
  min-width: 50px;
  background-color: #999;
}

@media (min-width: 980px) {
  .key {
    min-width: 32px;
  }
}
</style>
