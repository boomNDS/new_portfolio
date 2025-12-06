<template>
  <section
    class="rounded max-w-[280px] border-4 border-[var(--color-border)] bg-[var(--color-card)] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.18)] mx-auto mt-4 flex flex-col h-full"
  >
    <div class="flex justify-center">
      <div
        class="relative w-full max-w-[90%] aspect-[4/5] rounded-[1.5rem] overflow-hidden bg-[#0f172a]"
      >
        <template v-if="!mediaError && isVideo">
          <video
            id="video"
            class="w-full h-full object-cover"
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
            class="w-full h-full object-cover"
            :src="`/img/showcase/${imageSrc}`"
            :alt="imageAlt"
            loading="lazy"
            @error="onMediaError"
          />
        </template>
        <template v-else>
          <img
            class="w-full h-full object-cover"
            src="/img/showcase/placeholder.svg"
            alt="Showcase media placeholder"
            loading="lazy"
          />
        </template>
      </div>
    </div>
    <div class="px-2 py-1 flex-1 flex flex-col gap-2">
      <div class="flex flex-wrap items-start gap-2 justify-between">
        <h3 class="m-0 p-0 font-medium text-[var(--color-dark)]">
          {{ title }}
        </h3>
        <NuxtLink
          v-for="(link, index) in links"
          :key="`link-${index}`"
          :to="link.url"
          target="_blank"
          :prefetch="false"
        >
          <div class="icon" :class="getIconClass(link.type)"></div>
        </NuxtLink>
      </div>
      <p class="m-0 p-0 text-[14px] text-[var(--color-text)] desc">
        {{ description }}
      </p>
    </div>
    <div
      class="flex flex-wrap gap-2 px-2 py-1 text-[13px] text-[var(--color-text)]"
    >
      <p
        v-for="(tag, index) in tags"
        :key="`tag-${index}`"
        class="m-0 px-2 py-[2px] rounded-full bg-[var(--color-light)] border border-[var(--color-border)]/10"
      >
        #{{ tag }}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { PropType } from "vue";

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
  -webkit-line-clamp: 3;
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
