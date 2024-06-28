<template>
  <section
    border="4px solid #333333"
    bg="#f2f2f2"
    class="rounded max-w-[280px] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)] mx-auto"
  >
    <div class="flex justify-center">
      <nuxt-img
        id="image"
        class="rounded-[1.5rem] px-4 py-5 max-w-[85%]"
        :src="`/img/showcase/` + imageSrc"
        h="161.8px"
        :alt="imageAlt"
        format="webp"
      />
    </div>
    <div p="x-2 y-1" class="h-[120px]">
      <div class="flex">
        <h3 m="0" p="0" font="medium">{{ title }}</h3>
        <NuxtLink
          v-for="(link, index) in links"
          :key="`link-${index}`"
          :to="link.url"
          target="_blank"
        >
          <div class="icon" :class="getIconClass(link.type)" />
        </NuxtLink>
      </div>
      <p m="0" p="0" text="14px">
        {{ description }}
      </p>
    </div>
    <div class="flex" p="x-2 y-1" text="14px" space="x-1">
      <p v-for="(tag, index) in tags" :key="`tag-${index}`" m="0" p="0">
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

<style scoped></style>
