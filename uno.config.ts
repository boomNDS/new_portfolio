// uno.config.ts
import { defineConfig } from "unocss";
import presetUno from "@unocss/preset-uno";
import presetIcons from "@unocss/preset-icons";
import presetAttributify from "@unocss/preset-attributify";
import presetWebFonts from "@unocss/preset-web-fonts";

export default defineConfig({
  presets: [
    presetUno({}),
    presetIcons({
      extraProperties: {
        display: "inline-block",
        "vertical-align": "middle",
      },
    }),
    presetAttributify({
      /* preset options */
    }),
    presetWebFonts({
      provider: "google",
      fonts: {
        athiti: {
          name: "Athiti",
          weights: ["200", "300", "400", "500", "600", "700"],
        },
      },
    }),
  ],
  theme: {
    colors: {
      blue: "#1fb6ff",
      purple: "#7e5bef",
      pink: "#ff49db",
      orange: "#ff7849",
      green: "#13ce66",
      yellow: "#ffc82c",
      "gray-dark": "#273444",
      gray: "#8492a6",
      "gray-light": "#d3dce6",
      primary: "#7D26CD",
      black: "#333333",
      white: "#f2f2f2",
    },
  },
  shortcuts: {
    title: "text-[1.375rem] min-[1045px]:text-[2.375rem] font-medium",
  },
});
