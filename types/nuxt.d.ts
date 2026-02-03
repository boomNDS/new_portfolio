/**
 * Type declarations for Nuxt.js application
 * Extends NuxtApp and Vue ComponentCustomProperties interfaces
 */

import type { animate, inView } from "motion";

declare module "#app" {
  interface NuxtApp {
    $motionAnimate: typeof animate;
    $motionInView: typeof inView;
  }
}

declare module "vue" {
  interface ComponentCustomProperties {
    $motionAnimate: typeof animate;
    $motionInView: typeof inView;
  }
}

// Make sure this file is treated as a module
export {};
