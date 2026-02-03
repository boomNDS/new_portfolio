<script setup lang="ts">
// Composables
const { theme, toggleTheme } = useTheme();
const { scrollToSection } = useScrollTo();

// SEO Meta
useHead(() => ({
  title: "Pachara (Boom) - Full-Stack Developer",
  titleTemplate: "%s | Pachara's Portfolio",
  htmlAttrs: { lang: "en", "data-theme": theme.value },
  bodyAttrs: { class: "antialiased" },
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    {
      name: "description",
      content:
        "Full-Stack Developer crafting modern web experiences with Nuxt, Next.js, FastAPI, and cloud technologies. Based in Thailand.",
    },
  ],
  link: [
    { rel: "icon", type: "image/svg+xml", href: "/img/logo.svg" },
    { rel: "canonical", href: "https://pachorn.dev" },
  ],
}));

useSeoMeta({
  title: "Pachara (Boom) - Full-Stack Developer",
  ogTitle: "Pachara (Boom) - Full-Stack Developer",
  description:
    "Full-Stack Developer crafting modern web experiences with Nuxt, Next.js, FastAPI, and cloud technologies.",
  ogDescription:
    "Full-Stack Developer crafting modern web experiences with Nuxt, Next.js, FastAPI, and cloud technologies.",
  ogImage: "/img/logo.svg",
  ogUrl: "https://pachorn.dev",
  twitterCard: "summary_large_image",
  twitterTitle: "Pachara (Boom) - Full-Stack Developer",
  twitterDescription:
    "Full-Stack Developer crafting modern web experiences with Nuxt, Next.js, FastAPI, and cloud technologies.",
});

// Schema.org structured data
useHead({
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Pachara Sriyodwieng",
        alternateName: "Boom",
        jobTitle: "Full-Stack Developer",
        url: "https://pachorn.dev",
        sameAs: [
          "https://www.linkedin.com/in/pachara-sriyodwieng-2a9503149",
          "https://github.com/boomNDS",
        ],
        knowsAbout: [
          "Nuxt.js",
          "Next.js",
          "Vue.js",
          "React",
          "FastAPI",
          "TypeScript",
          "Tailwind CSS",
        ],
      }),
    },
  ],
});
</script>

<template>
  <div class="app-container">
    <!-- Skip Link for Accessibility -->
    <a href="#main" class="skip-link"> Skip to content </a>

    <!-- Navigation -->
    <ClientOnly>
      <AppNavbar
        id="intro"
        :theme="theme"
        @scroll-to-section="scrollToSection"
        @toggle-theme="toggleTheme"
      />
    </ClientOnly>

    <!-- Main Content -->
    <NuxtPage />

    <!-- Scroll to Top Button -->
    <ClientOnly>
      <ScrollToTop />
    </ClientOnly>

    <!-- Footer -->
    <AppFooter id="footer" />
  </div>
</template>

<style>
/* ========================================
   Font Definitions
   ======================================== */
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

/* ========================================
   CSS Custom Properties (Design Tokens)
   ======================================== */
:root {
  /* Typography */
  --font-sans: "LINE Seed Sans", "LINE Seed Sans TH", system-ui, -apple-system,
    BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  /* Colors - Light Theme (Default) */
  --color-primary: #7d26cd;
  --color-primary-rgb: 125, 38, 205;
  --color-accent: #f5c243;
  --color-dark: #111111;
  --color-light: #f4f4f4;
  --color-card: #ffffff;
  --color-border: #111111;
  --color-text: #1f2937;
  --color-text-muted: #6b7280;
  --color-background: #f4f4f4;

  /* Shadows */
  --shadow-strong: 10px 10px 0px rgba(0, 0, 0, 0.12);
  --shadow-mid: 8px 8px 0px rgba(0, 0, 0, 0.15);
  --shadow-soft: 5px 5px 0px rgba(0, 0, 0, 0.1);
  --shadow-sm: 2px 2px 0px rgba(0, 0, 0, 0.08);

  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  --space-2xl: 3rem;

  /* Transitions */
  --transition-fast: 150ms cubic-bezier(0.22, 1, 0.36, 1);
  --transition-base: 200ms cubic-bezier(0.22, 1, 0.36, 1);
  --transition-slow: 300ms cubic-bezier(0.22, 1, 0.36, 1);

  /* Border Radius */
  --radius-sm: 0.5rem;
  --radius-md: 0.75rem;
  --radius-lg: 1rem;
  --radius-xl: 1.5rem;
  --radius-full: 9999px;
}

/* Dark Theme */
[data-theme="dark"] {
  color-scheme: dark;
  --color-primary: #b488ff;
  --color-primary-rgb: 180, 136, 255;
  --color-accent: #f2ce63;
  --color-dark: #f7f7f7;
  --color-light: #0f1115;
  --color-card: #111827;
  --color-border: #f7f7f7;
  --color-text: #f3f4f6;
  --color-text-muted: #9ca3af;
  --color-background: #0f1115;

  --shadow-strong: 10px 10px 0px rgba(0, 0, 0, 0.35);
  --shadow-mid: 8px 8px 0px rgba(0, 0, 0, 0.3);
  --shadow-soft: 5px 5px 0px rgba(0, 0, 0, 0.25);
  --shadow-sm: 2px 2px 0px rgba(0, 0, 0, 0.2);
}

/* ========================================
   Base Styles
   ======================================== */
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: var(--font-sans);
  color: var(--color-text);
  background-color: var(--color-background);
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  transition: background-color var(--transition-slow),
    color var(--transition-slow);
}

/* ========================================
   App Container
   ======================================== */
.app-container {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
}

/* ========================================
   Skip Link (Accessibility)
   ======================================== */
.skip-link {
  position: absolute;
  left: 1rem;
  top: -100%;
  z-index: 9999;
  padding: 0.75rem 1rem;
  background: var(--color-dark);
  color: var(--color-light);
  border-radius: var(--radius-md);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.875rem;
  transition: top var(--transition-base);
  box-shadow: var(--shadow-mid);
}

.skip-link:focus {
  top: 1rem;
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* ========================================
   Selection Styles
   ======================================== */
::selection {
  background-color: var(--color-primary);
  color: white;
}

/* ========================================
   Focus Styles (Accessibility)
   ======================================== */
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* ========================================
   Scrollbar Styles
   ======================================== */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: var(--color-light);
}

::-webkit-scrollbar-thumb {
  background: var(--color-text-muted);
  border-radius: var(--radius-full);
}

::-webkit-scrollbar-thumb:hover {
  background: var(--color-primary);
}

/* ========================================
   Reduced Motion
   ======================================== */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* ========================================
   Print Styles
   ======================================== */
@media print {
  .skip-link,
  .scroll-to-top {
    display: none !important;
  }
}
</style>
