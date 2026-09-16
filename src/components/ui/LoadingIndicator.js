export default function LoadingIndicator() {
  return (
    <div className="flex w-full flex-1 items-center justify-center px-6 py-16">
      <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-muted">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
        </span>
        Loading…
      </span>
    </div>
  );
}
