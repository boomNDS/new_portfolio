<template>
  <div class="mx-auto px-[2rem] lg:px-[5rem] mb-8">
    <div class="flex items-center justify-between">
      <h2 class="title">Showcase</h2>
      <CommonsNDropdrop v-model="selected" />
    </div>
    <section
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
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
    <div v-if="takeItem < filterItems.length" class="mt-5 flex justify-center">
      <CommonsButton label="Show more" bg="#f2f2f2" @on-click="loadMore" />
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
