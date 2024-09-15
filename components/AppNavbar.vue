<template>
  <nav class="my-5 mx-4">
    <div
      class="container mx-auto flex flex-col min-[1045px]:flex-row items-end min-[1045px]:items-center justify-between relative"
    >
      <img
        src="/img/logo.svg"
        alt="Pachara logo"
        class="absolute left-0 transition ease-in-out hover:-translate-y-1 cursor-pointer"
        :class="{ 'scale-105': isHovered }"
        loading="lazy"
        width="96"
        height="auto"
        @click="emitScrollEvent('Intro')"
      />

      <button
        v-if="!isLargeScreen"
        class="focus:outline-none rounded ease-in shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)]"
        :class="{
          'scale-92': isActiveOrClicked,
        }"
        @click="handleClick"
      >
        Menu
      </button>

      <ul
        v-if="isLargeScreen || isMenuOpen"
        class="flex flex-col min-[1045px]:flex-row items-center justify-center w-full list-none p-0 space-x-0 min-[1045px]:space-x-12"
      >
        <li
          v-for="item in menuItems"
          :key="item"
          class="transition ease-in-out hover:-translate-y-1 cursor-pointer"
          :class="{
            'scale-110': isItemHovered(item),
            'scale-105': isItemActive(item),
          }"
          @click="emitScrollEvent(item)"
        >
          <NuxtLink class="text-black no-underline" :prefetch="false">
            {{ item }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useActiveElement, useMediaQuery, useElementHover } from "@vueuse/core";

const isMenuOpen = ref(false);
const menuItems = ["Experience", "Tech stack", "Showcase"] as const;
const isLargeScreen = useMediaQuery("(min-width: 1045px)");

type MenuItem = (typeof menuItems)[number];
type SectionId = "intro" | "experience" | "tech_stack" | "showcase";

const emit = defineEmits<{
  (e: "scroll-to-section", sectionId: SectionId): void;
}>();

const emitScrollEvent = (item: MenuItem | "Intro") => {
  const sectionMap: Record<MenuItem | "Intro", SectionId> = {
    Intro: "intro",
    Experience: "experience",
    "Tech stack": "tech_stack",
    Showcase: "showcase",
  };
  emit("scroll-to-section", sectionMap[item]);
};

const activeElement = useActiveElement();
const wasRecentlyClicked = ref(false);

const isActiveOrClicked = computed(
  () =>
    activeElement.value === document.activeElement || wasRecentlyClicked.value,
);

const handleClick = () => {
  isMenuOpen.value = !isMenuOpen.value;
  wasRecentlyClicked.value = true;
  setTimeout(() => {
    wasRecentlyClicked.value = false;
  }, 200); // Reset after 200ms
};

const logoRef = ref(null);
const isHovered = useElementHover(logoRef);

const itemRefs = ref(menuItems.map(() => null));
const itemHoverStates = menuItems.map((_, index) =>
  useElementHover(computed(() => itemRefs.value[index])),
);

const isItemHovered = (item: MenuItem) =>
  itemHoverStates[menuItems.indexOf(item)].value;
const isItemActive = (item: MenuItem) =>
  activeElement.value === itemRefs.value[menuItems.indexOf(item)];
</script>

<style scoped>
/* Add any additional styling if needed */
</style>
