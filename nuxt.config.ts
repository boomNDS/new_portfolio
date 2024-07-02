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
    "@nuxt/content",
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
  nitro: {
    compressPublicAssets: true,
  },
  hooks: {
    "build:manifest": (manifest) => {
      // find the app entry, css list
      const css = manifest["node_modules/nuxt/dist/app/entry.js"]?.css;
      if (css) {
        // start from the end of the array and go to the beginning
        for (let i = css.length - 1; i >= 0; i--) {
          // if it starts with 'entry', remove it from the list
          if (css[i].startsWith("entry")) css.splice(i, 1);
        }
      }
    },
  },
});
