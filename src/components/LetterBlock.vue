<script setup lang="ts">
defineProps<{
  letter?: string;
  correct?: boolean;
  inWord?: boolean;
}>();
</script>

<template>
  <div
    class="flex flex-1 items-center justify-center aspect-square border uppercase text-4xl text-gray-900"
    :class="{
      'text-gray-900': true,
      'bg-gray-400': correct === false && inWord === false,
      'bg-correct-500': correct,
      'bg-inword-300': inWord,
      'border-gray-900': true,
    }"
  >
    {{ letter }}
  </div>
</template>
