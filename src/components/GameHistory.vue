<script setup lang="ts">
import { computed } from "vue";
import router from "@/router";
import { GameHistory } from "@/utils/GameHistory";
import { ymd } from "@/utils/DateUtils";
import NavBar from "./NavBar.vue";
import Pagination from "./Pagination.vue";
import { useGameManager } from "@/utils/providers";
const gm = useGameManager();
const history = gm.loadHistory();

const PAGE_SIZE = 10;
const numPages = Math.ceil(history.length / PAGE_SIZE);
const page = computed(() => {
  const given = Number(router.currentRoute.value.params.page);
  return Math.max(1, Math.min(given, numPages));
});
const pageItems = computed(() => {
  let start = PAGE_SIZE * (page.value - 1);
  let end = start + PAGE_SIZE;
  return history
    .slice(start, end)
    .map((data) => GameHistory.createFromData(data));
});

function showGame(game: GameHistory) {
  const path = `/history/game/${ymd(game.datePlayed)}-${game.word}`;
  router.push(path);
}
</script>

<template>
  <NavBar title="Your History" back-path="/"></NavBar>
  <table class="table-auto border-collapse mx-2 mt-4">
    <thead>
      <tr>
        <th class="text-left">Word</th>
        <th>Attempts</th>
        <th class="text-right">Date</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in pageItems"
        v-bind:key="item.datePlayed.toISOString()"
        @click="showGame(item)"
      >
        <td
          class="font-mono tracking-[.25em] text-lg uppercase"
          :class="{ 'line-through decoration-red-800': item.lose }"
        >
          {{ item.word }}
        </td>
        <td class="text-center">
          <span
            class="w-6 h-6 rounded-full inline-flex justify-center items-center text-black"
            :class="{
              'bg-red-700 strike-through': item.lose,
              ['attempts-' + item.numAttempts]: item.win,
            }"
            >{{ item.numAttempts }}</span
          >
        </td>
        <td class="text-right">{{ item.datePlayed.toLocaleDateString() }}</td>
      </tr>
    </tbody>
  </table>
  <Pagination
    v-if="numPages > 1"
    :numPages="numPages"
    :page="page"
    :route="'history'"
  ></Pagination>
</template>

<style scoped>
.attempts-1 {
  background-color: purple;
}
.attempts-2 {
  background-color: green;
}
.attempts-3 {
  background-color: palegreen;
}
.attempts-4 {
  background-color: yellowgreen;
}
.attempts-5 {
  background-color: yellow;
}
.attempts-6 {
  background-color: orange;
}
.attempts.wrong {
  background-color: red;
}
</style>
