/**
 * Composable for smooth scrolling to page sections
 * Provides methods for scrolling to specific elements by ID
 */
export function useScrollTo(): {
  scrollToSection: (sectionId: string) => void;
  scrollToTop: () => void;
} {
  const scrollToSection = (sectionId: string) => {
    if (!import.meta.client) return;

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    if (!import.meta.client) return;

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return {
    scrollToSection,
    scrollToTop,
  };
}
