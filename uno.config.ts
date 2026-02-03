import presetIcons from "@unocss/preset-icons";
import presetTypography from "@unocss/preset-typography";
import presetUno from "@unocss/preset-uno";
import presetWebFonts from "@unocss/preset-web-fonts";
import { defineConfig } from "unocss";

const isTest = process.env.NODE_ENV === "test";
const disableWebFonts = process.env.CI === "true" || process.env.DISABLE_WEBFONTS === "true";

export default defineConfig({
  preflights: [],
  presets: [
    presetUno({}),
    presetIcons({
      extraProperties: {
        display: "inline-block",
        "vertical-align": "middle",
      },
    }),
    presetTypography(),
    ...(!isTest && !disableWebFonts
      ? [
          presetWebFonts({
            provider: "google",
            inlineImports: false,
            fonts: {
              athiti: {
                name: "Athiti",
                weights: ["200", "300", "400", "500", "600", "700"],
              },
            },
          }),
        ]
      : []),
  ],
  theme: {
    colors: {
      // Brand colors
      primary: "#7D26CD",
      accent: "#f5c243",

      // Semantic colors
      dark: "#111111",
      light: "#f4f4f4",
      card: "#ffffff",
      border: "#111111",
      text: "#1f2937",
      "text-muted": "#6b7280",
      background: "#f4f4f4",

      // Legacy colors (for backward compatibility)
      blue: "#1fb6ff",
      purple: "#7e5bef",
      pink: "#ff49db",
      orange: "#ff7849",
      green: "#13ce66",
      yellow: "#ffc82c",
      "gray-dark": "#273444",
      gray: "#8492a6",
      "gray-light": "#d3dce6",
      black: "#333333",
      white: "#f2f2f2",
    },
    breakpoints: {
      xs: "320px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  shortcuts: {
    // Layout shortcuts
    container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
    "container-narrow": "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8",

    // Component shortcuts
    btn: "inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-offset-2",
    "btn-primary": "btn bg-primary text-white shadow-md hover:shadow-lg hover:-translate-y-0.5",
    "btn-secondary":
      "btn bg-card border-2 border-border text-dark shadow-sm hover:shadow-md hover:-translate-y-0.5",

    card: "rounded-2xl border-2 sm:border-4 border-border bg-card shadow-soft transition-all duration-300",
    "card-hover": "card hover:shadow-mid hover:-translate-y-1",

    // Typography shortcuts
    title: "text-2xl sm:text-3xl lg:text-4xl font-bold text-dark",
    subtitle: "text-lg sm:text-xl text-text",
    "text-muted": "text-text-muted text-sm",
  },
  rules: [
    // Custom shadow utilities
    [
      /^shadow-(soft|mid|strong)$/,
      ([, name]) => ({
        "box-shadow": `var(--shadow-${name})`,
      }),
    ],
  ],
});
