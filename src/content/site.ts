/**
 * Global site configuration for SRbros.in.
 *
 * Everything that is not yet real — social handles, phone numbers, live demo
 * URLs — lives here with `placeholder: true` so it can be replaced in one file.
 * See docs/ASSETS-NEEDED.md for the full outstanding list.
 */
import type { Link } from "@/types";

export const siteConfig = {
  name: "SRbros",
  domain: "srbros.in",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://srbros.in",
  title: "SRbros.in — Sommay & Ramansh",
  tagline: "Two Brothers. One Vision. Building the Future with AI, Robotics & Technology.",
  headline: "The Future Starts Young.",
  subheadline: "Robotics • Artificial Intelligence • Software • Engineering • Innovation",
  description:
    "SRbros.in is the portfolio of Sommay and Ramansh — two brothers from Delhi building robotics, AI and software projects, including a disaster-management robot system.",
  locale: "en_IN",
  founded: 2022,
  quote:
    "Innovation isn't about age. It's about curiosity, persistence, and the courage to build.",
} as const;

/** Contact channels. Replace the placeholder values before launch. */
export const contactLinks: Link[] = [
  { label: "Email", href: "mailto:hello@srbros.in" },
  { label: "GitHub", href: "https://github.com/prafullkhanna", placeholder: true },
  { label: "LinkedIn", href: "https://linkedin.com/in/srbros", placeholder: true },
  { label: "Instagram", href: "https://instagram.com/srbros", placeholder: true },
  { label: "YouTube", href: "https://youtube.com/@srbros", placeholder: true },
];

export const navLinks = [
  { label: "About", href: "/about" },
  { label: "Brothers", href: "/brothers" },
  { label: "Projects", href: "/projects" },
  { label: "Robotics", href: "/robotics" },
  { label: "AI", href: "/ai" },
  { label: "Timeline", href: "/timeline" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
] as const;

export const footerGroups = [
  {
    title: "Work",
    links: [
      { label: "All projects", href: "/projects" },
      { label: "NexBrief AI — live", href: "/projects/nexbrief-ai" },
      { label: "Disaster Management Robot", href: "/projects/disaster-management-robot" },
      { label: "Robotics", href: "/robotics" },
      { label: "AI experiments", href: "/ai" },
    ],
  },
  {
    title: "People",
    links: [
      { label: "About SRbros", href: "/about" },
      { label: "Sommay Khanna", href: "/brothers/sommay" },
      { label: "Ramansh Khanna", href: "/brothers/ramansh" },
      { label: "Timeline", href: "/timeline" },
    ],
  },
  {
    title: "More",
    links: [
      { label: "Gallery", href: "/gallery" },
      { label: "Media & press", href: "/media" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
] as const;

/**
 * Headline statistics. Each number is derived from the content layer at build
 * time where possible (see src/lib/stats.ts) so it can never drift from
 * the projects actually listed on the site.
 */
export const statsLabels = {
  projects: "Projects built",
  competitions: "Competitions entered",
  disciplines: "Disciplines explored",
  years: "Years building",
} as const;
