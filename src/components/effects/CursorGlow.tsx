"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * A soft light that follows the cursor on fine-pointer devices.
 * Written directly to a CSS transform via rAF — it never triggers a React
 * render, so it costs nothing on the main thread beyond one style write.
 */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const node = ref.current;
    if (!node) return;

    let frame = 0;
    const current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const target = { ...current };

    const onMove = (event: PointerEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;
    };

    const loop = () => {
      current.x += (target.x - current.x) * 0.12;
      current.y += (target.y - current.y) * 0.12;
      node.style.transform = `translate3d(${current.x - 220}px, ${current.y - 220}px, 0)`;
      frame = requestAnimationFrame(loop);
    };

    node.style.opacity = "1";
    window.addEventListener("pointermove", onMove, { passive: true });
    loop();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, [prefersReduced]);

  if (prefersReduced) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-0 hidden h-[440px] w-[440px] rounded-full opacity-0 transition-opacity duration-700 mix-blend-screen md:block"
      style={{
        background:
          "radial-gradient(circle, rgba(77,124,255,0.10) 0%, rgba(53,214,245,0.05) 35%, transparent 68%)",
      }}
    />
  );
}
