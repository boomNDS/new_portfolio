<script setup lang="ts">
// Composables
const { y } = useWindowScroll();
const prefersReducedMotion = useMotionPreference();

// State
const isVisible = computed(() => y.value > 300);
const isAnimating = ref(false);

// Methods
const scrollToTop = () => {
  isAnimating.value = true;
  window.scrollTo({
    top: 0,
    behavior: prefersReducedMotion.value === "reduce" ? "auto" : "smooth",
  });
  setTimeout(() => {
    isAnimating.value = false;
  }, 500);
};
</script>

<template>
  <div class="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50">
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-4 scale-75"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-4 scale-75"
    >
      <button
        v-show="isVisible"
        type="button"
        class="group flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[var(--color-card)] border-2 border-[var(--color-border)] text-[var(--color-dark)] shadow-[var(--shadow-mid)] hover:shadow-[var(--shadow-strong)] hover:-translate-y-1 hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2"
        :class="{ 'animate-bounce': isAnimating }"
        aria-label="Scroll to top"
        @click="scrollToTop"
      >
        <span
          class="i-tabler:arrow-up text-xl sm:text-2xl transition-transform duration-300 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      </button>
    </Transition>
  </div>
</template>

<style scoped>
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}

.animate-bounce {
  animation: bounce 0.5s ease-in-out;
}
</style>
