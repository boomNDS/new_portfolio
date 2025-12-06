export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1.0" },
        { charset: "utf-8" },
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
    "@nuxt/content",
    "@vueuse/motion/nuxt",
  ],

  robots: {
    UserAgent: "*",
    Disallow: "/",
  },

  router: {
    options: {
      scrollBehavior: () => ({ behavior: "smooth" }),
    },
  },

  dayjs: {
    plugins: ["relativeTime", "timezone"],
    defaultTimezone: "Asia/Bangkok",
  },

  content: {
    _localDatabase: {
      type: "sqlite",
      filename: ".data/content/contents.sqlite",
    },
    experimental: {
      // Use built-in Node sqlite to avoid native bindings like better-sqlite3.
      sqliteConnector: "native",
    },
  },

  runtimeConfig: {
    public: {},
  },

  plugins: ["~/plugins/motion.client.ts"],
  compatibilityDate: "2024-12-06",
});
