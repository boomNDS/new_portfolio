<template>
  <section>
    <div
      border="4px solid #333333"
      bg="#d9d9d9"
      space="x-3.3rem"
      class="flex w-full max-w-[534px] rounded shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)] pt-7px pb-5px pl-4 pr-1"
    >
      <nuxt-img
        :src="logoSrc"
        loading="lazy"
        format="webp"
        placeholder
        sizes="67px"
        :alt="logoAlt"
      />
      <div class="flex flex-col justify-center" leading="6">
        <h3 text="min-[1045px]:1.75rem 1rem" m="0">{{ title }}</h3>
        <p font="bold" text="18px #5c5c5c" m="0">
          {{ subtitle }}
        </p>
      </div>
    </div>
    <div text="left" p="4" mt="0" class="w-full max-w-[534px] break-words">
      <p class="mb-2 mt-0">
        {{ description }}
      </p>
      <ol class="list-decimal list-inside pl-4 mt-0">
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
