/**
 * Shared domain types for SRbros.in.
 *
 * The content layer is fully typed so that every project, timeline entry and
 * achievement must declare a `status`. This is deliberate: the site must never
 * blur the line between work that is finished, work in progress, and ideas
 * that have not been built yet.
 */

/** Lifecycle of a project or milestone. Never omit this. */
export type WorkStatus = "completed" | "ongoing" | "concept" | "planned";

export type ProjectCategory =
  | "robotics"
  | "ai"
  | "software"
  | "web"
  | "research";

export type BrotherId = "sommay" | "ramansh";

export interface Link {
  label: string;
  href: string;
  /** Marks links that are intentionally not live yet. */
  placeholder?: boolean;
}

export interface ProjectSection {
  heading: string;
  body: string;
  /** Optional bullet list rendered under the body copy. */
  points?: string[];
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  category: ProjectCategory;
  status: WorkStatus;
  owner: BrotherId | "both";
  /** Display year or range, e.g. "2024" or "2024 — present". */
  period: string;
  /** Technologies, components or methods actually used. Omit for unstarted work. */
  stack?: string[];
  featured?: boolean;
  /** Long-form breakdown: problem, solution, process, challenges, results. */
  sections?: ProjectSection[];
  /** Ideas that are explicitly not yet built. */
  futureScope?: string[];
  links?: Link[];
  /** Accent used for the generated cover art. */
  accent?: "electric" | "cyan" | "violet" | "emerald" | "amber";
}

export interface Achievement {
  title: string;
  detail: string;
  year?: string;
  status: WorkStatus;
}

export interface Brother {
  id: BrotherId;
  name: string;
  age: number;
  role: string;
  school: string;
  grade: string;
  location: string;
  /** Personal address on the srbros.in domain. */
  email: string;
  bio: string[];
  subjects?: string[];
  interests?: string[];
  skills: { label: string; level: number }[];
  focusAreas: string[];
  achievements: Achievement[];
  accent: "electric" | "cyan" | "violet" | "emerald";
}

export interface TimelineEntry {
  id: string;
  year: string;
  title: string;
  description: string;
  who: BrotherId | "both";
  status: WorkStatus;
  tags?: string[];
}

export interface SkillAxis {
  label: string;
  /** 0–100. Self-assessed, relative to peers of the same age. */
  sommay: number;
  ramansh: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  category: "robotics" | "competitions" | "workshops" | "school" | "builds";
  /** Aspect ratio hint for the masonry layout. */
  ratio: "portrait" | "landscape" | "square";
  /** Set once a real photograph replaces the generated placeholder. */
  src?: string;
  placeholder: true | false;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: BrotherId;
  tags: string[];
  readingMinutes: number;
  status: "published" | "draft";
  /** Simple block content; swap for MDX when the CMS lands (see docs/CONTENT.md). */
  body?: string[];
}

export interface MediaMention {
  id: string;
  outlet: string;
  title: string;
  date?: string;
  href?: string;
  status: WorkStatus;
}
