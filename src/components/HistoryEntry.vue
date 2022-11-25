<script setup lang="ts">
import GuessEntry from "./GuessEntry.vue";
import NavBar from "./NavBar.vue";
import router from "../router/";
import { useGameManager } from "@/utils/providers";

const gm = useGameManager();
const entry = router.currentRoute.value.params?.entry as string;
const game = gm.loadEntry(entry);
</script>

<template>
  <NavBar
    :title="game?.word.toUpperCase() ?? 'Entry Not Found'"
    backPath="/history"
  ></NavBar>
  <div v-if="game">
    <div class="board">
      <GuessEntry
        v-bind:key="i"
        v-for="(guess, i) in game.guesses"
        :guess="guess"
      >
      </GuessEntry>
    </div>
    <div class="history-info">
      You completed this game<br />
      <strong>{{ game.datePlayed.toDateString() }}</strong>
      at
      <strong>{{ game.datePlayed.toLocaleTimeString() }}</strong
      >.
    </div>
  </div>
</template>

<style scoped>
.history-info {
  padding: 10px;
  text-align: center;
}
</style>
