<script setup lang="ts">
import { ref, onMounted } from "vue";
import NavBar from "./NavBar.vue";
import { useGameManager } from "@/utils/providers";
import type { IPreferences } from "@/utils/GameManager";

const gm = useGameManager();
const preferences = ref<IPreferences>({ useLargeWordDatabase: false });

onMounted(() => {
  preferences.value = gm.loadPreferences();
});

function savePreferences() {
  gm.savePreferences(preferences.value);
}
</script>

<template>
  <NavBar title="Preferences" back-path="/menu"></NavBar>
  <div class="p-6">
    <div class="mb-6">
      <h2 class="text-xl font-semibold mb-4">Word Selection</h2>
      <div class="flex items-center mb-4">
        <input
          id="use-large-database"
          v-model="preferences.useLargeWordDatabase"
          type="checkbox"
          class="mr-3 h-4 w-4 text-blue-600"
          @change="savePreferences"
        />
        <label for="use-large-database" class="text-lg">
          Use larger word database
        </label>
      </div>
      <p class="text-sm text-gray-600 ml-7">
        By default, words are chosen from a curated subset of common 5-letter
        words. Enable this option to include more obscure words from the larger
        dictionary.
      </p>
    </div>
  </div>
</template>
