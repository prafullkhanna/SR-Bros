import type { Metadata } from "next";
import { Cpu, Gauge, Radio, Route, Sparkles, Wrench } from "lucide-react";

import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { StructuredData } from "@/components/layout/StructuredData";
import { breadcrumbSchema } from "@/lib/structured-data";
import { projects } from "@/content/projects";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Robotics",
  description:
    "Robotics work by Sommay Khanna — a self-built robo car, a line-following robot run at IIT Bombay, and a disaster-management robot system in development.",
  path: "/robotics",
  keywords: ["robotics", "line following robot", "rescue robot", "IIT Bombay robotics"],
});

const subsystems = [
  {
    icon: Wrench,
    title: "Mechanics",
    body: "Chassis, drive train and mounting. Tracked bases for debris, wheeled bases for speed.",
  },
  {
    icon: Cpu,
    title: "Electronics",
    body: "Microcontrollers, motor drivers, power distribution and the wiring discipline that keeps it all reliable.",
  },
  {
    icon: Gauge,
    title: "Sensing",
    body: "Infrared arrays, thermal sensing and life-detection sensors — calibrated against the environment they run in.",
  },
  {
    icon: Route,
    title: "Control",
    body: "Firmware loops that turn sensor error into motion, tuned for stability before speed.",
  },
  {
    icon: Radio,
    title: "Communication",
    body: "Wireless telemetry between robot, drone and operator, with range as a hard design constraint.",
  },
  {
    icon: Sparkles,
    title: "Autonomy",
    body: "Currently operator-supervised. Full autonomous navigation is a stated goal, not a capability.",
  },
];

export default function RoboticsPage() {
  const roboticsProjects = projects.filter((project) => project.category === "robotics");

  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Robotics", path: "/robotics" },
        ])}
      />

      <Section grid className="pt-36 sm:pt-40">
        <SectionHeading
          level="h1"
          eyebrow="Robotics"
          title={<>Where software <span className="text-gradient">meets the physical world.</span></>}
          description="Robots are unforgiving: the code either moves the machine correctly or it does not. Everything below was built from components, tested until it broke, and rebuilt."
        />
      </Section>

      <Section className="pt-0">
        <SectionHeading eyebrow="Approach" title="Subsystems" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {subsystems.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.05}>
              <div className="h-full rounded-2xl border border-hairline bg-graphite/50 p-6 transition-colors hover:border-electric/30">
                <item.icon size={20} aria-hidden className="text-cyan-accent" />
                <h3 className="mt-4 font-display text-base font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section grid className="pt-0">
        <SectionHeading eyebrow="Builds" title="Robotics projects" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {roboticsProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Section>

      <Section className="pb-32 pt-0">
        <SectionHeading
          eyebrow="Gallery"
          title="From the workbench"
          description="Build photos, competition images and test footage. Currently placeholder artwork — real photography is being catalogued."
        />
        <div className="mt-12">
          <GalleryGrid />
        </div>
      </Section>
    </>
  );
}
