<script setup lang="ts">
import { useAnimate, useInView } from "motion-v";
import type { Experience, ParsedExperience } from "~/types";

// Composables
const prefersReducedMotion = useMotionPreference();
const [scope, animate] = useAnimate();
const scopeEl = computed<HTMLElement | null>(
  () => (scope.value as HTMLElement | null) ?? null,
);
const sectionInView = useInView(scopeEl);

// Experience data - Merged old details with new concise format
const experiences = ref<Experience[]>([
  {
    logoSrc: "/img/company/buddy_ninja_logo.jpeg",
    logoAlt: "Buddy.ninja logo",
    title: "Buddy.ninja",
    subtitle: "Software Engineer, Jul 2025 - Present (Part-Time) · Remote",
    description:
      "Building cross-platform Flutter apps for pet wearables with scalable backend systems. Established CI/CD pipelines and engineering best practices.",
    listItems: [
      "Built Flutter mobile apps (iOS/Android) with user-friendly interfaces for pet parents",
      "Developed scalable backend systems powering wearable devices with real-time data sync",
      "Integrated IoT connectivity between hardware and software for seamless experiences",
      "Established CI/CD pipelines and early engineering best practices",
    ],
  },
  {
    logoSrc: "/img/company/bualoi.png",
    logoAlt: "BualoiTech logo",
    title: "BualoiTech",
    subtitle: "Full-Stack Developer, Aug 2025 - Jan 2026 (Full-Time) · Hybrid",
    description:
      "Delivered 6+ UI flows with Next.js and TypeScript. Built backend services with FastAPI and Hono, integrating Firebase and MongoDB for real-time features.",
    listItems: [
      "Developed full-stack applications using Next.js, TypeScript, Tailwind CSS, and shadCN UI",
      "Built and scaled backend services with Python, FastAPI, and Hono (Express-like framework)",
      "Designed and consumed RESTful APIs for internal and external integrations",
      "Integrated Firebase and MongoDB for real-time features and efficient data handling",
      "Containerized services with Docker and deployed to GCP (~50% setup time reduction)",
    ],
  },
  {
    logoSrc: "/img/company/skuberg_logo.jpeg",
    logoAlt: "Skuberg logo",
    title: "Skuberg",
    subtitle: "Full-Stack Engineer, Aug 2024 - Jan 2025 (Full-Time) · On-site",
    description:
      "Designed database architecture and built scalable systems with Vue/React and Elysia.js. Managed DigitalOcean deployments and integrated KBank payment APIs.",
    listItems: [
      "Designed database architecture and implemented scalable backend/frontend systems",
      "Built backend services using Elysia.js (Express-like) for fast, maintainable APIs",
      "Integrated KBank payment APIs, reducing manual reconciliation effort by ~30%",
      "Managed end-to-end deployment on DigitalOcean using CapRover (<30 min releases)",
    ],
  },
  {
    logoSrc: "/img/company/globish_logo.png",
    logoAlt: "Globish Academia logo",
    title: "Globish Academia",
    subtitle: "Full-Stack Engineer, Sept 2021 - Apr 2024 (Full-Time) · Bangkok",
    description:
      "Established Nuxt.js project with reusable components. Built Nest.js APIs to automate workflows and reduce manual processing time.",
    listItems: [
      "Established Nuxt.js project with streamlined development and enhanced UX",
      "Mapped user flows for seamless navigation and improved usability",
      "Built Nest.js APIs to automate manual workflows (~40% processing time reduction)",
    ],
  },
  {
    logoSrc: "/img/company/hlab.png",
    logoAlt: "H-Lab logo",
    title: "H-Lab",
    subtitle: "Software Engineer, Aug 2021 (Freelance) · Bangkok",
    description:
      "Developed React memory matching game with intuitive UI/UX. Built LINE Messaging Controller to automate communication workflows.",
    listItems: [
      "Developed memory matching game using React with engaging UI/UX",
      "Designed LINE Messaging Controller to schedule and dispatch content",
    ],
  },
  {
    logoSrc: "/img/company/opn_logo.png",
    logoAlt: "OPN logo",
    title: "OPN",
    subtitle: "Tech Intern, Apr 2021 - June 2021 (Internship) · Bangkok",
    description:
      "Built Phoenix API endpoints, automated AWS S3 image uploads, and wrote unit tests to improve system stability.",
    listItems: [
      "Built API endpoints and queries using Phoenix framework",
      "Automated image uploads to AWS S3",
      "Wrote unit tests to improve code quality",
    ],
  },
  {
    logoSrc: "/img/company/startup_uni_logo.png",
    logoAlt: "Startup Unicorn logo",
    title: "Startup Unicorn (Follovv)",
    subtitle: "Full-Stack Developer, Aug 2020 - Nov 2020 (Internship) · Bangkok",
    description:
      "Developed APIs and data flows using Django to connect frontend and backend components for the Follovv platform.",
    listItems: [
      "Built APIs and data flows using Django",
      "Connected frontend and backend components",
    ],
  },
]);

// Company logos for quick view
const companyLogos = [
  { src: "/img/company/buddy_ninja_logo.jpeg", alt: "Buddy.ninja" },
  { src: "/img/company/bualoi.png", alt: "BualoiTech" },
  { src: "/img/company/skuberg_logo.jpeg", alt: "Skuberg" },
  { src: "/img/company/globish_logo.png", alt: "Globish" },
  { src: "/img/company/hlab.png", alt: "H-Lab" },
  { src: "/img/company/opn_logo.png", alt: "OPN" },
  { src: "/img/company/startup_uni_logo.png", alt: "Startup Unicorn" },
];

// Tech stack tags for each experience
const techStacks: Record<string, string[]> = {
  "Buddy.ninja": ["Flutter", "IoT", "AWS", "CI/CD"],
  BualoiTech: ["Next.js", "TypeScript", "Tailwind", "FastAPI", "Hono", "Firebase", "GCP", "Docker"],
  Skuberg: ["Vue.js", "React", "Elysia.js", "Node.js", "DigitalOcean", "CapRover", "KBank APIs"],
  "Globish Academia": ["Nuxt.js", "Nest.js", "Node.js"],
  "H-Lab": ["React", "JavaScript", "LINE API"],
  OPN: ["Phoenix", "Elixir", "AWS S3"],
  "Startup Unicorn (Follovv)": ["Django", "Python"],
};

// Parse experience data
const parsedExperiences = computed<ParsedExperience[]>(() =>
  experiences.value.map((exp) => {
    const [rolePart, ...rest] = exp.subtitle.split(",");
    const timeframe = rest.join(",").trim();
    const employmentType = exp.subtitle.match(/\(([^)]+)\)/)?.[1] || "";
    return {
      ...exp,
      role: rolePart?.trim() || exp.subtitle,
      timeframe,
      employmentType,
      isCurrent: /current|present/i.test(exp.subtitle),
    };
  }),
);

// Animation
const timelineRef = ref<HTMLElement | null>(null);
const sectionAnimated = ref(false);

const animateSection = () => {
  if (prefersReducedMotion.value === "reduce") return;

  if (sectionAnimated.value) return;
  const items = scope.value?.querySelectorAll<HTMLElement>(".timeline-item");
  if (!items) return;

  items.forEach((item, index) => {
    void animate(
      item,
      { opacity: [0, 1], x: [-20, 0] } as Parameters<typeof animate>[1],
      {
        duration: 0.4,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      } as Parameters<typeof animate>[2],
    );
  });
  sectionAnimated.value = true;
};

onMounted(() => {
  if (sectionInView.value) {
    nextTick(animateSection);
  }
});

watch(sectionInView, (inView) => {
  if (inView) {
    nextTick(animateSection);
  }
});
</script>

<template>
  <section
    ref="scope"
    class="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-5xl mx-auto">
      <!-- Section Header -->
      <div class="mb-10 sm:mb-12">
        <div class="flex items-center gap-3 mb-3">
          <span
            class="i-tabler:briefcase text-xl sm:text-2xl text-[var(--color-primary)]"
            aria-hidden="true"
          />
          <span class="text-xs sm:text-sm uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
            Experience
          </span>
        </div>
        <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--color-dark)] mb-3">
          Professional Experience
        </h2>
        <p class="text-base sm:text-lg text-[var(--color-text)] max-w-3xl">
          Full-stack developer building Vue/React (Nuxt/Next) frontends and Node.js/Python 
          APIs with cloud deployments. Experienced in payment integrations, IoT connectivity, 
          and mobile development with Flutter.
        </p>

        <!-- Company Logos -->
        <div class="flex items-center gap-2 mt-4 sm:mt-6 flex-wrap">
          <span class="text-xs text-[var(--color-text-muted)] mr-2">
            Teams I've worked with:
          </span>
          <div class="flex items-center gap-2 flex-wrap">
            <div
              v-for="company in companyLogos"
              :key="company.alt"
              class="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[var(--color-card)] border border-[var(--color-border)]/10 shadow-[var(--shadow-sm)] flex items-center justify-center p-1.5 hover:scale-110 transition-transform duration-200"
              :title="company.alt"
            >
              <img
                :src="company.src"
                :alt="company.alt"
                class="w-full h-full object-contain rounded-full"
                loading="lazy"
                width="32"
                height="32"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Timeline -->
      <div ref="timelineRef" class="relative">
        <!-- Timeline Line -->
        <div
          class="hidden md:block absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--color-primary)]/40 via-[var(--color-primary)]/20 to-transparent"
          aria-hidden="true"
        />

        <!-- Experience Items -->
        <div class="space-y-6 sm:space-y-8">
          <article
            v-for="(exp, index) in parsedExperiences"
            :key="exp.title"
            class="timeline-item relative md:pl-16"
          >
            <!-- Timeline Dot -->
            <div
              class="hidden md:flex absolute left-0 top-0 w-12 h-12 rounded-full border-4 border-[var(--color-border)] bg-[var(--color-card)] shadow-[var(--shadow-soft)] items-center justify-center z-10"
              :class="{ 'ring-2 ring-[var(--color-primary)] ring-offset-2': exp.isCurrent }"
            >
              <img
                :src="exp.logoSrc"
                :alt="exp.logoAlt"
                class="w-7 h-7 object-contain rounded"
                loading="lazy"
                width="28"
                height="28"
              />
            </div>

            <!-- Card -->
            <div
              class="rounded-xl sm:rounded-2xl border-2 sm:border-4 border-[var(--color-border)] bg-[var(--color-card)] shadow-[var(--shadow-mid)] p-4 sm:p-5 lg:p-6 transition-all duration-300 hover:shadow-[var(--shadow-strong)] hover:-translate-y-0.5"
            >
              <!-- Header -->
              <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                <div class="flex items-start gap-3">
                  <img
                    :src="exp.logoSrc"
                    :alt="exp.logoAlt"
                    class="w-11 h-11 sm:hidden object-contain rounded-lg border border-[var(--color-border)]/10"
                    loading="lazy"
                    width="44"
                    height="44"
                  />
                  <div>
                    <div class="flex items-center gap-2 flex-wrap">
                      <h3 class="text-lg sm:text-xl font-semibold text-[var(--color-dark)]">
                        {{ exp.title }}
                      </h3>
                      <span
                        v-if="exp.isCurrent"
                        class="px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20"
                      >
                        Current
                      </span>
                    </div>
                    <p class="text-sm text-[var(--color-text)]">{{ exp.role }}</p>
                    <p class="text-xs sm:text-sm text-[var(--color-text-muted)]">
                      {{ exp.timeframe }}
                    </p>
                  </div>
                </div>
                <span
                  v-if="exp.employmentType"
                  class="inline-flex items-center self-start px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-semibold bg-[var(--color-primary)] text-[var(--color-light)] uppercase tracking-wide shadow-[var(--shadow-sm)]"
                >
                  {{ exp.employmentType }}
                </span>
              </div>

              <!-- Description -->
              <p class="text-sm sm:text-base text-[var(--color-text)] leading-relaxed mb-3">
                {{ exp.description }}
              </p>

              <!-- Highlights -->
              <ul
                v-if="exp.listItems.length"
                class="space-y-1.5 sm:space-y-2 text-sm text-[var(--color-text)] mb-4"
              >
                <li
                  v-for="item in exp.listItems"
                  :key="item"
                  class="flex items-start gap-2"
                >
                  <span
                    class="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span>{{ item }}</span>
                </li>
              </ul>

              <!-- Tech Stack Tags -->
              <div
                v-if="techStacks[exp.title]"
                class="flex flex-wrap gap-1.5 pt-3 border-t border-[var(--color-border)]/10"
              >
                <span
                  v-for="tech in techStacks[exp.title]"
                  :key="tech"
                  class="px-2 py-0.5 rounded-md bg-[var(--color-light)] text-[var(--color-text-muted)] text-[10px] sm:text-xs font-medium"
                >
                  {{ tech }}
                </span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>
