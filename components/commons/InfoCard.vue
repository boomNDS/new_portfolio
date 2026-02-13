<script setup lang="ts">
import type { ProjectLink } from "~/types";

// Props
interface Props {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  meta?: string;
  result?: string;
  inactive?: boolean;
  tags: string[];
  links: ProjectLink[];
}

const props = defineProps<Props>();

// State
const mediaError = ref(false);
const isHovered = ref(false);

// Computed
const isVideo = computed(() => /\.(mp4|webm|ogg)$/i.test(props.imageSrc));

const visibleTags = computed(() => {
  // Show fewer tags on smaller screens
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
  return props.tags.slice(0, isMobile ? 2 : 3);
});

const hiddenTagCount = computed(() => Math.max(0, props.tags.length - visibleTags.value.length));

const hasLinks = computed(() => props.links?.length > 0);

const primaryLink = computed(() =>
  props.links?.find((l) => l.type === "link" || l.type === "github"),
);

// Methods
const getIconClass = (type: string): string => {
  switch (type) {
    case "github":
      return "i-tabler:brand-github";
    case "design":
      return "i-tabler:palette";
    default:
      return "i-tabler:external-link";
  }
};

const getLinkLabel = (type: string): string => {
  switch (type) {
    case "github":
      return "GitHub";
    case "design":
      return "Design";
    default:
      return "Live";
  }
};

const onMediaError = () => {
  mediaError.value = true;
};
</script>

<template>
  <article
    class="group flex flex-col h-full rounded-xl sm:rounded-2xl border-2 sm:border-4 border-[var(--color-border)] bg-[var(--color-card)] shadow-[var(--shadow-soft)] overflow-hidden transition-all duration-300 hover:shadow-[var(--shadow-mid)] hover:-translate-y-1"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <!-- Media -->
    <div class="relative aspect-[4/3] bg-[var(--color-light)] overflow-hidden">
      <!-- Video -->
      <video
        v-if="!mediaError && isVideo"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        :src="`/img/showcase/${imageSrc}`"
        autoplay
        muted
        loop
        playsinline
        @error="onMediaError"
      />

      <!-- Image -->
      <img
        v-else-if="!mediaError"
        :src="`/img/showcase/${imageSrc}`"
        :alt="imageAlt"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
        width="400"
        height="300"
        @error="onMediaError"
      />

      <!-- Placeholder -->
      <div
        v-else
        class="w-full h-full flex items-center justify-center bg-[var(--color-light)]"
      >
        <span
          class="i-tabler:image-off text-4xl text-[var(--color-text-muted)]"
          aria-hidden="true"
        />
      </div>

      <!-- Result Badge -->
      <div
        v-if="result"
        class="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-semibold bg-[var(--color-primary)] text-white shadow-[var(--shadow-sm)]"
      >
        {{ result }}
      </div>

      <!-- Inactive Badge -->
      <div
        v-if="inactive"
        class="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-semibold bg-[var(--color-text-muted)] text-white shadow-[var(--shadow-sm)]"
      >
        Inactive
      </div>

      <!-- Hover Overlay: fixed black + opacity so dark in both themes; button stays readable -->
      <div
        class="project-card-overlay absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <NuxtLink
          v-if="primaryLink"
          :to="primaryLink.url"
          target="_blank"
          rel="noopener noreferrer"
          class="project-card-overlay-btn flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm shadow-lg hover:scale-105 transition-transform duration-200"
        >
          <span :class="getIconClass(primaryLink.type)" aria-hidden="true" />
          View Project
        </NuxtLink>
      </div>
    </div>

    <!-- Content -->
    <div class="flex flex-col flex-1 p-4 sm:p-5">
      <!-- Meta -->
      <p
        v-if="meta"
        class="text-[10px] sm:text-xs uppercase tracking-wider text-[var(--color-text-muted)] mb-1.5"
      >
        {{ meta }}
      </p>

      <!-- Title -->
      <h3
        class="text-base sm:text-lg font-semibold text-[var(--color-dark)] mb-2 line-clamp-1 group-hover:text-[var(--color-primary)] transition-colors duration-200"
      >
        {{ title }}
      </h3>

      <!-- Description -->
      <p class="text-sm text-[var(--color-text)] line-clamp-2 mb-4 flex-1">
        {{ description }}
      </p>

      <!-- Links -->
      <div v-if="hasLinks" class="flex flex-wrap gap-2 mb-3">
        <NuxtLink
          v-for="link in links"
          :key="link.url"
          :to="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-[var(--color-border)]/20 text-xs font-medium text-[var(--color-dark)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]/30 hover:bg-[var(--color-primary)]/5 transition-all duration-200"
        >
          <span :class="getIconClass(link.type)" aria-hidden="true" />
          {{ getLinkLabel(link.type) }}
        </NuxtLink>
      </div>

      <!-- Tags -->
      <div class="flex flex-wrap gap-1.5">
        <span
          v-for="tag in visibleTags"
          :key="tag"
          class="px-2 py-0.5 rounded-full text-[10px] sm:text-xs bg-[var(--color-light)] text-[var(--color-text)] border border-[var(--color-border)]/10"
        >
          #{{ tag }}
        </span>
        <span
          v-if="hiddenTagCount > 0"
          class="px-2 py-0.5 rounded-full text-[10px] sm:text-xs bg-[var(--color-light)] text-[var(--color-text-muted)] border border-[var(--color-border)]/10"
        >
          +{{ hiddenTagCount }}
        </span>
      </div>
    </div>
  </article>
</template>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Hover overlay: black with opacity so it stays dark in light and dark mode */
.project-card-overlay {
  background: rgba(0, 0, 0, 0.6);
}

/* Button on overlay: always light bg + dark text for readability on dark overlay */
.project-card-overlay-btn {
  background: #ffffff;
  color: #111111;
}

.project-card-overlay-btn:hover {
  background: #f4f4f4;
}
</style>
