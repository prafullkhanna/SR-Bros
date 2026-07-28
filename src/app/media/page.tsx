import type { Metadata } from "next";
import { Award, Newspaper } from "lucide-react";

import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { StatusPill } from "@/components/ui/StatusPill";
import { ButtonLink } from "@/components/ui/Button";
import { StructuredData } from "@/components/layout/StructuredData";
import { breadcrumbSchema } from "@/lib/structured-data";
import { mediaCategories, mediaMentions, recognition } from "@/content/media";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Media & recognition",
  description:
    "Recognition received by Sommay and Ramansh Khanna, and a place for future press coverage. Nothing is listed here before it happens.",
  path: "/media",
  keywords: ["press", "recognition", "awards"],
});

export default function MediaPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Media", path: "/media" },
        ])}
      />

      <Section grid className="pt-36 sm:pt-40">
        <SectionHeading
          level="h1"
          eyebrow="Media & recognition"
          title={<>Recognition, <span className="text-gradient">not inflation.</span></>}
          description="This page lists only what has actually happened. The categories below are placeholders for coverage that does not exist yet — and they will stay empty until it does."
        />
      </Section>

      {/* Real recognition ------------------------------------------------ */}
      <Section className="pt-0">
        <SectionHeading eyebrow="Confirmed" title="Recognition to date" />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2">
          {recognition.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.06}>
              <li className="h-full rounded-2xl border border-hairline bg-graphite/60 p-7">
                <Award size={20} aria-hidden className="text-emerald-accent" />
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <h3 className="font-display text-lg font-semibold">{item.title}</h3>
                  <StatusPill status={item.status} showDot={false} />
                </div>
                <p className="mt-1.5 font-display text-sm text-cyan-accent">{item.org}</p>
                <p className="mt-3 text-sm leading-relaxed text-fg-muted">{item.detail}</p>
              </li>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* Press placeholders --------------------------------------------- */}
      <Section grid className="pb-32 pt-0">
        <SectionHeading
          eyebrow="Press"
          title="Coverage"
          description="No press coverage yet. When it exists, it will appear here with a link to the original source."
        />

        {mediaMentions.length === 0 ? (
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {mediaCategories.map((category, index) => (
              <Reveal key={category.title} delay={index * 0.05}>
                <div className="h-full rounded-2xl border border-dashed border-hairline bg-graphite/40 p-6">
                  <Newspaper size={18} aria-hidden className="text-fg-subtle" />
                  <h3 className="mt-4 font-display text-base font-semibold">{category.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                    {category.description}
                  </p>
                  <p className="mt-4 text-xs uppercase tracking-[0.16em] text-fg-subtle">
                    Nothing to list yet
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          <ul className="mt-12 space-y-4">
            {mediaMentions.map((mention) => (
              <li key={mention.id} className="rounded-2xl border border-hairline bg-graphite/60 p-6">
                <p className="font-display text-sm text-cyan-accent">{mention.outlet}</p>
                <h3 className="mt-2 font-display text-lg font-semibold">{mention.title}</h3>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-14 rounded-[2rem] border border-hairline bg-graphite/50 p-10 text-center sm:p-14">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">
            Writing about young builders?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-fg-muted">
            We are happy to provide project documentation, build photography and a demonstration.
          </p>
          <div className="mt-8">
            <ButtonLink href="/contact">Press enquiries</ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
