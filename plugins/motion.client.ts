import { animate, inView } from "motion";
import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      motionAnimate: animate,
      motionInView: inView,
    },
  };
});
