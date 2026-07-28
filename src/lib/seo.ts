import type { Metadata } from "next";
import { siteConfig } from "@/content/site";

interface PageMetaOptions {
  title: string;
  description: string;
  path?: string;
  /** Overrides the generated OG image. */
  image?: string;
  keywords?: string[];
  type?: "website" | "article";
  publishedTime?: string;
}

/**
 * Builds a complete metadata object — canonical URL, Open Graph and Twitter
 * cards included — so every route ships correct SEO without duplication.
 */
export function pageMeta({
  title,
  description,
  path = "/",
  image,
  keywords = [],
  type = "website",
  publishedTime,
}: PageMetaOptions): Metadata {
  const url = `${siteConfig.url}${path === "/" ? "" : path}`;
  const ogImage =
    image ?? `/og?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(description.slice(0, 110))}`;

  return {
    title,
    description,
    keywords: [
      "SRbros",
      "srbros.in",
      "Sommay Khanna",
      "Ramansh Khanna",
      "young innovators",
      "robotics",
      "artificial intelligence",
      ...keywords,
    ],
    alternates: { canonical: url },
    openGraph: {
      title: `${title} — ${siteConfig.name}`,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type,
      ...(publishedTime ? { publishedTime } : {}),
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${siteConfig.name}`,
      description,
      images: [ogImage],
    },
  };
}
