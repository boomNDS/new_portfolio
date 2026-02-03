import type { Ref } from "vue";

export type Theme = "light" | "dark";

/**
 * Composable for managing theme state with SSR support
 * Persists theme preference to localStorage and applies to document
 */
export function useTheme(): {
  theme: Ref<Theme>;
  toggleTheme: () => void;
  setTheme: (newTheme: Theme) => void;
} {
  const theme = useState<Theme>("theme", () => "light");

  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme;
  };

  const toggleTheme = () => {
    theme.value = theme.value === "light" ? "dark" : "light";
  };

  // Client-side initialization and persistence
  if (import.meta.client) {
    onMounted(() => {
      // Check for stored preference or system preference
      const stored = localStorage.getItem("theme") as Theme | null;
      if (stored) {
        theme.value = stored;
      } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        theme.value = "dark";
      }
    });

    // Watch and persist changes
    watch(
      theme,
      (val) => {
        document.documentElement.dataset.theme = val;
        localStorage.setItem("theme", val);
      },
      { immediate: true },
    );
  }

  return {
    theme,
    toggleTheme,
    setTheme,
  };
}
