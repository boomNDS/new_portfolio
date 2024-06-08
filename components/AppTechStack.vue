<template>
  <div class="container mx-auto px-6">
    <h2 class="title">Tech stack</h2>
    <section
      class="grid grid-flow-row-dense grid-cols-5 md:grid-cols-6 lg:grid-cols-12 gap-0 md:gap-4 mx-4"
    >
      <CommonsStackCard
        v-for="(tech, index) in sortedTechStacks"
        :key="`tech-${index}-icon`"
        :icon-src="tech.iconSrc"
        :icon-title="tech.iconTitle"
        :last-used="tech.lastUsed"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
const dayjs = useDayjs();
const techStacks = ref([
  {
    iconSrc: "i-logos-javascript",
    iconTitle: "javascript",
    lastUsed: dayjs().to(dayjs("2024-06-09")),
  },
  {
    iconSrc: "i-logos-vue",
    iconTitle: "vue.js",
    lastUsed: dayjs().to(dayjs("2024-06-09")),
  },
  {
    iconSrc: "i-logos-nuxt-icon",
    iconTitle: "nuxt.js",
    lastUsed: dayjs().to(dayjs("2024-06-09")),
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
    lastUsed: dayjs().to(dayjs("2024-06-09")),
  },
  {
    iconSrc: "i-logos-docker-icon",
    iconTitle: "docker",
    lastUsed: dayjs().to(dayjs("2024-06-09")),
  },
  {
    iconSrc: "i-logos-sass",
    iconTitle: "sass",
    lastUsed: dayjs().to(dayjs("2024-06-09")),
  },
  {
    iconSrc: "i-logos-tailwindcss-icon",
    iconTitle: "tailwind",
    lastUsed: dayjs().to(dayjs("2024-06-09")),
  },
  {
    iconSrc: "i-logos-django-icon",
    iconTitle: "django",
    lastUsed: dayjs().to(dayjs("2020-11-30")),
  },
  {
    iconSrc: "i-logos-figma",
    iconTitle: "figma",
    lastUsed: dayjs().to(dayjs("2024-06-09")),
  },
  {
    iconSrc: "i-logos-jira",
    iconTitle: "jira",
    lastUsed: dayjs().to(dayjs("2024-04-31")),
  },
  {
    iconSrc: "i-logos-atlassian",
    iconTitle: "atlassian",
    lastUsed: dayjs().to(dayjs("2024-04-31")),
  },
  {
    iconSrc: "i-logos-postman-icon",
    iconTitle: "postman",
    lastUsed: dayjs().to(dayjs("2024-06-09")),
  },
  {
    iconSrc: "i-logos-redis",
    iconTitle: "redis",
    lastUsed: dayjs().to(dayjs("2024-04-31")),
  },
  {
    iconSrc: "i-logos-git-icon",
    iconTitle: "git",
    lastUsed: dayjs().to(dayjs("2024-06-09")),
  },
  {
    iconSrc: "i-logos-google-analytics",
    iconTitle: "google analytics",
    lastUsed: dayjs().to(dayjs("2024-06-09")),
  },
  {
    iconSrc: "i-vscode-icons:file-type-vite",
    iconTitle: "vite",
    lastUsed: dayjs().to(dayjs("2024-06-09")),
  },
  {
    iconSrc: "i-logos-flutter",
    iconTitle: "flutter",
    lastUsed: dayjs().to(dayjs("2020-08-31")),
  },
  {
    iconSrc: "i-logos-cloudflare-icon",
    iconTitle: "cloudflare",
    lastUsed: dayjs().to(dayjs("2024-06-09")),
  },
  {
    iconSrc: "i-logos-nextjs-icon",
    iconTitle: "next.js",
    lastUsed: dayjs().to(dayjs("2021-08-31")),
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
