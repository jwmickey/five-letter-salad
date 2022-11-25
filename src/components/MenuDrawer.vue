<script setup lang="ts">
defineProps<{
  from?: string;
}>();
</script>

<template>
  <div class="menu">
    <router-link to="/">Play!</router-link>
    <router-link to="/history">History</router-link>
    <router-link to="/about">About</router-link>
    <hr />
    <router-link :to="from ?? '/'">Back</router-link>
  </div>
</template>

<style scoped>
.menu > a {
  display: block;
  padding: 10px 20px;
  font-size: 2rem;
}
</style>
