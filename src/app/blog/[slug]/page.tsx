import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";

import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Tag } from "@/components/ui/Tag";
import { BlogCard } from "@/components/cards/BlogCard";
import { StructuredData } from "@/components/layout/StructuredData";
import { articleSchema, breadcrumbSchema } from "@/lib/structured-data";
import { getPost, posts, publishedPosts } from "@/content/blog";
import { getBrother } from "@/content/brothers";
import { formatDate } from "@/lib/utils";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return pageMeta({ title: "Not found", description: "Post not found." });

  return pageMeta({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    keywords: post.tags,
    type: "article",
    publishedTime: post.date,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const author = getBrother(post.author);
  const more = publishedPosts.filter((item) => item.slug !== post.slug).slice(0, 2);

  return (
    <>
      <StructuredData
        data={articleSchema({
          title: post.title,
          excerpt: post.excerpt,
          date: post.date,
          slug: post.slug,
          author: author?.name ?? "SRbros",
        })}
      />
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />

      <article>
        <Section grid className="pt-36 sm:pt-40">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
          >
            <ArrowLeft size={15} aria-hidden />
            All posts
          </Link>

          <div className="mt-10 max-w-3xl">
            <Reveal>
              <p className="flex flex-wrap items-center gap-3 text-xs text-fg-subtle">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span aria-hidden>·</span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock size={12} aria-hidden />
                  {post.readingMinutes} min read
                </span>
                {author && (
                  <>
                    <span aria-hidden>·</span>
                    <span>{author.name}</span>
                  </>
                )}
              </p>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.08] sm:text-5xl">
                {post.title}
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-6 text-lg leading-relaxed text-fg-muted">{post.excerpt}</p>
            </Reveal>

            <Reveal delay={0.15}>
              <ul className="mt-6 flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <li key={tag}>
                    <Tag>{tag}</Tag>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Section>

        <Section className="pt-0">
          <div className="max-w-3xl space-y-6 text-base leading-[1.8] text-fg-muted">
            {post.body?.map((paragraph, index) => (
              <Reveal key={index} delay={index * 0.03}>
                <p>{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </Section>

        {more.length > 0 && (
          <Section grid className="pb-32">
            <h2 className="font-display text-2xl font-semibold">More writing</h2>
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {more.map((item) => (
                <BlogCard key={item.slug} post={item} />
              ))}
            </div>
          </Section>
        )}
      </article>
    </>
  );
}
