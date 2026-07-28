import type { Metadata } from "next";

import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Timeline } from "@/components/sections/Timeline";
import { StructuredData } from "@/components/layout/StructuredData";
import { breadcrumbSchema } from "@/lib/structured-data";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Timeline",
  description:
    "A chronological record of what Sommay and Ramansh Khanna have built and learned — with planned future work clearly marked as such.",
  path: "/timeline",
  keywords: ["learning journey", "robotics timeline"],
});

export default function TimelinePage() {
  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Timeline", path: "/timeline" },
        ])}
      />

      <Section grid className="pt-36 sm:pt-40">
        <SectionHeading
          level="h1"
          eyebrow="Journey"
          title={<>The record, <span className="text-gradient">in order.</span></>}
          description="Select a brother to filter, and open any entry for detail. Entries marked “planned” describe intent — they have not happened yet."
        />
      </Section>

      <Section className="pb-32 pt-0">
        <Timeline />
      </Section>
    </>
  );
}
