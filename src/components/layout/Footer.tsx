import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { contactLinks, footerGroups, siteConfig } from "@/content/site";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="relative mt-8 border-t border-hairline bg-ink/60">
      <Container wide className="py-16">
        <blockquote className="mx-auto max-w-3xl text-balance text-center font-display text-xl font-medium leading-snug text-fg sm:text-2xl">
          <span className="text-gradient">&ldquo;{siteConfig.quote}&rdquo;</span>
        </blockquote>

        <div className="rule my-14" />

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2.5 font-display text-lg font-semibold">
              <span
                aria-hidden
                className="grid h-8 w-8 place-items-center rounded-lg border border-electric/40 bg-electric/10 text-[0.7rem] font-bold text-cyan-accent"
              >
                SR
              </span>
              {siteConfig.name}
              <span className="text-fg-subtle">.in</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-fg-muted">
              {siteConfig.tagline}
            </p>
            <p className="mt-4 text-xs text-fg-subtle">New Delhi, India</p>
          </div>

          {footerGroups.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="font-display text-xs font-medium uppercase tracking-[0.22em] text-fg-subtle">
                {group.title}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-fg-muted transition-colors hover:text-fg"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-hairline pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-fg-subtle">
            © {new Date().getFullYear()} Sommay &amp; Ramansh Khanna. Built with Next.js.
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {contactLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1 text-xs text-fg-muted transition-colors hover:text-fg"
                >
                  {link.label}
                  {link.placeholder && (
                    <span className="sr-only"> (placeholder link — not live yet)</span>
                  )}
                  <ArrowUpRight
                    size={12}
                    aria-hidden
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
