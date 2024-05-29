// uno.config.ts
import { defineConfig } from "unocss";
import presetUno from "@unocss/preset-uno";
import presetIcons from "@unocss/preset-icons";
import presetAttributify from "@unocss/preset-attributify";

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      extraProperties: {
        display: "inline-block",
        "vertical-align": "middle",
      },
    }),
    presetAttributify({
      /* preset options */
    }),
  ],
});
