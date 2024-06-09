<template>
  <div class="container mx-auto px-6">
    <h2 class="title">Showcase</h2>
    <section class="grid grid-flow-row grid-cols-5 gap-8">
      <CommonsInfoCard
        v-for="(data, index) in jsonData"
        :key="`showcase-${index}`"
        :image-src="data.img"
        :image-alt="`${data.img} image`"
        :title="data.name"
        :description="data.detail"
        :links="data.links"
        :tags="data.tags"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import jsonData from "~/public/showcase.json";
</script>

<style scoped></style>
