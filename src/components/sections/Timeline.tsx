"use client";

import { useMemo, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { timeline } from "@/content/timeline";
import { StatusPill } from "@/components/ui/StatusPill";
import { Tag } from "@/components/ui/Tag";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";
import type { BrotherId } from "@/types";

const filters = [
  { id: "all", label: "Both" },
  { id: "sommay", label: "Sommay" },
  { id: "ramansh", label: "Ramansh" },
] as const;

type Filter = (typeof filters)[number]["id"];

/**
 * Animated vertical timeline. Entries expand to reveal detail, and the
 * progress rail fills as the section scrolls.
 */
export function Timeline({ compact = false }: { compact?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();
  const [filter, setFilter] = useState<Filter>("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.4"],
  });
  const railScale = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  const entries = useMemo(() => {
    const base = filter === "all" ? timeline : timeline.filter(
      (entry) => entry.who === (filter as BrotherId) || entry.who === "both",
    );
    return compact ? base.slice(0, 6) : base;
  }, [filter, compact]);

  return (
    <div>
      {!compact && (
        <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filter timeline">
          {filters.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={filter === item.id}
              onClick={() => setFilter(item.id)}
              className={cn(
                "rounded-full border px-4 py-2 font-display text-sm transition-colors",
                filter === item.id
                  ? "border-electric/40 bg-slate-surface text-fg"
                  : "border-hairline text-fg-subtle hover:text-fg-muted",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      <div ref={containerRef} className="relative pl-8 sm:pl-12">
        <div aria-hidden className="absolute left-[7px] top-2 h-full w-px bg-hairline sm:left-[15px]" />
        <motion.div
          aria-hidden
          className="absolute left-[7px] top-2 h-full w-px origin-top bg-gradient-to-b from-electric via-cyan-accent to-transparent sm:left-[15px]"
          style={prefersReduced ? { scaleY: 1 } : { scaleY: railScale }}
        />

        <ol className="space-y-8">
          {entries.map((entry, index) => {
            const open = expanded === entry.id;
            return (
              <motion.li
                key={entry.id}
                initial={prefersReduced ? false : { opacity: 0, y: 22 }}
                whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.55, delay: Math.min(index * 0.04, 0.3), ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <span
                  aria-hidden
                  className={cn(
                    "absolute -left-8 top-4 h-3.5 w-3.5 rounded-full border-2 sm:-left-12",
                    entry.status === "completed"
                      ? "border-emerald-accent bg-emerald-accent/25"
                      : entry.status === "ongoing"
                        ? "border-electric bg-electric/25"
                        : "border-amber-accent bg-amber-accent/20",
                  )}
                />

                <button
                  type="button"
                  onClick={() => setExpanded(open ? null : entry.id)}
                  aria-expanded={open}
                  className="w-full rounded-2xl border border-hairline bg-graphite/60 p-5 text-left transition-colors hover:border-electric/30 sm:p-6"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-display text-sm font-medium text-cyan-accent">
                      {entry.year}
                    </span>
                    <StatusPill status={entry.status} />
                    <span className="ml-auto text-xs uppercase tracking-[0.18em] text-fg-subtle">
                      {entry.who === "both" ? "Both" : entry.who}
                    </span>
                  </div>

                  <h3 className="mt-3 font-display text-lg font-semibold leading-snug">
                    {entry.title}
                  </h3>

                  <motion.div
                    initial={false}
                    animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
                    transition={{ duration: prefersReduced ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pt-3 text-sm leading-relaxed text-fg-muted">{entry.description}</p>
                    {entry.tags && (
                      <ul className="mt-4 flex flex-wrap gap-1.5">
                        {entry.tags.map((tag) => (
                          <li key={tag}>
                            <Tag>{tag}</Tag>
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.div>

                  {!open && (
                    <p className="mt-2 line-clamp-1 text-sm text-fg-subtle">{entry.description}</p>
                  )}
                </button>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
