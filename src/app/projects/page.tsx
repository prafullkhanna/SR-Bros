import type { Metadata } from "next";

import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectExplorer } from "@/components/sections/ProjectExplorer";
import { StructuredData } from "@/components/layout/StructuredData";
import { breadcrumbSchema } from "@/lib/structured-data";
import { statusMeta } from "@/lib/utils";
import { StatusPill } from "@/components/ui/StatusPill";
import { pageMeta } from "@/lib/seo";
import type { WorkStatus } from "@/types";

export const metadata: Metadata = pageMeta({
  title: "Projects",
  description:
    "Robotics, AI, software and web projects by Sommay and Ramansh Khanna — each labelled as completed, in progress, concept or planned.",
  path: "/projects",
  keywords: ["robotics projects", "AI projects", "student software projects"],
});

const order: WorkStatus[] = ["completed", "ongoing", "concept", "planned"];

export default function ProjectsPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
        ])}
      />

      <Section grid className="pt-36 sm:pt-40">
        <SectionHeading
          level="h1"
          eyebrow="Work"
          title={<>Projects, <span className="text-gradient">labelled honestly.</span></>}
          description="Filter by discipline or search by technology. Every card carries a status so there is never a question about what is real."
        />

        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
          {order.map((status) => (
            <div key={status} className="flex items-center gap-2.5">
              <StatusPill status={status} />
              <span className="text-xs text-fg-subtle">{statusMeta[status].description}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section className="pb-32 pt-0">
        <ProjectExplorer />
      </Section>
    </>
  );
}
