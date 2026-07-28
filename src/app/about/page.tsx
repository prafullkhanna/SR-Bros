import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Stats } from "@/components/sections/Stats";
import { StructuredData } from "@/components/layout/StructuredData";
import { breadcrumbSchema } from "@/lib/structured-data";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "About SRbros",
  description:
    "The story behind SRbros.in — how two brothers from New Delhi went from first programs to robotics competitions, production software and a disaster-management robot system.",
  path: "/about",
  keywords: ["about SRbros", "young engineers India", "student innovators"],
});

const principles = [
  {
    title: "Build first, explain later",
    body: "An idea is worth very little until something exists that can fail. Every project here started as a rough build, not a document.",
  },
  {
    title: "Say exactly what is true",
    body: "Completed, in progress, concept, planned. Every item on this site carries one of those labels, and none of them are stretched.",
  },
  {
    title: "Solve problems that matter",
    body: "Disaster response, small-business operations, repetitive work. If it does not improve something measurable for someone, it waits.",
  },
  {
    title: "Learn in public",
    body: "The write-ups include what broke and why. That is usually the part worth reading.",
  },
];

export default function AboutPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />

      <Section grid className="pt-36 sm:pt-40">
        <SectionHeading
          level="h1"
          eyebrow="About SRbros"
          title={
            <>
              Two brothers. One workshop.{" "}
              <span className="text-gradient">A lot of failed prototypes.</span>
            </>
          }
          description="SRbros.in is a record of work — what has been built, what is being built, and what is still only an idea. Nothing more, and nothing less."
        />
      </Section>

      <Section className="pt-0">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
          <div className="space-y-6 text-base leading-relaxed text-fg-muted">
            <Reveal>
              <p>
                Sommay started with code. Small programs first, then automation that saved
                somebody an hour, then a microcontroller on a breadboard that refused to do what
                the datasheet promised. Hardware turned out to be the more interesting teacher.
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <p>
                A robo car came next — built from parts rather than a kit, because assembling a
                kit teaches you assembly and building from parts teaches you engineering. That
                platform became a line-following robot, and that robot went to the Single Line
                Robotics Championship at IIT&nbsp;Bombay.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                In parallel, the software got more serious. Websites, then a management system
                that a running business now uses every day — which is a different discipline
                entirely, because real users find every assumption you got wrong.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p>
                Ramansh is ten, and at the start of the same path. His section of this site is
                deliberately open: it lists what he is learning now, and it will fill with real
                projects as he finishes them. Nothing is written there before it happens.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="border-l-2 border-electric/50 pl-5 text-fg">
                The current focus is a disaster-management robot system — a ground robot to find
                people trapped after a disaster, and a drone to reach them with supplies until
                rescue teams arrive.
              </p>
            </Reveal>
          </div>

          <div className="space-y-5">
            {principles.map((principle, index) => (
              <Reveal key={principle.title} delay={index * 0.06} direction="left">
                <div className="rounded-2xl border border-hairline bg-graphite/50 p-6 transition-colors hover:border-electric/30">
                  <h2 className="font-display text-lg font-semibold">{principle.title}</h2>
                  <p className="mt-2.5 text-sm leading-relaxed text-fg-muted">{principle.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section className="pt-0">
        <Stats />
      </Section>

      <Section grid className="pb-32">
        <div className="rounded-[2rem] border border-hairline bg-graphite/50 p-10 text-center sm:p-16">
          <h2 className="font-display text-2xl font-semibold sm:text-4xl">
            Everything here can be verified.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-fg-muted">
            If you are a university, competition organiser, incubator or journalist and want
            detail, documentation or a demonstration, ask — we would rather show the work than
            describe it.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/projects">
              See the projects
              <ArrowRight size={15} aria-hidden />
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Contact
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
