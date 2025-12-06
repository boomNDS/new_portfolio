<template>
  <section class="px-[1.5rem] md:px-[3rem] lg:px-[5rem] mt-10 mb-6">
    <div
      class="relative overflow-hidden rounded-3xl border-4 border-[#111] bg-gradient-to-br from-white via-[#f9f9f9] to-[#f4f4f4] shadow-[10px_10px_0px_0px_rgba(0,0,0,0.12)]"
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
          <p class="m-0 text-gray-600 text-base md:text-lg leading-relaxed">
            I craft full-stack experiences with clean UX, modern frontends, and
            production-ready backends. From Nuxt and Next.js to FastAPI and
            cloud pipelines—shipped end-to-end.
          </p>

          <div class="flex flex-wrap gap-3">
            <NuxtLink
              to="#showcase"
              :prefetch="false"
              class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-primary)] text-white font-semibold text-sm shadow-[var(--shadow-soft)] hover:-translate-y-[2px] transition-transform duration-150"
            >
              View showcase
              <span class="i-tabler:arrow-right text-lg"></span>
            </NuxtLink>
            <NuxtLink
              to="#experience"
              :prefetch="false"
              class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 border-[var(--color-border)] text-[var(--color-dark)] font-semibold text-sm shadow-[var(--shadow-soft)] hover:-translate-y-[2px] transition-transform duration-150"
            >
              Experience
              <span class="i-tabler:chart-candle text-lg"></span>
            </NuxtLink>
          </div>

          <div class="flex flex-wrap gap-2 text-sm text-gray-700">
            <span
              class="px-3 py-1 rounded-full bg-white border border-[#e5e7eb] shadow-[3px_3px_0px_rgba(0,0,0,0.06)]"
            >
              Nuxt / Next.js
            </span>
            <span
              class="px-3 py-1 rounded-full bg-white border border-[#e5e7eb] shadow-[3px_3px_0px_rgba(0,0,0,0.06)]"
            >
              FastAPI / Node
            </span>
            <span
              class="px-3 py-1 rounded-full bg-white border border-[#e5e7eb] shadow-[3px_3px_0px_rgba(0,0,0,0.06)]"
            >
              Tailwind / UI motion
            </span>
            <span
              class="px-3 py-1 rounded-full bg-white border border-[#e5e7eb] shadow-[3px_3px_0px_rgba(0,0,0,0.06)]"
            >
              AWS / GCP / CI/CD
            </span>
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
              :initial="{ opacity: 0, y: 16 }"
              :enter="{ opacity: 1, y: 0, transition: { delay: 0.05 } }"
              class="rounded-2xl border-4 border-[#111] bg-white/80 backdrop-blur-sm shadow-[8px_8px_0px_rgba(0,0,0,0.15)] p-5 flex items-center justify-between"
            >
              <div>
                <p class="m-0 text-sm text-gray-500">Current</p>
                <p class="m-0 text-lg font-semibold">BualoiTech · Full-Stack</p>
                <p class="m-0 text-sm text-gray-600">Aug 2025 - Present</p>
              </div>
              <span
                class="i-tabler:sparkles text-2xl text-[#7D26CD] animate-pulse"
              ></span>
            </div>

            <div
              v-motion
              :initial="{ opacity: 0, y: 18 }"
              :enter="{ opacity: 1, y: 0, transition: { delay: 0.12 } }"
              class="rounded-2xl border-4 border-[#111] bg-[#111] text-white shadow-[8px_8px_0px_rgba(0,0,0,0.15)] p-5 space-y-2"
            >
              <div class="flex items-center gap-2">
                <span
                  class="i-tabler:wave-square text-xl text-[#7D26CD]"
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
                class="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-[#7D26CD] transition-colors"
              >
                View live
                <span class="i-tabler:arrow-up-right text-base"></span>
              </NuxtLink>
            </div>

            <div
              v-motion
              :initial="{ opacity: 0, y: 20 }"
              :enter="{ opacity: 1, y: 0, transition: { delay: 0.18 } }"
              class="rounded-2xl border-4 border-[#111] bg-white shadow-[8px_8px_0px_rgba(0,0,0,0.15)] p-5 flex items-center justify-between"
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
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped>
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
</style>
