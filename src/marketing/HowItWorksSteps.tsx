/** The 3-step pipeline with the cue-slash motif between steps (design doc §7). */
const STEPS = [
  {
    title: 'Brief',
    copy: 'Say what the stage needs — niche, dates, budget. Matching creators are curated and notified.',
  },
  {
    title: 'Book',
    copy: 'Pick a slot and lock the date — and the money — in escrow. Both sides see the same numbers.',
  },
  {
    title: 'Get paid',
    copy: 'Deliver the performance. Funds release on confirmation. No chasing, no 20% to anyone.',
  },
] as const;

export function HowItWorksSteps() {
  return (
    <ol className="flex flex-col gap-6 sm:flex-row sm:items-stretch sm:gap-0">
      {STEPS.map((step, index) => (
        <li key={step.title} className="flex flex-1 items-start gap-4 sm:gap-0">
          {index > 0 && (
            <span
              aria-hidden="true"
              className="hidden select-none px-4 font-heading text-h1 text-accent-text sm:block"
            >
              /
            </span>
          )}
          <div className="flex flex-col gap-2">
            <span className="font-mono text-body text-muted">0{index + 1}</span>
            <h3 className="text-h3">{step.title}</h3>
            <p className="text-body text-muted">{step.copy}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
