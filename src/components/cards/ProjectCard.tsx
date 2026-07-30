import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types";
import { StatusPill } from "@/components/ui/StatusPill";
import { Tag } from "@/components/ui/Tag";
import { TiltCard } from "@/components/motion/TiltCard";
import { PlaceholderArt } from "@/components/effects/PlaceholderArt";

export function ProjectCard({ project }: { project: Project }) {
  // A project counts as "live" only when it has a real, non-placeholder URL —
  // so the badge can never appear on something a visitor cannot actually open.
  const isLive = project.links?.some(
    (link) => !link.placeholder && link.href.startsWith("http"),
  );

  return (
    <TiltCard className="h-full" intensity={4}>
      <article className="gradient-border group h-full overflow-hidden rounded-[var(--radius-card)] border border-hairline bg-graphite/70 transition-transform duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1">
        <Link href={`/projects/${project.slug}`} className="flex h-full flex-col">
          <div className="relative aspect-[16/10] overflow-hidden border-b border-hairline">
            <PlaceholderArt
              seed={project.slug}
              accent={project.accent ?? "electric"}
              label={project.title}
              className="h-full w-full transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
            />
            <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2">
              <StatusPill status={project.status} />
              {isLive && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-accent/30 bg-void/70 px-2.5 py-1 font-display text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-emerald-accent">
                  <span
                    aria-hidden
                    className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-accent"
                  />
                  Live
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-1 flex-col p-6">
            <p className="font-display text-xs uppercase tracking-[0.2em] text-fg-subtle">
              {project.category} · {project.period}
            </p>
            <h3 className="mt-3 font-display text-xl font-semibold leading-snug text-fg">
              {project.title}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-fg-muted">
              {project.tagline}
            </p>

            {project.stack && project.stack.length > 0 && (
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {project.stack.slice(0, 3).map((item) => (
                  <li key={item}>
                    <Tag>{item}</Tag>
                  </li>
                ))}
                {project.stack.length > 3 && (
                  <li>
                    <Tag>+{project.stack.length - 3}</Tag>
                  </li>
                )}
              </ul>
            )}

            <span className="mt-6 inline-flex items-center gap-1.5 font-display text-sm text-cyan-accent">
              View project
              <ArrowUpRight
                size={15}
                aria-hidden
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </span>
          </div>
        </Link>
      </article>
    </TiltCard>
  );
}
