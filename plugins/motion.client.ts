import { defineNuxtPlugin } from "#app";
import { animate, inView } from "motion";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      motionAnimate: animate,
      motionInView: inView,
    },
  };
});
