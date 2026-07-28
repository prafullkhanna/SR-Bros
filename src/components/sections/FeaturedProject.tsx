import { ArrowRight, Radar, Radio, Satellite, ThermometerSun } from "lucide-react";
import { featuredProject } from "@/content/projects";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { StatusPill } from "@/components/ui/StatusPill";
import { PlaceholderArt } from "@/components/effects/PlaceholderArt";
import { Tag } from "@/components/ui/Tag";

const missionFlow = [
  { icon: Radar, label: "Enter", detail: "Robot deploys into the hazardous area" },
  { icon: ThermometerSun, label: "Detect", detail: "Thermal and life sensors find signs of life" },
  { icon: Satellite, label: "Locate", detail: "Exact coordinates are fixed and logged" },
  { icon: Radio, label: "Relay", detail: "Position is transmitted to the rescue team" },
];

/** Flagship project block on the home page. */
export function FeaturedProject() {
  const project = featuredProject;

  return (
    <Section id="featured" className="relative">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-electric/40 to-transparent"
      />

      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-20">
        <div>
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <p className="font-display text-xs uppercase tracking-[0.28em] text-cyan-accent">
                Flagship project
              </p>
              <StatusPill status={project.status} />
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="mt-5 font-display text-3xl font-semibold leading-tight sm:text-5xl">
              {project.title}
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 text-base leading-relaxed text-fg-muted sm:text-lg">
              {project.summary}
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {missionFlow.map((step, index) => (
                <li
                  key={step.label}
                  className="rounded-2xl border border-hairline bg-graphite/50 p-5"
                >
                  <div className="flex items-center gap-3">
                    <step.icon size={17} aria-hidden className="text-cyan-accent" />
                    <span className="font-display text-sm font-medium">
                      {index + 1}. {step.label}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">{step.detail}</p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.2}>
            <ul className="mt-8 flex flex-wrap gap-1.5">
              {(project.stack ?? []).slice(0, 6).map((item) => (
                <li key={item}>
                  <Tag>{item}</Tag>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-9">
              <ButtonLink href={`/projects/${project.slug}`} size="lg">
                Read the full breakdown
                <ArrowRight size={16} aria-hidden />
              </ButtonLink>
            </div>
          </Reveal>
        </div>

        <Reveal direction="left">
          <div className="gradient-border overflow-hidden rounded-[var(--radius-card)] border border-hairline bg-graphite/60">
            <PlaceholderArt
              seed={project.slug}
              accent="cyan"
              label={project.title}
              className="aspect-[4/3] w-full"
            />
            <div className="border-t border-hairline p-6">
              <p className="font-display text-sm font-medium">Two platforms, one mission</p>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                A tracked ground robot finds people. A drone reaches them with water, food, a
                medical kit and a communication device.
              </p>
              <p className="mt-4 text-xs text-fg-subtle">
                Illustration is placeholder artwork — build photography pending.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
