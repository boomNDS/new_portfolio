// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

const config = withNuxt();

// Align linting with Prettier’s self-closing output for Vue SFCs only.
config.append({
  files: ["**/*.vue"],
  rules: {
    "vue/html-self-closing": [
      "error",
      {
        html: {
          void: "always",
          normal: "never",
          component: "always",
        },
        svg: "always",
        math: "always",
      },
    ],
  },
});

export default config;
