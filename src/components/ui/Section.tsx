import type { ReactNode } from "react";
import { Container } from "./Container";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  /** Renders the faint engineering grid behind the section. */
  grid?: boolean;
  wide?: boolean;
  as?: "section" | "div" | "article";
}

export function Section({
  children,
  id,
  className,
  grid = false,
  wide = false,
  as: Tag = "section",
}: SectionProps) {
  return (
    <Tag id={id} className={cn("relative py-20 sm:py-24 lg:py-28", className)}>
      {grid && (
        <div aria-hidden className="pointer-events-none absolute inset-0 grid-backdrop opacity-60" />
      )}
      <Container wide={wide} className="relative">
        {children}
      </Container>
    </Tag>
  );
}
