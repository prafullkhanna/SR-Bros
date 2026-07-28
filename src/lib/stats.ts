/**
 * Headline statistics derived from the content layer, so the numbers on the
 * home page can never contradict the projects actually listed on the site.
 */
import { projects } from "@/content/projects";
import { timeline } from "@/content/timeline";
import { siteConfig } from "@/content/site";

const currentYear = new Date().getFullYear();

export const heroStats = [
  {
    value: projects.filter((p) => p.status === "completed" || p.status === "ongoing").length,
    label: "Projects built",
    hint: "Completed and in-progress builds listed on this site",
  },
  {
    value: timeline.filter((entry) => entry.tags?.includes("Competition") && entry.status === "completed").length,
    label: "Competitions entered",
    hint: "Robotics competitions participated in",
  },
  {
    value: new Set(projects.map((p) => p.category)).size,
    label: "Disciplines",
    hint: "Robotics, AI, software, web and research",
  },
  {
    value: Math.max(1, currentYear - siteConfig.founded),
    label: "Years building",
    hint: `Since ${siteConfig.founded}`,
    suffix: "+",
  },
] as const;
