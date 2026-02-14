<script setup lang="ts">
interface ContentItem {
  title: string;
  description: string;
  path: string;
  date: string;
}

interface Props {
  currentPath: string;
  items: ContentItem[];
}

const props = defineProps<Props>();

const relatedItems = computed(() => 
  props.items
    .filter(item => item.path !== props.currentPath)
    .slice(0, 3)
);
</script>

<template>
  <section v-if="relatedItems.length" class="mt-12 pt-8 border-t-2 border-[var(--color-border)]">
    <h3 class="text-lg font-semibold text-[var(--color-dark)] mb-4 flex items-center gap-2">
      <span class="i-tabler:bookmarks" />
      Related Articles
    </h3>
    <div class="space-y-3">
      <NuxtLink
        v-for="item in relatedItems"
        :key="item.path"
        :to="item.path"
        class="group block p-4 rounded-xl border-2 border-[var(--color-border)] bg-[var(--color-card)] hover:border-[var(--color-primary)] hover:shadow-[4px_4px_0px_rgba(0,0,0,0.1)] transition-all duration-200"
      >
        <h4 class="font-medium text-[var(--color-dark)] group-hover:text-[var(--color-primary)] transition-colors line-clamp-1">
          {{ item.title }}
        </h4>
        <p class="text-sm text-[var(--color-text-muted)] line-clamp-1 mt-1">
          {{ item.description }}
        </p>
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
