"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Counts up to `value` when scrolled into view.
 * Renders the final value immediately under reduced motion so the number is
 * never animated for users who asked for stillness.
 */
export function AnimatedCounter({
  value,
  suffix = "",
  duration = 1.6,
  className,
}: {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const prefersReduced = usePrefersReducedMotion();
  // Starts at the real value so the server-rendered HTML contains the number
  // itself — crawlers and no-JS visitors must never see "0 projects built".
  const [display, setDisplay] = useState(value);

  // On the client, drop back to zero only while the counter is still off-screen,
  // so the count-up has somewhere to start without a visible flicker.
  useEffect(() => {
    if (!prefersReduced && !inView) setDisplay(0);
    // Intentionally runs once, on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!inView) return;
    if (prefersReduced) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, prefersReduced, value, duration]);

  // The final value goes on aria-label rather than in a duplicate sr-only span:
  // two text nodes would make the DOM read "07" to crawlers and text scrapers.
  return (
    <span ref={ref} className={className} aria-label={`${value}${suffix}`}>
      <span aria-hidden>
        {display}
        {suffix}
      </span>
    </span>
  );
}
