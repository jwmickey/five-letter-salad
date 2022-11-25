<script setup lang="ts">
defineProps<{
  from?: string;
}>();
</script>

<template>
  <div class="flex flex-col m-6 pl-4 text-2xl">
    <router-link class="mb-2" to="/">Play!</router-link>
    <router-link class="mb-2" to="/history">History</router-link>
    <router-link class="mb-2" to="/about">About</router-link>
    <hr />
    <router-link class="my-2" :to="from ?? '/'">Back</router-link>
  </div>
</template>
