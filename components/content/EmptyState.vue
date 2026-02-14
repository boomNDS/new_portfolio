<script setup lang="ts">
interface Props {
  icon: string;
  title: string;
  description: string;
  action?: {
    text: string;
    to: string;
  };
}

defineProps<Props>();
</script>

<template>
  <div class="text-center py-16 sm:py-20">
    <div class="relative inline-block mb-6">
      <span :class="[icon, 'text-6xl sm:text-7xl text-[var(--color-text-muted)] opacity-50']" />
      <div class="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-[var(--color-light)] border-2 border-[var(--color-border)] flex items-center justify-center">
        <span class="i-tabler:search text-sm text-[var(--color-text-muted)]" />
      </div>
    </div>
    <h2 class="text-xl sm:text-2xl font-semibold text-[var(--color-dark)] mb-2">{{ title }}</h2>
    <p class="text-[var(--color-text)] max-w-md mx-auto mb-6">{{ description }}</p>
    <NuxtLink
      v-if="action"
      :to="action.to"
      class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--color-primary)] text-white font-medium shadow-[4px_4px_0px_rgba(0,0,0,0.1)] hover:shadow-[6px_6px_0px_rgba(0,0,0,0.12)] hover:-translate-y-0.5 transition-all duration-200"
    >
      <span class="i-tabler:arrow-left" />
      {{ action.text }}
    </NuxtLink>
  </div>
</template>
