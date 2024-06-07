<template>
  <nav class="mx-8 mt-5">
    <div
      class="container mx-auto flex min-[1045px]:flex-row flex-col items-end min-[1045px]:items-center justify-between relative"
    >
      <nuxt-img
        left="0"
        scale="hover:105 active:100"
        duration="120"
        delay="100"
        cursor="pointer"
        class="absolute transition ease-in-out hover:-translate-y-1"
        src="/img/logo.svg"
        loading="lazy"
        w="6rem lg:9.25rem"
        h="auto lg:3.75rem"
        @click="emitScrollEvent('Intro')"
        alt="pachara logo"
      />

      <button
        scale="active:92"
        duration="100"
        text="14px black"
        p="2 1"
        border="4 #333333"
        bg="#f2f2f2"
        class="min-[1045px]:hidden focus:outline-none rounded ease-in shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)]"
        @click="isMenuOpen = !isMenuOpen"
      >
        Menu
      </button>
      <Transition>
        <div
          v-if="isLargeScreen || isMenuOpen"
          :class="`flex items-center justify-center w-full`"
        >
          <ul
            p="0"
            cursor="pointer"
            space="min-[1045px]:x-[3rem]"
            list="none"
            class="flex min-[1045px]:flex-row flex-col"
            font="lg:size-38px size-24px regular"
          >
            <li
              v-for="item in menuItems"
              :key="item"
              scale="hover:110 active:105"
              duration="120"
              delay="100"
              class="transition ease-in-out hover:-translate-y-1 md:text-left text-center"
              p="x-4"
              @click="emitScrollEvent(item)"
            >
              <NuxtLink p="0" m="0" class="text-black no-underline">
                {{ item }}</NuxtLink
              >
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useMediaQuery } from "@vueuse/core";

useHead({
  title: "pachara's portfolio",
});

const isMenuOpen = ref(false);
const menuItems: Array<"Experience" | "Tech stack" | "Showcase"> = [
  "Experience",
  "Tech stack",
  "Showcase",
];
const isLargeScreen = useMediaQuery("(min-width: 1045px)");

const emit = defineEmits<{
  (
    e: "scroll-to-section",
    sectionId: "intro" | "experience" | "tech_stack" | "showcase",
  ): void;
}>();

const emitScrollEvent = (
  item: "Intro" | "Experience" | "Tech stack" | "Showcase",
) => {
  const sectionMap: Record<
    "Intro" | "Experience" | "Tech stack" | "Showcase",
    "intro" | "experience" | "tech_stack" | "showcase"
  > = {
    Intro: "intro",
    Experience: "experience",
    "Tech stack": "tech_stack",
    Showcase: "showcase",
  };
  const sectionId = sectionMap[item];
  emit("scroll-to-section", sectionId);
};
</script>

<style scoped>
/* Add any additional styling if needed */
</style>
