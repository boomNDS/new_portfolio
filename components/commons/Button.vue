<template>
  <div>
    <NuxtLink :to="to" :prefetch="false">
      <button
        :w="width ? width : `145px sm:199px`"
        scale="active:92"
        duration="100"
        text="20px sm:24px var(--color-dark)"
        p="2 1"
        border="4 var(--color-border)"
        :bg="bg || 'var(--color-card)'"
        class="cursor-pointer focus:outline-none rounded-xl ease-in shadow-[4px_4px_0px_0px_rgba(0,0,0,0.18)]"
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
