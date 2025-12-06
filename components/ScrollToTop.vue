<template>
  <div class="fixed bottom-6 right-6 z-50">
    <div
      v-if="isVisible"
      v-motion
      :initial="{ opacity: 0, y: 16, scale: 0.9 }"
      :enter="{ opacity: 1, y: 0, scale: 1 }"
      :leave="{ opacity: 0, y: 12, scale: 0.95 }"
      class="cursor-pointer rounded-full border-2 border-[#111] bg-white shadow-[6px_6px_0px_rgba(0,0,0,0.18)] p-3 flex items-center justify-center gap-2 hover:-translate-y-[2px] transition-transform duration-150"
      aria-label="Scroll to top"
      @click="scrollToTop"
    >
      <span class="i-tabler:arrow-up text-xl text-[#111]"></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useWindowScroll } from "@vueuse/core";

const { y } = useWindowScroll();
const isVisible = computed(() => y.value > 320);

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
</script>

<style scoped></style>
