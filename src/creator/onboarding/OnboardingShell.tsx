import { ChevronLeft } from 'lucide-react';
import type { ReactNode } from 'react';
import { IconButton, ThemeToggle } from '@/components';
import { cn } from '@/lib/utils';

const TOTAL_STEPS = 4;

/**
 * Linear onboarding chrome (PRD §5.1): top progress indicator, back chevron
 * only, no bottom nav. stepIndex 0–3 = active step; 4 = all complete.
 */
export function OnboardingShell({
  stepIndex,
  label,
  onBack,
  children,
}: {
  stepIndex: number;
  label: string;
  onBack?: () => void;
  children: ReactNode;
}) {
  const filled = Math.min(stepIndex + 1, TOTAL_STEPS);

  return (
    <main className="flex min-h-screen flex-col bg-bg text-ink">
      <header className="mx-auto flex w-full max-w-md flex-col gap-2 p-4">
        <div className="flex items-center gap-2">
          {onBack ? (
            <IconButton aria-label="Go back" onClick={onBack}>
              <ChevronLeft size={20} aria-hidden="true" />
            </IconButton>
          ) : (
            <span className="w-11" aria-hidden="true" />
          )}
          <span className="font-heading text-body-lg font-bold text-ink">
            m<span className="text-accent-text">/</span>
          </span>
          <ThemeToggle className="ml-auto" />
          <span className="text-small text-muted">
            {stepIndex < TOTAL_STEPS ? `Step ${stepIndex + 1} of ${TOTAL_STEPS}` : 'All set'}
          </span>
        </div>
        <div
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={TOTAL_STEPS}
          aria-valuenow={filled}
          aria-label={`Onboarding: ${label}`}
          className="flex gap-1"
        >
          {Array.from({ length: TOTAL_STEPS }, (_, index) => (
            <span
              key={index}
              className={cn(
                'h-1 flex-1 rounded-pill transition-colors duration-short ease-out',
                index < filled ? 'bg-accent' : 'bg-divider',
              )}
            />
          ))}
        </div>
      </header>
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col gap-6 px-4 py-6 pb-16">
        {children}
      </div>
    </main>
  );
}
