<script setup lang="ts">
import { useAnimate, useInView } from "motion-v";
import showcaseData from "~/public/showcase.json";

// Composables
const prefersReducedMotion = useMotionPreference();
const [scope, animate] = useAnimate();
const scopeEl = computed<HTMLElement | null>(() => (scope.value as HTMLElement | null) ?? null);
const sectionInView = useInView(scopeEl);
const sectionAnimated = ref(false);
const { y } = useWindowScroll();
const gridTranslate = computed(() => `translateY(${Math.round(y.value * 0.05)}px)`);
const waveRef = ref<HTMLElement | null>(null);

const nameTarget = "Boom";
const nameTyped = ref("");

const roleItems = ["full-stack developer", "foodie", "gym bro", "shipping enjoyer", "city bites"];
const roleTyped = ref(roleItems[0] ?? "full-stack developer");
const roleIndex = ref(0);

const typeText = async (target: string, output: typeof nameTyped, speed = 70, start = 0) => {
  for (let i = start; i <= target.length; i += 1) {
    output.value = target.slice(0, i);
    await new Promise((resolve) => setTimeout(resolve, speed));
  }
};

const deleteText = async (output: typeof nameTyped, speed = 40, minLength = 0) => {
  for (let i = output.value.length; i >= minLength; i -= 1) {
    output.value = output.value.slice(0, i);
    await new Promise((resolve) => setTimeout(resolve, speed));
  }
};

const defaultRole = "full-stack developer";

const loopRoleTyping = async () => {
  while (true) {
    const current = roleItems[roleIndex.value % roleItems.length] ?? defaultRole;
    await typeText(current, roleTyped, 60, roleTyped.value.length);
    await new Promise((resolve) => setTimeout(resolve, 900));
    const nextIndex = (roleIndex.value + 1) % roleItems.length;
    const nextRaw = roleItems[nextIndex];
    const next = nextRaw !== undefined ? nextRaw : defaultRole;
    await deleteText(roleTyped, 35, 1);
    roleTyped.value = next.slice(0, 1);
    await typeText(next, roleTyped, 60, 1);
    roleIndex.value = nextIndex;
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
};

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
    type: "impact",
    title: "Product Impact",
    subtitle: "Shipped end-to-end features across web, backend, and infra.",
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
      {
        opacity: [0, 1],
        transform: ["translateY(20px)", "translateY(0px)"],
      } as Parameters<typeof animate>[1],
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
      {
        opacity: [0, 1],
        transform: ["translateY(16px)", "translateY(0px)"],
      } as Parameters<typeof animate>[1],
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
      {
        opacity: [0, 1],
        transform: ["translateY(20px)", "translateY(0px)"],
      } as Parameters<typeof animate>[1],
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

  if (prefersReducedMotion.value === "reduce") return;
  const waveEl = waveRef.value;
  if (waveEl) {
    animate(
      waveEl,
      { rotate: [0, 14, -6, 12, -4, 8, 0] } as Parameters<typeof animate>[1],
      {
        duration: 2.4,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 0.6,
      } as Parameters<typeof animate>[2],
    );
  }

  void typeText(nameTarget, nameTyped, 80);
  void loopRoleTyping();
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
    <div class="intro-bg" aria-hidden="true">
      <div class="intro-orb intro-orb--a" />
      <div class="intro-orb intro-orb--b" />
      <div class="intro-grid" :style="{ transform: gridTranslate }" />
      <div class="intro-scan" />
    </div>

    <div class="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
      <!-- Left Column - Main Content -->
      <div data-motion="intro-content" class="space-y-6 sm:space-y-8">
        <!-- Badge -->
        <div
          class="intro-freelance-badge inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium"
        >
          <span class="i-tabler:code text-base" aria-hidden="true" />
          <span>Available for freelance & collaborations</span>
        </div>

        <!-- Heading -->
        <div class="space-y-3 sm:space-y-4">
          <p class="text-xs uppercase tracking-[0.3em] text-[var(--color-text-muted)]">
            Signal acquired · Bangkok / Remote
          </p>
          <h1 class="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-[var(--color-dark)] leading-[1.15] tracking-tight">
            Hello there,
            <br />
            I'm
            <span class="typing text-[var(--color-primary)]">{{ nameTyped }}</span>
            <span
              ref="waveRef"
              class="inline-flex items-center gap-2 ml-2 text-2xl sm:text-3xl lg:text-4xl"
              style="transform-origin: 70% 70%"
              >👋</span
            >
          </h1>
          <p class="text-lg sm:text-xl lg:text-2xl text-[var(--color-text-muted)]">
            A
            <span class="typing intro-role-pill inline-flex items-center px-3 py-1 rounded-full text-base sm:text-lg font-semibold shadow-[var(--shadow-sm)]">
              {{ roleTyped }}
            </span>
            from Bangkok
          </p>
        </div>

        <!-- Description -->
        <p class="text-base sm:text-lg text-[var(--color-text)] leading-relaxed max-w-xl">
          Full-stack developer building Vue/React (Nuxt/Next) frontends and Node.js/Python
          APIs with cloud deployments. Focused on payments, IoT connectivity, and
          mobile apps with Flutter.
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-wrap gap-3 sm:gap-4">
          <NuxtLink
            to="mailto:contact@pachorn.dev?Subject=Hello%20Boom"
            class="cursor-pointer group inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-[var(--color-primary)] text-white font-semibold text-sm sm:text-base shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-mid)] hover:-translate-y-0.5 transition-all duration-200"
          >
            Let's talk
            <span class="i-tabler:message-circle text-lg group-hover:scale-110 transition-transform" aria-hidden="true" />
          </NuxtLink>
          <NuxtLink
            to="https://cal.com/pachara-sri/30min"
            target="_blank"
            rel="noopener noreferrer"
            class="cursor-pointer group inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-[var(--color-card)] border-2 border-[var(--color-border)] text-[var(--color-dark)] font-semibold text-sm sm:text-base shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-soft)] hover:-translate-y-0.5 transition-all duration-200"
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
              <p class="text-sm text-[var(--color-text)]">Flutter · AWS · Wearables</p>
              <p class="text-xs text-[var(--color-text-muted)] mt-1">{{ featuredCurrent.period }}</p>
            </div>
            <span class="i-tabler:sparkles text-2xl sm:text-3xl text-[var(--color-primary)]" aria-hidden="true" />
          </div>
        </div>

        <!-- Recent Work Card (primary-tinted dark, high-contrast text) -->
        <div class="intro-card intro-card-recent group rounded-2xl border-2 sm:border-4 border-[var(--color-border)] shadow-[var(--shadow-mid)] p-4 sm:p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-strong)]">
          <div class="flex items-center gap-2 mb-3">
            <span class="intro-card-recent-icon i-tabler:rocket text-lg" aria-hidden="true" />
            <span class="intro-card-recent-label text-xs uppercase tracking-wider">Recent Work</span>
          </div>
          <h3 class="intro-card-recent-title text-lg sm:text-xl font-semibold mb-2">{{ featuredRecent.title }}</h3>
          <p class="intro-card-recent-desc text-sm mb-4">Next.js · FastAPI · GCP</p>
          <NuxtLink
            :to="featuredRecent.link"
            class="intro-card-recent-link cursor-pointer inline-flex items-center gap-1.5 text-sm font-semibold transition-colors"
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
              <p class="text-sm text-[var(--color-text)]">End-to-end delivery across web, backend, and infra.</p>
            </div>
            <span class="i-tabler:credit-card text-2xl sm:text-3xl text-[var(--color-primary)]" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Freelance badge: readable in light and dark mode */
.intro-freelance-badge {
  background: rgba(125, 38, 205, 0.1);
  border: 1px solid rgba(125, 38, 205, 0.2);
  color: #6d28d9;
}

[data-theme="dark"] .intro-freelance-badge {
  background: rgba(180, 136, 255, 0.28);
  border-color: rgba(180, 136, 255, 0.45);
  color: #c4b5fd;
}

/* Role pill: dark bg + white text; in dark mode slightly elevated so it stands out */
.intro-role-pill {
  background: #111111;
  color: #ffffff;
}

[data-theme="dark"] .intro-role-pill {
  background: #1e293b;
  border: 1px solid rgba(148, 163, 184, 0.2);
  color: #f1f5f9;
}

/* Recent Work card: soft purple tint bg, dark text */
.intro-card-recent {
  background: linear-gradient(145deg, #f5f3ff 0%, #ede9fe 50%, #e9d5ff 100%);
  color: #1f2937;
}

.intro-card-recent-icon {
  color: #7c3aed;
}

.intro-card-recent-label {
  color: #5b21b6;
}

.intro-card-recent-title {
  color: #1f2937;
}

.intro-card-recent-desc {
  color: #4b5563;
}

.intro-card-recent-link {
  color: #6d28d9;
}

.intro-card-recent-link:hover {
  color: #5b21b6;
}

[data-theme="dark"] .intro-card-recent {
  background: linear-gradient(145deg, #2e1065 0%, #3b0764 50%, #4c1d95 100%);
  border-color: rgba(167, 139, 250, 0.35);
  color: #f3f4f6;
}

[data-theme="dark"] .intro-card-recent-icon {
  color: #c4b5fd;
}

[data-theme="dark"] .intro-card-recent-label {
  color: rgba(243, 244, 246, 0.85);
}

[data-theme="dark"] .intro-card-recent-title {
  color: #ffffff;
}

[data-theme="dark"] .intro-card-recent-desc {
  color: rgba(243, 244, 246, 0.9);
}

[data-theme="dark"] .intro-card-recent-link {
  color: #f5c243;
}

[data-theme="dark"] .intro-card-recent-link:hover {
  color: #fde047;
}

.intro-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.intro-orb {
  position: absolute;
  border-radius: 999px;
  filter: blur(48px);
}

.intro-orb--a {
  width: 420px;
  height: 420px;
  right: -120px;
  top: -120px;
  background: radial-gradient(circle, rgba(125, 38, 205, 0.12), transparent 70%);
}

.intro-orb--b {
  width: 360px;
  height: 360px;
  left: -120px;
  bottom: -120px;
  background: radial-gradient(circle, rgba(125, 38, 205, 0.1), transparent 70%);
}

.intro-grid {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(rgba(125, 38, 205, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(125, 38, 205, 0.08) 1px, transparent 1px);
  background-size: 80px 80px;
  opacity: 0.2;
  mask-image: radial-gradient(circle at 20% 0%, black, transparent 70%);
  transition: transform 0.1s ease-out;
}

.intro-scan {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    transparent 0%,
    rgba(125, 38, 205, 0.06) 45%,
    rgba(125, 38, 205, 0.12) 50%,
    rgba(125, 38, 205, 0.06) 55%,
    transparent 100%
  );
  animation: scan 12s linear infinite;
  opacity: 0.2;
}

.typing {
  position: relative;
}

.typing::after {
  content: "";
  display: inline-block;
  width: 0.12em;
  height: 1em;
  margin-left: 0.08em;
  background: currentColor;
  animation: blink 1s steps(2, start) infinite;
  vertical-align: -0.1em;
}

@keyframes blink {
  0%,
  100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}

@keyframes scan {
  0% {
    transform: translateY(-30%);
  }
  100% {
    transform: translateY(130%);
  }
}

@media (max-width: 640px) {
  .intro-grid {
    background-size: 60px 60px;
  }
}
</style>
