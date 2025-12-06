<template>
  <div class="mx-auto px-[2rem] lg:px-[5rem] mb-5">
    <h2 class="title">Talk about Ex-(perience)</h2>

    <section class="relative mx-[2rem] md:mx-[4rem] lg:mx-[10rem]">
      <CommonsCard
        v-for="(card, index) in cards"
        :key="index"
        class="mb-3 flex flex-col"
        :class="{
          'items-start': index % 2 === 0,
          'items-end': index % 2 !== 0,
        }"
        v-bind="card"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

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
    subtitle: "Full-Stack, Aug 2024 - Current (Full-Time)",
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
</script>

<style scoped></style>
