<template>
  <div class="mx-auto px-[2rem] lg:px-[5rem] mb-5">
    <h2 class="title">Showcase</h2>
    <section
      class="grid grid-flow-row grid-cols-1 min-[586px]:grid-cols-2 min-[900px]:grid-cols-3 xl:grid-cols-4 gap-8"
    >
      <CommonsInfoCard
        v-for="(data, index) in jsonData"
        :key="`showcase-${index}`"
        :image-src="data.img"
        :image-alt="`${data.img} image`"
        :title="data.name"
        :description="data.detail"
        :links="data.links as Link[]"
        :tags="data.tags"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import jsonData from "~/public/showcase.json";
import type { Link } from "./commons/InfoCard.vue";
</script>

<style scoped></style>
