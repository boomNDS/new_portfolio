<script setup lang="ts">
import { onMounted, ref } from "vue";

const store = useCounterStore();
const { increment } = store;
const { getCount } = storeToRefs(store);

const box = ref<HTMLElement | null>(null);

onMounted(() => {
  const { $gsap } = useNuxtApp();

  if (box.value) {
    $gsap.to(box.value, {
      x: 500,
      duration: 0.25,
      scrollTrigger: {
        trigger: box.value,
        start: "top center",
        end: "top 100px",
        scrub: true,
      },
    });
  }
});
</script>

<template>
  <AppHeader />
  <NuxtLayout>
    <p>Counter: {{ getCount }}</p>
    <button type="button" @click="increment">Plus</button>
    <figure class="bg-slate-100 rounded-xl p-8 dark:bg-slate-800">
      <img
        class="w-24 h-24 rounded-full mx-auto"
        alt=""
        width="384"
        height="512"
      />
      <div class="pt-6 space-y-4">
        <blockquote>
          <p class="text-lg font-medium">
            “Tailwind CSS is the only framework that I've seen scale on large
            teams. It’s easy to customize, adapts to any design, and the build
            size is tiny.”
          </p>
        </blockquote>
        <figcaption class="font-medium">
          <div>Sarah Dayan</div>
          <div>Staff Engineer, Algolia</div>
        </figcaption>
      </div>
    </figure>
    <div class="i-mdi-alarm text-orange-400" />
    <button
      bg="blue-400 hover:blue-500 dark:blue-500 dark:hover:blue-600"
      text="sm white"
      font="mono light"
      p="y-2 x-4"
      border="2 rounded blue-200"
    >
      Button
    </button>
    <div ref="box" class="box">Animate Me</div>
  </NuxtLayout>
  <AppFooter />
</template>
<style scoped>
.box {
  width: 100px;
  height: 100px;
  background-color: red;
  transition: 0.3s;
}
</style>
