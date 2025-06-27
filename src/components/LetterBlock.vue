<script setup lang="ts">
defineProps<{
  letter?: string;
  correct?: boolean;
  inWord?: boolean;
  isRevealing?: boolean;
  animationDelay?: number;
}>();
</script>

<template>
  <div
    class="letter-block flex flex-1 items-center justify-center aspect-square border uppercase text-4xl text-gray-900"
    :class="{
      'text-gray-900': true,
      'bg-incorrect-600':
        correct === false &&
        inWord === false &&
        (correct !== undefined || inWord !== undefined),
      'bg-correct-500': correct,
      'bg-inword-300': inWord,
      'border-gray-900': true,
      'letter-revealing': isRevealing,
    }"
    :style="{ animationDelay: animationDelay ? `${animationDelay}ms` : '0ms' }"
  >
    {{ letter }}
  </div>
</template>

<style scoped>
.letter-block {
  transition: transform 0.1s ease-in-out;
}

.letter-revealing {
  animation: letterReveal 0.6s ease-in-out forwards;
}

@keyframes letterReveal {
  0% {
    transform: rotateX(0deg);
  }
  50% {
    transform: rotateX(90deg);
  }
  100% {
    transform: rotateX(0deg);
  }
}

/* Additional glow effect for correct letters */
.bg-correct-500.letter-revealing {
  animation: letterReveal 0.6s ease-in-out forwards,
    correctGlow 0.8s ease-in-out;
}

@keyframes correctGlow {
  0%,
  100% {
    box-shadow: 0 0 0 rgba(34, 197, 94, 0);
  }
  50% {
    box-shadow: 0 0 20px rgba(34, 197, 94, 0.6);
  }
}

/* Pulse effect for in-word letters */
.bg-inword-300.letter-revealing {
  animation: letterReveal 0.6s ease-in-out forwards,
    inWordPulse 0.8s ease-in-out;
}

@keyframes inWordPulse {
  0%,
  100% {
    box-shadow: 0 0 0 rgba(253, 224, 71, 0);
  }
  50% {
    box-shadow: 0 0 15px rgba(253, 224, 71, 0.5);
  }
}
</style>
