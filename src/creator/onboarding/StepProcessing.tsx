import { useEffect } from 'react';
import { useCreatorStore } from '@/app/stores/creator';
import { Badge, Card, Skeleton, SkeletonLines } from '@/components';
import { MOCK_STYLE_TAGS } from '../nicheMeta';
import { OnboardingShell } from './OnboardingShell';

const ANALYSIS_MS = 2800;

/**
 * PWA-04 Thespian AI processing — STYLE analysis only, kept visibly distinct
 * from identity KYC. The mock also kicks the KYC state machine so PWA-05 can
 * show the Verified badge.
 */
export default function StepProcessing() {
  const { niche, setStyleTags, setVerification, goToStep } = useCreatorStore();

  useEffect(() => {
    setVerification('processing'); // Smile Identity KYC runs in the background (C5)
    const timer = setTimeout(() => {
      setStyleTags(MOCK_STYLE_TAGS[niche ?? 'actor']);
      setVerification('verified');
      goToStep('tags');
    }, ANALYSIS_MS);
    return () => clearTimeout(timer);
  }, [niche, setStyleTags, setVerification, goToStep]);

  return (
    <OnboardingShell stepIndex={2} label="Your style">
      <div className="flex flex-col gap-2" role="status" aria-live="polite">
        <h1 className="text-h2">Thespian AI is reviewing performance parameters…</h1>
        <p className="text-body text-muted">
          It listens for style — texture, energy, delivery — and drafts your vibe tags.
        </p>
      </div>

      <Card aria-busy="true" className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Skeleton className="h-12 w-12 rounded-pill" />
          <SkeletonLines lines={2} className="flex-1" />
        </div>
        <SkeletonLines lines={3} />
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-8 w-24 rounded-pill" />
          <Skeleton className="h-8 w-32 rounded-pill" />
          <Skeleton className="h-8 w-28 rounded-pill" />
        </div>
        <Badge variant="processing">Analysing style</Badge>
      </Card>

      <p className="text-small text-muted">
        This is style analysis only — it never verifies who you are. Identity verification
        runs separately.
      </p>
    </OnboardingShell>
  );
}
