<template>
  <div class="mx-auto px-[2rem] lg:px-[5rem] mb-10 max-w-6xl">
    <div class="flex items-start justify-between flex-wrap gap-3 mb-4">
      <div>
        <p class="text-sm uppercase tracking-[0.2em] text-gray-500 m-0">
          Projects
        </p>
        <h2 class="title m-0 text-[var(--color-dark)]">Showcase</h2>
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

    <div v-if="takeItem < filterItems.length" class="mt-6 flex justify-center">
      <CommonsButton
        label="Show more"
        bg="var(--color-card)"
        class="text-[var(--color-dark)] border-[var(--color-border)]"
        @on-click="loadMore"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, watch, ref } from "vue";
import showcaseData from "~/public/showcase.json";

const takeItem = useState("showcaseTake", () => 4);
const selected = useState("showcaseFilter", () => "all");
const cardRefs = ref<HTMLElement[]>([]);
const { $motionAnimate, $motionInView } = useNuxtApp();

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

const items = computed(() => filterItems.value.slice(0, takeItem.value));

const loadMore = () => {
  takeItem.value += 3;
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
</script>

<style scoped></style>
