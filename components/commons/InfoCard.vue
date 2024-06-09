<template>
  <section
    border="4px solid #333333"
    bg="#f2f2f2"
    class="rounded max-w-[280px] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)]"
  >
    <div
      class="flex"
      :style="{
        background: `linear-gradient(177deg, ${rgbaColor} 0%, rgba(242,242,242,1) 100%)`,
      }"
    >
      <nuxt-img
        id="image"
        class="rounded-[1.5rem] m-auto px-4 py-5"
        :src="`/img/showcase/` + imageSrc"
        loading="lazy"
        m="y-auto"
        w="196.8px"
        h="161.8px"
        :alt="imageAlt"
      />
    </div>
    <div p="x-2 y-1">
      <h3 m="0" p="0" font="medium">{{ title }}</h3>
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
defineProps({
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
});

const hexCode = ref("");
const rgbaColor = computed(() => hexToRgba(hexCode.value));

onMounted(() => {
  const imgEl = document.getElementById("image") as HTMLImageElement;

  if (imgEl) {
    imgEl.onload = () => {
      const rgb = getAverageRGB(imgEl);
      hexCode.value = rgbToHex(rgb);
    };
  }
});
</script>

<style scoped></style>
