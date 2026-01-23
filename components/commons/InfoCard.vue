<template>
  <section
    class="rounded max-w-[300px] border-4 border-[var(--color-border)] bg-[var(--color-card)] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.18)] mx-auto mt-4 flex flex-col h-full transition-transform duration-150 hover:-translate-y-1"
  >
    <div class="flex justify-center">
      <div
        class="relative w-full max-w-[90%] aspect-[4/5] rounded-[1.5rem] overflow-hidden bg-[var(--color-card)] flex items-center justify-center p-3 border border-[var(--color-border)]/20 transition-shadow duration-150 group group-hover:shadow-[var(--shadow-soft)]"
      >
        <template v-if="!mediaError && isVideo">
          <video
            id="video"
            class="w-full h-full object-contain transition-transform duration-200 group-hover:scale-[1.03]"
            :src="`/img/showcase/${imageSrc}`"
            :alt="imageAlt"
            autoplay
            muted
            loop
            preload="none"
            @error="onMediaError"
          ></video>
        </template>
        <template v-else-if="!mediaError">
          <img
            id="image"
            class="w-full h-full object-contain transition-transform duration-200 group-hover:scale-[1.03]"
            :src="`/img/showcase/${imageSrc}`"
            :alt="imageAlt"
            loading="lazy"
            width="240"
            height="300"
            @error="onMediaError"
          />
        </template>
        <template v-else>
          <img
            class="w-full h-full object-contain"
            src="/img/showcase/placeholder.svg"
            alt="Showcase media placeholder"
            loading="lazy"
            width="240"
            height="300"
          />
        </template>
      </div>
    </div>
    <div class="px-3 py-2 flex-1 flex flex-col gap-2">
      <div class="flex flex-wrap items-start gap-2 justify-between">
        <h3 class="m-0 p-0 text-[17px] font-semibold text-[var(--color-dark)]">
          {{ title }}
        </h3>
        <div
          v-if="result"
          class="px-2 py-1 rounded-full text-[11px] font-semibold bg-[var(--color-primary)] text-white border border-[var(--color-primary)] shadow-[2px_2px_0px_0px_rgba(0,0,0,0.12)]"
        >
          {{ result }}
        </div>
      </div>
      <p
        v-if="meta"
        class="m-0 text-[12px] uppercase tracking-[0.18em] text-gray-600"
      >
        {{ meta }}
      </p>
      <p class="m-0 p-0 text-[14px] text-[var(--color-text)] desc">
        {{ description }}
      </p>
    </div>
    <div
      v-if="links?.length"
      class="px-3 pb-2 flex flex-wrap items-center gap-2 border-b border-[var(--color-border)]/10"
    >
      <NuxtLink
        v-for="(link, index) in links"
        :key="`link-${index}`"
        :to="link.url"
        target="_blank"
        :prefetch="false"
        :aria-label="`${title} ${link.type} link`"
        class="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)]/20 px-2 py-1 text-xs font-semibold text-[var(--color-dark)] hover:text-[var(--color-primary)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-light)]"
      >
        <span
          class="icon"
          :class="getIconClass(link.type)"
          aria-hidden="true"
        ></span>
        {{
          link.type === "design"
            ? "Design"
            : link.type === "github"
              ? "GitHub"
              : "Live"
        }}
      </NuxtLink>
    </div>
    <div
      class="flex flex-wrap gap-2 px-3 py-2 text-[12px] text-[var(--color-text)]"
    >
      <p
        v-for="(tag, index) in visibleTags"
        :key="`tag-${index}`"
        class="m-0 px-1.5 py-[1px] rounded-full bg-[var(--color-light)] border border-[var(--color-border)]/10"
      >
        #{{ tag }}
      </p>
      <p
        v-if="hiddenTagCount > 0"
        class="m-0 px-1.5 py-[1px] rounded-full bg-[var(--color-light)] border border-[var(--color-border)]/10"
      >
        +{{ hiddenTagCount }}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import { useMediaQuery } from "@vueuse/core";

export interface Link {
  type: string;
  url: string;
}

const props = defineProps({
  imageSrc: {
    type: String,
    required: true,
  },
  imageAlt: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  meta: {
    type: String,
    required: false,
    default: "",
  },
  result: {
    type: String,
    required: false,
    default: "",
  },
  tags: {
    type: Array as () => string[],
    required: true,
  },
  links: {
    type: Array as PropType<Link[]>,
    required: true,
  },
});

const hexCode = ref("");
const mediaError = ref(false);
// const rgbaColor = computed(() => hexToRgba(hexCode.value));

const getIconClass = (type: string): string | null => {
  return type === "github"
    ? "i-logos-github-icon"
    : type === "design"
      ? "i-logos-figma"
      : `i-tabler:external-link`;
};

const updateHexCode = () => {
  const imgEl = document.getElementById("image") as HTMLImageElement;

  if (imgEl) {
    imgEl.onload = () => {
      const rgb = getAverageRGB(imgEl);
      hexCode.value = rgbToHex(rgb);
    };
  }
};

const isVideo = computed(() => {
  return /\.(mp4|webm|ogg)$/i.test(props.imageSrc);
});

const isSmallScreen = import.meta.client
  ? useMediaQuery("(max-width: 639px)")
  : ref(false);
const visibleTags = computed(() =>
  props.tags.slice(0, isSmallScreen.value ? 2 : 3),
);
const hiddenTagCount = computed(() =>
  Math.max(0, props.tags.length - visibleTags.value.length),
);

const onMediaError = () => {
  mediaError.value = true;
};

onMounted(() => {
  updateHexCode();
});

watch(
  () => props.imageSrc,
  () => {
    updateHexCode();
  },
);
</script>

<style scoped>
.desc {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.icon {
  color: var(--color-dark);
  transition: color 0.15s ease;
}

.icon:hover {
  color: var(--color-primary);
}
</style>
