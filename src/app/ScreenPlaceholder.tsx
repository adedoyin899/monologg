interface ScreenPlaceholderProps {
  /** PRD screen id(s), e.g. "PWA-02..08" */
  id: string;
  title: string;
  note?: string;
}

/** Temporary stand-in while a section is unbuilt — removed as real screens land. */
export function ScreenPlaceholder({ id, title, note }: ScreenPlaceholderProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-bg p-6 text-ink">
      <div className="w-full max-w-md rounded-md bg-surface p-6 shadow-sm">
        <p className="font-mono text-small text-muted">{id}</p>
        <h1 className="mt-2 text-h2">{title}</h1>
        <p className="mt-3 text-body text-muted">
          {note ?? 'The stage is set. This scene arrives in a later act…'}
        </p>
        <p className="mt-6 text-body-lg font-bold text-accent-text" aria-hidden="true">
          m/
        </p>
      </div>
    </main>
  );
}
