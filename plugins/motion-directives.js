// plugins/motion-directives.js
import { defineNuxtPlugin } from "#app";
import { useMotion } from "@vueuse/motion";

export default defineNuxtPlugin((nuxtApp) => {
  const motionConfig = nuxtApp.$config.public.motion.directives;

  nuxtApp.vueApp.directive("motion", {
    beforeMount(el, binding) {
      const directiveName = binding.arg;
      if (motionConfig[directiveName]) {
        useMotion(el, motionConfig[directiveName]);
      } else {
        console.warn(`Motion directive ${directiveName} is not defined`);
      }
    },
  });
});
