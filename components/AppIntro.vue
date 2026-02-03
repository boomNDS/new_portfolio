<script setup lang="ts">
import { useAnimate, useInView } from "motion-v";
import showcaseData from "~/public/showcase.json";

// Composables
const prefersReducedMotion = useMotionPreference();
const [scope, animate] = useAnimate();
const scopeEl = computed<HTMLElement | null>(
  () => (scope.value as HTMLElement | null) ?? null,
);
const sectionInView = useInView(scopeEl);
const sectionAnimated = ref(false);

// Stats
const totalProjects = computed(() => showcaseData.length);
const liveDemos = computed(() =>
  showcaseData.reduce((count, item) => {
    const links = item.links ?? [];
    const demoCount = links.filter(
      (link: { type: string; url: string }) => link.url && link.type !== "design",
    ).length;
    return count + demoCount;
  }, 0),
);

// Featured items
const featuredItems = [
  {
    type: "recent",
    title: "Buddy.ninja",
    subtitle: "Software Engineer · Flutter/AWS",
    period: "Jul 2025 - Present",
    icon: "i-tabler:sparkles",
  },
  {
    type: "project",
    title: "BualoiTech",
    subtitle: "Next.js + FastAPI + GCP",
    link: "#experience",
    icon: "i-tabler:rocket",
    isDark: true,
  },
  {
    type: "achievement",
    title: "KBank Integration",
    subtitle: "Payment APIs & automation",
    icon: "i-tabler:credit-card",
  },
] as const;

const [featuredCurrent, featuredRecent, featuredAchievement] = featuredItems;

// Animation handlers
const animateHero = () => {
  if (prefersReducedMotion.value === "reduce") return;

  const heroEl = scope.value;
  if (heroEl) {
    animate(
      heroEl,
      { opacity: [0, 1], y: [20, 0] } as Parameters<typeof animate>[1],
      { duration: 0.5, ease: [0.22, 1, 0.36, 1] } as Parameters<typeof animate>[2],
    );
  }
};

const animateContent = () => {
  if (prefersReducedMotion.value === "reduce") return;

  const contentEl = scope.value?.querySelector<HTMLElement>("[data-motion='intro-content']");
  if (contentEl) {
    void animate(
      contentEl,
      { opacity: [0, 1], y: [16, 0] } as Parameters<typeof animate>[1],
      { duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] } as Parameters<typeof animate>[2],
    );
  }
};

const animateCards = () => {
  if (prefersReducedMotion.value === "reduce") return;

  const cards = scope.value?.querySelectorAll<HTMLElement>(".intro-card");
  if (!cards) return;

  cards.forEach((card, index) => {
    void animate(
      card,
      { opacity: [0, 1], y: [20, 0] } as Parameters<typeof animate>[1],
      {
        duration: 0.4,
        delay: 0.1 + index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      } as Parameters<typeof animate>[2],
    );
  });
};

onMounted(() => {
  if (sectionInView.value) {
    nextTick(() => {
      if (sectionAnimated.value) return;
      animateHero();
      animateContent();
      animateCards();
      sectionAnimated.value = true;
    });
  }
});

watch(sectionInView, (inView) => {
  if (!inView || sectionAnimated.value) return;
  nextTick(() => {
    animateHero();
    animateContent();
    animateCards();
    sectionAnimated.value = true;
  });
});
</script>

<template>
  <section
    ref="scope"
    class="relative min-h-[90vh] pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8 xl:px-12"
  >
    <!-- Background decoration -->
    <div
      class="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <div
        class="absolute -top-20 -right-20 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-[var(--color-primary)]/5 blur-3xl"
      />
      <div
        class="absolute top-1/3 -left-20 w-64 sm:w-80 h-64 sm:h-80 rounded-full bg-[var(--color-accent)]/5 blur-3xl"
      />
    </div>

    <div
      class="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-start"
    >
      <!-- Left Column - Main Content -->
      <div data-motion="intro-content" class="space-y-6 sm:space-y-8">
        <!-- Badge -->
        <div
          class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 text-[var(--color-primary)] text-xs sm:text-sm font-medium"
        >
          <span class="i-tabler:code text-base" aria-hidden="true" />
          <span>Available for freelance & collaborations</span>
        </div>

        <!-- Heading -->
        <div class="space-y-3 sm:space-y-4">
          <h1
            class="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-[var(--color-dark)] leading-[1.15] tracking-tight"
          >
            Hello there,
            <br />
            I'm
            <span class="text-[var(--color-primary)]">Boom</span>
            <span class="inline-flex items-center gap-2 ml-2 text-2xl sm:text-3xl lg:text-4xl">👋</span>
          </h1>
          <p class="text-lg sm:text-xl lg:text-2xl text-[var(--color-text-muted)]">
            A
            <span
              class="inline-flex items-center px-3 py-1 rounded-full bg-[var(--color-dark)] text-white text-base sm:text-lg font-semibold shadow-[var(--shadow-sm)]"
            >
              full-stack developer
            </span>
            from Bangkok
          </p>
        </div>

        <!-- Description -->
        <p class="text-base sm:text-lg text-[var(--color-text)] leading-relaxed max-w-xl">
          Building Vue/React (Nuxt/Next) frontends and Node.js/Python APIs with 
          cloud deployments. Experienced in payment integrations, IoT connectivity, 
          and mobile apps with Flutter.
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-wrap gap-3 sm:gap-4">
          <NuxtLink
            to="mailto:contact@pachorn.dev?Subject=Hello%20Boom"
            class="group inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-[var(--color-primary)] text-white font-semibold text-sm sm:text-base shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-mid)] hover:-translate-y-0.5 transition-all duration-200"
          >
            Let's talk
            <span class="i-tabler:message-circle text-lg group-hover:scale-110 transition-transform" aria-hidden="true" />
          </NuxtLink>
          <NuxtLink
            to="https://cal.com/pachara-sri/30min"
            target="_blank"
            rel="noopener noreferrer"
            class="group inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-[var(--color-card)] border-2 border-[var(--color-border)] text-[var(--color-dark)] font-semibold text-sm sm:text-base shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-soft)] hover:-translate-y-0.5 transition-all duration-200"
          >
            <span class="i-tabler:calendar-event text-lg" aria-hidden="true" />
            30-min call
          </NuxtLink>
        </div>

        <!-- Tech Tags -->
        <div class="flex flex-wrap gap-2">
          <span
            v-for="tag in ['Nuxt/Next.js', 'FastAPI/Nest.js', 'AWS/GCP/DigitalOcean', 'Flutter']"
            :key="tag"
            class="px-3 py-1.5 rounded-lg bg-[var(--color-card)] border border-[var(--color-border)]/10 text-[var(--color-text)] text-xs sm:text-sm font-medium shadow-[var(--shadow-sm)]"
          >
            {{ tag }}
          </span>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-2 gap-3 sm:gap-4 max-w-xs">
          <div class="rounded-xl border-2 border-[var(--color-border)] bg-[var(--color-card)] p-3 sm:p-4 shadow-[var(--shadow-soft)]">
            <p class="text-xs uppercase tracking-wider text-[var(--color-text-muted)]">Projects</p>
            <p class="text-2xl sm:text-3xl font-bold text-[var(--color-dark)]">{{ totalProjects }}+</p>
          </div>
          <div class="rounded-xl border-2 border-[var(--color-border)] bg-[var(--color-card)] p-3 sm:p-4 shadow-[var(--shadow-soft)]">
            <p class="text-xs uppercase tracking-wider text-[var(--color-text-muted)]">Live Demos</p>
            <p class="text-2xl sm:text-3xl font-bold text-[var(--color-dark)]">{{ liveDemos }}+</p>
          </div>
        </div>
      </div>

      <!-- Right Column - Featured Cards -->
      <div class="space-y-4 lg:space-y-5">
        <!-- Current Role Card -->
        <div class="intro-card group rounded-2xl border-2 sm:border-4 border-[var(--color-border)] bg-[var(--color-card)] shadow-[var(--shadow-mid)] p-4 sm:p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-strong)]">
          <div class="flex items-start justify-between">
            <div>
              <div class="flex items-center gap-2 mb-2">
                <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse" aria-hidden="true" />
                <span class="text-xs uppercase tracking-wider text-[var(--color-text-muted)]">Current Role</span>
              </div>
              <h3 class="text-lg sm:text-xl font-semibold text-[var(--color-dark)]">{{ featuredCurrent.title }}</h3>
              <p class="text-sm text-[var(--color-text)]">{{ featuredCurrent.subtitle }}</p>
              <p class="text-xs text-[var(--color-text-muted)] mt-1">{{ featuredCurrent.period }}</p>
            </div>
            <span class="i-tabler:sparkles text-2xl sm:text-3xl text-[var(--color-primary)]" aria-hidden="true" />
          </div>
        </div>

        <!-- Recent Work Card -->
        <div class="intro-card group rounded-2xl border-2 sm:border-4 border-[var(--color-border)] bg-[var(--color-dark)] text-[var(--color-light)] shadow-[var(--shadow-mid)] p-4 sm:p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-strong)]">
          <div class="flex items-center gap-2 mb-3">
            <span class="i-tabler:rocket text-lg text-[var(--color-primary)]" aria-hidden="true" />
            <span class="text-xs uppercase tracking-wider text-[var(--color-light)]/70">Recent Work</span>
          </div>
          <h3 class="text-lg sm:text-xl font-semibold mb-2">{{ featuredRecent.title }}</h3>
          <p class="text-sm text-[var(--color-light)]/80 mb-4">{{ featuredRecent.subtitle }}</p>
          <NuxtLink
            :to="featuredRecent.link"
            class="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-colors"
          >
            View details
            <span class="i-tabler:arrow-up-right group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
          </NuxtLink>
        </div>

        <!-- Achievement Card -->
        <div class="intro-card group rounded-2xl border-2 sm:border-4 border-[var(--color-border)] bg-[var(--color-card)] shadow-[var(--shadow-mid)] p-4 sm:p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-strong)]">
          <div class="flex items-start justify-between">
            <div>
              <span class="text-xs uppercase tracking-wider text-[var(--color-text-muted)]">Key Achievement</span>
              <h3 class="text-lg sm:text-xl font-semibold text-[var(--color-dark)] mt-1">{{ featuredAchievement.title }}</h3>
              <p class="text-sm text-[var(--color-text)]">{{ featuredAchievement.subtitle }}</p>
            </div>
            <span class="i-tabler:credit-card text-2xl sm:text-3xl text-[var(--color-primary)]" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
