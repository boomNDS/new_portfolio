<template>
  <section>
    <div
      border="4px solid #333333"
      bg="#d9d9d9"
      space="x-4px md:x-3.3rem"
      class="flex w-[90%] md:w-full max-w-[534px] rounded shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)] pt-7px pb-5px pl-4 pr-1"
    >
      <img
        :src="logoSrc"
        loading="lazy"
        :alt="logoAlt"
        class="m-y-auto"
        width="40"
        height="40"
      />
      <div class="flex flex-col justify-center" leading="6">
        <h3 text="min-[1045px]:1.75rem 1.25rem" m="0">{{ title }}</h3>
        <p font="bold" text="min-[1045px]:18px 14px #5c5c5c" m="0">
          {{ subtitle }}
        </p>
      </div>
    </div>
    <div class="max-w-[560px]">
      <p>
        {{ description }}
      </p>
      <ol>
        <li v-for="(item, index) in listItems" :key="index" class="mb-1">
          {{ item }}
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps({
  logoSrc: {
    type: String,
    required: true,
  },
  logoAlt: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  listItems: {
    type: Array as () => string[],
    required: true,
  },
});
</script>

<style scoped></style>
