import { heroStats } from "@/lib/stats";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";
import { RevealGroup, revealChild } from "@/components/motion/Reveal";
import { MotionItem } from "@/components/motion/MotionItem";

/**
 * Headline numbers. Every value is computed from the content layer at build
 * time (src/lib/stats.ts), so it cannot overstate what is on the site.
 */
export function Stats() {
  return (
    <RevealGroup className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-card)] border border-hairline bg-hairline lg:grid-cols-4">
      {heroStats.map((stat) => (
        <MotionItem key={stat.label} variants={revealChild} className="bg-graphite/80 p-7">
          <p className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            <AnimatedCounter value={stat.value} suffix={"suffix" in stat ? stat.suffix : ""} />
          </p>
          <p className="mt-2 font-display text-sm font-medium text-fg">{stat.label}</p>
          <p className="mt-1 text-xs leading-relaxed text-fg-subtle">{stat.hint}</p>
        </MotionItem>
      ))}
    </RevealGroup>
  );
}
