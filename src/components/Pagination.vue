<script setup lang="ts">
defineProps<{
  numPages: number;
  page: number;
  route: string;
}>();
</script>

<template>
  <div class="pagination">
    <div v-if="page > 1">
      <router-link :to="{ name: route, params: { page: page - 1 } }">{{
        page - 1
      }}</router-link>
    </div>
    <div class="current">{{ page }}</div>
    <div v-if="page < numPages">
      <router-link :to="{ name: route, params: { page: page + 1 } }">{{
        page + 1
      }}</router-link>
    </div>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
}
.pagination > div {
  flex: 0;
  padding: 8px;
}
.current {
  font-weight: bold;
}
</style>
