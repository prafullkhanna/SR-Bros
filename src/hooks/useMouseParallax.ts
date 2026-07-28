"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

export interface Pointer {
  /** -1 … 1 relative to viewport centre. */
  x: number;
  y: number;
}

/**
 * Normalised pointer position for parallax effects.
 * Returns a static centre position when reduced motion is requested, and
 * on touch devices where there is no meaningful pointer.
 */
export function useMouseParallax(strength = 1): Pointer {
  const [pointer, setPointer] = useState<Pointer>({ x: 0, y: 0 });
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let frame = 0;
    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setPointer({
          x: ((event.clientX / window.innerWidth) * 2 - 1) * strength,
          y: ((event.clientY / window.innerHeight) * 2 - 1) * strength,
        });
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, [prefersReduced, strength]);

  return pointer;
}
