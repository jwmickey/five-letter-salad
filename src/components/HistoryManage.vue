<script lang="ts" setup>
import NavBar from "./NavBar.vue";
import { ref } from "vue";
import { useGameManager } from "@/utils/providers";

const gm = useGameManager();

const showImport = ref(false);
const importSuccess = ref(false);

function clearHistory() {
  if (
    confirm(
      "Are you sure you want to permanently erase your history?  This cannot be undone!"
    )
  ) {
    gm.clearHistory();
  }
}

function exportHistory() {
  const raw = gm.exportHistory();
  download(raw, "application/json", "five-letter-salad-history.json");
}

function importHistory() {
  showImport.value = true;
}

function cancelImport() {
  showImport.value = false;
}

function doImport(event: Event) {
  importSuccess.value = false;
  const target = event.target as HTMLInputElement;
  const files = target.files as FileList;
  const file = files[0];
  if (file.type !== "application/json") {
    alert("Error: This file does not appear to be a valid backup");
    showImport.value = false;
    return;
  }
  const reader = new FileReader();
  reader.addEventListener("load", (event2) => {
    const encoded = event2.target?.result?.toString() as string;
    const decoded = atob(encoded.slice(encoded.indexOf(",") + 1));
    gm.importHistory(decoded);
    importSuccess.value = true;
    setTimeout(() => {
      showImport.value = false;
      importSuccess.value = false;
    }, 5000);
  });
  reader.readAsDataURL(file);
}

function download(content: string, mimeType: string, filename: string) {
  const a = document.createElement("a");
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  a.setAttribute("href", url);
  a.setAttribute("download", filename);
  a.click();
  URL.revokeObjectURL(url);
}
</script>

<template>
  <NavBar title="Manage History" back-path="history"></NavBar>
  <div class="flex flex-col">
    <div class="flex-auto mt-4">
      <p>
        Game history is stored locally on your device. It is never sent to any
        servers. If you get a new phone, for example, you can export your
        history file here, save it to your device and distribute it via email,
        Dropbox, etc.
      </p>
      <button
        class="py-2 px-4 rounded-sm bg-green-500 text-white"
        @click="exportHistory()"
      >
        Export
      </button>
    </div>
    <div class="flex-auto mt-4">
      <p>
        Import your previously exported file to restore saved history to this
        device. <strong>NOTICE:</strong> any previous history on this device
        will be overwritten.
      </p>
      <button
        class="py-2 px-4 rounded-sm bg-green-500 text-white"
        @click="importHistory()"
      >
        Import
      </button>
      <div v-if="showImport" class="py-2">
        <input type="file" id="import-selector" @change="doImport" />
        <button class="px-2 bg-slate-600 rounded-sm" @click="cancelImport">
          Cancel
        </button>
      </div>
      <div v-if="importSuccess" class="m-2 p-2 bg-green-600 text-white">
        Successfully imported!
      </div>
    </div>
    <div class="flex-auto mt-12">
      <p>Permanently delete your saved game history from this device.</p>
      <button
        class="py-2 px-4 rounded-sm bg-red-600 text-white"
        @click="clearHistory()"
      >
        Erase
      </button>
    </div>
  </div>
</template>
