import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Section grid className="flex min-h-[80svh] items-center pt-36">
      <div className="mx-auto max-w-xl text-center">
        <p className="font-display text-xs uppercase tracking-[0.28em] text-cyan-accent">404</p>
        <h1 className="mt-5 font-display text-4xl font-semibold sm:text-6xl">
          This page doesn&rsquo;t exist yet.
        </h1>
        <p className="mt-5 text-base leading-relaxed text-fg-muted">
          It may have moved, or it may be something we have not built. Either way, the projects
          page is a good place to start.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/projects">See the projects</ButtonLink>
          <ButtonLink href="/" variant="secondary">
            Back home
          </ButtonLink>
        </div>
        <p className="mt-8 text-sm text-fg-subtle">
          Think something is broken?{" "}
          <Link href="/contact" className="text-cyan-accent underline-offset-4 hover:underline">
            Tell us
          </Link>
          .
        </p>
      </div>
    </Section>
  );
}
