<script setup lang="ts">
useHead({
  htmlAttrs: {
    lang: "en",
  },
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
