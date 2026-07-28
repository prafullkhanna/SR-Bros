"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { projectCategories, projects } from "@/content/projects";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

type Category = (typeof projectCategories)[number]["id"];

/**
 * Filterable, searchable project grid.
 * Filtering happens in memory over the typed content layer — no network
 * request, no layout shift, and the full list is server-rendered for crawlers.
 */
export function ProjectExplorer() {
  const [category, setCategory] = useState<Category>("all");
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const prefersReduced = usePrefersReducedMotion();

  const results = useMemo(() => {
    const needle = deferredQuery.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesCategory = category === "all" || project.category === category;
      if (!matchesCategory) return false;
      if (!needle) return true;
      return [project.title, project.tagline, project.summary, ...(project.stack ?? [])]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [category, deferredQuery]);

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Filter projects by category"
        >
          {projectCategories.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={category === item.id}
              onClick={() => setCategory(item.id)}
              className={cn(
                "rounded-full border px-4 py-2 font-display text-sm transition-all duration-300",
                category === item.id
                  ? "border-electric/40 bg-slate-surface text-fg"
                  : "border-hairline text-fg-subtle hover:text-fg-muted",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="relative w-full lg:max-w-xs">
          <Search
            size={16}
            aria-hidden
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-fg-subtle"
          />
          <label htmlFor="project-search" className="sr-only">
            Search projects
          </label>
          <input
            id="project-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search projects, tech…"
            className="h-11 w-full rounded-full border border-hairline bg-graphite/70 pl-11 pr-4 text-sm text-fg placeholder:text-fg-subtle focus:border-electric/50 focus:outline-none"
          />
        </div>
      </div>

      <p aria-live="polite" className="mt-6 flex items-center gap-2 text-xs text-fg-subtle">
        <SlidersHorizontal size={13} aria-hidden />
        {results.length} {results.length === 1 ? "project" : "projects"}
        {category !== "all" && ` in ${category}`}
        {deferredQuery && ` matching “${deferredQuery}”`}
      </p>

      {results.length === 0 ? (
        <p className="mt-14 rounded-2xl border border-dashed border-hairline p-10 text-center text-sm text-fg-muted">
          No projects match that search yet. Try a different term or clear the filters.
        </p>
      ) : (
        <motion.div layout={!prefersReduced} className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {results.map((project) => (
              <motion.div
                key={project.slug}
                layout={!prefersReduced}
                initial={prefersReduced ? false : { opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={prefersReduced ? undefined : { opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
