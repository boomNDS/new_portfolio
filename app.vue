<script setup>
const store = useCounterStore();
const { increment } = store;
const { getCount } = storeToRefs(store);

throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
</script>

<template>
  <p>Counter: {{ getCount }}</p>
  <button type="button" @click="increment">Plus</button>
</template>
