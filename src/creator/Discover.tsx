import { Megaphone } from 'lucide-react';
import { useClientStore } from '@/app/stores/client';
import { Button, Card, CueDivider, toast } from '@/components';
import { formatMoneyValue } from '@/lib/money';
import type { Money, Niche } from '@/types';
import { NICHE_LABELS } from './nicheMeta';

/** Creator Discover tab — who's hiring. Seeded briefs + anything posted in-session. */

interface OpenBrief {
  id: string;
  projectName: string;
  projectType: string;
  niches: Niche[];
  budget: Money;
  org: string;
  posted: string;
}

const SEEDED_BRIEFS: OpenBrief[] = [
  {
    id: 'seed-1',
    projectName: 'Voice for a fintech launch film',
    projectType: 'Commercial',
    niches: ['vo_artist'],
    budget: { amount: 40_000_000, currency: 'NGN' },
    org: 'A Lagos fintech',
    posted: '2h ago',
  },
  {
    id: 'seed-2',
    projectName: 'Wedding MC — December',
    projectType: 'Live event',
    niches: ['compere', 'comedian'],
    budget: { amount: 65_000_000, currency: 'NGN' },
    org: 'Private client',
    posted: '1d ago',
  },
  {
    id: 'seed-3',
    projectName: 'Sunday service guest minister',
    projectType: 'Church service',
    niches: ['speaker_pastor'],
    budget: { amount: 30_000_000, currency: 'NGN' },
    org: 'City Chapel',
    posted: '3d ago',
  },
];

export default function Discover() {
  // briefs posted by clients this session appear at the top — the two sides meet here
  const postedBriefs = useClientStore((state) => state.briefs);

  const open: OpenBrief[] = [
    ...[...postedBriefs].reverse().map((brief) => ({
      id: brief.id,
      projectName: brief.projectName,
      projectType: brief.projectType,
      niches: brief.nicheRequirements,
      budget: brief.budget,
      org: 'Posted just now',
      posted: 'new',
    })),
    ...SEEDED_BRIEFS,
  ];

  return (
    <main className="min-h-screen bg-bg px-4 py-8 text-ink">
      <div className="mx-auto flex w-full max-w-md flex-col gap-6">
        <header className="flex flex-col gap-2">
          <h1 className="text-h1">
            Who’s hiring<span className="text-accent-text">.</span>
          </h1>
          <p className="text-body text-muted">
            Open briefs that match the roster. Pitch before the coffee goes cold.
          </p>
        </header>

        <ul className="flex flex-col gap-3">
          {open.map((brief) => (
            <li key={brief.id}>
              <Card className="flex flex-col gap-2">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-body font-medium text-ink">{brief.projectName}</p>
                  {brief.posted === 'new' && (
                    <span className="rounded-xs bg-accent-solid px-2 py-0.5 text-label uppercase text-accent-fg">
                      New
                    </span>
                  )}
                </div>
                <p className="flex flex-wrap items-center text-small text-muted">
                  {brief.projectType}
                  <CueDivider />
                  {brief.niches.map((niche) => NICHE_LABELS[niche]).join(', ')}
                  <CueDivider />
                  {brief.org}
                  {brief.posted !== 'new' && (
                    <>
                      <CueDivider />
                      {brief.posted}
                    </>
                  )}
                </p>
                <div className="flex items-center justify-between gap-2">
                  <p className="font-mono text-body-lg text-ink">
                    {formatMoneyValue(brief.budget)}
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      toast.info('Pitch noted', 'Brief responses go live with the backend.')
                    }
                  >
                    <Megaphone size={14} aria-hidden="true" />
                    Pitch
                  </Button>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
