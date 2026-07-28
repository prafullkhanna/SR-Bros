import type { Metadata } from "next";

import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProfileCard } from "@/components/cards/ProfileCard";
import { SkillsRadar } from "@/components/sections/SkillsRadar";
import { StructuredData } from "@/components/layout/StructuredData";
import { breadcrumbSchema, personSchema } from "@/lib/structured-data";
import { brothers } from "@/content/brothers";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Meet the brothers",
  description:
    "Sommay Khanna (16) builds robotics, AI and production software. Ramansh Khanna (10) is at the start of his STEM journey. Both study at The Heritage School, Rohini.",
  path: "/brothers",
  keywords: ["Sommay Khanna", "Ramansh Khanna", "Heritage School Rohini"],
});

export default function BrothersPage() {
  return (
    <>
      <StructuredData data={personSchema("sommay")} />
      <StructuredData data={personSchema("ramansh")} />
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Brothers", path: "/brothers" },
        ])}
      />

      <Section grid className="pt-36 sm:pt-40">
        <SectionHeading
          level="h1"
          eyebrow="The brothers"
          title={<>Six years apart. <span className="text-gradient">Same curiosity.</span></>}
          description="One is building robots and shipping software. The other is learning the fundamentals that make that possible. Both pages are kept strictly factual."
        />
      </Section>

      <Section className="pt-0">
        <div className="grid gap-6 lg:grid-cols-2">
          {brothers.map((brother) => (
            <ProfileCard key={brother.id} brother={brother} />
          ))}
        </div>
      </Section>

      <Section grid className="pb-32">
        <SectionHeading
          eyebrow="Skills"
          title="Self-assessed strengths"
          description="Shown side by side. These are honest estimates relative to peers of the same age — not test scores."
        />
        <div className="mt-14">
          <SkillsRadar />
        </div>
      </Section>
    </>
  );
}
