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
  <table>
    <thead>
      <tr>
        <th>Word</th>
        <th>Attempts</th>
        <th>Result</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in pageItems"
        v-bind:key="item.datePlayed.toISOString()"
        @click="showGame(item)"
      >
        <td :class="{ word: true, wrong: item.lose }">
          {{ item.word.toUpperCase() }}
        </td>
        <td>
          <span
            :class="{
              attempts: true,
              wrong: item.lose,
              ['attempts-' + item.numAttempts]: item.win,
            }"
            >{{ item.numAttempts }}</span
          >
        </td>
        <td>{{ item.win ? "Win!" : "lose" }}</td>
        <td>{{ item.datePlayed.toLocaleDateString() }}</td>
      </tr>
    </tbody>
  </table>
  <Pagination :numPages="numPages" :page="page" :route="'history'"></Pagination>
</template>

<style scoped>
table {
  width: 100%;
  background-color: #333;
  color: #ddd;
  border-collapse: collapse;
}
table td,
table th {
  text-align: center;
  padding: 4px 2px;
  border-bottom: 1px solid #666;
}
.word {
  font-family: "Courier New", Courier, monospace;
  font-size: 1.2rem;
  letter-spacing: 0.2rem;
}
.word.wrong {
  text-decoration: line-through;
}
.attempts {
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  display: inline-block;
  color: #000;
  font-weight: bold;
  border: 1px solid #efefef;
  line-height: 1.4rem;
  font-size: 1rem;
}

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
