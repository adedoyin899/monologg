import { Plus, X } from 'lucide-react';
import { useState } from 'react';
import { useCreatorStore } from '@/app/stores/creator';
import { Badge, Button, Card, Input } from '@/components';
import { OnboardingShell } from './OnboardingShell';

const MAX_TAGS = 6;

/**
 * PWA-05 AI complete — editable style chips + the Verified badge.
 * TODO(conflict: C5): KYC provider is Smile Identity, UNCONFIRMED. The Verified
 * badge reflects identity KYC only — never the style tags below it.
 */
export default function StepTags() {
  const { styleTags, setStyleTags, verification, goToStep } = useCreatorStore();
  const [draft, setDraft] = useState('');
  const [error, setError] = useState<string>();

  const removeTag = (tag: string) => setStyleTags(styleTags.filter((t) => t !== tag));

  const addTag = () => {
    const tag = draft.trim();
    if (!tag) return;
    if (styleTags.some((t) => t.toLowerCase() === tag.toLowerCase())) {
      setError('That tag’s already in the bill.');
      return;
    }
    if (styleTags.length >= MAX_TAGS) {
      setError(`Six tags max — keep the poster readable.`);
      return;
    }
    setStyleTags([...styleTags, tag]);
    setDraft('');
    setError(undefined);
  };

  return (
    <OnboardingShell stepIndex={2} label="Your style" onBack={() => goToStep('media')}>
      <div className="flex flex-col gap-2">
        <h1 className="text-h2">The reel has spoken.</h1>
        <p className="text-body text-muted">
          Thespian AI drafted your style tags — keep, cut, or add your own.
        </p>
      </div>

      {verification === 'verified' && (
        <Card className="flex items-center gap-3">
          <Badge variant="verified">Verified</Badge>
          <p className="text-small text-muted">
            Identity confirmed via KYC — a separate check from your style tags.
          </p>
        </Card>
      )}

      <div className="flex flex-col gap-3">
        <p className="text-label uppercase text-muted" id="style-tags-label">
          Style tags
        </p>
        <ul aria-labelledby="style-tags-label" className="flex flex-wrap gap-2">
          {styleTags.map((tag) => (
            <li key={tag}>
              <span className="inline-flex min-h-touch items-center gap-1 rounded-pill bg-surface-2 py-1 pl-4 pr-1 text-body text-ink">
                {tag}
                <button
                  type="button"
                  aria-label={`Remove tag ${tag}`}
                  onClick={() => removeTag(tag)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-pill text-muted transition-colors duration-micro ease-out hover:bg-divider hover:text-ink"
                >
                  <X size={14} aria-hidden="true" />
                </button>
              </span>
            </li>
          ))}
          {styleTags.length === 0 && (
            <li className="text-small text-muted">No tags yet — add a few below.</li>
          )}
        </ul>
        <form
          className="flex items-start gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            addTag();
          }}
        >
          <Input
            aria-label="Add a style tag"
            placeholder="e.g. Deadpan"
            value={draft}
            onChange={(event) => {
              setDraft(event.target.value);
              setError(undefined);
            }}
            error={error}
            className="flex-1"
          />
          <Button type="submit" variant="outline" size="md" className="mt-0.5">
            <Plus size={16} aria-hidden="true" />
            Add
          </Button>
        </form>
      </div>

      <Button disabled={styleTags.length === 0} onClick={() => goToStep('rates')} className="mt-auto">
        Continue
      </Button>
    </OnboardingShell>
  );
}
