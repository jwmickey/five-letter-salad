<script setup lang="ts">
defineProps<{
  numPages: number;
  page: number;
  route: string;
}>();
</script>

<template>
  <div class="flex justify-center items-center">
    <div class="p-2" v-if="page > 1">
      <router-link :to="{ name: route, params: { page: page - 1 } }">{{
        page - 1
      }}</router-link>
    </div>
    <div class="p-2 font-bold">{{ page }}</div>
    <div class="p-2" v-if="page < numPages">
      <router-link :to="{ name: route, params: { page: page + 1 } }">{{
        page + 1
      }}</router-link>
    </div>
  </div>
</template>
