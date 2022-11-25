<script setup lang="ts">
import { RouterView } from "vue-router";
document.documentElement.style.setProperty(
  "--vh",
  window.innerHeight * 0.01 + "px"
);
</script>

<template>
  <RouterView />
</template>
