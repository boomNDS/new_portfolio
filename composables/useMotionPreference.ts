import { usePreferredReducedMotion } from "@vueuse/core";
import type { Ref } from "vue";

export type MotionPreference = "no-preference" | "reduce";

/**
 * Composable for respecting user's motion preferences
 * Returns a reactive reference to the user's reduced motion preference
 */
export function useMotionPreference(): Ref<MotionPreference> {
  const prefersReducedMotion = import.meta.client
    ? (usePreferredReducedMotion() as Ref<MotionPreference>)
    : ref<MotionPreference>("no-preference");

  return prefersReducedMotion;
}
