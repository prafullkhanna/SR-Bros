import type { WorkStatus } from "@/types";
import { cn, statusMeta, toneClasses } from "@/lib/utils";

/**
 * The credibility control of this site: every project, milestone and
 * achievement carries one of these so a visitor can tell at a glance whether
 * something is built or merely intended.
 */
export function StatusPill({
  status,
  className,
  showDot = true,
}: {
  status: WorkStatus;
  className?: string;
  showDot?: boolean;
}) {
  const meta = statusMeta[status];

  return (
    <span
      title={meta.description}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-display text-[0.6875rem] font-medium uppercase tracking-[0.14em]",
        toneClasses[meta.tone],
        className,
      )}
    >
      {showDot && <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-current" />}
      <span className="sr-only">Status: </span>
      {meta.label}
    </span>
  );
}
