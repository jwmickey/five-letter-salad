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
  animation: gradualReveal 1.2s ease-in-out forwards;
}

@keyframes gradualReveal {
  0% {
    background: rgb(203, 213, 225); /* slate-300 - neutral starting color */
  }
  100% {
    /* Final color will be applied via CSS classes */
  }
}

/* Correct letter gradient animation */
.bg-correct-500.letter-revealing {
  animation: correctReveal 1.2s ease-in-out forwards;
}

@keyframes correctReveal {
  0% {
    background: rgb(203, 213, 225); /* slate-300 - neutral */
  }
  50% {
    background: linear-gradient(45deg, rgb(203, 213, 225), rgb(34, 197, 94)); /* transition gradient */
  }
  100% {
    background: rgb(34, 197, 94); /* green-500 - correct */
  }
}

/* In-word letter gradient animation */
.bg-inword-300.letter-revealing {
  animation: inwordReveal 1.2s ease-in-out forwards;
}

@keyframes inwordReveal {
  0% {
    background: rgb(203, 213, 225); /* slate-300 - neutral */
  }
  50% {
    background: linear-gradient(45deg, rgb(203, 213, 225), rgb(253, 224, 71)); /* transition gradient */
  }
  100% {
    background: rgb(253, 224, 71); /* yellow-300 - in word */
  }
}

/* Incorrect letter gradient animation */
.bg-incorrect-600.letter-revealing {
  animation: incorrectReveal 1.2s ease-in-out forwards;
}

@keyframes incorrectReveal {
  0% {
    background: rgb(203, 213, 225); /* slate-300 - neutral */
  }
  50% {
    background: linear-gradient(45deg, rgb(203, 213, 225), rgb(82, 82, 82)); /* transition gradient */
  }
  100% {
    background: rgb(82, 82, 82); /* neutral-600 - incorrect */
  }
}
</style>
