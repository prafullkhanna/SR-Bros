import type { Metadata } from "next";

import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { StructuredData } from "@/components/layout/StructuredData";
import { breadcrumbSchema } from "@/lib/structured-data";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Gallery",
  description:
    "Build photos, competition images, workshops and school events from the work of Sommay and Ramansh Khanna.",
  path: "/gallery",
  keywords: ["robotics photos", "competition gallery"],
});

export default function GalleryPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Gallery", path: "/gallery" },
        ])}
      />

      <Section grid className="pt-36 sm:pt-40">
        <SectionHeading
          level="h1"
          eyebrow="Gallery"
          title={<>Builds, benches and <span className="text-gradient">competition days.</span></>}
          description="Every tile currently shows generated placeholder artwork. Real photographs, certificates and video will replace them as they are catalogued — nothing here is presented as a photo it is not."
        />
      </Section>

      <Section className="pb-32 pt-0">
        <GalleryGrid />
      </Section>
    </>
  );
}
