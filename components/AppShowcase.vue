<template>
  <div class="mx-auto px-[2rem] lg:px-[5rem] mb-8">
    <div class="flex items-center justify-between">
      <h2 class="title">Showcase</h2>
      <CommonsNDropdrop v-model="selected" />
    </div>
    <section
      class="grid grid-flow-row grid-cols-1 min-[586px]:grid-cols-2 min-[900px]:grid-cols-3 xl:grid-cols-4 gap-8"
    >
      <CommonsInfoCard
        v-for="(data, index) in items"
        :key="`showcase-${index}-${data.name}`"
        :image-src="data.img"
        :image-alt="`${data.img} image`"
        :title="data.name"
        :description="data.detail"
        :links="data.links as Link[]"
        :tags="data.tags"
      />
    </section>
    <div v-if="takeItem < filterItems.length" class="mt-5 flex justify-center">
      <CommonsButton label="show more" bg="#f2f2f2" @on-click="loadMore" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import jsonData from "~/public/showcase.json";
import type { Link } from "./commons/InfoCard.vue";

const takeItem = ref(4);
const selected = ref("all");

const filterItems = computed(() => {
  return jsonData.filter((data) => {
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
