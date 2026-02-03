<script setup lang="ts">
interface Props {
  iconSrc: string;
  iconTitle: string;
  lastUsed: string;
}

const props = defineProps<Props>();

const _lastUsedLabel = computed(() => (props.lastUsed ? `Used ${props.lastUsed}` : ""));
</script>

<template>
  <div
    class="group flex flex-col items-center justify-center text-center p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 border-[var(--color-border)] bg-[var(--color-card)] shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-mid)] hover:-translate-y-1 transition-all duration-300"
  >
    <div
      :class="iconSrc"
      class="text-3xl sm:text-4xl lg:text-5xl mb-2 sm:mb-3 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-300"
      aria-hidden="true"
    />
    <p
      class="font-semibold text-[var(--color-dark)] capitalize text-sm sm:text-base group-hover:text-[var(--color-primary)] transition-colors duration-200"
    >
      {{ iconTitle }}
    </p>
    <p class="text-[10px] sm:text-xs text-[var(--color-text-muted)] mt-0.5">
      {{ lastUsedLabel }}
    </p>
  </div>
</template>
