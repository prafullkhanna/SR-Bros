"use client";

import { useEffect } from "react";
import { Section } from "@/components/ui/Section";
import { Button, ButtonLink } from "@/components/ui/Button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surfaced in the platform logs; no user data is included.
    console.error("Unhandled error:", error.digest ?? error.message);
  }, [error]);

  return (
    <Section grid className="flex min-h-[80svh] items-center pt-36">
      <div className="mx-auto max-w-xl text-center">
        <p className="font-display text-xs uppercase tracking-[0.28em] text-amber-accent">Error</p>
        <h1 className="mt-5 font-display text-4xl font-semibold sm:text-5xl">
          Something broke on our side.
        </h1>
        <p className="mt-5 text-base leading-relaxed text-fg-muted">
          That is on us, not on you. Try again — and if it keeps happening, let us know.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button onClick={reset}>Try again</Button>
          <ButtonLink href="/" variant="secondary">
            Back home
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
