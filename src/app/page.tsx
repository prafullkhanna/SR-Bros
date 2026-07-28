import Link from "next/link";
import { ArrowRight, Bot, BrainCircuit, Code2, Compass } from "lucide-react";

import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { ProfileCard } from "@/components/cards/ProfileCard";
import { Timeline } from "@/components/sections/Timeline";
import { SkillsRadar } from "@/components/sections/SkillsRadar";
import { FeaturedProject } from "@/components/sections/FeaturedProject";
import { StructuredData } from "@/components/layout/StructuredData";
import { personSchema } from "@/lib/structured-data";
import { projects } from "@/content/projects";
import { brothers } from "@/content/brothers";
import { siteConfig } from "@/content/site";

const pillars = [
  {
    icon: Bot,
    title: "Robotics",
    body: "Ground robots, drones and the electronics that drive them — built from components, not kits.",
  },
  {
    icon: BrainCircuit,
    title: "Artificial intelligence",
    body: "LLM workflows with constrained outputs and validation, applied to real repetitive work.",
  },
  {
    icon: Code2,
    title: "Software",
    body: "Production systems in daily use by an operating business, maintained under real load.",
  },
  {
    icon: Compass,
    title: "Research",
    body: "Open questions we have not solved yet — recorded honestly as concepts, not claims.",
  },
];

export default function HomePage() {
  const recentProjects = projects
    .filter((project) => !project.featured && project.status !== "planned")
    .slice(0, 3);

  return (
    <>
      <StructuredData data={personSchema("sommay")} />
      <StructuredData data={personSchema("ramansh")} />

      <Hero />

      <Section className="pt-4 sm:pt-6">
        <Stats />
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section id="about" grid>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] lg:gap-20">
          <SectionHeading
            eyebrow="About SRbros"
            title={<>Two brothers who learn by building.</>}
            description={
              <>
                SRbros is not a company and not a school project. It is a record of what two
                brothers in New Delhi have actually built — and what they are building next.
              </>
            }
          />

          <div className="space-y-6 text-base leading-relaxed text-fg-muted">
            <Reveal>
              <p>
                It started with curiosity and a laptop. Sommay wrote small programs, then wired up
                his first microcontroller, then built a robot that could follow a line fast enough
                to compete at IIT&nbsp;Bombay. Ramansh is at the start of the same road — asking
                questions, taking things apart, learning to code.
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <p>
                The pattern has not changed since: pick a real problem, build the smallest thing
                that addresses it, find out where it breaks, and rebuild. Every project on this
                site came from that loop — including software that a working business now depends
                on every day.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="border-l-2 border-electric/50 pl-5 text-fg">
                Technology should make lives measurably better. That is the filter we apply before
                starting anything — and the reason the current focus is disaster response.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <ButtonLink href="/about" variant="secondary">
                Read the full story
                <ArrowRight size={15} aria-hidden />
              </ButtonLink>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, index) => (
            <Reveal key={pillar.title} delay={index * 0.06}>
              <div className="h-full rounded-2xl border border-hairline bg-graphite/50 p-6 transition-colors hover:border-electric/30">
                <pillar.icon size={20} aria-hidden className="text-cyan-accent" />
                <h3 className="mt-4 font-display text-base font-semibold">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{pillar.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <FeaturedProject />

      {/* ---------------------------------------------------------------- */}
      <Section id="brothers">
        <SectionHeading
          eyebrow="Meet the brothers"
          title="Different stages. Same instinct."
          description="One is deep in robotics and production software. The other is at the very beginning — and this site records both honestly."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {brothers.map((brother) => (
            <ProfileCard key={brother.id} brother={brother} />
          ))}
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section grid>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Selected work"
            title="Projects"
            description="Every project is labelled with what it actually is: completed, in progress, a concept, or planned."
          />
          <Reveal>
            <ButtonLink href="/projects" variant="secondary">
              All projects
              <ArrowRight size={15} aria-hidden />
            </ButtonLink>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {recentProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section id="timeline">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Journey"
            title="How it has gone so far"
            description="A chronological record. Future entries are marked as planned — they have not happened yet."
          />
          <Reveal>
            <ButtonLink href="/timeline" variant="secondary">
              Full timeline
              <ArrowRight size={15} aria-hidden />
            </ButtonLink>
          </Reveal>
        </div>
        <div className="mt-14">
          <Timeline compact />
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section grid>
        <SectionHeading
          eyebrow="Skills"
          title="Where the hours have gone"
          description="Self-assessed, relative to peers of the same age — and shown as a table as well as a chart."
        />
        <div className="mt-14">
          <SkillsRadar />
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section id="vision" className="pb-32">
        <div className="relative overflow-hidden rounded-[2rem] border border-hairline bg-gradient-to-br from-graphite via-ink to-graphite p-10 sm:p-14 lg:p-20">
          <div
            aria-hidden
            className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(77,124,255,0.18),transparent_65%)] blur-2xl"
          />
          <div className="relative max-w-3xl">
            <p className="font-display text-xs uppercase tracking-[0.28em] text-cyan-accent">
              Future vision
            </p>
            <h2 className="mt-5 font-display text-3xl font-semibold leading-tight sm:text-5xl">
              Build technology that measurably improves lives.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-fg-muted sm:text-lg">
              The direction is set: AI-driven robotics applied to disaster management first, then
              education, healthcare and — eventually — space exploration. These are goals, not
              accomplishments. This site will record which of them turn into real work.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/projects/disaster-management-robot">
                See the flagship project
                <ArrowRight size={15} aria-hidden />
              </ButtonLink>
              <ButtonLink href="/contact" variant="secondary">
                Work with us
              </ButtonLink>
            </div>
            <p className="mt-12 max-w-xl border-l-2 border-cyan-accent/50 pl-5 font-display text-lg leading-snug text-fg">
              &ldquo;{siteConfig.quote}&rdquo;
            </p>
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-fg-subtle">
          Looking for something specific?{" "}
          <Link href="/contact" className="text-cyan-accent underline-offset-4 hover:underline">
            Get in touch
          </Link>
          .
        </p>
      </Section>
    </>
  );
}
