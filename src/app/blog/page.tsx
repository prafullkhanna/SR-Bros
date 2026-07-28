import type { Metadata } from "next";

import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BlogCard } from "@/components/cards/BlogCard";
import { Reveal } from "@/components/motion/Reveal";
import { StructuredData } from "@/components/layout/StructuredData";
import { breadcrumbSchema } from "@/lib/structured-data";
import { blogTags, publishedPosts } from "@/content/blog";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Blog",
  description:
    "Notes on robotics, AI, competitions and engineering — written while building, by Sommay Khanna.",
  path: "/blog",
  keywords: ["robotics blog", "AI notes", "engineering writing"],
});

export default function BlogPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />

      <Section grid className="pt-36 sm:pt-40">
        <SectionHeading
          level="h1"
          eyebrow="Writing"
          title={<>Notes from <span className="text-gradient">the build.</span></>}
          description="Short pieces about what worked, what broke, and what the failure actually taught. Written while the work was happening."
        />

        <Reveal delay={0.1}>
          <ul className="mt-8 flex flex-wrap gap-1.5">
            {blogTags.map((tag) => (
              <li
                key={tag}
                className="rounded-md border border-hairline bg-slate-surface/60 px-2.5 py-1 text-xs text-fg-muted"
              >
                {tag}
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <Section className="pb-32 pt-0">
        <div className="grid gap-6 lg:grid-cols-2">
          {publishedPosts.map((post, index) => (
            <Reveal key={post.slug} delay={index * 0.05}>
              <BlogCard post={post} />
            </Reveal>
          ))}
        </div>

        <p className="mt-14 rounded-2xl border border-dashed border-hairline p-6 text-sm leading-relaxed text-fg-subtle">
          This blog is CMS-ready. Posts are typed objects today; the same layout accepts MDX files
          or a headless CMS without any interface changes — see docs/CONTENT.md in the repository.
        </p>
      </Section>
    </>
  );
}
