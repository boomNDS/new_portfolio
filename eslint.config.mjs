// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

// Align linting with Prettier’s self-closing output for void elements.
export default withNuxt({
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
