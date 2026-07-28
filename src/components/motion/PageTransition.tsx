"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Short cross-fade between routes. Deliberately fast (240ms) — a page
 * transition should never make the site feel slower than it is.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const prefersReduced = usePrefersReducedMotion();

  if (prefersReduced) return <>{children}</>;

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
