import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const DEFAULT_STEPS = ['Escrow Locked', 'Deliverables Provided', 'Payment Released'] as const;

export interface EscrowProgressProps {
  steps?: readonly string[];
  /** Index of the current step; earlier steps render as completed. */
  current: number;
  className?: string;
}

/** Stepped escrow timeline: completed = success, current = accent, upcoming = muted. */
export function EscrowProgress({ steps = DEFAULT_STEPS, current, className }: EscrowProgressProps) {
  return (
    <ol className={cn('flex w-full items-start', className)}>
      {steps.map((step, index) => {
        const state = index < current ? 'done' : index === current ? 'current' : 'upcoming';
        return (
          <li
            key={step}
            aria-current={state === 'current' ? 'step' : undefined}
            className="relative flex flex-1 flex-col items-center gap-2"
          >
            {index > 0 && (
              <span
                aria-hidden="true"
                className={cn(
                  'absolute right-1/2 top-3 h-0.5 w-full -translate-x-3',
                  index <= current ? 'bg-success' : 'bg-divider',
                )}
              />
            )}
            <span
              className={cn(
                'z-10 flex h-6 w-6 items-center justify-center rounded-pill text-small font-medium',
                state === 'done' && 'bg-success text-success-fg',
                state === 'current' && 'border-2 border-accent bg-surface text-accent-text',
                state === 'upcoming' && 'border border-border-control bg-surface text-muted',
              )}
            >
              {state === 'done' ? <Check size={14} aria-hidden="true" /> : index + 1}
            </span>
            <span
              className={cn(
                'px-1 text-center text-small',
                state === 'upcoming' ? 'text-muted' : 'text-ink',
              )}
            >
              {step}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
