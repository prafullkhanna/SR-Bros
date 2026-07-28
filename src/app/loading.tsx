export default function Loading() {
  return (
    <div className="flex min-h-[70svh] items-center justify-center" role="status" aria-live="polite">
      <span className="sr-only">Loading</span>
      <span
        aria-hidden
        className="h-8 w-8 animate-spin rounded-full border-2 border-hairline border-t-cyan-accent"
      />
    </div>
  );
}
