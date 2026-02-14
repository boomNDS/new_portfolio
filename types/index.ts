/**
 * Shared TypeScript types for the portfolio application
 */

// ============================================
// Experience Types
// ============================================

export interface Experience {
  logoSrc: string;
  logoAlt: string;
  title: string;
  subtitle: string;
  description: string;
  listItems: string[];
}

export interface ParsedExperience extends Experience {
  role: string;
  timeframe: string;
  employmentType: string;
  isCurrent: boolean;
}

// ============================================
// Showcase/Project Types
// ============================================

export interface ProjectLink {
  type: "link" | "github" | "design";
  url: string;
}

export interface Project {
  name: string;
  detail: string;
  meta: string;
  result?: string;
  inactive?: boolean;
  links: ProjectLink[];
  img: string;
  tags: string[];
  category: string[];
}

export type ProjectCategory = "all" | "frontend" | "backend" | "design" | "other";

// ============================================
// Tech Stack Types
// ============================================

export interface TechStack {
  iconSrc: string;
  iconTitle: string;
  lastUsed: string;
}

// ============================================
// Theme Types
// ============================================

export type Theme = "light" | "dark";
export type MotionPreference = "no-preference" | "reduce";

// ============================================
// Navigation Types
// ============================================

export type SectionId = "intro" | "experience" | "tech_stack" | "showcase" | "writing";
export type MenuItem = "Experience" | "Tech stack" | "Showcase" | "Writing";

// ============================================
// Component Prop Types
// ============================================

export interface InfoCardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  meta?: string;
  result?: string;
  tags: string[];
  links: ProjectLink[];
}

export interface StackCardProps {
  iconSrc: string;
  iconTitle: string;
  lastUsed: string;
}
