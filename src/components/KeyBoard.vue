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
  <div class="flex flex-col">
    <div
      class="row mb-1 flex flex-auto justify-center items-center self-center"
      v-bind:key="i"
      v-for="(row, i) in rows"
    >
      <div
        @click="emit('typeLetter', key)"
        class="flex-none basis-8 rounded-sm py-2 mr-1 border bg-gray-500 border-gray-500 text-white text-center uppercase cursor-pointer"
        :class="{
          'bg-gray-800 text-gray-400': wrongLetters.includes(key),
          'bg-inword-400 text-gray-800':
            lettersInWord.includes(key) && !correctLetters.includes(key),
          'bg-correct-600 text-gray-800': correctLetters.includes(key),
        }"
        v-bind:key="key"
        v-for="key in row"
      >
        {{ key }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.row:last-child > div:first-child,
.row:last-child > div:last-child {
  min-width: 50px;
  background-color: rgb(56, 60, 67);
}
</style>
