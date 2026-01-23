<template>
  <div class="fixed bottom-6 right-6 z-50">
    <Transition name="fade-slide">
      <button
        v-if="isVisible"
        type="button"
        class="cursor-pointer rounded-full border-2 border-[var(--color-border)] bg-white shadow-[6px_6px_0px_rgba(0,0,0,0.18)] p-3 flex items-center justify-center gap-2 hover:-translate-y-[2px] transition-transform duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
        aria-label="Scroll to top"
        @click="scrollToTop"
      >
        <span
          class="i-tabler:arrow-up text-xl text-[var(--color-dark)]"
          aria-hidden="true"
        ></span>
      </button>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useWindowScroll } from "@vueuse/core";

const { y } = import.meta.client ? useWindowScroll() : { y: ref(0) };
const isVisible = computed(() => y.value > 320);

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.95);
}
</style>
