<template>
  <div>
    <component
      :is="to ? 'NuxtLink' : 'button'"
      :to="to || undefined"
      :prefetch="to ? false : undefined"
      :type="to ? undefined : 'button'"
      :style="{
        width: width || undefined,
        background: bg || 'var(--color-card)',
      }"
      class="w-[145px] sm:w-[199px] scale-100 active:scale-92 transition duration-100 text-[20px] sm:text-[24px] text-[var(--color-dark)] px-4 py-2 border-4 border-[var(--color-border)] rounded-xl cursor-pointer ease-in shadow-[4px_4px_0px_0px_rgba(0,0,0,0.18)] inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-light)]"
      @click="$emit('on-click')"
    >
      {{ label }}
    </component>
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
