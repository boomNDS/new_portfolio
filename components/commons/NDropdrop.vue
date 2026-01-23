<template>
  <div>
    <select
      v-model="localValue"
      aria-label="Filter projects"
      class="rounded-full ease-in active:scale-95 transition duration-100 text-[14px] px-3 py-2 border-2 border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-dark)] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-light)]"
    >
      <option value="all">All</option>
      <option value="frontend">Frontend</option>
      <option value="backend">Backend</option>
      <option value="design">Design</option>
      <option value="other">Other</option>
    </select>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});
const emit = defineEmits(["update:modelValue"]);
const localValue = ref(props.modelValue);
watch(localValue, (newValue) => {
  emit("update:modelValue", newValue);
});
</script>

<style scoped></style>
