<script setup lang="ts">
useHead({
  title: "pachara's portfolio",
  htmlAttrs: {
    lang: "en",
  },
  bodyAttrs: {
    class: "m-0",
  },
});
useSeoMeta({
  title: "pachara's portfolio",
  ogTitle: "pachara's portfolio",
  description: "This is pachara's portfolio, let me tell you all about it.",
  ogDescription: "This is pachara's portfolio, let me tell you all about it.",
  ogImage: "./public/img/logo.svg",
  twitterCard: "summary_large_image",
});

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};
</script>

<template>
  <AppNavbar id="intro" @scroll-to-section="scrollToSection" />
  <AppIntro />
  <AppExperience id="experience" />
  <AppTechStack id="tech_stack" />
  <AppShowcase id="showcase" />
  <AppFooter id="footer" />
</template>

<style scoped>
* {
  font-family: "Athiti", sans-serif;
  color: #333333;
}
body {
  background: #f2f2f2;
}
</style>
