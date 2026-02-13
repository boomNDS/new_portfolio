<script setup lang="ts">
// Get current year
const currentYear = computed(() => new Date().getFullYear());

// Social links
const socialLinks = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/pachara-sriyodwieng-2a9503149",
    icon: "i-tabler:brand-linkedin",
  },
  {
    name: "GitHub",
    url: "https://github.com/boomNDS",
    icon: "i-tabler:brand-github",
  },
  {
    name: "Webring",
    url: "https://webring.wonderful.software/#pachorn.dev",
    icon: "custom",
    customIcon: "/img/webring.svg",
  },
];

// Quick links
const quickLinks = [
  { name: "Experience", href: "#experience" },
  { name: "Tech Stack", href: "#tech_stack" },
  { name: "Showcase", href: "#showcase" },
];
</script>

<template>
  <footer class="mt-auto bg-[var(--color-card)] border-t-2 sm:border-t-4 border-[var(--color-border)]">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <!-- CTA Section -->
      <div class="text-center mb-10 sm:mb-12">
        <p class="text-xs uppercase tracking-[0.3em] text-[var(--color-text-muted)] mb-3">
          Transmission open
        </p>
        <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--color-dark)] mb-3">
          Let's work together
        </h2>
        <p class="text-base sm:text-lg text-[var(--color-text)] mb-6 max-w-xl mx-auto">
          Have a project in mind? Let's discuss how I can help bring your ideas
          to life.
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
          <NuxtLink
            to="mailto:contact@pachorn.dev?Subject=Hello%20Boom"
            class="cursor-pointer group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-primary)] text-white font-semibold shadow-[var(--shadow-mid)] hover:shadow-[var(--shadow-strong)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2"
          >
            <span class="i-tabler:message-circle text-lg" aria-hidden="true" />
            Let's talk
          </NuxtLink>
          <NuxtLink
            to="https://cal.com/pachara-sri/30min"
            target="_blank"
            rel="noopener noreferrer"
            class="cursor-pointer group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-card)] border-2 border-[var(--color-border)] text-[var(--color-dark)] font-semibold shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-mid)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2"
          >
            <span class="i-tabler:calendar-event text-lg" aria-hidden="true" />
            Book a meeting
          </NuxtLink>
        </div>
      </div>

      <!-- Divider -->
      <div class="border-t border-[var(--color-border)]/20 my-8 sm:my-10" />

      <!-- Bottom Section -->
      <div class="flex flex-col sm:flex-row items-center justify-between gap-6">
        <!-- Brand -->
        <div class="text-center sm:text-left">
          <div class="flex items-center justify-center sm:justify-start mb-2">
            <img
              src="/img/logo.svg"
              alt="Logo"
              class="w-16 h-16 sm:w-20 sm:h-20"
              width="80"
              height="80"
            />
          </div>
          <p class="text-sm text-[var(--color-text-muted)]">
            © {{ currentYear }} All rights reserved.
          </p>
        </div>

        <!-- Quick Links -->
        <nav aria-label="Footer navigation" class="hidden sm:block">
          <ul class="footer-nav flex items-center gap-6 list-none">
            <li v-for="link in quickLinks" :key="link.name">
              <a
                :href="link.href"
                class="cursor-pointer text-sm text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors duration-200"
              >
                {{ link.name }}
              </a>
            </li>
          </ul>
        </nav>

        <!-- Social Links -->
        <div class="flex items-center gap-3">
          <NuxtLink
            v-for="social in socialLinks"
            :key="social.name"
            :to="social.url"
            target="_blank"
            rel="noopener noreferrer"
            class="cursor-pointer w-10 h-10 flex items-center justify-center rounded-xl bg-[var(--color-light)] text-[var(--color-dark)] hover:bg-[var(--color-primary)] hover:text-white transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
            :aria-label="`${social.name} profile`"
          >
            <img
              v-if="social.customIcon"
              :src="social.customIcon"
              alt=""
              class="w-5 h-5"
              width="20"
              height="20"
            />
            <span v-else :class="[social.icon, 'text-xl']" aria-hidden="true" />
          </NuxtLink>
        </div>
      </div>

      <!-- Made with love -->
      <p class="text-center text-xs text-[var(--color-text-muted)] mt-8">
        Made with 💖 using Nuxt.js & UnoCSS
      </p>
    </div>
  </footer>
</template>

<style scoped>
.footer-nav,
.footer-nav li {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
