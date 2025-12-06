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
  <ScrollToTop />
  <AppFooter id="footer" />
</template>

<style>
:root {
  font-family: "Athiti", sans-serif;
  color: var(--color-text);
  --color-primary: #7d26cd;
  --color-dark: #111111;
  --color-light: #f4f4f4;
  --color-card: #ffffff;
  --color-border: #111111;
  --color-text: #333333;
  --shadow-strong: 10px 10px 0px rgba(0, 0, 0, 0.12);
  --shadow-mid: 8px 8px 0px rgba(0, 0, 0, 0.15);
  --shadow-soft: 5px 5px 0px rgba(0, 0, 0, 0.1);
}

body {
  background: var(--color-light);
  margin: 0;
}
</style>
