import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { Observer } from "gsap/Observer";
import { defineNuxtPlugin } from "nuxt/app";

export default defineNuxtPlugin((nuxtApp) => {
  gsap.registerPlugin(ScrollTrigger, Observer);

  if (import.meta.client) {
    gsap.registerPlugin(Draggable);
  }

  nuxtApp.provide("gsap", gsap);
  nuxtApp.provide("ScrollTrigger", ScrollTrigger);
  nuxtApp.provide("Draggable", Draggable);
  nuxtApp.provide("Observer", Observer);
});
