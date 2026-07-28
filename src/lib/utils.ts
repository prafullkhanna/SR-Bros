import type { WorkStatus } from "@/types";

/** Tiny className joiner — avoids pulling in clsx for a handful of call sites. */
export function cn(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(" ");
}

/** Human labels + colour intent for the status pills used across the site. */
export const statusMeta: Record<
  WorkStatus,
  { label: string; description: string; tone: "emerald" | "electric" | "violet" | "amber" }
> = {
  completed: {
    label: "Completed",
    description: "Built, finished and working.",
    tone: "emerald",
  },
  ongoing: {
    label: "In progress",
    description: "Actively being built right now.",
    tone: "electric",
  },
  concept: {
    label: "Concept",
    description: "Designed on paper. Not built yet.",
    tone: "violet",
  },
  planned: {
    label: "Planned",
    description: "Intended future work. Not started.",
    tone: "amber",
  },
};

export const toneClasses: Record<
  "emerald" | "electric" | "violet" | "amber" | "cyan",
  string
> = {
  emerald: "text-emerald-accent border-emerald-accent/30 bg-emerald-accent/10",
  electric: "text-electric border-electric/30 bg-electric/10",
  violet: "text-violet-accent border-violet-accent/30 bg-violet-accent/10",
  amber: "text-amber-accent border-amber-accent/30 bg-amber-accent/10",
  cyan: "text-cyan-accent border-cyan-accent/30 bg-cyan-accent/10",
};

/** Accent → raw hex, used by canvas/SVG code that cannot read CSS variables. */
export const accentHex = {
  electric: "#4d7cff",
  cyan: "#35d6f5",
  violet: "#9d7bff",
  emerald: "#34d99b",
  amber: "#f2b455",
} as const;

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/** Deterministic 0–1 value from a string — used for stable placeholder art. */
export function hashToUnit(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash % 1000) / 1000;
}
