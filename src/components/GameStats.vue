<script setup lang="ts">
import { computed } from "vue";
import NavBar from "./NavBar.vue";
import { useGameManager } from "@/utils/providers";
import { GameHistory } from "@/utils/GameHistory";
const gm = useGameManager();
const history = gm.loadHistory();

const stats = computed(() => {
  const collected = history.reduce(
    (s, entry) => {
      const gh = GameHistory.createFromData(entry);
      if (gh.win) {
        s.guesses[entry.numAttempts - 1]++;
      } else {
        s.misses++;
      }
      return s;
    },
    {
      guesses: new Array(6).fill(0) as number[],
      misses: 0,
      max: 0,
    }
  );
  collected.max = Math.max(...collected.guesses);

  return collected;
});
</script>

<template>
  <NavBar title="Stats" back-path="/"></NavBar>
  <div class="text-lg">Guess Distribution</div>
  <div class="flex flex-col pl-4">
    <div
      v-for="(occurrences, i) in stats.guesses"
      v-bind:key="i"
      class="flex flex-row items-center ph-8 gap-2"
    >
      <div class="text-white w-2 items-center">{{ i + 1 }}</div>
      <div
        class="bar bg-blue-500 text-white flex justify-end items-center min-w-6 pr-2 mb-1"
        :style="{
          width: Math.round((occurrences / stats.max) * 100) + '%',
        }"
      >
        {{ occurrences }}
      </div>
    </div>
  </div>
  <div class="mt-4">{{ stats.misses }} losses</div>
</template>
