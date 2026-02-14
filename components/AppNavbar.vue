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
const MENU_ITEMS = ["Experience", "Tech stack", "Showcase", "Writing"] as const satisfies readonly MenuItem[];
const SECTION_MAP: Record<MenuItem | "Intro", SectionId> = {
  Intro: "intro",
  Experience: "experience",
  "Tech stack": "tech_stack",
  Showcase: "showcase",
  Writing: "writing",
};

// Content submenu items
const WRITING_ITEMS = [
  { label: "Overview", path: "/writing", icon: "i-tabler:pencil" },
  { label: "Dev Logs", path: "/dev-logs", icon: "i-tabler:code" },
  { label: "Learning", path: "/learning", icon: "i-tabler:book" },
  { label: "Blog", path: "/blog", icon: "i-tabler:article" },
] as const;

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
const isDrawerVisible = ref(false);
const drawerRef = ref<HTMLElement | null>(null);
const isWritingMenuOpen = ref(false);
const writingMenuRef = ref<HTMLElement | null>(null);

// Intersection Observer for active section
let sectionObserver: IntersectionObserver | null = null;

// Computed
const menuAriaLabel = computed(() => (isMenuOpen.value ? "Close menu" : "Open menu"));

// Methods
const scrollToSection = (item: MenuItem | "Intro") => {
  emit("scroll-to-section", SECTION_MAP[item]);
};

const openMenu = () => {
  isMenuOpen.value = true;
  isDrawerVisible.value = true;
  hasMenuOpened.value = false;
  nextTick(() => {
    const drawerEl = drawerRef.value;
    if (drawerEl && reducedMotion.value !== "reduce") {
      void animate(
        drawerEl,
        { opacity: [0, 1], y: [-8, 0] } as Parameters<typeof animate>[1],
        { duration: 0.25, ease: [0.22, 1, 0.36, 1] } as Parameters<typeof animate>[2],
      );
    }
    setTimeout(() => {
      hasMenuOpened.value = true;
    }, 50);
  });
};

const closeMenu = () => {
  if (!isMenuOpen.value) return;
  isMenuOpen.value = false;
  const drawerEl = drawerRef.value;
  if (drawerEl && reducedMotion.value !== "reduce") {
    void animate(
      drawerEl,
      { opacity: [1, 0], y: [0, -8] } as Parameters<typeof animate>[1],
      { duration: 0.2, ease: [0.22, 1, 0.36, 1] } as Parameters<typeof animate>[2],
    );
    setTimeout(() => {
      isDrawerVisible.value = false;
    }, 220);
    return;
  }
  isDrawerVisible.value = false;
};

const handleMenuToggle = () => {
  if (isMenuOpen.value) {
    closeMenu();
  } else {
    openMenu();
  }
};

const handleMenuSelect = (item: MenuItem) => {
  if (item === "Writing") return;
  if (!isLargeScreen.value) {
    const activeEl = document.activeElement as HTMLElement | null;
    if (activeEl && activeEl.classList.contains("nav-drawer-item")) {
      activeEl.classList.add("is-tapping");
      setTimeout(() => {
        activeEl.classList.remove("is-tapping");
      }, 180);
    }
  }
  scrollToSection(item);
  if (!isLargeScreen.value) {
    closeMenu();
  }
};

const route = useRoute();
const isWritingPage = () => route.path.startsWith('/writing') || route.path.startsWith('/blog') || route.path.startsWith('/dev-logs') || route.path.startsWith('/learning');

const isActiveSection = (item: MenuItem) => {
  if (item === "Writing") return isWritingPage();
  return activeSection.value === SECTION_MAP[item];
};

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
    closeMenu();
    isWritingMenuOpen.value = false;
  }
});

useEventListener("click", (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  if (!writingMenuRef.value?.contains(target)) {
    isWritingMenuOpen.value = false;
  }
});

// Close mobile menu when resizing to large screen
watch(isLargeScreen, (isLarge) => {
  if (isLarge) {
    closeMenu();
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
        class="nav-list hidden md:flex items-center justify-center gap-8 lg:gap-10 list-none flex-1 min-w-0"
        role="menubar"
      >
        <li v-for="item in MENU_ITEMS" :key="item" role="none" class="relative">
          <template v-if="item === 'Writing'">
            <div ref="writingMenuRef" class="relative">
              <NuxtLink
                to="/writing"
                data-nav-item
                role="menuitem"
                class="nav-link-btn cursor-pointer relative text-sm font-semibold px-2 py-1 rounded-full bg-transparent border-0 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)] inline-flex items-center gap-1"
                :class="{ 'text-[var(--color-dark)]': isActiveSection(item) }"
                @mouseenter="isWritingMenuOpen = true"
                aria-haspopup="true"
                :aria-expanded="isWritingMenuOpen"
              >
                {{ item }}
                <button
                  type="button"
                  class="p-0.5 -mr-1 hover:bg-[var(--color-light)] rounded"
                  @click.prevent="isWritingMenuOpen = !isWritingMenuOpen"
                >
                  <span 
                    class="text-sm transition-transform duration-200" 
                    :class="[isWritingMenuOpen ? 'i-tabler:chevron-up' : 'i-tabler:chevron-down']"
                    aria-hidden="true"
                  />
                </button>
              </NuxtLink>
              <!-- Writing Dropdown -->
              <Transition
                enter-active-class="transition-all duration-200 ease-out"
                enter-from-class="opacity-0 translate-y-2"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition-all duration-150 ease-in"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 translate-y-2"
              >
                <ul
                  v-show="isWritingMenuOpen"
                  @mouseleave="isWritingMenuOpen = false"
                  class="absolute top-full left-1/2 -translate-x-1/2 mt-2 py-2 px-1 min-w-44 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] shadow-lg z-50"
                  role="menu"
                >
                  <li v-for="subItem in WRITING_ITEMS" :key="subItem.path" role="none">
                    <NuxtLink
                      :to="subItem.path"
                      role="menuitem"
                      class="writing-dropdown-link flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-[var(--color-text)] transition-colors"
                      @click="isWritingMenuOpen = false"
                    >
                      <span :class="subItem.icon" />
                      {{ subItem.label }}
                    </NuxtLink>
                  </li>
                </ul>
              </Transition>
            </div>
          </template>
          <template v-else>
            <button
              data-nav-item
              type="button"
              role="menuitem"
              class="nav-link-btn cursor-pointer relative text-sm font-semibold px-2 py-1 rounded-full bg-transparent border-0 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]"
              :class="{ 'text-[var(--color-dark)]': isActiveSection(item) }"
              @click="handleMenuSelect(item)"
            >
              {{ item }}
            </button>
          </template>
        </li>
      </ul>

      <!-- Spacer for mobile so theme button stays right -->
      <div class="md:hidden flex-1 min-w-0" />

      <!-- Mobile menu toggle -->
      <button
        type="button"
        class="md:hidden nav-menu-btn cursor-pointer ml-auto mr-2 flex items-center justify-center h-9 w-9 rounded-full border border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-dark)] focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]"
        :aria-label="menuAriaLabel"
        :aria-expanded="isMenuOpen"
        @click="handleMenuToggle"
      >
        <span
          class="text-lg"
          :class="[isMenuOpen ? 'i-tabler:x' : 'i-tabler:menu-2']"
          aria-hidden="true"
        />
      </button>

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

    <!-- Mobile Drawer -->
    <div v-if="isDrawerVisible" class="nav-drawer-wrap md:hidden">
      <button
        type="button"
        class="nav-drawer-backdrop"
        aria-label="Close menu"
        @click="closeMenu"
      />
      <div ref="drawerRef" class="nav-drawer-panel">
        <ul class="nav-drawer-list" role="menu">
          <template v-for="item in MENU_ITEMS" :key="item">
            <li v-if="item === 'Writing'" role="none">
              <div class="px-3 py-2 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
                Writing
              </div>
              <ul class="pl-2 space-y-1">
                <li v-for="subItem in WRITING_ITEMS" :key="subItem.path" role="none">
                  <NuxtLink
                    :to="subItem.path"
                    role="menuitem"
                    class="nav-drawer-item"
                    :class="{ 'is-active': $route.path.startsWith(subItem.path) }"
                    @click="closeMenu"
                  >
                    <span :class="subItem.icon" class="mr-2" />
                    <span class="nav-drawer-label">{{ subItem.label }}</span>
                  </NuxtLink>
                </li>
              </ul>
            </li>
            <li v-else role="none">
              <button
                type="button"
                role="menuitem"
                class="nav-drawer-item cursor-pointer"
                :class="{ 'is-active': isActiveSection(item) }"
                @click="handleMenuSelect(item)"
              >
                <span class="nav-drawer-label">{{ item }}</span>
              </button>
            </li>
          </template>
        </ul>
        <div class="nav-drawer-footer">
          <span class="nav-drawer-chip">Tap to jump</span>
          <span class="nav-drawer-chip">Swipe up to close</span>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* Flat light bar, 64px height, no border/heavy shadow */
.nav-bar {
  background: color-mix(in srgb, var(--color-background) 92%, transparent);
  border-bottom: 1px solid color-mix(in srgb, var(--color-border) 22%, transparent);
  backdrop-filter: blur(10px);
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

.nav-link-btn::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: -0.4rem;
  width: 0;
  height: 2px;
  border-radius: 999px;
  background: linear-gradient(90deg, #7d26cd, #fbbf24);
  transform: translateX(-50%);
  transition: width 0.25s ease;
}

.nav-link-btn:hover::after,
.nav-link-btn.text-\[var\(--color-dark\)\]::after {
  width: 70%;
}

/* Writing dropdown: neutral hover and active (no purple-on-purple) */
.writing-dropdown-link:hover {
  background: var(--color-light);
  color: var(--color-dark);
}

.writing-dropdown-link.router-link-active {
  background: var(--color-light);
  color: var(--color-dark);
  font-weight: 600;
}

.writing-dropdown-link.router-link-active:hover {
  background: color-mix(in srgb, var(--color-light) 85%, var(--color-border));
  color: var(--color-dark);
}

/* Oval button with subtle diffused shadow (light theme) */
.nav-theme-btn {
  box-shadow: 0 6px 18px rgba(64, 17, 122, 0.12);
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.nav-theme-btn:hover {
  box-shadow: 0 10px 26px rgba(64, 17, 122, 0.18);
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

.nav-menu-btn {
  box-shadow: 0 6px 16px rgba(64, 17, 122, 0.12);
}

.nav-drawer-wrap {
  position: absolute;
  inset: 0;
  top: 4rem;
  z-index: 40;
}

.nav-drawer-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(15, 15, 15, 0.35);
  backdrop-filter: blur(4px);
}

.nav-drawer-panel {
  position: absolute;
  top: 0.75rem;
  left: 1rem;
  right: 1rem;
  padding: 1rem 1.1rem 1.2rem;
  border-radius: 1.25rem;
  background: var(--color-card);
  border: 1px solid var(--color-border);
  box-shadow: 0 18px 46px rgba(32, 10, 60, 0.18);
}

.nav-drawer-list,
.nav-drawer-list li {
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-drawer-item {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.85rem 1rem;
  border-radius: 0.9rem;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-text);
  background: transparent;
  border: 1px solid transparent;
  transition: background 0.2s ease, border 0.2s ease, transform 0.2s ease;
}

.nav-drawer-item:hover {
  background: rgba(125, 38, 205, 0.12);
  border-color: rgba(125, 38, 205, 0.2);
  color: #5b21b6;
  transform: translateY(-1px);
}

.nav-drawer-item.is-active {
  background: rgba(125, 38, 205, 0.16);
  border-color: rgba(125, 38, 205, 0.28);
  color: #5b21b6;
}

.nav-drawer-item.is-tapping {
  transform: scale(0.96);
}

.nav-drawer-label {
  letter-spacing: 0.01em;
}

.nav-drawer-footer {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.nav-drawer-chip {
  font-size: 0.7rem;
  padding: 0.35rem 0.65rem;
  border-radius: 999px;
  background: rgba(125, 38, 205, 0.08);
  color: #6b21a8;
  font-weight: 600;
}

[data-theme="dark"] .nav-drawer-panel {
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.4);
}
</style>
