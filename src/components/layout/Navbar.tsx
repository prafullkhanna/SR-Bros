"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { navLinks, siteConfig } from "@/content/site";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useTheme } from "@/hooks/useTheme";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const progress = useScrollProgress();
  const { theme, toggle } = useTheme();
  const prefersReduced = usePrefersReducedMotion();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation and lock body scroll while it is open.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Reading progress */}
      <div
        aria-hidden
        className="h-px origin-left bg-gradient-to-r from-electric via-cyan-accent to-violet-accent"
        style={{ transform: `scaleX(${progress})` }}
      />

      <div
        className={cn(
          "transition-all duration-500 ease-[var(--ease-out-expo)]",
          scrolled ? "glass border-b" : "border-b border-transparent",
        )}
      >
        <Container wide>
          <nav aria-label="Primary" className="flex h-16 items-center justify-between gap-6">
            <Link
              href="/"
              className="group flex items-center gap-2.5 font-display text-base font-semibold tracking-tight"
            >
              <span
                aria-hidden
                className="grid h-8 w-8 place-items-center rounded-lg border border-electric/40 bg-electric/10 text-[0.7rem] font-bold text-cyan-accent transition-colors group-hover:border-cyan-accent/60"
              >
                SR
              </span>
              <span>
                {siteConfig.name}
                <span className="text-fg-subtle">.in</span>
              </span>
            </Link>

            <ul className="hidden items-center gap-1 lg:flex">
              {navLinks.map((link) => {
                const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative rounded-full px-3.5 py-2 text-sm transition-colors duration-300",
                        active ? "text-fg" : "text-fg-muted hover:text-fg",
                      )}
                    >
                      {active && !prefersReduced && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-0 -z-10 rounded-full border border-hairline bg-slate-surface/70"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggle}
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
                className="grid h-9 w-9 place-items-center rounded-full border border-hairline text-fg-muted transition-colors hover:border-electric/40 hover:text-fg"
              >
                {theme === "dark" ? <Sun size={16} aria-hidden /> : <Moon size={16} aria-hidden />}
              </button>

              <Link
                href="/contact"
                className="hidden rounded-full bg-fg px-5 py-2 font-display text-sm font-medium text-void transition-transform duration-300 hover:-translate-y-0.5 sm:inline-flex"
              >
                Contact
              </Link>

              <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                className="grid h-9 w-9 place-items-center rounded-full border border-hairline text-fg lg:hidden"
              >
                {open ? <X size={17} aria-hidden /> : <Menu size={17} aria-hidden />}
              </button>
            </div>
          </nav>
        </Container>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: prefersReduced ? 0 : 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="glass border-b lg:hidden"
          >
            <Container>
              <ul className="grid gap-1 py-5">
                {[...navLinks, { label: "Media", href: "/media" }, { label: "Contact", href: "/contact" }].map(
                  (link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="flex items-center justify-between rounded-xl px-4 py-3 font-display text-lg text-fg-muted transition-colors hover:bg-slate-surface/70 hover:text-fg"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
