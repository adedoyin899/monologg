import { useNavigate } from 'react-router-dom';
import { useCreatorStore } from '@/app/stores/creator';
import { Button } from '@/components';
import { cn } from '@/lib/utils';
import { NICHE_OPTIONS } from '../nicheMeta';
import { OnboardingShell } from './OnboardingShell';

/** PWA-02 niche selection board — the pick adapts later steps (US-1). */
export default function StepNiche() {
  const navigate = useNavigate();
  const { niche, setNiche, nextStep } = useCreatorStore();

  return (
    <OnboardingShell stepIndex={0} label="Your craft" onBack={() => navigate(-1)}>
      <div className="flex flex-col gap-2">
        <h1 className="text-h2">What do you do when the lights come up?</h1>
        <p className="text-body text-muted">
          Pick your headline act — you can widen the repertoire later.
        </p>
      </div>

      <div role="radiogroup" aria-label="Your niche" className="grid grid-cols-2 gap-3">
        {NICHE_OPTIONS.map(({ value, label, copy, icon: NicheIcon }) => {
          const selected = niche === value;
          return (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => setNiche(value)}
              className={cn(
                'flex min-h-touch flex-col items-start gap-2 rounded-md border-2 bg-surface p-4 text-left transition-colors duration-micro ease-out',
                selected ? 'border-accent shadow-sm' : 'border-border-control hover:bg-surface-2',
              )}
            >
              <NicheIcon
                size={22}
                aria-hidden="true"
                className={selected ? 'text-accent' : 'text-muted'}
              />
              <span className="text-body font-medium text-ink">{label}</span>
              <span className="text-small text-muted">{copy}</span>
            </button>
          );
        })}
      </div>

      <Button disabled={!niche} onClick={nextStep} className="mt-auto">
        Continue
      </Button>
    </OnboardingShell>
  );
}
