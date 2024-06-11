<template>
  <div class="mx-auto px-[2rem] lg:px-[5rem] mb-5">
    <h2 class="title">Talk about Ex-(perience)</h2>

    <section class="relative mx-[2rem] md:mx-[4rem] lg:mx-[10rem]">
      <div v-for="(card, index) in cards" :key="index">
        <CommonsCard
          class="mb-3 flex flex-col"
          :class="{
            'items-start': index % 2 === 0,
            'items-end': index % 2 !== 0,
          }"
          :logo-src="card.logoSrc"
          :logo-alt="card.logoAlt"
          :title="card.title"
          :subtitle="card.subtitle"
          :description="card.description"
          :list-items="card.listItems"
        />
      </div>
      <div class="min-[1280px]:block hidden absolute left-1/2 top-0">
        <div class="w-5px h-[52rem] absolute right-1/2" bg="#5c5c5c" />
        <div
          v-for="(top, index) in circlePositions"
          :key="index"
          class="absolute rounded-full w-30px h-30px left-[-21px]"
          :style="{ top }"
          bg="white"
          border="solid 5px #5c5c5c"
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const cards = ref([
  {
    logoSrc: "/img/company/globish_logo.png",
    logoAlt: "globish logo",
    title: "Globish Academia",
    subtitle: "Full-Stack, Sep 2021 - Apr 2024 (Full-Time)",
    description:
      "Establishing a Nuxt.js project sets the stage for crafting contemporary web applications, leveraging a sturdy framework to streamline development and elevate user experiences. Simultaneously, thorough mapping of task userflows guarantees smooth navigation, maximizing engagement and user satisfaction. In addition, utilizing Next.js for API development enhances backend functionality, further enriching the overall user experience.",
    listItems: [
      "Develop an automated scoring system to streamline summary and report generation for colleagues.",
      "Revitalize email marketing for an enhanced user experience.",
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
const circlePositions = ref(["0rem", "26rem", "37rem", "50rem"]);
</script>

<style scoped></style>
