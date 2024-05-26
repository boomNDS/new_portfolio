<script>
import { useCounterStore } from "@/stores/counter";

export default defineComponent({
  setup() {
    const store = useCounterStore();
    const { increment } = store;
    const { getCount } = storeToRefs(store);
    return { increment, getCount     };
  },
});
</script>

<template>
  <p>Counter: {{ getCount }} a</p>
  <button type="button" @click="increment">Plus</button>
</template>
