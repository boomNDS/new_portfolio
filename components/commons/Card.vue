<template>
  <section>
    <div
      class="flex w-[90%] md:w-full max-w-[534px] rounded border-4 border-[var(--color-border)] bg-[var(--color-card)] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.18)] px-4 py-2 md:space-x-6 space-x-1"
    >
      <img
        :src="logoSrc"
        loading="lazy"
        :alt="logoAlt"
        class="m-y-auto"
        width="40"
        height="40"
      />
      <div class="flex flex-col justify-center leading-6">
        <h3
          class="m-0 text-[1.25rem] min-[1045px]:text-[1.75rem] text-[var(--color-dark)]"
        >
          {{ title }}
        </h3>
        <p
          class="m-0 font-bold text-[14px] min-[1045px]:text-[18px] text-gray-600"
        >
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
