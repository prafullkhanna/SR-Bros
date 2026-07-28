import type { Metadata } from "next";

import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { StatusPill } from "@/components/ui/StatusPill";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { StructuredData } from "@/components/layout/StructuredData";
import { breadcrumbSchema } from "@/lib/structured-data";
import { aiExperiments } from "@/content/skills";
import { projects } from "@/content/projects";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "AI experiments",
  description:
    "Applied AI work by Sommay Khanna — LLM workflows, agents, prompt engineering and automation pipelines, with concepts clearly separated from working systems.",
  path: "/ai",
  keywords: ["LLM automation", "AI agents", "prompt engineering"],
});

const principles = [
  {
    title: "Constrain the output",
    body: "Every model step declares a schema. If the response does not match, it fails loudly instead of flowing downstream.",
  },
  {
    title: "Validate before acting",
    body: "Nothing takes an action on the strength of a model response alone. Validation sits between the two, always.",
  },
  {
    title: "Give it tools, not guesses",
    body: "If a value can be looked up, it is looked up. Models are for judgement, not for recalling facts.",
  },
  {
    title: "Log every run",
    body: "A workflow you cannot inspect is a workflow you cannot trust — and trust is the whole reason to automate.",
  },
];

export default function AiPage() {
  const aiProjects = projects.filter(
    (project) => project.category === "ai" || project.category === "research",
  );

  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "AI", path: "/ai" },
        ])}
      />

      <Section grid className="pt-36 sm:pt-40">
        <SectionHeading
          level="h1"
          eyebrow="Artificial intelligence"
          title={<>Automation that <span className="text-gradient">does not quietly break.</span></>}
          description="The interesting problem with language models is not making them produce output — it is making the output trustworthy enough to act on."
        />
      </Section>

      <Section className="pt-0">
        <SectionHeading eyebrow="Method" title="Four rules" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {principles.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.05}>
              <div className="h-full rounded-2xl border border-hairline bg-graphite/50 p-7">
                <span className="font-display text-xs tabular-nums text-cyan-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold">{item.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-fg-muted">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section grid className="pt-0">
        <SectionHeading
          eyebrow="Experiments"
          title="What is actually running"
          description="Ongoing work is functioning code. Concepts are ideas that have not been built — the labels below say which is which."
        />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {aiExperiments.map((experiment, index) => (
            <Reveal key={experiment.title} delay={index * 0.05}>
              <li
                className={`h-full rounded-2xl border p-6 ${
                  experiment.status === "concept"
                    ? "border-dashed border-hairline bg-graphite/40"
                    : "border-hairline bg-graphite/60"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-base font-semibold">{experiment.title}</h3>
                  <StatusPill status={experiment.status} showDot={false} />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                  {experiment.description}
                </p>
              </li>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section className="pb-32 pt-0">
        <SectionHeading eyebrow="Projects" title="AI & research work" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {aiProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Section>
    </>
  );
}
