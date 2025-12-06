<template>
  <div class="mx-auto px-[2rem] lg:px-[5rem] mb-10 max-w-6xl">
    <div class="flex items-start justify-between flex-wrap gap-3 mb-4">
      <div>
        <p class="text-sm uppercase tracking-[0.2em] text-gray-500 m-0">
          Projects
        </p>
        <h2 class="title m-0 text-[var(--color-dark)]">
          Showcase <span class="text-[var(--color-text)] text-lg">({{ projectCount }} projects)</span>
        </h2>
        <p class="m-0 text-gray-600 text-sm text-[var(--color-text)]">
          A mix of landing pages, apps, and tools I’ve shipped end-to-end.
        </p>
      </div>
      <CommonsNDropdrop v-model="selected" />
    </div>

    <section
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch"
    >
      <CommonsInfoCard
        v-for="(data, index) in items"
        :key="`showcase-${index}`"
        :ref="(el) => setCardRef(el as HTMLElement | null, index)"
        :title="data.name"
        :image-src="data.img"
        :image-alt="data.name"
        :description="data.detail"
        :tags="data.tags"
        :links="data.links"
      />
    </section>

    <div class="mt-6 flex items-center justify-between gap-3">
      <button
        class="px-4 py-2 rounded-lg border text-sm font-semibold bg-[var(--color-card)] text-[var(--color-dark)] border-[var(--color-border)] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.18)] transition duration-150 hover:-translate-y-0.5 disabled:opacity-50 disabled:translate-y-0 disabled:cursor-not-allowed"
        :disabled="page === 1"
        @click="prevPage"
      >
        Previous
      </button>
      <span class="text-sm text-[var(--color-text)]">
        Page {{ page }} / {{ totalPages }}
      </span>
      <button
        class="px-4 py-2 rounded-lg border text-sm font-semibold bg-[var(--color-card)] text-[var(--color-dark)] border-[var(--color-border)] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.18)] transition duration-150 hover:-translate-y-0.5 disabled:opacity-50 disabled:translate-y-0 disabled:cursor-not-allowed"
        :disabled="page === totalPages"
        @click="nextPage"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, watch, ref } from "vue";
import showcaseData from "~/public/showcase.json";

const selected = useState("showcaseFilter", () => "all");
const page = useState("showcasePage", () => 1);
const cardRefs = ref<HTMLElement[]>([]);
const { $motionAnimate, $motionInView } = useNuxtApp();
const pageSize = 8;

const projectCount = computed(() => filterItems.value.length);

const filterItems = computed(() => {
  return showcaseData.filter((data) => {
    if (selected.value === "all") return true;
    if (selected.value === "other") {
      return !["frontend", "backend", "design"].some((category) =>
        data.category.includes(category),
      );
    }
    return data.category.includes(selected.value);
  });
});

const totalPages = computed(() =>
  Math.max(1, Math.ceil(filterItems.value.length / pageSize)),
);

const items = computed(() => {
  const start = (page.value - 1) * pageSize;
  return filterItems.value.slice(start, start + pageSize);
});

const nextPage = () => {
  if (page.value < totalPages.value) page.value += 1;
};

const prevPage = () => {
  if (page.value > 1) page.value -= 1;
};

const setCardRef = (el: HTMLElement | null, index: number) => {
  if (el) {
    cardRefs.value[index] = el;
  }
};

const animateCards = () => {
  if (!$motionAnimate || !$motionInView) return;
  cardRefs.value.forEach((el, index) => {
    if (!el) return;
    $motionInView(
      el,
      () =>
        $motionAnimate(
          el,
          { opacity: [0, 1], y: [12, 0] },
          { duration: 0.4, delay: index * 0.05, easing: [0.22, 1, 0.36, 1] },
        ),
      { amount: 0.2, once: true },
    );
  });
};

onMounted(() => {
  nextTick(animateCards);
});

watch(
  items,
  () => {
    nextTick(animateCards);
  },
  { flush: "post" },
);

watch(
  filterItems,
  () => {
    page.value = 1;
  },
  { flush: "post" },
);

watch(
  totalPages,
  () => {
    if (page.value > totalPages.value) {
      page.value = totalPages.value;
    }
  },
  { flush: "post" },
);
</script>

<style scoped></style>
