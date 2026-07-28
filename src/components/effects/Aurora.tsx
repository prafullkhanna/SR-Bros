import { cn } from "@/lib/utils";

/**
 * Slow-moving gradient orbs. Pure CSS, no JS cost, frozen under
 * prefers-reduced-motion by the global media query in globals.css.
 */
export function Aurora({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div className="animate-aurora absolute -left-[10%] top-[-20%] h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgba(77,124,255,0.22),transparent_65%)] blur-3xl" />
      <div className="animate-aurora absolute right-[-15%] top-[10%] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(53,214,245,0.16),transparent_65%)] blur-3xl [animation-delay:-8s]" />
      <div className="animate-aurora absolute bottom-[-20%] left-[25%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(157,123,255,0.14),transparent_65%)] blur-3xl [animation-delay:-15s]" />
    </div>
  );
}
