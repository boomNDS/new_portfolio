<template>
  <div
    class="flex flex-col items-center justify-center text-center mb-2 rounded-xl border-2 border-[var(--color-border)] bg-[var(--color-card)] px-3 py-4 shadow-[var(--shadow-soft)] hover:-translate-y-[2px] hover:shadow-[var(--shadow-mid)] transition duration-150"
  >
    <div
      :class="[iconSrc]"
      class="text-4xl md:text-5xl grayscale hover:grayscale-0 ease-in-out duration-300 mb-2"
    ></div>
    <p class="m-0 font-semibold text-[var(--color-dark)] capitalize">
      {{ iconTitle }}
    </p>
    <p class="m-0 text-[12px] text-[var(--color-text)] opacity-80">
      {{ lastUsedLabel }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
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

const lastUsedLabel = computed(() =>
  props.lastUsed ? `Used ${props.lastUsed}` : "",
);
</script>

<style scoped></style>
