"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { galleryCategories, galleryItems } from "@/content/gallery";
import { PlaceholderArt } from "@/components/effects/PlaceholderArt";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";
import type { GalleryItem } from "@/types";

type Category = (typeof galleryCategories)[number]["id"];

const ratioClass: Record<GalleryItem["ratio"], string> = {
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
};

const accents = ["electric", "cyan", "violet", "emerald", "amber"] as const;

/**
 * Masonry gallery with a lightweight lightbox.
 * Every tile currently renders generated artwork; drop real images into
 * /public/gallery and set `src` on the item to switch over.
 */
export function GalleryGrid() {
  const [category, setCategory] = useState<Category>("all");
  const [active, setActive] = useState<GalleryItem | null>(null);
  const prefersReduced = usePrefersReducedMotion();

  const items = useMemo(
    () =>
      category === "all"
        ? galleryItems
        : galleryItems.filter((item) => item.category === category),
    [category],
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter gallery">
        {galleryCategories.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={category === item.id}
            onClick={() => setCategory(item.id)}
            className={cn(
              "rounded-full border px-4 py-2 font-display text-sm transition-colors",
              category === item.id
                ? "border-electric/40 bg-slate-surface text-fg"
                : "border-hairline text-fg-subtle hover:text-fg-muted",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
        {items.map((item, index) => (
          <motion.button
            key={item.id}
            type="button"
            onClick={() => setActive(item)}
            initial={prefersReduced ? false : { opacity: 0, y: 18 }}
            whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: Math.min(index * 0.03, 0.25) }}
            className="group block w-full break-inside-avoid overflow-hidden rounded-2xl border border-hairline bg-graphite/60 text-left transition-colors hover:border-electric/40"
          >
            <div className={cn("relative overflow-hidden", ratioClass[item.ratio])}>
              <PlaceholderArt
                seed={item.id + item.title}
                accent={accents[index % accents.length]}
                label={item.title}
                className="h-full w-full transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105"
              />
              {item.placeholder && (
                <span className="absolute right-3 top-3 rounded-full border border-hairline bg-void/70 px-2 py-0.5 text-[0.625rem] uppercase tracking-[0.14em] text-fg-subtle">
                  Placeholder
                </span>
              )}
            </div>
            <div className="p-5">
              <h3 className="font-display text-base font-medium">{item.title}</h3>
              <p className="mt-1.5 text-sm text-fg-muted">{item.caption}</p>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReduced ? 0 : 0.2 }}
            className="fixed inset-0 z-[70] grid place-items-center bg-void/90 p-5 backdrop-blur-md"
            onClick={() => setActive(null)}
          >
            <motion.figure
              initial={prefersReduced ? false : { scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={prefersReduced ? undefined : { scale: 0.97, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-3xl overflow-hidden rounded-3xl border border-hairline bg-graphite"
              onClick={(event) => event.stopPropagation()}
            >
              <PlaceholderArt
                seed={active.id + active.title}
                accent="cyan"
                label={active.title}
                className="aspect-video w-full"
              />
              <figcaption className="flex items-start justify-between gap-6 p-6">
                <div>
                  <h3 className="font-display text-lg font-semibold">{active.title}</h3>
                  <p className="mt-1.5 text-sm text-fg-muted">{active.caption}</p>
                </div>
                <button
                  type="button"
                  autoFocus
                  onClick={() => setActive(null)}
                  aria-label="Close"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-hairline text-fg-muted hover:text-fg"
                >
                  <X size={16} aria-hidden />
                </button>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
