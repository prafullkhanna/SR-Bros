import Link from "next/link";
import { Clock } from "lucide-react";
import type { BlogPost } from "@/types";
import { Tag } from "@/components/ui/Tag";
import { formatDate } from "@/lib/utils";
import { getBrother } from "@/content/brothers";

export function BlogCard({ post }: { post: BlogPost }) {
  const author = getBrother(post.author);

  return (
    <article className="group rounded-[var(--radius-card)] border border-hairline bg-graphite/60 p-6 transition-all duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:border-electric/30">
      <Link href={`/blog/${post.slug}`} className="block">
        <p className="flex items-center gap-3 text-xs text-fg-subtle">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden>·</span>
          <span className="inline-flex items-center gap-1">
            <Clock size={12} aria-hidden />
            {post.readingMinutes} min read
          </span>
        </p>
        <h3 className="mt-3 font-display text-xl font-semibold leading-snug transition-colors group-hover:text-cyan-accent">
          {post.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-fg-muted">{post.excerpt}</p>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <ul className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <li key={tag}>
                <Tag>{tag}</Tag>
              </li>
            ))}
          </ul>
          {author && <span className="text-xs text-fg-subtle">{author.name}</span>}
        </div>
      </Link>
    </article>
  );
}
