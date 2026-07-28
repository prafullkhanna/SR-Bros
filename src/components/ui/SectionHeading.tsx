import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  /** Renders the title as an h1 (used once per page). */
  level?: "h1" | "h2";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  level = "h2",
}: SectionHeadingProps) {
  const Title = level;

  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <p className="mb-4 flex items-center gap-3 font-display text-xs font-medium uppercase tracking-[0.28em] text-cyan-accent">
            {align === "left" && <span aria-hidden className="h-px w-8 bg-cyan-accent/50" />}
            {eyebrow}
          </p>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <Title
          className={cn(
            "font-display font-semibold leading-[1.05]",
            level === "h1"
              ? "text-4xl sm:text-6xl lg:text-7xl"
              : "text-3xl sm:text-4xl lg:text-5xl",
          )}
        >
          {title}
        </Title>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <div className="mt-5 text-base leading-relaxed text-fg-muted sm:text-lg">
            {description}
          </div>
        </Reveal>
      )}
    </div>
  );
}
