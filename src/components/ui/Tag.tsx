import { cn } from "@/lib/utils";

export function Tag({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-hairline bg-slate-surface/60 px-2.5 py-1 text-xs text-fg-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
