<script setup lang="ts">
import { useAnimate, useInView } from "motion-v";
import showcaseData from "~/public/showcase.json";

// Composables
const prefersReducedMotion = useMotionPreference();
const [scope, animate] = useAnimate();
const scopeEl = computed<HTMLElement | null>(() => (scope.value as HTMLElement | null) ?? null);
const sectionInView = useInView(scopeEl);

const totalProjects = computed(() => showcaseData.length);
const liveDemos = computed(() =>
  showcaseData.reduce((count, item) => {
    const links = item.links ?? [];
    return count + links.filter((l) => l.url && l.type !== "design").length;
  }, 0),
);

// Animated counter values
const animatedProjects = ref(0);
const animatedDemos = ref(0);

// Counter animation function
const animateCounter = (target: number, output: Ref<number>, duration = 1200) => {
  const startTime = performance.now();

  const updateCounter = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeOut = 1 - (1 - progress) ** 3;
    output.value = Math.floor(target * easeOut);

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    }
  };

  requestAnimationFrame(updateCounter);
};

// Hero entrance animation - faster stagger
const animateHero = () => {
  if (prefersReducedMotion.value === "reduce") return;

  const elements = scope.value?.querySelectorAll<HTMLElement>("[data-animate]");
  if (!elements) return;

  // Animate all elements with stagger (parallel, not sequential)
  elements.forEach((el, index) => {
    animate(
      el,
      { opacity: [0, 1], y: [15, 0] },
      { duration: 0.35, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] },
    );
  });

  // Start counter animations earlier (after 0.4s)
  setTimeout(() => {
    animateCounter(totalProjects.value, animatedProjects);
    animateCounter(liveDemos.value, animatedDemos);
  }, 400);
};

onMounted(() => {
  if (sectionInView.value) {
    nextTick(animateHero);
  }
});

watch(sectionInView, (inView) => {
  if (inView) {
    nextTick(animateHero);
  }
});
</script>

<template>
  <section
    ref="scope"
    class="min-h-[85vh] flex items-center pt-16 sm:pt-20 pb-16 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-5xl mx-auto w-full text-center">
      <!-- Location Tag -->
      <div data-animate class="mb-6 opacity-0 translate-y-4">
        <span class="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
          <span class="w-2 h-2 rounded-full bg-green-500" />
          Bangkok / Remote
        </span>
      </div>

      <!-- Main Heading -->
      <h1
        data-animate
        class="text-5xl sm:text-6xl lg:text-7xl font-bold text-[var(--color-dark)] leading-[1.1] tracking-tight mb-4 opacity-0 translate-y-4"
      >
        Hello there,<br />
        I'm <span class="text-[var(--color-primary)]">Boom</span> <span class="text-4xl sm:text-5xl">👋</span>
      </h1>

      <!-- Role Tagline -->
      <p data-animate class="text-lg sm:text-xl text-[var(--color-text)] mb-6 opacity-0 translate-y-4">
        A <span class="font-semibold text-[var(--color-dark)]">full-stack developer</span> crafting web & mobile experiences
      </p>

      <!-- Description -->
      <p
        data-animate
        class="text-base text-[var(--color-text)] leading-relaxed max-w-xl mx-auto mb-8 opacity-0 translate-y-4"
      >
        Building Vue/React frontends and Node.js/Python APIs with cloud deployments. 
        Specialized in payments, IoT connectivity, and cross-platform mobile apps with Flutter.
      </p>

      <!-- CTAs -->
      <div data-animate class="flex flex-wrap justify-center gap-4 mb-10 opacity-0 translate-y-4">
        <NuxtLink
          to="mailto:contact@pachorn.dev"
          class="inline-flex items-center gap-2 px-6 py-3 rounded-xl sm:rounded-2xl border-2 sm:border-4 border-[var(--color-border)] bg-[var(--color-primary)] text-white font-semibold shadow-[var(--shadow-mid)] hover:shadow-[var(--shadow-strong)] hover:-translate-y-0.5 transition-all"
        >
          <span class="i-tabler:message-circle text-lg" />
          Let's talk
        </NuxtLink>
        <NuxtLink
          to="https://cal.com/pachara-sri/30min"
          target="_blank"
          class="inline-flex items-center gap-2 px-6 py-3 rounded-xl sm:rounded-2xl border-2 sm:border-4 border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-dark)] font-semibold shadow-[var(--shadow-mid)] hover:shadow-[var(--shadow-strong)] hover:-translate-y-0.5 transition-all"
        >
          <span class="i-tabler:calendar-event text-lg" />
          Book a call
        </NuxtLink>
      </div>

      <!-- Tech Stack -->
      <div data-animate class="mb-10 opacity-0 translate-y-4">
        <p class="text-xs uppercase tracking-wider text-[var(--color-text-muted)] mb-3">Tech Stack</p>
        <div class="flex flex-wrap justify-center gap-2">
          <span class="px-3 py-1.5 rounded-lg bg-[var(--color-light)] text-sm font-medium text-[var(--color-dark)]">Vue.js</span>
          <span class="px-3 py-1.5 rounded-lg bg-[var(--color-light)] text-sm font-medium text-[var(--color-dark)]">React</span>
          <span class="px-3 py-1.5 rounded-lg bg-[var(--color-light)] text-sm font-medium text-[var(--color-dark)]">Node.js</span>
          <span class="px-3 py-1.5 rounded-lg bg-[var(--color-light)] text-sm font-medium text-[var(--color-dark)]">Python</span>
          <span class="px-3 py-1.5 rounded-lg bg-[var(--color-light)] text-sm font-medium text-[var(--color-dark)]">Flutter</span>
          <span class="px-3 py-1.5 rounded-lg bg-[var(--color-light)] text-sm font-medium text-[var(--color-dark)]">AWS/GCP</span>
        </div>
      </div>

      <!-- Stats with Counter Animation -->
      <div data-animate class="flex justify-center gap-10 opacity-0 translate-y-4">
        <div class="flex items-baseline gap-1">
          <span class="text-4xl font-bold text-[var(--color-dark)]">{{ animatedProjects }}</span>
          <span class="text-lg text-[var(--color-primary)] font-semibold">+</span>
          <span class="text-sm text-[var(--color-text-muted)] ml-1">Projects</span>
        </div>
        <div class="flex items-baseline gap-1">
          <span class="text-4xl font-bold text-[var(--color-dark)]">{{ animatedDemos }}</span>
          <span class="text-lg text-[var(--color-primary)] font-semibold">+</span>
          <span class="text-sm text-[var(--color-text-muted)] ml-1">Live Demos</span>
        </div>
      </div>
    </div>
  </section>
</template>
