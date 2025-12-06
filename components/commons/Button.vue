<template>
  <div>
    <NuxtLink :to="to" :prefetch="false">
      <button
        :style="{
          width: width || undefined,
          background: bg || 'var(--color-card)',
        }"
        class="w-[145px] sm:w-[199px] scale-100 active:scale-92 transition duration-100 text-[20px] sm:text-[24px] text-[var(--color-dark)] px-4 py-2 border-4 border-[var(--color-border)] rounded-xl cursor-pointer focus:outline-none ease-in shadow-[4px_4px_0px_0px_rgba(0,0,0,0.18)]"
        @click="$emit('on-click')"
      >
        {{ label }}
      </button>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
defineEmits(["on-click"]);
defineProps({
  width: {
    type: String,
    default: "",
    required: false,
  },
  to: {
    type: String,
    default: "",
    required: false,
  },
  label: {
    type: String,
    required: true,
  },
  bg: {
    type: String,
    required: true,
  },
});
</script>

<style scoped></style>
