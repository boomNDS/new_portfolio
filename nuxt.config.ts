export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1.0" },
        { charset: "utf-8" },
      ],
      link: [
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&display=swap",
        },
      ],
    },
  },

  devtools: { enabled: true },

  modules: [
    "@nuxt/test-utils/module",
    "@vueuse/nuxt",
    "@nuxt/image",
    "@nuxtjs/robots",
    "@unocss/nuxt",
    "dayjs-nuxt",
    "@nuxt/content",
    "motion-v/nuxt",
  ],

  robots: {
    disallow: ["/"],
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
    _localDatabase: {
      type: "sqlite",
      filename: ".data/content/contents.sqlite",
    },
    experimental: {
      // Use built-in Node sqlite to avoid native bindings like better-sqlite3.
      sqliteConnector: "native",
    },
    build: {
      markdown: {
        highlight: {
          theme: {
            default: "github-light",
            dark: "github-dark",
          },
          langs: [
            "javascript",
            "typescript",
            "vue",
            "vue-html",
            "css",
            "scss",
            "html",
            "json",
            "yaml",
            "markdown",
            "md",
            "bash",
            "shell",
            "dockerfile",
            "python",
            "rust",
            "go",
            "sql",
            "prisma",
          ],
        },
      },
    },
  },

  runtimeConfig: {
    public: {},
  },

  compatibilityDate: "2024-12-06",

  nitro: {
    prerender: {
      crawlLinks: false,
      routes: ["/"],
      ignore: ["/__nuxt_content/content/sql_dump.txt", "/blog/**", "/dev-logs/**", "/learning/**"],
    },
  },

  vite: {
    plugins: [
      {
        name: "strip-unocss-placeholder",
        enforce: "pre",
        transform(code, id) {
          if (id.endsWith(".css") && code.includes("pascalCase(component)")) {
            return code.replace(
              /\.m\[pascalCase\(component\)\]\{margin:pascalCase\(component\);\}/g,
              "",
            );
          }
          return code;
        },
      },
    ],
  },
});
