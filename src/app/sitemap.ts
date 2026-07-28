import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";
import { projects } from "@/content/projects";
import { publishedPosts } from "@/content/blog";
import { brothers } from "@/content/brothers";

/** Generated from the content layer — new projects and posts appear automatically. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    { path: "", priority: 1, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/brothers", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/projects", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/robotics", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/ai", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/timeline", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/gallery", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/blog", priority: 0.7, changeFrequency: "weekly" as const },
    { path: "/media", priority: 0.5, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.6, changeFrequency: "yearly" as const },
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteConfig.url}${route.path}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...brothers.map((brother) => ({
      url: `${siteConfig.url}/brothers/${brother.id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...projects.map((project) => ({
      url: `${siteConfig.url}/projects/${project.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: project.featured ? 0.9 : 0.7,
    })),
    ...publishedPosts.map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
