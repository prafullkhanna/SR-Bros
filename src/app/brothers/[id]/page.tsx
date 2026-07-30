import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, GraduationCap, Mail, MapPin, Sparkles } from "lucide-react";

import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { StatusPill } from "@/components/ui/StatusPill";
import { Tag } from "@/components/ui/Tag";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { Timeline } from "@/components/sections/Timeline";
import { PlaceholderAvatar } from "@/components/effects/PlaceholderArt";
import { StructuredData } from "@/components/layout/StructuredData";
import { breadcrumbSchema, personSchema } from "@/lib/structured-data";
import { brothers, getBrother, ramanshTracks } from "@/content/brothers";
import { projects } from "@/content/projects";
import { pageMeta } from "@/lib/seo";
import type { BrotherId } from "@/types";

export function generateStaticParams() {
  return brothers.map((brother) => ({ id: brother.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const brother = getBrother(id as BrotherId);
  if (!brother) return pageMeta({ title: "Not found", description: "Page not found." });

  return pageMeta({
    title: brother.name,
    description: brother.bio[0],
    path: `/brothers/${brother.id}`,
    keywords: [brother.name, brother.school, ...brother.focusAreas],
  });
}

export default async function BrotherPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const brother = getBrother(id as BrotherId);
  if (!brother) notFound();

  const ownProjects = projects.filter(
    (project) => project.owner === brother.id || project.owner === "both",
  );
  const isRamansh = brother.id === "ramansh";

  return (
    <>
      <StructuredData data={personSchema(brother.id)} />
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Brothers", path: "/brothers" },
          { name: brother.name, path: `/brothers/${brother.id}` },
        ])}
      />

      <Section grid className="pt-36 sm:pt-40">
        <div className="grid gap-10 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-start lg:gap-14">
          <Reveal>
            <PlaceholderAvatar
              name={brother.name}
              accent={brother.accent}
              className="h-32 w-32 rounded-3xl sm:h-40 sm:w-40"
            />
          </Reveal>

          <div>
            <Reveal>
              <p className="font-display text-xs uppercase tracking-[0.28em] text-cyan-accent">
                {brother.role}
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.05] sm:text-6xl">
                {brother.name}
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-fg-subtle">
                <span className="inline-flex items-center gap-2">
                  <GraduationCap size={15} aria-hidden />
                  {brother.grade} · {brother.school}
                </span>
                <span className="inline-flex items-center gap-2">
                  <MapPin size={15} aria-hidden />
                  {brother.location}
                </span>
                <span>Age {brother.age}</span>
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <a
                href={`mailto:${brother.email}`}
                className="mt-5 inline-flex items-center gap-2 rounded-full border border-hairline bg-graphite/60 px-4 py-2 text-sm text-fg-muted transition-colors hover:border-electric/40 hover:text-fg"
              >
                <Mail size={14} aria-hidden className="text-cyan-accent" />
                {brother.email}
              </a>
            </Reveal>

            <div className="mt-8 max-w-3xl space-y-5 text-base leading-relaxed text-fg-muted">
              {brother.bio.map((paragraph, index) => (
                <Reveal key={index} delay={0.12 + index * 0.05}>
                  <p>{paragraph}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.3}>
              <div className="mt-8 flex flex-wrap gap-1.5">
                {(brother.subjects ?? brother.interests ?? []).map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Focus areas ---------------------------------------------------- */}
      <Section className="pt-0">
        <SectionHeading eyebrow="Focus" title="What he works on" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {brother.focusAreas.map((area, index) => (
            <Reveal key={area} delay={index * 0.05}>
              <div className="h-full rounded-2xl border border-hairline bg-graphite/50 p-6">
                <Sparkles size={18} aria-hidden className="text-cyan-accent" />
                <p className="mt-4 font-display text-base font-medium">{area}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Skills --------------------------------------------------------- */}
      <Section grid className="pt-0">
        <SectionHeading
          eyebrow="Skills"
          title="Self-assessed levels"
          description="Relative to peers of the same age. A guide to where the time has gone, not a certification."
        />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2">
          {brother.skills.map((skill, index) => (
            <Reveal key={skill.label} delay={index * 0.04}>
              <li className="rounded-2xl border border-hairline bg-graphite/50 p-5">
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-sm font-medium">{skill.label}</span>
                  <span className="text-xs tabular-nums text-fg-subtle">{skill.level}/100</span>
                </div>
                <div
                  className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-surface"
                  role="meter"
                  aria-valuenow={skill.level}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${skill.label}: ${skill.level} out of 100`}
                >
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-electric to-cyan-accent"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </li>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* Achievements --------------------------------------------------- */}
      <Section className="pt-0">
        <SectionHeading
          eyebrow="Record"
          title={isRamansh ? "Where he is now" : "Achievements"}
          description={
            isRamansh
              ? "This section stays honest: it records the learning journey, and real results will be added here only once they happen."
              : "Each entry is labelled with its actual status. Nothing here is an estimate."
          }
        />
        <ul className="mt-10 space-y-4">
          {brother.achievements.map((achievement, index) => (
            <Reveal key={achievement.title} delay={index * 0.05}>
              <li className="rounded-2xl border border-hairline bg-graphite/50 p-6">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-display text-lg font-semibold">{achievement.title}</h3>
                  <StatusPill status={achievement.status} />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-fg-muted">{achievement.detail}</p>
              </li>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* Ramansh-only: future tracks ------------------------------------ */}
      {isRamansh && (
        <Section grid className="pt-0">
          <SectionHeading
            eyebrow="Ahead"
            title="Every innovator starts with curiosity."
            description="These are the tracks Ramansh plans to work through. They are placeholders by design — each one will be replaced by a real project page when it is finished."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ramanshTracks.map((track, index) => (
              <Reveal key={track.title} delay={index * 0.05}>
                <div className="h-full rounded-2xl border border-dashed border-hairline bg-graphite/40 p-6">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-display text-base font-semibold">{track.title}</h3>
                    <StatusPill status="planned" showDot={false} />
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-fg-muted">{track.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {/* Projects ------------------------------------------------------- */}
      {ownProjects.length > 0 && (
        <Section className="pt-0">
          <SectionHeading eyebrow="Work" title="Projects" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {ownProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </Section>
      )}

      {/* Timeline ------------------------------------------------------- */}
      <Section grid className="pb-32 pt-0">
        <SectionHeading eyebrow="Journey" title="Timeline" />
        <div className="mt-12">
          <Timeline />
        </div>
        <p className="mt-14 text-sm text-fg-subtle">
          Looking for the other brother?{" "}
          <Link
            href={`/brothers/${isRamansh ? "sommay" : "ramansh"}`}
            className="text-cyan-accent underline-offset-4 hover:underline"
          >
            {isRamansh ? "Sommay Khanna" : "Ramansh Khanna"}
          </Link>
        </p>
        <div className="mt-8">
          <ButtonLink href="/contact" variant="secondary">
            Get in touch
            <ArrowRight size={15} aria-hidden />
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
