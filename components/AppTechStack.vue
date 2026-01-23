<template>
  <div class="mx-auto px-[2rem] lg:px-[5rem] mb-5 max-w-6xl">
    <div class="flex items-start justify-between flex-wrap gap-3 mb-4">
      <div>
        <p class="text-sm uppercase tracking-[0.2em] text-gray-500 m-0">
          Toolkit
        </p>
        <h2 class="title m-0 text-[var(--color-dark)]">Tech stack</h2>
        <p class="m-0 text-gray-600 text-sm text-[var(--color-text)]">
          The frameworks, platforms, and tools I use most often to ship fast.
        </p>
      </div>
    </div>
    <section
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 items-stretch"
    >
      <CommonsStackCard
        v-for="(tech, index) in sortedTechStacks"
        :key="`tech-${index}-icon`"
        :ref="(el) => setCardRef(el as HTMLElement | null, index)"
        :icon-src="tech.iconSrc"
        :icon-title="tech.iconTitle"
        :last-used="tech.lastUsed"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, nextTick, computed } from "vue";
import { usePreferredReducedMotion } from "@vueuse/core";
const dayjs = useDayjs();
const { $motionAnimate, $motionInView } = useNuxtApp();
const cardRefs = ref<HTMLElement[]>([]);
const reducedMotion = import.meta.client
  ? usePreferredReducedMotion()
  : ref<"no-preference" | "reduce">("no-preference");

const setCardRef = (el: HTMLElement | null, index: number) => {
  if (el) {
    cardRefs.value[index] = el;
  }
};

const animateCards = () => {
  if (reducedMotion.value === "reduce") return;
  if (!$motionAnimate || !$motionInView) return;
  cardRefs.value.forEach((el, index) => {
    if (!el) return;
    $motionInView(
      el,
      () =>
        $motionAnimate(
          el,
          { opacity: [0, 1], y: [12, 0] },
          { duration: 0.35, delay: index * 0.04, easing: [0.22, 1, 0.36, 1] },
        ),
      { amount: 0.2, once: true },
    );
  });
};

onMounted(() => {
  nextTick(animateCards);
});

const techStacks = ref([
  {
    iconSrc: "i-logos-javascript",
    iconTitle: "javascript",
    lastUsed: dayjs().to(dayjs()),
  },
  {
    iconSrc: "i-logos-vue",
    iconTitle: "vue.js",
    lastUsed: dayjs().to(dayjs()),
  },
  {
    iconSrc: "i-logos-nuxt-icon",
    iconTitle: "nuxt.js",
    lastUsed: dayjs().to(dayjs()),
  },
  {
    iconSrc: "i-logos-nestjs",
    iconTitle: "nest.js",
    lastUsed: dayjs().to(dayjs("2024-04-31")),
  },
  {
    iconSrc: "i-logos-bulma",
    iconTitle: "bulma",
    lastUsed: dayjs().to(dayjs("2024-04-31")),
  },
  {
    iconSrc: "i-logos-typescript-icon",
    iconTitle: "typescript",
    lastUsed: dayjs().to(dayjs()),
  },
  {
    iconSrc: "i-logos-docker-icon",
    iconTitle: "docker",
    lastUsed: dayjs().to(dayjs()),
  },
  {
    iconSrc: "i-logos-sass",
    iconTitle: "sass",
    lastUsed: dayjs().to(dayjs("2024-06-09")),
  },
  {
    iconSrc: "i-logos-tailwindcss-icon",
    iconTitle: "tailwind",
    lastUsed: dayjs().to(dayjs()),
  },
  {
    iconSrc: "i-logos-django-icon",
    iconTitle: "django",
    lastUsed: dayjs().to(dayjs("2020-11-30")),
  },
  {
    iconSrc: "i-logos-figma",
    iconTitle: "figma",
    lastUsed: dayjs().to(dayjs()),
  },
  {
    iconSrc: "i-logos-jira",
    iconTitle: "jira",
    lastUsed: dayjs().to(dayjs()),
  },
  {
    iconSrc: "i-logos-atlassian",
    iconTitle: "atlassian",
    lastUsed: dayjs().to(dayjs()),
  },
  {
    iconSrc: "i-logos-postman-icon",
    iconTitle: "postman",
    lastUsed: dayjs().to(dayjs()),
  },
  {
    iconSrc: "i-logos-redis",
    iconTitle: "redis",
    lastUsed: dayjs().to(dayjs()),
  },
  {
    iconSrc: "i-logos-git-icon",
    iconTitle: "git",
    lastUsed: dayjs().to(dayjs()),
  },
  {
    iconSrc: "i-logos-google-analytics",
    iconTitle: "google analytics",
    lastUsed: dayjs().to(dayjs()),
  },
  {
    iconSrc: "i-vscode-icons:file-type-vite",
    iconTitle: "vite",
    lastUsed: dayjs().to(dayjs()),
  },
  {
    iconSrc: "i-logos-flutter",
    iconTitle: "flutter",
    lastUsed: dayjs().to(dayjs()),
  },
  {
    iconSrc: "i-logos-cloudflare-icon",
    iconTitle: "cloudflare",
    lastUsed: dayjs().to(dayjs()),
  },
  {
    iconSrc: "i-logos-nextjs-icon",
    iconTitle: "next.js",
    lastUsed: dayjs().to(dayjs()),
  },
  {
    iconSrc: "i-vscode-icons:file-type-elixir",
    iconTitle: "elixir",
    lastUsed: dayjs().to(dayjs("2021-06-30")),
  },
  {
    iconSrc: "i-logos-phoenix",
    iconTitle: "phoenix",
    lastUsed: dayjs().to(dayjs("2021-06-30")),
  },
  {
    iconSrc: "i-logos-kibana",
    iconTitle: "kibana",
    lastUsed: dayjs().to(dayjs("2024-04-31")),
  },
]);
const sortedTechStacks = computed(() => {
  return [...techStacks.value].sort((a, b) =>
    dayjs(b.lastUsed).diff(dayjs(a.lastUsed)),
  );
});
</script>

<style scoped></style>
