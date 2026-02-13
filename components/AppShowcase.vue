<script setup lang="ts">
import { useAnimate, useInView } from "motion-v";
import showcaseJson from "~/public/showcase.json";
import type { Project, ProjectCategory } from "~/types";

const showcaseData = showcaseJson as Project[];

// Composables
const prefersReducedMotion = useMotionPreference();
const [scope, animate] = useAnimate();
const scopeEl = computed<HTMLElement | null>(() => (scope.value as HTMLElement | null) ?? null);
const gridInView = useInView(scopeEl);
const route = useRoute();
const router = useRouter();

// Constants
const CATEGORIES: { value: ProjectCategory; label: string }[] = [
  { value: "all", label: "All Projects" },
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
  { value: "design", label: "Design" },
  { value: "other", label: "Other" },
];
const PAGE_SIZE = 6;

// State
const selected = ref<ProjectCategory>("all");
const page = ref(1);
const gridAnimated = ref(false);

// Computed
const filteredProjects = computed(() => {
  if (selected.value === "all") return showcaseData;
  if (selected.value === "other") {
    return showcaseData.filter(
      (p) => !p.category.some((c) => ["frontend", "backend", "design"].includes(c)),
    );
  }
  return showcaseData.filter((p) => p.category.includes(selected.value));
});

const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredProjects.value.length / PAGE_SIZE)),
);

const paginatedProjects = computed(() => {
  const start = (page.value - 1) * PAGE_SIZE;
  return filteredProjects.value.slice(start, start + PAGE_SIZE);
});

// Methods
const handleFilterChange = (category: ProjectCategory) => {
  selected.value = category;
  page.value = 1;
};

const nextPage = () => {
  if (page.value < totalPages.value) page.value++;
};

const prevPage = () => {
  if (page.value > 1) page.value--;
};

// Animation
const animateGrid = () => {
  if (prefersReducedMotion.value === "reduce") return;

  if (gridAnimated.value) return;

  const cards = scope.value?.querySelectorAll<HTMLElement>(".project-card");
  if (!cards) return;

  cards.forEach((card, index) => {
    void animate(
      card,
      { opacity: [0, 1], y: [16, 0] } as Parameters<typeof animate>[1],
      {
        duration: 0.35,
        delay: (index % 6) * 0.05,
        ease: [0.22, 1, 0.36, 1],
      } as Parameters<typeof animate>[2],
    );
  });
  gridAnimated.value = true;
};

// URL sync
watch(
  [selected, page],
  ([newFilter, newPage]) => {
    const query: Record<string, string> = {};
    if (newFilter !== "all") query.filter = newFilter;
    if (newPage > 1) query.page = String(newPage);

    router.replace({ query: Object.keys(query).length ? query : undefined });
  },
  { flush: "post" },
);

// Initialize from URL
onMounted(() => {
  const filterParam = route.query.filter as ProjectCategory;
  const pageParam = Number(route.query.page);

  if (filterParam && CATEGORIES.some((c) => c.value === filterParam)) {
    selected.value = filterParam;
  }
  if (pageParam && pageParam > 0) {
    page.value = Math.min(pageParam, totalPages.value);
  }

  if (gridInView.value) {
    nextTick(animateGrid);
  }
});

// Re-animate on filter/page change
watch([selected, page], () => {
  gridAnimated.value = false;
  nextTick(animateGrid);
});

watch(gridInView, (inView) => {
  if (inView) {
    nextTick(animateGrid);
  }
});
</script>

<template>
  <section
    id="showcase"
    ref="scope"
    class="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-6xl mx-auto">
      <!-- Section Header -->
      <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <div class="flex items-center gap-2 mb-3">
            <span class="i-tabler:folder text-lg text-[var(--color-primary)]" aria-hidden="true" />
            <span class="text-xs sm:text-sm uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
              Portfolio
            </span>
          </div>
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--color-dark)]">
            Showcase
            <span class="text-lg sm:text-xl text-[var(--color-text-muted)] font-normal">
              ({{ filteredProjects.length }} projects)
            </span>
          </h2>
          <p class="text-base sm:text-lg text-[var(--color-text)] mt-2">
            A mix of landing pages, apps, and tools I've shipped end-to-end.
          </p>
        </div>

        <!-- Filter Dropdown -->
        <div class="relative">
          <select
            v-model="selected"
            class="appearance-none w-full sm:w-auto px-4 py-2 pr-10 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-dark)] text-sm font-medium hover:border-[var(--color-primary)]/50 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            aria-label="Filter projects by category"
            @change="handleFilterChange(($event.target as HTMLSelectElement).value as ProjectCategory)"
          >
            <option
              v-for="cat in CATEGORIES"
              :key="cat.value"
              :value="cat.value"
            >
              {{ cat.label }}
            </option>
          </select>
          <span
            class="absolute right-3 top-1/2 -translate-y-1/2 i-tabler:chevron-down text-[var(--color-text-muted)] pointer-events-none"
            aria-hidden="true"
          />
        </div>
      </div>

      <!-- Projects Grid -->
      <div
        v-if="paginatedProjects.length"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
      >
        <CommonsInfoCard
          v-for="project in paginatedProjects"
          :key="project.name"
          class="project-card"
          :title="project.name"
          :image-src="project.img"
          :image-alt="project.name"
          :description="project.detail"
          :meta="project.meta"
          :result="project.result"
          :inactive="project.inactive"
          :tags="project.tags"
          :links="project.links"
        />
      </div>

      <!-- Empty State -->
      <div
        v-else
        class="text-center py-16 sm:py-20 rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-card)]/50"
      >
        <span class="i-tabler:folder-off text-4xl text-[var(--color-text-muted)] mb-4 block" aria-hidden="true" />
        <h3 class="text-lg font-semibold text-[var(--color-dark)] mb-2">
          No projects found
        </h3>
        <p class="text-[var(--color-text)]">
          Try selecting a different category to explore more work.
        </p>
      </div>

      <!-- Pagination -->
      <div
        v-if="totalPages > 1"
        class="mt-8 sm:mt-10 flex items-center justify-center gap-2"
      >
        <button
          type="button"
          class="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-dark)] text-sm font-medium hover:bg-[var(--color-light)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          :disabled="page === 1"
          aria-label="Previous page"
          @click="prevPage"
        >
          <span class="i-tabler:chevron-left" aria-hidden="true" />
          <span class="hidden sm:inline">Previous</span>
        </button>

        <div class="flex items-center gap-1">
          <button
            v-for="p in totalPages"
            :key="p"
            type="button"
            class="min-w-[2.25rem] h-9 px-2.5 rounded-lg text-sm font-medium transition-colors"
            :class="
              page === p
                ? 'bg-[var(--color-primary)] text-white'
                : 'border border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-dark)] hover:bg-[var(--color-light)]'
            "
            :aria-current="page === p ? 'page' : undefined"
            @click="page = p"
          >
            {{ p }}
          </button>
        </div>

        <button
          type="button"
          class="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-dark)] text-sm font-medium hover:bg-[var(--color-light)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          :disabled="page === totalPages"
          aria-label="Next page"
          @click="nextPage"
        >
          <span class="hidden sm:inline">Next</span>
          <span class="i-tabler:chevron-right" aria-hidden="true" />
        </button>
      </div>
    </div>
  </section>
</template>
