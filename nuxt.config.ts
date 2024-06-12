// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1.0",
          charset: "utf-8",
        },
      ],
    },
  },
  devtools: { enabled: true },
  modules: [
    "@nuxt/eslint",
    "@nuxt/test-utils/module",
    "@vueuse/nuxt",
    "@nuxt/image",
    "@nuxtjs/robots",
    "@unocss/nuxt",
    "dayjs-nuxt",
    "@formkit/auto-animate",
  ],
  robots: {
    rules: {
      UserAgent: "*",
      Disallow: "/",
    },
  },
  router: {
    options: {
      scrollBehaviorType: "smooth",
    },
  },
  dayjs: {
    plugins: ["relativeTime", "timezone"],
    defaultTimezone: "Asia/Bangkok",
  },
});
