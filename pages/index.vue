<script setup lang="ts">
// SEO
useSeoMeta({
  title: "Pachara (Boom) - Full-Stack Developer",
  description:
    "Full-Stack Developer crafting modern web experiences with Nuxt, Next.js, FastAPI, and cloud technologies. Based in Thailand.",
  ogTitle: "Pachara (Boom) - Full-Stack Developer",
  ogDescription:
    "Full-Stack Developer crafting modern web experiences with Nuxt, Next.js, FastAPI, and cloud technologies.",
});
</script>

<template>
  <main id="main" class="flex-1">
    <AppIntro />
    <AppExperience id="experience" />
    <AppTechStack id="tech_stack" />
    <AppShowcase id="showcase" />
  </main>
</template>
