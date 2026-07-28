"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, Users } from "lucide-react";
import { siteConfig } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Aurora } from "@/components/effects/Aurora";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useMouseParallax } from "@/hooks/useMouseParallax";

/** three.js is loaded only in the browser, after the hero content paints. */
const ThreeBackground = dynamic(
  () => import("@/components/effects/ThreeBackground").then((mod) => mod.ThreeBackground),
  { ssr: false },
);

const words = siteConfig.headline.split(" ");

export function Hero() {
  const prefersReduced = usePrefersReducedMotion();
  const pointer = useMouseParallax(1);

  return (
    <section className="relative flex min-h-[92svh] items-center overflow-hidden pt-24">
      <div aria-hidden className="absolute inset-0 grid-backdrop" />
      <Aurora />
      <ThreeBackground />

      <Container wide className="relative z-10">
        <div className="max-w-4xl">
          <motion.p
            initial={prefersReduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2.5 rounded-full border border-hairline bg-graphite/60 px-4 py-1.5 font-display text-xs tracking-[0.14em] text-fg-muted uppercase"
          >
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-cyan-accent" />
            Sommay &amp; Ramansh Khanna · New Delhi
          </motion.p>

          <h1 className="mt-8 font-display text-[clamp(2.75rem,8vw,6.5rem)] font-semibold leading-[0.95] tracking-[-0.04em]">
            {words.map((word, index) => (
              <motion.span
                key={word + index}
                initial={prefersReduced ? false : { opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.9,
                  delay: 0.1 + index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="mr-[0.25em] inline-block"
              >
                {index === words.length - 1 ? (
                  <span className="text-gradient">{word}</span>
                ) : (
                  word
                )}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={prefersReduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="mt-7 max-w-2xl font-display text-base tracking-[0.02em] text-fg-muted sm:text-lg"
          >
            {siteConfig.subheadline}
          </motion.p>

          <motion.p
            initial={prefersReduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 max-w-xl text-base leading-relaxed text-fg-muted"
          >
            Two brothers building robotics, AI and software — from a line-following robot at
            IIT&nbsp;Bombay to a disaster-management robot system in development today.
          </motion.p>

          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.68, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <ButtonLink href="/projects" size="lg">
              Explore projects
              <ArrowRight size={16} aria-hidden className="transition-transform duration-300 group-hover:translate-x-1" />
            </ButtonLink>
            <ButtonLink href="/brothers" variant="secondary" size="lg">
              <Users size={16} aria-hidden />
              Meet the brothers
            </ButtonLink>
          </motion.div>
        </div>
      </Container>

      {/* Floating accent, parallaxed by pointer position. */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[8%] top-1/3 hidden h-72 w-72 rounded-full border border-electric/15 lg:block"
        style={{
          transform: `translate3d(${pointer.x * -18}px, ${pointer.y * -18}px, 0)`,
        }}
      >
        <div className="animate-float-slow absolute inset-8 rounded-full border border-cyan-accent/15" />
        <div className="absolute inset-20 rounded-full bg-[radial-gradient(circle,rgba(53,214,245,0.14),transparent_70%)]" />
      </div>

      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[var(--surface)] to-transparent"
      />
    </section>
  );
}
