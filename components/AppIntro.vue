<template>
  <section class="px-[2rem] md:px-[3rem] lg:px-[5rem] mt-10 mb-14 pt-4">
    <div
      class="relative overflow-hidden rounded-3xl border-4 border-[var(--color-border)] shadow-[var(--shadow-strong)] hero-surface"
    >
      <div
        class="absolute inset-0 pointer-events-none opacity-60"
        style="
          background:
            radial-gradient(
              620px at 18% 18%,
              rgba(125, 38, 205, 0.12),
              transparent 40%
            ),
            radial-gradient(
              460px at 78% 12%,
              rgba(125, 38, 205, 0.08),
              transparent 36%
            );
        "
      ></div>

      <div class="relative grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 lg:p-10">
        <div class="space-y-4 lg:space-y-5">
          <div
            class="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-[var(--color-dark)] text-white text-xs font-semibold tracking-wide shadow-[4px_4px_0px_rgba(0,0,0,0.18)]"
          >
            <span
              class="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse"
              aria-hidden="true"
            ></span>
            Available for collaborations
          </div>
          <h1 class="m-0 text-3xl md:text-4xl leading-tight">
            Hello there, I’m
            <span class="text-[var(--color-primary)]">Boom</span><br />
            a
            <span class="bg-[var(--color-dark)] text-white px-2 py-1 rounded-md"
              >foodie developer</span
            >
          </h1>
          <p class="m-0 text-gray-600 text-base md:text-lg leading-7">
            I craft full-stack experiences with clean UX, modern frontends, and
            production-ready backends. From Nuxt and Next.js to FastAPI and
            cloud pipelines—shipped end-to-end.
          </p>

          <div class="flex flex-wrap gap-3">
            <NuxtLink
              to="mailto:contact@pachorn.dev?Subject=Hello%20Boom"
              :prefetch="false"
              class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-primary)] text-white font-semibold text-sm shadow-[var(--shadow-soft)] hover:-translate-y-[2px] transition-transform duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-light)]"
            >
              Let’s talk
              <span
                class="i-tabler:message-circle text-lg"
                aria-hidden="true"
              ></span>
            </NuxtLink>
            <NuxtLink
              to="https://cal.com/pachara-sri/30min"
              target="_blank"
              rel="noreferrer"
              :prefetch="false"
              class="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-[var(--color-card)] border-2 border-[var(--color-border)] text-[var(--color-dark)] font-semibold text-sm shadow-[var(--shadow-soft)] hover:-translate-y-[2px] transition-transform duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-light)]"
            >
              30‑min call
              <span
                class="i-tabler:calendar-event text-lg"
                aria-hidden="true"
              ></span>
            </NuxtLink>
          </div>

          <div class="flex flex-wrap gap-2 text-sm text-gray-700">
            <span
              class="px-3 py-1 rounded-full bg-[var(--color-card)] border border-[var(--color-border)]/10 shadow-[3px_3px_0px_rgba(0,0,0,0.06)]"
            >
              Nuxt / Next.js
            </span>
            <span
              class="px-3 py-1 rounded-full bg-[var(--color-card)] border border-[var(--color-border)]/10 shadow-[3px_3px_0px_rgba(0,0,0,0.06)]"
            >
              FastAPI / Node
            </span>
            <span
              class="px-3 py-1 rounded-full bg-[var(--color-card)] border border-[var(--color-border)]/10 shadow-[3px_3px_0px_rgba(0,0,0,0.06)]"
            >
              Tailwind / UI motion
            </span>
          </div>

          <div class="grid grid-cols-2 gap-3 sm:hidden">
            <div
              class="rounded-xl border-2 border-[var(--color-border)] bg-[var(--color-card)] px-3 py-2 shadow-[var(--shadow-soft)]"
            >
              <p class="m-0 text-xs uppercase tracking-[0.16em] text-gray-500">
                Projects shipped
              </p>
              <p class="m-0 text-lg font-semibold text-[var(--color-dark)]">
                {{ totalProjects }}
              </p>
            </div>
            <div
              class="rounded-xl border-2 border-[var(--color-border)] bg-[var(--color-card)] px-3 py-2 shadow-[var(--shadow-soft)]"
            >
              <p class="m-0 text-xs uppercase tracking-[0.16em] text-gray-500">
                Live demos
              </p>
              <p class="m-0 text-lg font-semibold text-[var(--color-dark)]">
                {{ liveDemos }}
              </p>
            </div>
          </div>

          <div class="hidden sm:grid grid-cols-2 gap-3">
            <div
              class="rounded-xl border-2 border-[var(--color-border)] bg-[var(--color-card)] px-3 py-2 shadow-[var(--shadow-soft)]"
            >
              <p class="m-0 text-xs uppercase tracking-[0.16em] text-gray-500">
                Projects shipped
              </p>
              <p class="m-0 text-lg font-semibold text-[var(--color-dark)]">
                {{ totalProjects }}
              </p>
            </div>
            <div
              class="rounded-xl border-2 border-[var(--color-border)] bg-[var(--color-card)] px-3 py-2 shadow-[var(--shadow-soft)]"
            >
              <p class="m-0 text-xs uppercase tracking-[0.16em] text-gray-500">
                Live demos
              </p>
              <p class="m-0 text-lg font-semibold text-[var(--color-dark)]">
                {{ liveDemos }}
              </p>
            </div>
          </div>
        </div>

        <div class="relative">
          <div
            class="absolute -left-6 -top-6 w-28 h-28 rounded-full bg-[var(--color-primary)]/10 blur-2xl animate-float-slow hidden lg:block"
          ></div>
          <div
            class="absolute -right-4 bottom-0 w-24 h-24 rounded-full bg-[var(--color-primary)]/10 blur-2xl animate-float hidden lg:block"
          ></div>

          <div class="grid gap-4">
            <div
              v-motion
              :initial="
                prefersReducedMotion === 'reduce' ? {} : { opacity: 0, y: 16 }
              "
              :enter="
                prefersReducedMotion === 'reduce'
                  ? {}
                  : { opacity: 1, y: 0, transition: { delay: 0.05 } }
              "
              class="rounded-2xl border-4 border-[var(--color-border)] bg-[var(--color-card)]/90 backdrop-blur-sm shadow-[8px_8px_0px_rgba(0,0,0,0.15)] p-5 flex items-center justify-between"
            >
              <div>
                <p class="m-0 text-sm text-gray-500">Recent</p>
                <p class="m-0 text-lg font-semibold">BualoiTech · Full-Stack</p>
                <p class="m-0 text-sm text-gray-600">Aug 2025 - Jan 2026</p>
              </div>
              <span
                class="i-tabler:sparkles text-2xl text-[var(--color-primary)] animate-pulse"
                aria-hidden="true"
              ></span>
            </div>

            <div
              v-motion
              :initial="
                prefersReducedMotion === 'reduce' ? {} : { opacity: 0, y: 18 }
              "
              :enter="
                prefersReducedMotion === 'reduce'
                  ? {}
                  : { opacity: 1, y: 0, transition: { delay: 0.12 } }
              "
              class="rounded-2xl border-4 border-[var(--color-border)] bg-[var(--color-dark)] text-[var(--color-light)] shadow-[8px_8px_0px_rgba(0,0,0,0.15)] p-5 space-y-2"
            >
              <div class="flex items-center gap-2">
                <span
                  class="i-tabler:wave-square text-xl text-[var(--color-primary)]"
                  aria-hidden="true"
                ></span>
                <p
                  class="m-0 text-sm uppercase tracking-[0.18em] text-gray-300"
                >
                  Fresh drop
                </p>
              </div>
              <p class="m-0 text-lg font-semibold">SayonStream</p>
              <p class="m-0 text-sm text-gray-300">
                Preview your donation message in the streamer’s TTS voice before
                you send it.
              </p>
              <NuxtLink
                to="https://sayonstream.vercel.app/"
                target="_blank"
                rel="noreferrer"
                :prefetch="false"
                class="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-light)] hover:text-[var(--color-primary)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-dark)] rounded"
              >
                View live
                <span
                  class="i-tabler:arrow-up-right text-base"
                  aria-hidden="true"
                ></span>
              </NuxtLink>
            </div>

            <div
              v-motion
              :initial="
                prefersReducedMotion === 'reduce' ? {} : { opacity: 0, y: 20 }
              "
              :enter="
                prefersReducedMotion === 'reduce'
                  ? {}
                  : { opacity: 1, y: 0, transition: { delay: 0.18 } }
              "
              class="rounded-2xl border-4 border-[var(--color-border)] bg-[var(--color-card)] shadow-[8px_8px_0px_rgba(0,0,0,0.15)] p-5 flex items-center justify-between"
            >
              <div class="space-y-1">
                <p class="m-0 text-sm text-gray-500">Latest landing page</p>
                <p class="m-0 text-base font-semibold">Horange Phuket Town</p>
                <p class="m-0 text-sm text-gray-600">
                  Hospitable, bright, and bookable.
                </p>
              </div>
              <img
                src="/img/lucide_sparkle.svg"
                alt="sparkle icon"
                class="w-10 h-10 animate-float-slow"
                loading="lazy"
                width="40"
                height="40"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { usePreferredReducedMotion } from "@vueuse/core";
import showcaseData from "~/public/showcase.json";

const prefersReducedMotion = import.meta.client
  ? usePreferredReducedMotion()
  : ref<"no-preference" | "reduce">("no-preference");

const totalProjects = computed(() => showcaseData.length);
const uniqueTags = computed(() => {
  const tagSet = new Set<string>();
  showcaseData.forEach((item) => {
    item.tags?.forEach((tag: string) => tagSet.add(tag));
  });
  return tagSet.size;
});
const liveDemos = computed(() => {
  let count = 0;
  showcaseData.forEach((item) => {
    item.links?.forEach((link: { type: string; url: string }) => {
      if (link.url && link.type !== "design") count += 1;
    });
  });
  return count;
});
</script>

<style scoped>
@layer components {
  .hero-surface {
    background: linear-gradient(
      135deg,
      var(--color-card) 0%,
      var(--color-light) 50%,
      var(--color-card) 100%
    );
  }
  :global([data-theme="dark"]) .hero-surface {
    background: linear-gradient(
      135deg,
      var(--color-light) 0%,
      var(--color-card) 50%,
      var(--color-light) 100%
    );
  }
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-6px);
  }
  100% {
    transform: translateY(0px);
  }
}

@keyframes float-slow {
  0% {
    transform: translateY(0px) scale(1);
  }
  50% {
    transform: translateY(-8px) scale(1.02);
  }
  100% {
    transform: translateY(0px) scale(1);
  }
}

.animate-float {
  animation: float 5s ease-in-out infinite;
}

.animate-float-slow {
  animation: float-slow 7s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .animate-float,
  .animate-float-slow {
    animation: none;
  }
}
</style>
