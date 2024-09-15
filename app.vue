<script setup lang="ts">
useHead({
  title: "Pachara's Portfolio",
  htmlAttrs: { lang: "en" },
  bodyAttrs: { class: "m-0" },
});

useSeoMeta({
  title: "Pachara's Portfolio",
  ogTitle: "Pachara's Portfolio",
  description: "This is Pachara's portfolio, showcasing projects and skills.",
  ogDescription: "This is Pachara's portfolio, showcasing projects and skills.",
  ogImage: "/img/logo.svg",
  twitterCard: "summary_large_image",
});

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  element?.scrollIntoView({ behavior: "smooth" });
};
</script>

<template>
  <AppNavbar id="intro" @scroll-to-section="scrollToSection" />
  <NuxtPage />
  <AppFooter id="footer" />
</template>

<style>
:root {
  font-family: "Athiti", sans-serif;
  color: #333333;
}

body {
  background: #f2f2f2;
  margin: 0;
}
</style>
