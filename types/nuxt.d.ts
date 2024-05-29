import type { gsap, ScrollTrigger, Draggable, Observer } from "gsap";

declare module "#app" {
  interface NuxtApp {
    $gsap: typeof gsap;
    $ScrollTrigger: typeof ScrollTrigger;
    $Draggable: typeof Draggable;
    $Observer: typeof Observer;
  }
}

declare module "vue" {
  interface ComponentCustomProperties {
    $gsap: typeof gsap;
    $ScrollTrigger: typeof ScrollTrigger;
    $Draggable: typeof Draggable;
    $Observer: typeof Observer;
  }
}
