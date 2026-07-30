import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Lightbulb } from "lucide-react";

import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { StatusPill } from "@/components/ui/StatusPill";
import { Tag } from "@/components/ui/Tag";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { PlaceholderArt } from "@/components/effects/PlaceholderArt";
import { StructuredData } from "@/components/layout/StructuredData";
import { breadcrumbSchema, projectSchema } from "@/lib/structured-data";
import { getProject, projects } from "@/content/projects";
import { statusMeta } from "@/lib/utils";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return pageMeta({ title: "Not found", description: "Project not found." });

  return pageMeta({
    title: project.title,
    description: project.summary,
    path: `/projects/${project.slug}`,
    keywords: project.stack ?? [],
    type: "article",
  });
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const related = projects
    .filter((item) => item.slug !== project.slug && item.category === project.category)
    .slice(0, 3);

  const liveLink = project.links?.find(
    (link) => !link.placeholder && link.href.startsWith("http"),
  );

  return (
    <>
      <StructuredData data={projectSchema(project)} />
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
          { name: project.title, path: `/projects/${project.slug}` },
        ])}
      />

      <article>
        <Section grid className="pt-36 sm:pt-40">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
          >
            <ArrowLeft size={15} aria-hidden />
            All projects
          </Link>

          <div className="mt-10 max-w-4xl">
            <Reveal>
              <div className="flex flex-wrap items-center gap-3">
                <StatusPill status={project.status} />
                <span className="font-display text-xs uppercase tracking-[0.22em] text-fg-subtle">
                  {project.category} · {project.period}
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] sm:text-6xl">
                {project.title}
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-6 text-lg leading-relaxed text-fg-muted">{project.summary}</p>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="mt-6 rounded-xl border border-hairline bg-graphite/50 px-5 py-3 text-sm text-fg-muted">
                <strong className="font-medium text-fg">{statusMeta[project.status].label}:</strong>{" "}
                {statusMeta[project.status].description}
              </p>
            </Reveal>

            {/* A project someone can actually open deserves more than a
                sidebar link — surface it as the primary action. */}
            {liveLink && (
              <Reveal delay={0.2}>
                <div className="mt-8">
                  <ButtonLink href={liveLink.href} size="lg" external>
                    <span
                      aria-hidden
                      className="h-2 w-2 animate-pulse rounded-full bg-emerald-accent"
                    />
                    Open {project.title}
                    <ArrowUpRight size={16} aria-hidden />
                  </ButtonLink>
                  <p className="mt-3 text-xs text-fg-subtle">
                    Opens {new URL(liveLink.href).hostname} in a new tab.
                  </p>
                </div>
              </Reveal>
            )}
          </div>
        </Section>

        <Section className="pt-0">
          <Reveal>
            <div className="overflow-hidden rounded-[var(--radius-card)] border border-hairline">
              <PlaceholderArt
                seed={project.slug}
                accent={project.accent ?? "electric"}
                label={project.title}
                className="aspect-[21/9] w-full"
              />
            </div>
            <p className="mt-3 text-xs text-fg-subtle">
              Placeholder artwork. Project photography, screenshots and video are pending — see the
              asset checklist in the repository.
            </p>
          </Reveal>
        </Section>

        <Section className="pt-0">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-20">
            {/* Body ------------------------------------------------------ */}
            <div className="space-y-14">
              {project.sections?.map((section, index) => (
                <Reveal key={section.heading} delay={index * 0.04}>
                  <section>
                    <h2 className="font-display text-2xl font-semibold sm:text-3xl">
                      {section.heading}
                    </h2>
                    <p className="mt-5 text-base leading-relaxed text-fg-muted">{section.body}</p>
                    {section.points && (
                      <ul className="mt-6 space-y-3">
                        {section.points.map((point) => (
                          <li
                            key={point}
                            className="flex gap-3 text-sm leading-relaxed text-fg-muted"
                          >
                            <span
                              aria-hidden
                              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-accent"
                            />
                            {point}
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                </Reveal>
              ))}

              {project.futureScope && project.futureScope.length > 0 && (
                <Reveal>
                  <section className="rounded-2xl border border-dashed border-hairline bg-graphite/40 p-7">
                    <div className="flex items-center gap-3">
                      <Lightbulb size={18} aria-hidden className="text-amber-accent" />
                      <h2 className="font-display text-xl font-semibold">
                        Possible future improvements
                      </h2>
                      <StatusPill status="concept" showDot={false} className="ml-auto" />
                    </div>
                    <p className="mt-3 text-sm text-fg-subtle">
                      None of the items below have been built. They are recorded here as direction,
                      not capability.
                    </p>
                    <ul className="mt-5 space-y-3">
                      {project.futureScope.map((item) => (
                        <li key={item} className="flex gap-3 text-sm leading-relaxed text-fg-muted">
                          <span
                            aria-hidden
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-accent"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </section>
                </Reveal>
              )}
            </div>

            {/* Sidebar --------------------------------------------------- */}
            <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl border border-hairline bg-graphite/50 p-6">
                <h2 className="font-display text-xs uppercase tracking-[0.2em] text-fg-subtle">
                  Technology & components
                </h2>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {(project.stack ?? []).map((item) => (
                    <li key={item}>
                      <Tag>{item}</Tag>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-hairline bg-graphite/50 p-6">
                <h2 className="font-display text-xs uppercase tracking-[0.2em] text-fg-subtle">
                  Details
                </h2>
                <dl className="mt-4 space-y-3 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-fg-subtle">Status</dt>
                    <dd className="text-fg">{statusMeta[project.status].label}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-fg-subtle">Period</dt>
                    <dd className="text-fg">{project.period}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-fg-subtle">Built by</dt>
                    <dd className="text-fg">
                      {project.owner === "both"
                        ? "Sommay & Ramansh"
                        : project.owner === "sommay"
                          ? "Sommay Khanna"
                          : "Ramansh Khanna"}
                    </dd>
                  </div>
                </dl>
              </div>

              {project.links && project.links.length > 0 && (
                <div className="rounded-2xl border border-hairline bg-graphite/50 p-6">
                  <h2 className="font-display text-xs uppercase tracking-[0.2em] text-fg-subtle">
                    Links
                  </h2>
                  <ul className="mt-4 space-y-3">
                    {project.links.map((link) => (
                      <li key={link.label}>
                        {link.placeholder ? (
                          <span className="inline-flex items-center gap-2 text-sm text-fg-subtle">
                            {link.label}
                            <span className="rounded-full border border-hairline px-2 py-0.5 text-[0.625rem] uppercase tracking-[0.12em]">
                              Coming soon
                            </span>
                          </span>
                        ) : (
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm text-cyan-accent hover:underline"
                          >
                            {link.label}
                            <ArrowUpRight size={13} aria-hidden />
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </div>
        </Section>

        {related.length > 0 && (
          <Section grid className="pb-32">
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">Related work</h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {related.map((item) => (
                <ProjectCard key={item.slug} project={item} />
              ))}
            </div>
          </Section>
        )}
      </article>
    </>
  );
}
