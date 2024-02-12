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
  repeatWords: WordFrequency[];
  playFrequency: {
    today: number;
    week: number;
    month: number;
    year: number;
    allTime: number;
  };
}

const DEFAULT_STATS: Stats = {
  guesses: new Array(6).fill(0) as number[],
  misses: 0,
  maxInNumTries: 0,
  winPercentage: 0,
  currentStreak: 0,
  longestStreak: 0,
  playFrequency: {
    today: 0,
    week: 0,
    month: 0,
    year: 0,
    allTime: history.length,
  },
  repeatWords: [],
};

const stats = computed(() => {
  const today = new Date();
  today.setHours(0);
  today.setMinutes(0);
  const thisWeek = new Date(today);
  thisWeek.setDate(thisWeek.getDate() - thisWeek.getDay());
  const thisMonth = new Date(today);
  thisMonth.setDate(1);
  const thisYear = new Date(thisMonth);
  thisYear.setMonth(0);

  const collected: Stats = history.reduce((s, entry) => {
    const gh = GameHistory.createFromData(entry);

    // get win streak and guess distribution
    if (gh.win) {
      s.currentStreak++;
      s.guesses[entry.numAttempts - 1]++;
    } else {
      s.longestStreak = Math.max(s.longestStreak, s.currentStreak);
      s.currentStreak = 0;
      s.misses++;
    }

    // get play freqeuncy stats
    if (gh.datePlayed >= today) {
      s.playFrequency.today++;
    } else if (gh.datePlayed >= thisWeek) {
      s.playFrequency.week++;
    } else if (gh.datePlayed >= thisMonth) {
      s.playFrequency.month++;
    } else if (gh.datePlayed >= thisYear) {
      s.playFrequency.year++;
    }

    return s;
  }, DEFAULT_STATS);

  // apply final stats math
  collected.maxInNumTries = Math.max(...collected.guesses);
  collected.winPercentage = Math.round(
    ((history.length - collected.misses) / history.length) * 100
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
  collected.repeatWords = wordFrequencyArray.slice(0, 12);

  return collected;
});
</script>

<template>
  <NavBar title="Stats" back-path="/"></NavBar>
  <div class="p-2 text-gray-100">
    <div class="grid grid-cols-3 gap-2">
      <div class="shadow-md bg-gray-700 p-2 rounded-md text-center">
        <div class="text-sm">Win Percentage</div>
        <p class="text-lg font-mono">{{ stats.winPercentage }}%</p>
      </div>
      <div class="shadow-md bg-gray-700 p-2 rounded-md text-center">
        <div class="text-sm">Longest Streak</div>
        <p class="text-lg font-mono">{{ stats.longestStreak }}</p>
      </div>
      <div class="shadow-md bg-gray-700 p-2 rounded-md text-center">
        <div class="text-sm">Total Played</div>
        <p class="text-lg font-mono">{{ stats.playFrequency.allTime }}</p>
      </div>
    </div>
    <div class="mt-2 shadow-md bg-gray-700 rounded p-2">
      <p class="text-sm">Guess Distribution</p>
      <div class="flex flex-col pl-4 mt-2">
        <div
          v-for="(occurrences, i) in stats.guesses"
          v-bind:key="i"
          class="flex flex-row items-center ph-8 gap-2"
        >
          <div class="text-white w-2 items-center justify-self-end">{{ i + 1 }}</div>
          <div
            class="bar bg-blue-600 text-white flex justify-end items-center min-w-6 pr-2 mb-1"
            :style="{
              width: Math.round((occurrences / stats.maxInNumTries) * 100) + '%',
            }"
          >
            {{ occurrences }}
          </div>
        </div>
      </div>
      <p class="text-sm">{{ stats.misses }} losses</p>
    </div>
    <div class="mt-2 shadow-md bg-gray-700 rounded p-2">
      <p class="text-sm">Repeated Words</p>
      <div class="font-mono uppercase grid grid-cols-3 mt-2 text-center">
        <div v-for="word in stats.repeatWords" v-bind:key="word.word">
          {{ word.word }} - {{ word.frequency }}
        </div>
      </div>
    </div>
    <div class="mt-2 shadow-md bg-gray-700 rounded p-2">
      <p class="text-sm">Play Frequency</p>
      <div class="font-mono uppercase grid grid-cols-4 mt-2 text-center">
        <div>
          <p class="text-sm">Today</p>
          <p class="font-mono">{{ stats.playFrequency.today }}</p>
        </div>
        <div>
          <p class="text-sm">Week</p>
          <p class="font-mono">{{ stats.playFrequency.week }}</p>
        </div>
        <div>
          <p class="text-sm">Month</p>
          <p class="font-mono">{{ stats.playFrequency.month }}</p>
        </div>
        <div>
          <p class="text-sm">Year</p>
          <p class="font-mono">{{ stats.playFrequency.year }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
