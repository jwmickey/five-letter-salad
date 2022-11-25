<script setup lang="ts">
defineProps<{
  title: string;
  backPath?: string;
  hideMenu?: boolean;
}>();
</script>

<template>
  <nav class="my-2 flex items-center">
    <div class="flex-initial w-1/6 text-center">
      <router-link v-if="backPath" :to="backPath">Back</router-link>
    </div>
    <div class="flex-initial w-4/6 text-xl font-bold text-center">
      {{ title }}
    </div>
    <div class="flex-initial w-1/6 text-center">
      <router-link v-if="!hideMenu" to="/menu">Menu</router-link>
    </div>
  </nav>
</template>
