/**
 * Schema.org JSON-LD builders. Rendered via the <StructuredData /> component.
 * Keep these factual — structured data is read by machines that do not
 * forgive exaggeration.
 */
import { siteConfig, contactLinks } from "@/content/site";
import { brothers } from "@/content/brothers";
import type { Project } from "@/types";

const socialUrls = contactLinks
  .filter((link) => !link.href.startsWith("mailto:"))
  .map((link) => link.href);

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    alternateName: "SRbros.in",
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "en-IN",
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/projects?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function personSchema(id: (typeof brothers)[number]["id"]) {
  const person = brothers.find((brother) => brother.id === id);
  if (!person) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    url: `${siteConfig.url}/brothers/${person.id}`,
    description: person.bio[0],
    email: `mailto:${person.email}`,
    jobTitle: person.role,
    knowsAbout: person.focusAreas,
    affiliation: {
      "@type": "EducationalOrganization",
      name: person.school,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "New Delhi",
      addressCountry: "IN",
    },
    sameAs: socialUrls,
  };
}

export function projectSchema(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: project.title,
    description: project.summary,
    url: `${siteConfig.url}/projects/${project.slug}`,
    creativeWorkStatus:
      project.status === "completed" ? "Published" : "Draft",
    keywords: project.stack?.join(", "),
    author: {
      "@type": "Person",
      name: project.owner === "ramansh" ? "Ramansh Khanna" : "Sommay Khanna",
    },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}

export function articleSchema(post: {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  author: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    url: `${siteConfig.url}/blog/${post.slug}`,
    author: { "@type": "Person", name: post.author },
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
  };
}
