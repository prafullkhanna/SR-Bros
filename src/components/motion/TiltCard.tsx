"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

/**
 * Subtle 3D tilt on pointer move, with a light sheen that tracks the cursor.
 * Disabled entirely for reduced-motion users and coarse pointers.
 */
export function TiltCard({
  children,
  className,
  intensity = 6,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
}) {
  const prefersReduced = usePrefersReducedMotion();
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(y, [0, 1], [intensity, -intensity]), {
    stiffness: 220,
    damping: 24,
  });
  const rotateY = useSpring(useTransform(x, [0, 1], [-intensity, intensity]), {
    stiffness: 220,
    damping: 24,
  });

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn("[transform-style:preserve-3d]", className)}
      style={{ rotateX, rotateY, perspective: 1200 }}
      onPointerMove={(event) => {
        if (event.pointerType !== "mouse") return;
        const rect = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - rect.left) / rect.width);
        y.set((event.clientY - rect.top) / rect.height);
      }}
      onPointerLeave={() => {
        x.set(0.5);
        y.set(0.5);
      }}
    >
      {children}
    </motion.div>
  );
}
