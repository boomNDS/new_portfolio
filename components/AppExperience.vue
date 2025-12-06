<template>
  <div class="mx-auto px-[2rem] lg:px-[5rem] mb-10 max-w-5xl">
    <div class="mb-6 space-y-2">
      <p class="text-sm uppercase tracking-[0.2em] text-gray-500">Experience</p>
      <h2 class="title m-0 text-[var(--color-dark)]">
        Talk about Ex-(perience)
      </h2>
      <p class="text-gray-600">
        Highlights from roles where I’ve shipped full-stack products, scaled
        platforms, and refined UX flows.
      </p>
    </div>

    <section class="relative">
      <div
        class="hidden md:block absolute left-[28px] top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#7D26CD] via-[#7D26CD]/40 to-transparent"
      ></div>

      <div class="flex flex-col gap-5">
        <article
          v-for="(card, index) in displayCards"
          :key="index"
          class="relative md:pl-20"
        >
          <div
            class="hidden md:flex absolute left-0 top-7 w-14 h-14 items-center justify-center rounded-full border-4 border-[var(--color-border)] bg-white shadow-[var(--shadow-soft)]"
          >
            <img
              :src="card.logoSrc"
              :alt="card.logoAlt"
              loading="lazy"
              class="w-10 h-10 object-contain"
            />
          </div>

          <div
            class="rounded-xl border-4 border-[var(--color-border)] bg-white shadow-[var(--shadow-mid)] p-5"
          >
            <div
              class="flex flex-col md:flex-row md:items-start md:justify-between gap-3"
            >
              <div class="flex items-start gap-3">
                <img
                  :src="card.logoSrc"
                  :alt="card.logoAlt"
                  loading="lazy"
                  class="w-12 h-12 object-contain rounded-lg border border-[#e5e7eb] md:hidden"
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
                      class="px-2 py-1 rounded-full text-xs font-semibold bg-[#7D26CD]/10 text-[#7D26CD] border border-[#7D26CD]/30"
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
                class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#7D26CD] text-white uppercase tracking-wide shadow-[3px_3px_0px_rgba(0,0,0,0.16)]"
              >
                {{ card.employmentType }}
              </div>
            </div>

            <p class="mt-3 mb-0 text-sm text-gray-700 leading-relaxed">
              {{ card.description }}
            </p>

            <ul class="mt-3 mb-0 space-y-1 text-sm text-gray-800">
              <li
                v-for="(item, idx) in card.listItems"
                :key="idx"
                class="flex items-start gap-2"
              >
                <span
                  class="mt-[6px] inline-block w-2 h-2 rounded-full bg-[#7D26CD]"
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
import { computed, ref } from "vue";

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
    subtitle: "Full-Stack, Aug 2025 - Current (Full-Time)",
    description:
      "Building full-stack products and platform capabilities with a focus on modern web stacks, API integrations, and cloud deployments.",
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
      "Experienced in full-stack development, designing database architecture, and building both backend and frontend systems. I handle end-to-end deployment on DigitalOcean and integrate external APIs like KBank. Focused on delivering scalable, efficient web solutions.",
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
      "Established Nuxt.js projects for modern web applications, streamlining development and enhancing user experiences. Mapped task userflows for smooth navigation and developed APIs with Next.js to enrich overall functionality.",
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
      "Created a memory matching game with React while also crafting a Line Messaging Controller for scheduling and dispatching content.",
    listItems: [],
  },
  {
    logoSrc: "/img/company/opn_logo.png",
    logoAlt: "opn logo",
    title: "OPN",
    subtitle: "Tech-intern, Apr 2021 - June 2021,  (Internship)",
    description:
      "As an intern at our tech company, I utilize the Phoenix framework as our coding language. My tasks involve uploading images to AWS S3, creating endpoints, querying data, and writing unit tests to ensure the reliability of our systems.",
    listItems: [],
  },
  {
    logoSrc: "/img/company/startup_uni_logo.png",
    logoAlt: "startup unicorn logo",
    title: "Startup unicorn (Dopple)",
    subtitle: "Full-Stack, Aug 2020 - Nov 2020 (Internship)",
    description:
      "In my role as a Full-Stack developer using Django, I'm responsible for connecting the front-end and back-end functionalities of our",
    listItems: [],
  },
]);

const parseSubtitle = (subtitle: string) => {
  const [rolePart, ...rest] = subtitle.split(",");
  const timeframe = rest.join(",").trim();
  const employmentType = subtitle.match(/\(([^)]+)\)/)?.[1] || "";
  return { role: rolePart?.trim() || subtitle, timeframe, employmentType };
};

const displayCards = computed(() =>
  cards.value.map((card) => {
    const meta = parseSubtitle(card.subtitle);
    return {
      ...card,
      ...meta,
      isCurrent: /current/i.test(card.subtitle),
    };
  }),
);
</script>

<style scoped></style>
