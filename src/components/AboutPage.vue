<script setup lang="ts">
import NavBar from "./NavBar.vue";
</script>

<template>
  <NavBar title="About" backPath="/"></NavBar>
  <p>
    A hobby project by
    <a href="https://jodymickey.com" target="_blank">Jody Mickey</a>.
  </p>
  <p>
    View on <a href="https://github.com/jwmickey/word-guess-vue">GitHub</a>.
  </p>
</template>

<style scoped>
p {
  margin: 0 20px;
  padding: 5px;
}
</style>
