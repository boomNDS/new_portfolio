<script setup lang="ts">
import { useAnimate, useInView } from "motion-v";
import type { MenuItem, SectionId, Theme } from "~/types";

// Props & Emits
defineProps<{
  theme: Theme;
}>();

const emit = defineEmits<{
  (e: "scroll-to-section", sectionId: SectionId): void;
  (e: "toggle-theme"): void;
}>();

// Constants
const MENU_ITEMS = ["Experience", "Tech stack", "Showcase"] as const satisfies readonly MenuItem[];
const SECTION_MAP: Record<MenuItem | "Intro", SectionId> = {
  Intro: "intro",
  Experience: "experience",
  "Tech stack": "tech_stack",
  Showcase: "showcase",
};

// Composables
const reducedMotion = useMotionPreference();
const isLargeScreen = useMediaQuery("(min-width: 1024px)");
const [navScope, animate] = useAnimate();
const navScopeEl = computed<HTMLElement | null>(
  () => (navScope.value as HTMLElement | null) ?? null,
);
const navInView = useInView(navScopeEl);

// State
const isMenuOpen = ref(false);
const hasMenuOpened = ref(false);
const activeSection = ref<SectionId>("intro");
const navItemsAnimated = ref(false);

// Intersection Observer for active section
let sectionObserver: IntersectionObserver | null = null;

// Computed
const menuAriaLabel = computed(() => (isMenuOpen.value ? "Close menu" : "Open menu"));

// Methods
const scrollToSection = (item: MenuItem | "Intro") => {
  emit("scroll-to-section", SECTION_MAP[item]);
};

const handleMenuToggle = () => {
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

const handleMenuSelect = (item: MenuItem) => {
  scrollToSection(item);
  if (!isLargeScreen.value) {
    isMenuOpen.value = false;
  }
};

const isActiveSection = (item: MenuItem) => activeSection.value === SECTION_MAP[item];

// Animations
const animateNavItems = () => {
  if (reducedMotion.value === "reduce" || navItemsAnimated.value) return;
  const scopeEl = navScope.value;
  if (!scopeEl) return;

  const items = scopeEl.querySelectorAll<HTMLElement>("[data-nav-item]");
  items.forEach((el, index) => {
    void animate(
      el,
      { opacity: [0, 1], y: [-8, 0] } as Parameters<typeof animate>[1],
      {
        duration: 0.3,
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      } as Parameters<typeof animate>[2],
    );
  });
  navItemsAnimated.value = true;
};

// Lifecycle
onMounted(() => {
  // Nav entrance animation
  const navEl = navScope.value;
  if (navEl && reducedMotion.value !== "reduce") {
    animate(
      navEl,
      { opacity: [0, 1], y: [-12, 0] } as Parameters<typeof animate>[1],
      { duration: 0.4, ease: [0.22, 1, 0.36, 1] } as Parameters<typeof animate>[2],
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
    sections.forEach((section) => {
      sectionObserver?.observe(section);
    });
  }

  // Initial animation
  if (navInView.value) {
    nextTick(animateNavItems);
  }
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

watch(navInView, (inView) => {
  if (inView) {
    nextTick(animateNavItems);
  }
});
</script>

<template>
  <nav
    ref="navScope"
    class="nav-bar fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-4 sm:px-6 lg:px-8"
    role="navigation"
    aria-label="Main navigation"
  >
    <div class="mx-auto w-full max-w-6xl flex items-center justify-between gap-4">
      <!-- Logo -->
      <button
        type="button"
        class="cursor-pointer flex items-center gap-1.5 shrink-0 px-2 py-1 rounded-md bg-transparent border-0 transition-opacity duration-200 hover:opacity-90 focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]"
        aria-label="Scroll to top"
        @click="scrollToSection('Intro')"
      >
        <span class="nav-logo-text">Pachara</span>
        <span class="nav-logo-dot" aria-hidden="true" />
      </button>

      <!-- Desktop Navigation (centered) -->
      <ul
        class="nav-list hidden md:flex items-center justify-center gap-10 lg:gap-12 list-none flex-1 min-w-0"
        role="menubar"
      >
        <li v-for="item in MENU_ITEMS" :key="item" role="none">
          <button
            data-nav-item
            type="button"
            role="menuitem"
            class="nav-link-btn cursor-pointer relative text-sm font-semibold px-2 py-1 rounded-md bg-transparent border-0 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]"
            :class="{ 'text-[var(--color-dark)]': isActiveSection(item) }"
            @click="handleMenuSelect(item)"
          >
            {{ item }}
          </button>
        </li>
      </ul>

      <!-- Spacer for mobile so theme button stays right -->
      <div class="md:hidden flex-1 min-w-0" />

      <!-- Dark/Light mode toggle -->
      <button
        type="button"
        class="nav-theme-btn cursor-pointer flex items-center gap-2 shrink-0 h-9 px-4 rounded-full border border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-dark)] focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]"
        :aria-label="`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`"
        @click="$emit('toggle-theme')"
      >
        <span
          class="text-base transition-transform duration-300"
          :class="[
            theme === 'dark' ? 'i-tabler:sun' : 'i-tabler:moon',
            { 'rotate-90': theme === 'dark' },
          ]"
          aria-hidden="true"
        />
        <span class="text-sm font-medium">{{ theme === "dark" ? "Light" : "Dark" }}</span>
      </button>
    </div>
  </nav>
</template>

<style scoped>
/* Flat light bar, 64px height, no border/heavy shadow */
.nav-bar {
  background-color: var(--color-background);
  /* no box-shadow or border for flat look */
}

.nav-logo-text {
  font-family: "Dancing Script", cursive;
  font-size: 1.375rem;
  font-weight: 600;
  color: var(--color-primary);
}

/* Small solid yellow circular dot */
.nav-logo-dot {
  width: 0.375rem;
  height: 0.375rem;
  border-radius: 9999px;
  background-color: var(--color-accent);
  flex-shrink: 0;
}

.nav-list,
.nav-list li {
  list-style: none;
  margin: 0;
  padding: 0;
}

/* Nav link: default and hover with readable text in both themes */
.nav-link-btn {
  color: var(--color-text);
}

.nav-link-btn:hover {
  color: #5b21b6;
  background: rgba(125, 38, 205, 0.12);
}

[data-theme="dark"] .nav-link-btn:hover {
  color: #e9d5ff;
  background: rgba(180, 136, 255, 0.22);
}

/* Oval button with subtle diffused shadow (light theme) */
.nav-theme-btn {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.nav-theme-btn:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

[data-theme="dark"] .nav-theme-btn {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
}

[data-theme="dark"] .nav-theme-btn:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

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
