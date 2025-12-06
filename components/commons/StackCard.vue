<template>
  <div class="flex flex-col items-center justify-center text-center mb-2">
    <div
      :class="[iconSrc]"
      class="hidden md:block text-5xl grayscale hover:grayscale-1 ease-in-out duration-300 mb-2"
    ></div>
    <p
      class="rounded m-0 px-[10px] bg-[var(--color-light)] md:bg-transparent text-[var(--color-text)]"
    >
      {{ iconTitle }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps({
  iconSrc: {
    type: String,
    required: true,
  },
  iconTitle: {
    type: String,
    required: true,
  },
  lastUsed: {
    type: String,
    required: true,
  },
});
</script>

<style scoped></style>
