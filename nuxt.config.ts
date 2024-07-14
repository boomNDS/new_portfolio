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
    "@nuxt/content",
    "@vueuse/motion/nuxt",
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
  content: {
    contentHead: true,
  },
  runtimeConfig: {
    public: {
      motion: {
        directives: {
          "pop-bottom": {
            initial: {
              scale: 0,
              opacity: 0,
              y: 100,
            },
            visible: {
              scale: 1,
              opacity: 1,
              y: 0,
            },
          },
        },
      },
    },
  },
  plugins: ["~/plugins/motion-directives.js"],
});
