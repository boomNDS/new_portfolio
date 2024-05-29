// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  build: {
    transpile: ["gsap"],
  },
  plugins: ["~/plugins/gsap"],
  modules: [
    "@nuxt/eslint",
    "@pinia/nuxt",
    "@nuxt/test-utils/module",
    "@vueuse/nuxt",
    "@nuxt/image",
    "@nuxtjs/robots",
    "@unocss/nuxt",
  ],
  robots: {
    rules: {
      UserAgent: "*",
      Disallow: "",
    },
  },
});
