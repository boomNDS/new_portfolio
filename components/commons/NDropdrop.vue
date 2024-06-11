<template>
  <div>
    <select
      v-model="localValue"
      scale="active:92"
      duration="100"
      text="14px black"
      p="2 1"
      border="4 #333333"
      bg="#ffc107"
      class="focus:outline-none rounded ease-in shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)]"
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
