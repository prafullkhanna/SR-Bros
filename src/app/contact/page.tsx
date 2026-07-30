import type { Metadata } from "next";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";

import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/sections/ContactForm";
import { StructuredData } from "@/components/layout/StructuredData";
import { breadcrumbSchema } from "@/lib/structured-data";
import { contactLinks } from "@/content/site";
import { brothers } from "@/content/brothers";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Contact",
  description:
    "Get in touch with Sommay and Ramansh — for universities, competitions, collaborations, press and incubators.",
  path: "/contact",
  keywords: ["contact SRbros", "collaboration"],
});

const audiences = [
  {
    title: "Universities & professors",
    body: "Project documentation, build photography and a live demonstration can be arranged.",
  },
  {
    title: "Competitions & organisers",
    body: "Technical specifications and past competition experience available on request.",
  },
  {
    title: "Incubators & investors",
    body: "Happy to talk about direction — with the honest caveat that nothing here is a company yet.",
  },
  {
    title: "Collaborators & developers",
    body: "Interested in robotics, embedded systems or applied AI? Get in touch.",
  },
];

export default function ContactPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />

      <Section grid className="pt-36 sm:pt-40">
        <SectionHeading
          level="h1"
          eyebrow="Contact"
          title={<>Ask for the detail. <span className="text-gradient">We would rather show it.</span></>}
          description="Whether you want technical documentation, a demonstration, or simply to say hello — this reaches both brothers."
        />
      </Section>

      <Section className="pb-32 pt-0">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-20">
          <Reveal>
            <div className="rounded-[var(--radius-card)] border border-hairline bg-graphite/50 p-7 sm:p-9">
              <ContactForm />
            </div>
          </Reveal>

          <aside className="space-y-8">
            <Reveal direction="left">
              <div className="rounded-2xl border border-hairline bg-graphite/50 p-6">
                <h2 className="font-display text-xs uppercase tracking-[0.2em] text-fg-subtle">
                  Direct
                </h2>
                <ul className="mt-4 space-y-3">
                  {contactLinks.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
                      >
                        {link.label === "Email" ? (
                          <Mail size={14} aria-hidden className="text-cyan-accent" />
                        ) : (
                          <ArrowUpRight size={14} aria-hidden className="text-cyan-accent" />
                        )}
                        {link.label}
                        {link.placeholder && (
                          <span className="rounded-full border border-hairline px-2 py-0.5 text-[0.625rem] uppercase tracking-[0.12em] text-fg-subtle">
                            Placeholder
                          </span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 inline-flex items-center gap-2 text-xs text-fg-subtle">
                  <MapPin size={13} aria-hidden />
                  New Delhi, India
                </p>
              </div>
            </Reveal>

            {/* Reaching one brother directly, rather than the shared inbox. */}
            <Reveal direction="left" delay={0.05}>
              <div className="rounded-2xl border border-hairline bg-graphite/50 p-6">
                <h2 className="font-display text-xs uppercase tracking-[0.2em] text-fg-subtle">
                  Reach one of us
                </h2>
                <ul className="mt-4 space-y-3">
                  {brothers.map((brother) => (
                    <li key={brother.id}>
                      <a
                        href={`mailto:${brother.email}`}
                        className="group block text-sm text-fg-muted transition-colors hover:text-fg"
                      >
                        <span className="flex items-center gap-2 font-display text-fg">
                          <Mail size={14} aria-hidden className="text-cyan-accent" />
                          {brother.name}
                        </span>
                        <span className="mt-0.5 block pl-6 text-xs text-fg-subtle group-hover:text-fg-muted">
                          {brother.email}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {audiences.map((audience, index) => (
              <Reveal key={audience.title} delay={index * 0.05} direction="left">
                <div className="rounded-2xl border border-hairline bg-graphite/40 p-6">
                  <h3 className="font-display text-sm font-semibold">{audience.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">{audience.body}</p>
                </div>
              </Reveal>
            ))}
          </aside>
        </div>
      </Section>
    </>
  );
}
