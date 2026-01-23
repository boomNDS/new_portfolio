<template>
  <nav
    class="sticky top-3 z-50 mx-2 sm:mx-4 mt-4 mb-3 backdrop-blur-sm bg-[var(--color-light)]/90 rounded-2xl shadow-[var(--shadow-soft)] border border-[var(--color-border)]/20 relative overflow-x-hidden"
    role="navigation"
    aria-label="Main navigation"
  >
    <div
      ref="navRef"
      class="w-full max-w-[1200px] mx-auto px-1.5 sm:px-2 md:px-3 lg:px-4 py-3"
    >
      <div
        class="flex items-center justify-between gap-0.5 sm:gap-1 md:gap-2 w-full min-w-0"
      >
        <button
          ref="logoRef"
          type="button"
          class="flex items-center transition-all duration-200 ease-out hover:-translate-y-0.5 hover:scale-105 cursor-pointer rounded-lg border-none bg-transparent p-0.5 sm:p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-light)] flex-shrink-0"
          aria-label="Scroll to top"
          @click="emitScrollEvent('Intro')"
        >
          <img
            src="/img/logo.svg"
            alt="Pachara logo"
            loading="lazy"
            width="64"
            height="64"
            class="block h-7 sm:h-9 md:h-10 w-auto transition-transform duration-200"
          />
        </button>

        <div
          class="flex items-center gap-0.5 sm:gap-1 md:gap-2 flex-1 justify-end min-[1045px]:justify-center min-w-0 overflow-hidden"
        >
          <Transition name="menu-slide" @after-enter="markMenuOpened">
            <ul
              v-if="isLargeScreen || isMenuOpen"
              id="site-menu"
              class="flex flex-col min-[1045px]:flex-row items-center list-none p-0 space-x-0 min-[1045px]:space-x-8 gap-2 min-[1045px]:gap-0"
              :class="{
                'absolute top-full left-2 right-2 sm:left-4 sm:right-4 mt-3 rounded-xl border-2 border-[var(--color-border)] bg-[var(--color-card)] px-4 py-4 shadow-[var(--shadow-soft)] z-50':
                  !isLargeScreen,
              }"
              role="menubar"
            >
              <li
                v-for="(item, index) in menuItems"
                :key="item"
                :ref="(el) => setItemRef(el, index)"
                class="transition-all duration-200 ease-out hover:-translate-y-0.5 cursor-pointer"
                :class="{
                  'scale-105': isItemHovered(item),
                  'scale-103': isItemActive(item),
                  'menu-item': !isLargeScreen && !menuOpenedOnce,
                }"
                :style="{
                  '--menu-delay': `${index * 60}ms`,
                }"
                role="none"
                @mouseenter="onItemEnter(index)"
                @mouseleave="onItemLeave(index)"
              >
                <NuxtLink
                  :to="menuTo[item]"
                  class="text-[var(--color-dark)] no-underline px-3 py-2 rounded-lg transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-light)] hover:bg-[var(--color-light)]/50"
                  :prefetch="false"
                  :aria-current="
                    activeSection === menuTo[item].slice(1) ? 'page' : undefined
                  "
                  role="menuitem"
                  @click="handleMenuSelect(item)"
                >
                  {{ item }}
                </NuxtLink>
              </li>
            </ul>
          </Transition>
        </div>

        <div
          class="flex items-center gap-0.5 sm:gap-1 md:gap-2 flex-shrink-0 mr-3 sm:mr-4 md:mr-0"
        >
          <button
            v-if="!isLargeScreen"
            type="button"
            class="px-1.5 sm:px-2.5 md:px-3 lg:px-4 py-1.5 sm:py-2 rounded-lg border-2 border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-dark)] text-xs sm:text-sm font-semibold shadow-[4px_4px_0px_rgba(0,0,0,0.12)] hover:shadow-[2px_2px_0px_rgba(0,0,0,0.12)] hover:-translate-y-[2px] active:translate-y-0 active:shadow-[1px_1px_0px_rgba(0,0,0,0.12)] transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-light)] whitespace-nowrap flex-shrink-0"
            :class="{
              'scale-95': isActiveOrClicked,
            }"
            :aria-expanded="isMenuOpen"
            aria-controls="site-menu"
            aria-label="Toggle navigation menu"
            @click="handleClick"
          >
            {{ isMenuOpen ? "Close" : "Menu" }}
          </button>

          <button
            type="button"
            class="px-1.5 sm:px-2.5 md:px-3 lg:px-4 py-1.5 sm:py-2 rounded-full border-2 border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-dark)] text-xs sm:text-sm font-semibold shadow-[4px_4px_0px_rgba(0,0,0,0.12)] hover:shadow-[2px_2px_0px_rgba(0,0,0,0.12)] hover:-translate-y-[2px] active:translate-y-0 active:shadow-[1px_1px_0px_rgba(0,0,0,0.12)] transition-all duration-150 ease-out inline-flex items-center justify-center gap-0.5 sm:gap-1 md:gap-1.5 lg:gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-light)] whitespace-nowrap flex-shrink-0"
            :aria-label="`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`"
            @click="$emit('toggle-theme')"
          >
            <span
              :class="[
                theme === 'dark' ? 'i-tabler:sun' : 'i-tabler:moon',
                'text-xs sm:text-sm md:text-base transition-transform duration-200 flex-shrink-0',
                { 'rotate-90': theme === 'dark' },
              ]"
              aria-hidden="true"
            ></span>
            <span class="hidden md:inline">{{
              theme === "dark" ? "Light" : "Dark"
            }}</span>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  onMounted,
  nextTick,
  onBeforeUnmount,
  watch,
} from "vue";
import { useActiveElement, useMediaQuery, useElementHover } from "@vueuse/core";

const isMenuOpen = ref(false);
const menuOpenedOnce = ref(false);
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
  }, 150); // Reset after 150ms for snappier feel
};

const markMenuOpened = () => {
  if (!isLargeScreen.value && isMenuOpen.value) {
    menuOpenedOnce.value = true;
  }
};

const handleMenuSelect = (item: MenuItem) => {
  emitScrollEvent(item);
  if (!isLargeScreen.value) {
    isMenuOpen.value = false;
  }
};

const logoRef = ref(null);

const itemRefs = ref<(HTMLElement | null)[]>(menuItems.map(() => null));
const itemHoverStates = menuItems.map((_, index) => {
  if (!import.meta.client) return ref(false);
  return useElementHover(computed(() => itemRefs.value[index]));
});

const setItemRef = (el: HTMLElement | null | Element, index: number) => {
  itemRefs.value[index] = el as HTMLElement | null;
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
    { scale: [1, 1.05], opacity: [0.95, 1] },
    { duration: 0.2, easing: [0.22, 1, 0.36, 1] },
  );
};

const onItemLeave = (index: number) => {
  const el = itemRefs.value[index];
  if (!$motionAnimate || !el) return;
  $motionAnimate(
    el,
    { scale: [1.05, 1], opacity: [1, 0.95] },
    { duration: 0.18, easing: [0.22, 1, 0.36, 1] },
  );
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

watch(
  () => isMenuOpen.value,
  (open: boolean) => {
    if (open) {
      menuOpenedOnce.value = false;
    }
  },
);
</script>

<style scoped>
.menu-slide-enter-active,
.menu-slide-leave-active {
  transition:
    opacity 0.25s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
}

.menu-slide-enter-from,
.menu-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.menu-item {
  opacity: 0;
  transform: translateY(-4px);
  animation: menu-fade 0.3s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  animation-delay: var(--menu-delay, 0ms);
}

@keyframes menu-fade {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Improve focus visibility */
button:focus-visible,
a:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
  border-radius: 0.5rem;
}

/* Smooth transitions for all interactive elements */
button,
a {
  transition-property: transform, box-shadow, background-color, color;
  transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
}
</style>
