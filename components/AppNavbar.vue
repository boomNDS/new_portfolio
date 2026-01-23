<template>
  <nav
    class="sticky top-0 z-50 mx-4 mt-5 mb-3 backdrop-blur-sm bg-[var(--color-light)]/90 border-2 border-[var(--color-border)] rounded-2xl shadow-[var(--shadow-soft)]"
  >
    <div
      ref="navRef"
      class="container mx-auto flex flex-col min-[1045px]:flex-row items-end min-[1045px]:items-center justify-between relative px-4 py-3"
    >
      <button
        ref="logoRef"
        type="button"
        class="absolute left-0 transition ease-in-out hover:-translate-y-1 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-light)] rounded"
        :class="{ 'scale-105': isHovered }"
        aria-label="Scroll to top"
        @click="emitScrollEvent('Intro')"
      >
        <img
          src="/img/logo.svg"
          alt="Pachara logo"
          loading="lazy"
          width="96"
          height="96"
        />
      </button>

      <button
        v-if="!isLargeScreen"
        class="rounded ease-in shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-light)]"
        :class="{
          'scale-92': isActiveOrClicked,
        }"
        :aria-expanded="isMenuOpen"
        aria-controls="site-menu"
        @click="handleClick"
      >
        Menu
      </button>

      <ul
        v-if="isLargeScreen || isMenuOpen"
        id="site-menu"
        class="flex flex-col min-[1045px]:flex-row items-center justify-center w-full list-none p-0 space-x-0 min-[1045px]:space-x-12"
      >
        <li
          v-for="(item, index) in menuItems"
          :key="item"
          :ref="(el) => setItemRef(el as HTMLElement | null, index)"
          class="transition ease-in-out hover:-translate-y-1 cursor-pointer"
          :class="{
            'scale-110': isItemHovered(item),
            'scale-105': isItemActive(item),
          }"
          @mouseenter="onItemEnter(index)"
          @mouseleave="onItemLeave(index)"
        >
          <NuxtLink
            :to="menuTo[item]"
            class="text-[var(--color-dark)] no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-light)] rounded"
            :class="{
              'text-[var(--color-primary)] underline underline-offset-8':
                activeSection === menuTo[item].slice(1),
            }"
            :prefetch="false"
            :aria-current="
              activeSection === menuTo[item].slice(1) ? 'page' : undefined
            "
            @click="handleMenuSelect(item)"
          >
            {{ item }}
          </NuxtLink>
        </li>
      </ul>

      <button
        class="mt-2 min-[1045px]:mt-0 ml-auto min-[1045px]:ml-4 px-3 py-2 rounded-full border-2 border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-dark)] text-sm font-semibold shadow-[4px_4px_0px_rgba(0,0,0,0.12)] hover:-translate-y-[2px] transition-transform duration-150 inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-light)]"
        @click="$emit('toggle-theme')"
      >
        <span
          :class="theme === 'dark' ? 'i-tabler:sun' : 'i-tabler:moon'"
          class="text-base"
          aria-hidden="true"
        ></span>
        {{ theme === "dark" ? "Light" : "Dark" }}
      </button>
    </div>
    <p
      class="m-0 px-4 pb-3 text-xs sm:text-sm text-[var(--color-text)] flex flex-wrap gap-x-2 gap-y-1"
    >
      <span class="font-semibold text-[var(--color-dark)]"
        >Full-stack developer</span
      >
      <span class="opacity-70">·</span>
      <span>Open to remote work</span>
      <span class="opacity-70">·</span>
      <span class="text-[var(--color-primary)] font-semibold"
        >Available for collaborations</span
      >
    </p>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick, onBeforeUnmount } from "vue";
import { useActiveElement, useMediaQuery, useElementHover } from "@vueuse/core";

const isMenuOpen = ref(false);
const menuItems = ["Experience", "Tech stack", "Showcase"] as const;
const isLargeScreen = import.meta.client
  ? useMediaQuery("(min-width: 1045px)")
  : ref(false);

type MenuItem = (typeof menuItems)[number];
type SectionId = "intro" | "experience" | "tech_stack" | "showcase";

const emit = defineEmits<{
  (e: "scroll-to-section", sectionId: SectionId): void;
  (e: "toggle-theme"): void;
}>();

defineProps<{
  theme: "light" | "dark";
}>();

const { $motionAnimate } = useNuxtApp();
const navRef = ref<HTMLElement | null>(null);
const activeSection = ref<SectionId>("intro");
let sectionObserver: IntersectionObserver | null = null;

const emitScrollEvent = (item: MenuItem | "Intro") => {
  const sectionMap: Record<MenuItem | "Intro", SectionId> = {
    Intro: "intro",
    Experience: "experience",
    "Tech stack": "tech_stack",
    Showcase: "showcase",
  };
  emit("scroll-to-section", sectionMap[item]);
};

const menuTo: Record<MenuItem, string> = {
  Experience: "#experience",
  "Tech stack": "#tech_stack",
  Showcase: "#showcase",
};

const activeElement = import.meta.client ? useActiveElement() : ref(null);
const wasRecentlyClicked = ref(false);

const isActiveOrClicked = computed(() => {
  if (!import.meta.client) return wasRecentlyClicked.value;
  return (
    activeElement.value === document.activeElement || wasRecentlyClicked.value
  );
});

const handleClick = () => {
  isMenuOpen.value = !isMenuOpen.value;
  wasRecentlyClicked.value = true;
  setTimeout(() => {
    wasRecentlyClicked.value = false;
  }, 200); // Reset after 200ms
};

const handleMenuSelect = (item: MenuItem) => {
  emitScrollEvent(item);
  if (!isLargeScreen.value) {
    isMenuOpen.value = false;
  }
};

const logoRef = ref(null);
const isHovered = import.meta.client ? useElementHover(logoRef) : ref(false);

const itemRefs = ref<(HTMLElement | null)[]>(menuItems.map(() => null));
const itemHoverStates = menuItems.map((_, index) => {
  if (!import.meta.client) return ref(false);
  return useElementHover(computed(() => itemRefs.value[index]));
});

const setItemRef = (el: HTMLElement | null, index: number) => {
  itemRefs.value[index] = el;
};

const isItemHovered = (item: MenuItem) =>
  itemHoverStates[menuItems.indexOf(item)].value;
const isItemActive = (item: MenuItem) =>
  activeElement.value === itemRefs.value[menuItems.indexOf(item)];

const onItemEnter = (index: number) => {
  const el = itemRefs.value[index];
  if (!$motionAnimate || !el) return;
  $motionAnimate(
    el,
    { scale: [1, 1.06], opacity: [0.9, 1] },
    { duration: 0.18 },
  );
};

const onItemLeave = (index: number) => {
  const el = itemRefs.value[index];
  if (!$motionAnimate || !el) return;
  $motionAnimate(el, { scale: [1.06, 1] }, { duration: 0.16 });
};

onMounted(() => {
  nextTick(() => {
    if (!$motionAnimate || !navRef.value) return;
    $motionAnimate(
      navRef.value,
      { opacity: [0, 1], y: [-8, 0] },
      { duration: 0.35, easing: [0.22, 1, 0.36, 1] },
    );
  });
  if (!import.meta.client) return;
  const sections = ["intro", "experience", "tech_stack", "showcase"]
    .map((id) => document.getElementById(id))
    .filter((el): el is HTMLElement => Boolean(el));
  if (!sections.length) return;
  sectionObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible[0]?.target?.id) {
        activeSection.value = visible[0].target.id as SectionId;
      }
    },
    { rootMargin: "-20% 0px -60% 0px", threshold: [0.2, 0.4, 0.6] },
  );
  sections.forEach((section) => sectionObserver?.observe(section));
});

onBeforeUnmount(() => {
  sectionObserver?.disconnect();
  sectionObserver = null;
});

if (import.meta.client) {
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      isMenuOpen.value = false;
    }
  });
}
</script>

<style scoped>
/* Add any additional styling if needed */
</style>
