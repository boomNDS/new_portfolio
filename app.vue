<script setup lang="ts">
const theme = useState<"light" | "dark">("theme", () => "light");

useHead(() => ({
  title: "Pachara's Portfolio",
  htmlAttrs: { lang: "en", "data-theme": theme.value },
  bodyAttrs: { class: "m-0" },
}));

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

if (import.meta.client) {
  onMounted(() => {
    const stored =
      (localStorage.getItem("theme") as "light" | "dark" | null) ?? "light";
    theme.value = stored;
    document.documentElement.dataset.theme = stored;
  });

  watch(
    theme,
    (val) => {
      document.documentElement.dataset.theme = val;
      localStorage.setItem("theme", val);
    },
    { immediate: true },
  );
}

const toggleTheme = () => {
  theme.value = theme.value === "light" ? "dark" : "light";
};
</script>

<template>
  <ClientOnly>
    <AppNavbar
      id="intro"
      :theme="theme"
      @scroll-to-section="scrollToSection"
      @toggle-theme="toggleTheme"
    />
  </ClientOnly>
  <NuxtPage />
  <ClientOnly>
    <ScrollToTop />
  </ClientOnly>
  <AppFooter id="footer" />
</template>

<style>
@font-face {
  font-family: "LINE Seed Sans";
  src: url("/fonts/LINESeedSans_Rg.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "LINE Seed Sans";
  src: url("/fonts/LINESeedSans_Md.woff2") format("woff2");
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "LINE Seed Sans TH";
  src: url("/fonts/LINESeedSansTH_W_Rg.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "LINE Seed Sans TH";
  src: url("/fonts/LINESeedSansTH_W_Md.woff2") format("woff2");
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}

:root {
  font-family: "LINE Seed Sans", "LINE Seed Sans TH", "Athiti", sans-serif;
  color: var(--color-text);
  --color-primary: #7d26cd;
  --color-accent: #f5c243;
  --color-dark: #111111;
  --color-light: #f4f4f4;
  --color-card: #ffffff;
  --color-border: #111111;
  --color-text: #1f2937;
  --shadow-strong: 10px 10px 0px rgba(0, 0, 0, 0.12);
  --shadow-mid: 8px 8px 0px rgba(0, 0, 0, 0.15);
  --shadow-soft: 5px 5px 0px rgba(0, 0, 0, 0.1);
}

[data-theme="dark"] {
  --color-primary: #b488ff;
  --color-accent: #f2ce63;
  --color-dark: #f7f7f7;
  --color-light: #0f1115;
  --color-card: #111827;
  --color-border: #f7f7f7;
  --color-text: #f3f4f6;
  --shadow-strong: 10px 10px 0px rgba(0, 0, 0, 0.35);
  --shadow-mid: 8px 8px 0px rgba(0, 0, 0, 0.3);
  --shadow-soft: 5px 5px 0px rgba(0, 0, 0, 0.25);
}

body {
  background: var(--color-light);
  margin: 0;
  color: var(--color-text);
}
</style>
