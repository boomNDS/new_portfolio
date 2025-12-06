<template>
  <div class="mx-auto px-[2rem] lg:px-[5rem] mb-10 max-w-6xl">
    <div class="flex items-start justify-between flex-wrap gap-3 mb-4">
      <div>
        <p class="text-sm uppercase tracking-[0.2em] text-gray-500 m-0">
          Projects
        </p>
        <h2 class="title m-0 text-[#111]">Showcase</h2>
        <p class="m-0 text-gray-600 text-sm">
          A mix of landing pages, apps, and tools I’ve shipped end-to-end.
        </p>
      </div>
      <CommonsNDropdrop v-model="selected" />
    </div>

    <section
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      <CommonsInfoCard
        v-for="(data, index) in items"
        :key="`showcase-${index}`"
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
        bg="#111"
        class="text-white"
        @on-click="loadMore"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStorage } from "@vueuse/core";
import showcaseData from "~/public/showcase.json";

const takeItem = useStorage("takeItem", 4);
const selected = useStorage("selected", "all");

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
</script>

<style scoped></style>
