import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Page gutter. Widens on ultra-wide displays without letting text sprawl. */
export function Container({
  children,
  className,
  wide = false,
}: {
  children: ReactNode;
  className?: string;
  wide?: boolean;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-8 lg:px-12",
        wide ? "max-w-[110rem]" : "max-w-7xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
