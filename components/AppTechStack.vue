<script setup lang="ts">
import { useAnimate, useInView } from "motion-v";
// Composables
const prefersReducedMotion = useMotionPreference();
const [scope, animate] = useAnimate();
const scopeEl = computed<HTMLElement | null>(
  () => (scope.value as HTMLElement | null) ?? null,
);
const sectionInView = useInView(scopeEl);
const dayjs = useDayjs();

// Tech stack data - organized by category
const techCategories = [
  {
    name: "Frontend",
    items: [
      { iconSrc: "i-logos-nuxt-icon", iconTitle: "Nuxt.js", lastUsed: "2026-01-24" },
      { iconSrc: "i-logos-nextjs-icon", iconTitle: "Next.js", lastUsed: "2026-01-24" },
      { iconSrc: "i-logos-vue", iconTitle: "Vue.js", lastUsed: "2026-01-24" },
      { iconSrc: "i-vscode-icons:file-type-vite", iconTitle: "Vite", lastUsed: "2026-01-24" },
      { iconSrc: "i-logos-tailwindcss-icon", iconTitle: "Tailwind", lastUsed: "2026-01-24" },
      { iconSrc: "i-logos-typescript-icon", iconTitle: "TypeScript", lastUsed: "2026-01-24" },
      { iconSrc: "i-logos-javascript", iconTitle: "JavaScript", lastUsed: "2026-01-24" },
      { iconSrc: "i-logos-sass", iconTitle: "Sass", lastUsed: "2024-06-09" },
      { iconSrc: "i-logos-bulma", iconTitle: "Bulma", lastUsed: "2024-04-31" },
    ],
  },
  {
    name: "Backend",
    items: [
      { iconSrc: "i-logos-nestjs", iconTitle: "NestJS", lastUsed: "2024-04-31" },
      { iconSrc: "i-logos-django-icon", iconTitle: "Django", lastUsed: "2020-11-30" },
      { iconSrc: "i-logos-phoenix", iconTitle: "Phoenix", lastUsed: "2021-06-30" },
      { iconSrc: "i-vscode-icons:file-type-elixir", iconTitle: "Elixir", lastUsed: "2021-06-30" },
    ],
  },
  {
    name: "Database & Cache",
    items: [
      { iconSrc: "i-logos-redis", iconTitle: "Redis", lastUsed: "2025-11-01" },
      { iconSrc: "i-logos-postman-icon", iconTitle: "Postman", lastUsed: "2025-11-01" },
    ],
  },
  {
    name: "DevOps & Cloud",
    items: [
      { iconSrc: "i-logos-docker-icon", iconTitle: "Docker", lastUsed: "2026-01-24" },
      { iconSrc: "i-logos-aws", iconTitle: "AWS", lastUsed: "2026-01-24" },
      { iconSrc: "i-logos-google-cloud", iconTitle: "GCP", lastUsed: "2025-12-01" },
      { iconSrc: "i-logos-digitalocean", iconTitle: "DigitalOcean", lastUsed: "2026-01-24" },
      { iconSrc: "i-logos-cloudflare-icon", iconTitle: "Cloudflare", lastUsed: "2026-01-24" },
      { iconSrc: "i-logos-coolify", iconTitle: "Coolify", lastUsed: "2026-01-24" },
      { iconSrc: "i-logos-git-icon", iconTitle: "Git", lastUsed: "2026-01-24" },
    ],
  },
  {
    name: "Mobile & Tools",
    items: [
      { iconSrc: "i-logos-flutter", iconTitle: "Flutter", lastUsed: "2025-12-31" },
      { iconSrc: "i-logos-figma", iconTitle: "Figma", lastUsed: "2026-01-24" },
      { iconSrc: "i-logos-jira", iconTitle: "Jira", lastUsed: "2025-11-01" },
      { iconSrc: "i-logos-atlassian", iconTitle: "Atlassian", lastUsed: "2025-11-01" },
      { iconSrc: "i-logos-google-analytics", iconTitle: "Analytics", lastUsed: "2026-01-24" },
      { iconSrc: "i-logos-kibana", iconTitle: "Kibana", lastUsed: "2024-04-31" },
    ],
  },
];

// Flatten for animation
const _allTechs = computed(() =>
  techCategories.flatMap((cat) =>
    cat.items.map((item) => ({
      ...item,
      category: cat.name,
      lastUsedLabel: dayjs().to(dayjs(item.lastUsed)),
    })),
  ),
);

// Animation
const gridAnimated = ref(false);

const animateGrid = () => {
  if (prefersReducedMotion.value === "reduce") return;

  if (gridAnimated.value) return;
  const items = scope.value?.querySelectorAll<HTMLElement>(".tech-card");
  if (!items) return;

  items.forEach((item, index) => {
    void animate(
      item,
      { opacity: [0, 1], y: [16, 0], scale: [0.95, 1] } as Parameters<
        typeof animate
      >[1],
      {
        duration: 0.35,
        delay: (index % 8) * 0.03,
        ease: [0.22, 1, 0.36, 1],
      } as Parameters<typeof animate>[2],
    );
  });
  gridAnimated.value = true;
};

onMounted(() => {
  if (sectionInView.value) {
    nextTick(animateGrid);
  }
});

watch(sectionInView, (inView) => {
  if (inView) {
    nextTick(animateGrid);
  }
});
</script>

<template>
  <section
    id="tech_stack"
    ref="scope"
    class="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-6xl mx-auto">
      <!-- Section Header -->
      <div class="mb-10 sm:mb-12">
        <div class="flex items-center gap-3 mb-3">
          <span
            class="i-tabler:stack text-xl sm:text-2xl text-[var(--color-primary)]"
            aria-hidden="true"
          />
          <span class="text-xs sm:text-sm uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
            Toolkit
          </span>
        </div>
        <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--color-dark)] mb-3">
          Tech Stack
        </h2>
        <p class="text-base sm:text-lg text-[var(--color-text)] max-w-2xl">
          The frameworks, platforms, and tools I use most often to ship fast and
          build scalable products.
        </p>
      </div>

      <!-- Tech Grid by Category -->
      <div class="space-y-8 sm:space-y-10">
        <div
          v-for="category in techCategories"
          :key="category.name"
          class="space-y-4"
        >
          <!-- Category Label -->
          <h3
            class="text-sm sm:text-base font-semibold text-[var(--color-text-muted)] uppercase tracking-wider"
          >
            {{ category.name }}
          </h3>

          <!-- Tech Cards Grid -->
          <div
            class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4"
          >
            <div
              v-for="tech in category.items"
              :key="`${category.name}-${tech.iconTitle}`"
              class="tech-card group flex flex-col items-center justify-center text-center p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 border-[var(--color-border)] bg-[var(--color-card)] shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-mid)] hover:-translate-y-1 transition-all duration-300"
            >
              <div
                :class="tech.iconSrc"
                class="text-3xl sm:text-4xl lg:text-5xl mb-2 sm:mb-3 grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:scale-110"
                aria-hidden="true"
              />
              <p
                class="font-semibold text-[var(--color-dark)] capitalize text-sm sm:text-base group-hover:text-[var(--color-primary)] transition-colors duration-200"
              >
                {{ tech.iconTitle }}
              </p>
              <p class="text-[10px] sm:text-xs text-[var(--color-text-muted)] mt-0.5">
                {{ dayjs().to(dayjs(tech.lastUsed)) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
