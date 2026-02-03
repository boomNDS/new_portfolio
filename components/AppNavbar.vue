<script setup lang="ts">
import type { MenuItem, SectionId, Theme } from "~/types";
import { useMotionPreference } from "#imports";

// Props & Emits
defineProps<{
  theme: Theme;
}>();

const emit = defineEmits<{
  (e: "scroll-to-section", sectionId: SectionId): void;
  (e: "toggle-theme"): void;
}>();

// Constants
const _MENU_ITEMS: MenuItem[] = ["Experience", "Tech stack", "Showcase"];
const SECTION_MAP: Record<MenuItem | "Intro", SectionId> = {
  Intro: "intro",
  Experience: "experience",
  "Tech stack": "tech_stack",
  Showcase: "showcase",
};

// Composables
const { $motionAnimate, $motionInView } = useNuxtApp();
const reducedMotion = useMotionPreference();
const isLargeScreen = useMediaQuery("(min-width: 1024px)");

// State
const isMenuOpen = ref(false);
const hasMenuOpened = ref(false);
const activeSection = ref<SectionId>("intro");
const navRef = ref<HTMLElement | null>(null);
const itemRefs = ref<(HTMLElement | null)[]>([]);
const _logoRef = ref<HTMLElement | null>(null);

// Intersection Observer for active section
let sectionObserver: IntersectionObserver | null = null;

// Computed
const _menuAriaLabel = computed(() => (isMenuOpen.value ? "Close menu" : "Open menu"));

// Methods
const scrollToSection = (item: MenuItem | "Intro") => {
  emit("scroll-to-section", SECTION_MAP[item]);
};

const _handleMenuToggle = () => {
  isMenuOpen.value = !isMenuOpen.value;
  if (isMenuOpen.value) {
    hasMenuOpened.value = false;
    // Delay setting hasMenuOpened to trigger animations
    nextTick(() => {
      setTimeout(() => {
        hasMenuOpened.value = true;
      }, 50);
    });
  }
};

const _handleMenuSelect = (item: MenuItem) => {
  scrollToSection(item);
  if (!isLargeScreen.value) {
    isMenuOpen.value = false;
  }
};

const _setItemRef = (el: HTMLElement | null | Element, index: number) => {
  if (el) {
    itemRefs.value[index] = el as HTMLElement;
  }
};

// Animations
const animateNavItems = () => {
  if (reducedMotion.value === "reduce" || !$motionInView || !$motionAnimate) return;

  itemRefs.value.forEach((el, index) => {
    if (!el) return;
    $motionInView(
      el,
      () =>
        $motionAnimate(
          el,
          { opacity: [0, 1], y: [-8, 0] },
          { duration: 0.3, delay: index * 0.05, easing: [0.22, 1, 0.36, 1] },
        ),
      { amount: 0.5, once: true },
    );
  });
};

// Lifecycle
onMounted(() => {
  // Nav entrance animation
  if ($motionAnimate && navRef.value && reducedMotion.value !== "reduce") {
    $motionAnimate(
      navRef.value,
      { opacity: [0, 1], y: [-12, 0] },
      { duration: 0.4, easing: [0.22, 1, 0.36, 1] },
    );
  }

  // Setup intersection observer for sections
  const sections = ["intro", "experience", "tech_stack", "showcase"]
    .map((id) => document.getElementById(id))
    .filter(Boolean) as HTMLElement[];

  if (sections.length) {
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
    sections.forEach((section) => sectionObserver.observe(section));
  }

  // Initial animation
  nextTick(animateNavItems);
});

onBeforeUnmount(() => {
  sectionObserver?.disconnect();
});

// Keyboard navigation
useEventListener("keydown", (e: KeyboardEvent) => {
  if (e.key === "Escape") {
    isMenuOpen.value = false;
  }
});

// Close mobile menu when resizing to large screen
watch(isLargeScreen, (isLarge) => {
  if (isLarge) {
    isMenuOpen.value = false;
  }
});
</script>

<template>
  <nav
    ref="navRef"
    class="fixed top-0 left-0 right-0 z-50 px-3 sm:px-4 lg:px-6 py-3"
    role="navigation"
    aria-label="Main navigation"
  >
    <div
      class="mx-auto max-w-7xl backdrop-blur-md bg-[var(--color-card)]/85 rounded-2xl shadow-[var(--shadow-soft)] border border-[var(--color-border)]/10 transition-all duration-300"
      :class="{ 'shadow-[var(--shadow-mid)]': isMenuOpen }"
    >
      <div class="flex items-center justify-between px-3 sm:px-4 py-2.5">
        <!-- Logo -->
        <button
          ref="logoRef"
          type="button"
          class="flex items-center gap-2 p-1.5 rounded-xl transition-transform duration-200 hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2"
          aria-label="Scroll to top"
          @click="scrollToSection('Intro')"
        >
          <img
            src="/img/logo.svg"
            alt="Pachara logo"
            width="36"
            height="36"
            class="w-8 h-8 sm:w-9 sm:h-9"
          />
          <span
            class="hidden sm:block font-semibold text-[var(--color-dark)] text-sm lg:text-base"
            >Boom</span
          >
        </button>

        <!-- Desktop Navigation -->
        <ul class="hidden lg:flex items-center gap-1" role="menubar">
          <li v-for="(item, index) in MENU_ITEMS" :key="item" role="none">
            <button
              :ref="(el) => setItemRef(el, index)"
              type="button"
              role="menuitem"
              class="relative cursor-pointer px-4 py-2 rounded-lg text-sm font-medium text-[var(--color-text)] hover:text-[var(--color-dark)] hover:bg-[var(--color-light)]/50 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2"
              :class="{
                'text-[var(--color-primary)]':
                  activeSection === SECTION_MAP[item],
              }"
              @click="handleMenuSelect(item)"
            >
              {{ item }}
              <span
                v-if="activeSection === SECTION_MAP[item]"
                class="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--color-primary)]"
              />
            </button>
          </li>
        </ul>

        <!-- Actions -->
        <div class="flex items-center gap-2">
          <!-- Mobile Menu Toggle -->
          <button
            type="button"
            class="lg:hidden flex items-center cursor-pointer gap-1.5 px-3 py-2 rounded-lg text-sm font-medium border-2 border-[var(--color-border)] bg-[var(--color-card)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-soft)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
            :aria-expanded="isMenuOpen"
            aria-controls="mobile-menu"
            :aria-label="menuAriaLabel"
            @click="handleMenuToggle"
          >
            <span>{{ isMenuOpen ? "Close" : "Menu" }}</span>
            <span
              class="text-lg transition-transform duration-200"
              :class="isMenuOpen ? 'i-tabler:x' : 'i-tabler:menu-2'"
              aria-hidden="true"
            />
          </button>

          <!-- Theme Toggle -->
          <button
            type="button"
            class="flex items-center cursor-pointer gap-2 px-3 py-2 rounded-full border-2 border-[var(--color-border)] bg-[var(--color-card)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-soft)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
            :aria-label="`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`"
            @click="$emit('toggle-theme')"
          >
            <span
              class="text-lg transition-all duration-300"
              :class="[
                theme === 'dark' ? 'i-tabler:sun' : 'i-tabler:moon',
                { 'rotate-90': theme === 'dark' },
              ]"
              aria-hidden="true"
            />
            <span class="hidden sm:inline text-sm font-medium">{{
              theme === "dark" ? "Light" : "Dark"
            }}</span>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <Transition
        enter-active-class="transition-all duration-250 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div
          v-show="isMenuOpen"
          id="mobile-menu"
          class="lg:hidden border-t border-[var(--color-border)]/10 px-3 py-3"
        >
          <ul class="space-y-1" role="menu">
            <li
              v-for="(item, index) in MENU_ITEMS"
              :key="item"
              role="none"
              :style="{
                animationDelay: hasMenuOpened ? `${index * 50}ms` : '0ms',
              }"
              :class="{ 'menu-item-enter': hasMenuOpened }"
            >
              <button
                type="button"
                role="menuitem"
                class="w-full text-left cursor-pointer px-4 py-3 rounded-xl text-base font-medium text-[var(--color-text)] hover:text-[var(--color-dark)] hover:bg-[var(--color-light)]/50 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
                :class="{
                  'text-[var(--color-primary)] bg-[var(--color-primary)]/5':
                    activeSection === SECTION_MAP[item],
                }"
                @click="handleMenuSelect(item)"
              >
                {{ item }}
              </button>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  </nav>
</template>

<style scoped>
.menu-item-enter {
  animation: menuItemEnter 0.3s ease-out forwards;
  opacity: 0;
  transform: translateX(-8px);
}

@keyframes menuItemEnter {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
