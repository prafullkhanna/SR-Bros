"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Thin client wrapper so server components can place staggered children
 * inside a <RevealGroup /> without becoming client components themselves.
 */
export function MotionItem({
  children,
  variants,
  className,
}: {
  children: ReactNode;
  variants: Variants;
  className?: string;
}) {
  return (
    <motion.div variants={variants} className={className}>
      {children}
    </motion.div>
  );
}
