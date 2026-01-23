<template>
  <div class="mx-auto px-[2rem] lg:px-[5rem] mb-16 max-w-5xl pt-6">
    <div class="mb-6 space-y-2">
      <p class="text-sm uppercase tracking-[0.2em] text-gray-500">Experience</p>
      <h2 class="title m-0 text-[var(--color-dark)]">
        Professional experience
      </h2>
      <p class="text-gray-600">
        Highlights from roles where I’ve shipped full-stack products, scaled
        platforms, and refined UX flows.
      </p>
        <div class="flex flex-wrap items-center gap-2 pt-1">
        <p class="m-0 text-xs uppercase tracking-[0.18em] text-gray-500">
          Teams I’ve worked with
        </p>
        <div class="flex flex-wrap items-center gap-2">
          <div
            class="h-10 w-10 rounded-full bg-[var(--color-card)] border border-[var(--color-border)]/10 shadow-[var(--shadow-soft)] flex items-center justify-center p-1"
          >
            <img
              src="/img/company/bualoi.png"
              alt="BualoiTech logo"
              class="h-7 w-7 object-contain"
              loading="lazy"
              width="28"
              height="28"
            />
          </div>
          <div
            class="h-10 w-10 rounded-full bg-[var(--color-card)] border border-[var(--color-border)]/10 shadow-[var(--shadow-soft)] flex items-center justify-center p-1"
          >
            <img
              src="/img/company/skuberg_logo.jpeg"
              alt="Skuberg logo"
              class="h-7 w-7 object-contain"
              loading="lazy"
              width="28"
              height="28"
            />
          </div>
          <div
            class="h-10 w-10 rounded-full bg-[var(--color-card)] border border-[var(--color-border)]/10 shadow-[var(--shadow-soft)] flex items-center justify-center p-1"
          >
            <img
              src="/img/company/globish_logo.png"
              alt="Globish Academia logo"
              class="h-7 w-7 object-contain"
              loading="lazy"
              width="28"
              height="28"
            />
          </div>
          <div
            class="h-10 w-10 rounded-full bg-[var(--color-card)] border border-[var(--color-border)]/10 shadow-[var(--shadow-soft)] flex items-center justify-center p-1"
          >
            <img
              src="/img/company/opn_logo.png"
              alt="OPN logo"
              class="h-7 w-7 object-contain"
              loading="lazy"
              width="28"
              height="28"
            />
          </div>
        </div>
      </div>
    </div>

    <section class="relative">
      <div
        class="hidden md:block absolute left-[28px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-[var(--color-primary)]/40 via-[var(--color-primary)]/20 to-transparent"
      ></div>

      <div class="flex flex-col gap-5">
        <article
          v-for="(card, index) in displayCards"
          :key="index"
          :ref="(el) => setCardRef(el as HTMLElement | null, index)"
          class="relative md:pl-20"
        >
          <div
            class="hidden md:flex absolute left-0 top-7 w-14 h-14 items-center justify-center rounded-full border-4 border-[var(--color-border)] bg-[var(--color-card)] shadow-[var(--shadow-soft)]"
          >
            <img
              :src="card.logoSrc"
              :alt="card.logoAlt"
              loading="lazy"
              class="w-10 h-10 object-contain"
              width="40"
              height="40"
            />
          </div>

          <div
            class="rounded-xl border-4 border-[var(--color-border)] bg-[var(--color-card)] shadow-[var(--shadow-mid)] p-5"
          >
            <div
              class="flex flex-col md:flex-row md:items-start md:justify-between gap-3"
            >
              <div class="flex items-start gap-3">
                <img
                  :src="card.logoSrc"
                  :alt="card.logoAlt"
                  loading="lazy"
                  class="w-12 h-12 object-contain rounded-lg border border-[var(--color-border)]/15 md:hidden"
                  width="48"
                  height="48"
                />
                <div>
                  <div class="flex items-center gap-2 flex-wrap">
                    <h3
                      class="m-0 text-xl font-semibold text-[var(--color-dark)]"
                    >
                      {{ card.title }}
                    </h3>
                    <span
                      v-if="card.isCurrent"
                      class="px-2 py-1 rounded-full text-xs font-semibold bg-[var(--color-primary)]/12 text-[var(--color-primary)] border border-[var(--color-primary)]/30"
                    >
                      Current
                    </span>
                  </div>
                  <p class="m-0 text-sm text-gray-700">{{ card.role }}</p>
                  <p class="m-0 text-sm text-gray-500">{{ card.timeframe }}</p>
                </div>
              </div>
              <div
                v-if="card.employmentType"
                class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--color-primary)] text-[var(--color-light)] uppercase tracking-wide shadow-[3px_3px_0px_rgba(0,0,0,0.16)]"
              >
                {{ card.employmentType }}
              </div>
            </div>

            <p class="mt-3 mb-0 text-sm text-gray-700 leading-relaxed">
              {{ card.description }}
            </p>

            <ul class="mt-3 mb-0 space-y-1 text-sm text-gray-800 md:columns-2">
              <li
                v-for="(item, idx) in card.listItems"
                :key="idx"
                class="flex items-start gap-2 break-inside-avoid"
              >
                <span
                  class="mt-[6px] inline-block w-2 h-2 rounded-full bg-[var(--color-primary)]"
                  aria-hidden="true"
                ></span>
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from "vue";
import { usePreferredReducedMotion } from "@vueuse/core";

interface ExperienceCard {
  logoSrc: string;
  logoAlt: string;
  title: string;
  subtitle: string;
  description: string;
  listItems: string[];
}

const cards = ref<ExperienceCard[]>([
  {
    logoSrc: "/img/company/bualoi.png",
    logoAlt: "BualoiTech logo",
    title: "BualoiTech",
    subtitle: "Full-Stack, Aug 2025 - Jan 2026 (Full-Time)",
    description:
      "Shipped full-stack product features and platform upgrades, improving reliability and delivery speed across web and API surfaces.",
    listItems: [
      "Develop and maintain Next.js + TypeScript apps with Tailwind CSS and ShadCN UI.",
      "Build and scale Python/FastAPI services with RESTful APIs for internal and external consumers.",
      "Use Firebase and MongoDB for data handling, real-time features, and integrations.",
      "Lead architecture decisions, code reviews, performance tuning, and CI/CD automation.",
      "Operate with Docker and cloud platforms (AWS/GCP) for deployment and DevOps workflows.",
    ],
  },
  {
    logoSrc: "/img/company/skuberg_logo.jpeg",
    logoAlt: "Skuberg logo",
    title: "Skuberg",
    subtitle: "Full-Stack, Aug 2024 - Jan 2025 (Full-Time)",
    description:
      "Designed data models, delivered end-to-end features, and streamlined deployment workflows for stable releases and smoother integrations.",
    listItems: [
      "Database design & flow",
      "Backend & frontend development.",
      "API integration (KBank).",
      "Deployment on DigitalOcean.",
    ],
  },
  {
    logoSrc: "/img/company/globish_logo.png",
    logoAlt: "Globish logo",
    title: "Globish Academia",
    subtitle: "Full-Stack, Sep 2021 - Apr 2024 (Full-Time)",
    description:
      "Built Nuxt-based products, improved UX flows, and delivered API capabilities to support product growth and smoother user journeys.",
    listItems: [
      "Developed an automated scoring system for streamlined summary and report generation.",
      "Revitalized email marketing for an enhanced user experience.",
    ],
  },
  {
    logoSrc: "/img/company/hlab.png",
    logoAlt: "h-lab logo",
    title: "H-Lab",
    subtitle: "Software engineer, Aug 2021 - Aug 2021 (Freelance)",
    description:
      "Delivered a React memory game and a LINE messaging controller to automate scheduling and content delivery.",
    listItems: [],
  },
  {
    logoSrc: "/img/company/opn_logo.png",
    logoAlt: "opn logo",
    title: "OPN",
    subtitle: "Tech-intern, Apr 2021 - June 2021,  (Internship)",
    description:
      "Built Phoenix endpoints, automated uploads to AWS S3, and wrote tests to improve system stability and data reliability.",
    listItems: [],
  },
  {
    logoSrc: "/img/company/startup_uni_logo.png",
    logoAlt: "startup unicorn logo",
    title: "Startup unicorn (Dopple)",
    subtitle: "Full-Stack, Aug 2020 - Nov 2020 (Internship)",
    description:
      "Connected Django frontend and backend flows to complete product functionality and support faster iteration.",
    listItems: [],
  },
]);

const parseSubtitle = (subtitle: string) => {
  const [rolePart, ...rest] = subtitle.split(",");
  const timeframe = rest.join(",").trim();
  const employmentType = subtitle.match(/\(([^)]+)\)/)?.[1] || "";
  return { role: rolePart?.trim() || subtitle, timeframe, employmentType };
};

const cardRefs = ref<HTMLElement[]>([]);
const { $motionAnimate, $motionInView } = useNuxtApp();
const reducedMotion = import.meta.client
  ? usePreferredReducedMotion()
  : ref<"no-preference" | "reduce">("no-preference");

const displayCards = computed(() =>
  cards.value.map((card) => {
    const meta = parseSubtitle(card.subtitle);
    return {
      ...card,
      ...meta,
      listItems: card.listItems.slice(0, 3),
      isCurrent: /current/i.test(card.subtitle),
    };
  }),
);

const setCardRef = (el: HTMLElement | null, index: number) => {
  if (el) {
    cardRefs.value[index] = el;
  }
};

const animateCards = () => {
  if (reducedMotion.value === "reduce") return;
  if (!$motionAnimate || !$motionInView) return;
  cardRefs.value.forEach((el, index) => {
    if (!el) return;
    $motionInView(
      el,
      () =>
        $motionAnimate(
          el,
          { opacity: [0, 1], y: [14, 0] },
          { duration: 0.45, delay: index * 0.06, easing: [0.22, 1, 0.36, 1] },
        ),
      { amount: 0.2, once: true },
    );
  });
};

onMounted(() => {
  nextTick(animateCards);
});

watch(
  displayCards,
  () => {
    nextTick(animateCards);
  },
  { flush: "post" },
);
</script>

<style scoped></style>
