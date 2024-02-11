<script setup lang="ts">
import { computed } from "vue";
import NavBar from "./NavBar.vue";
import { useGameManager } from "@/utils/providers";
import { GameHistory } from "@/utils/GameHistory";
const gm = useGameManager();
const history = gm.loadHistory();

interface WordFrequency {
  word: string;
  frequency: number;
}

interface Stats {
  guesses: number[];
  misses: number;
  maxInNumTries: number;
  winPercentage: number;
  currentStreak: number;
  longestStreak: number;
  totalPlayed: number;
  repeatWords: WordFrequency[];
}

const DEFAULT_STATS: Stats = {
  guesses: new Array(6).fill(0) as number[],
  misses: 0,
  maxInNumTries: 0,
  winPercentage: 0,
  currentStreak: 0,
  longestStreak: 0,
  totalPlayed: history.length,
  repeatWords: [],
};

const stats = computed(() => {
  const collected: Stats = history.reduce((s, entry) => {
    const gh = GameHistory.createFromData(entry);
    if (gh.win) {
      s.currentStreak++;
      s.guesses[entry.numAttempts - 1]++;
    } else {
      s.longestStreak = Math.max(s.longestStreak, s.currentStreak);
      s.currentStreak = 0;
      s.misses++;
    }
    return s;
  }, DEFAULT_STATS);

  // apply final stats math
  collected.maxInNumTries = Math.max(...collected.guesses);
  collected.winPercentage = Math.round(
    ((collected.totalPlayed - collected.misses) / collected.totalPlayed) * 100
  );

  // find repeat words and frequency
  const words = history.map((entry) => entry.word);
  const wordCountMap = new Map<string, number>();
  words.forEach((word) => {
    const count = wordCountMap.get(word) || 0;
    wordCountMap.set(word, count + 1);
  });
  const wordFrequencyArray: WordFrequency[] = Array.from(
    wordCountMap,
    ([word, frequency]) => ({ word, frequency })
  );
  wordFrequencyArray.sort((a, b) => b.frequency - a.frequency);
  collected.repeatWords = wordFrequencyArray.slice(0, 10);

  return collected;
});
</script>

<template>
  <NavBar title="Stats" back-path="/"></NavBar>
  <div class="grid grid-cols-3 gap-4">
    <div class="shadow-md bg-gray-700 p-2 rounded-md text-center">
      <div class="">Win Percentage</div>
      <p class="text-lg font-mono">{{ stats.winPercentage }}%</p>
    </div>
    <div class="shadow-md bg-gray-700 p-2 rounded-md text-center">
      <div class="">Longest Streak</div>
      <p class="text-lg font-mono">{{ stats.longestStreak }}</p>
    </div>
    <div class="shadow-md bg-gray-700 p-2 rounded-md text-center">
      <div class="">Total Played</div>
      <p class="text-lg font-mono">{{ stats.totalPlayed }}</p>
    </div>
  </div>
  <div class="text-lg">Guess Distribution</div>
  <div class="flex flex-col pl-4">
    <div
      v-for="(occurrences, i) in stats.guesses"
      v-bind:key="i"
      class="flex flex-row items-center ph-8 gap-2"
    >
      <div class="text-white w-2 items-center justify-self-end">{{ i + 1 }}</div>
      <div
        class="bar bg-blue-500 text-white flex justify-end items-center min-w-6 pr-2 mb-1"
        :style="{
          width: Math.round((occurrences / stats.maxInNumTries) * 100) + '%',
        }"
      >
        {{ occurrences }}
      </div>
    </div>
  </div>
  <div class="mt-4">{{ stats.misses }} losses</div>
  <div class="mt-4">
    <div class="text-lg">Repeated Words</div>
    <ol class="font-mono uppercase">
      <li v-for="word in stats.repeatWords" v-bind:key="word.word">
        {{ word.word }} - {{ word.frequency }}
      </li>
    </ol>
  </div>
</template>
