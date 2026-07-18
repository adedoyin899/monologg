import { CalendarClock } from 'lucide-react';
import { useCreatorStore } from '@/app/stores/creator';
import { Button, Card } from '@/components';
import { OnboardingShell } from './OnboardingShell';

/**
 * Interstitial after PWA-06: availability scheduling (PWA-08, Calendly-style +
 * Google Meet sync) is the next build act — this closes onboarding cleanly
 * until it lands.
 */
export default function StepWrap() {
  const { goToStep } = useCreatorStore();

  return (
    <OnboardingShell stepIndex={4} label="Curtain call" onBack={() => goToStep('rates')}>
      <div className="flex flex-col gap-2">
        <h1 className="text-h2">
          That’s a storefront<span className="text-accent-text">.</span>
        </h1>
        <p className="text-body text-muted">
          Craft, reel, style, rates — the hard part’s done.
        </p>
      </div>

      <Card className="flex flex-col gap-3">
        <CalendarClock size={24} aria-hidden="true" className="text-accent" />
        <h2 className="text-h3">Scheduling takes the stage next</h2>
        <p className="text-body text-muted">
          Calendar hours and bookable slots (with Google Meet sync) arrive in the next act.
          You can finish now and add them the moment they’re live.
        </p>
      </Card>

      <Button onClick={() => goToStep('done')} className="mt-auto">
        Finish for now
      </Button>
    </OnboardingShell>
  );
}
