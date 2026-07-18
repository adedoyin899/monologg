import { useState } from 'react';
import { useCreatorStore } from '@/app/stores/creator';
import { Button, FileDropzone } from '@/components';
import type { MediaAsset } from '@/types';
import { OnboardingShell } from './OnboardingShell';

/**
 * PWA-03 media upload — "Performance / Showcase Reel", never "Audition Tape".
 * VO Artists get audio-first framing (US-1).
 */
export default function StepMedia() {
  const { niche, media, addMedia, removeMedia, goToStep, nextStep } = useCreatorStore();
  const [file, setFile] = useState<File | null>(null);

  const audioFirst = niche === 'vo_artist';

  const continueToAnalysis = () => {
    if (!file) return;
    // replace any earlier upload from a back-and-forth pass
    media.forEach((asset) => removeMedia(asset.id));
    const asset: MediaAsset = {
      id: crypto.randomUUID(),
      kind: file.type.startsWith('audio/') ? 'audio' : 'video',
      url: URL.createObjectURL(file),
      sizeBytes: file.size,
    };
    addMedia(asset);
    nextStep();
  };

  return (
    <OnboardingShell stepIndex={1} label="Your reel" onBack={() => goToStep('niche')}>
      <div className="flex flex-col gap-2">
        <h1 className="text-h2">Upload your Performance / Showcase Reel</h1>
        <p className="text-body text-muted">
          {audioFirst
            ? 'Your voice leads here — a clean demo says more than any bio.'
            : 'One clip that shows what booking you feels like. Lead with your best minute.'}
        </p>
      </div>

      <FileDropzone
        label="Performance / Showcase Reel"
        accept={audioFirst ? 'audio/*,video/*' : 'video/*,audio/*'}
        helper={
          audioFirst
            ? 'Audio first (.mp3, .wav) — video welcome too · up to 150MB'
            : 'Video or audio · up to 150MB'
        }
        maxSizeMB={150}
        file={file}
        onChange={setFile}
      />

      <Button disabled={!file} onClick={continueToAnalysis} className="mt-auto">
        Continue
      </Button>
    </OnboardingShell>
  );
}
