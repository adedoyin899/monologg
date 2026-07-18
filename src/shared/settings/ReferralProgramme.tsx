import { BadgeCheck, Copy, Star } from 'lucide-react';
import { useAuthStore } from '@/app/stores/auth';
import { CELEBRITY_THRESHOLD, useCreatorStore } from '@/app/stores/creator';
import { Badge, Button, Card, toast } from '@/components';
import { CelebrityBadge } from '@/creator/Storefront';
import { cn } from '@/lib/utils';
import type { Creator } from '@/types';

import { PageShell } from '../PageShell';

/**
 * SET-06 — Referral / celebrity-badge programme.
 * The celebrity badge is REPUTATION (earned via referrals) and entirely
 * separate from the KYC Verified badge — the two render as distinct marks
 * on storefronts and directory cards.
 */
export default function ReferralProgramme() {
  const user = useAuthStore((state) => state.user);
  const { referrals, celebrityBadge, addReferral } = useCreatorStore();

  const code =
    user && 'referralCode' in user ? (user as Creator).referralCode : 'your-code';
  const link = `${window.location.origin}/?ref=${code}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(link);
      toast.success('Link copied', 'Go build the roster.');
    } catch {
      toast.error('Couldn’t copy', link);
    }
  };

  return (
    <PageShell title="Referrals & badge">
      <Card className="flex flex-col gap-3">
        <p className="text-body text-ink">
          Bring fellow creators onto the roster. At {CELEBRITY_THRESHOLD} referrals, the
          Celebrity star lands on your storefront and directory card.
        </p>
        <p className="break-all rounded-sm bg-surface-2 p-3 font-mono text-body text-ink">
          {link}
        </p>
        <Button variant="outline" size="md" onClick={copyLink}>
          <Copy size={16} aria-hidden="true" />
          Copy referral link
        </Button>
      </Card>

      <Card className="flex flex-col gap-3" aria-label="Progress toward the celebrity badge">
        <div className="flex items-center justify-between">
          <p className="text-body font-medium text-ink">Your progress</p>
          <p className="font-mono text-body text-muted">
            {Math.min(referrals, CELEBRITY_THRESHOLD)} / {CELEBRITY_THRESHOLD}
          </p>
        </div>
        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={CELEBRITY_THRESHOLD}
          aria-valuenow={Math.min(referrals, CELEBRITY_THRESHOLD)}
          aria-label="Referrals toward the celebrity badge"
          className="flex gap-1"
        >
          {Array.from({ length: CELEBRITY_THRESHOLD }, (_, index) => (
            <span
              key={index}
              className={cn(
                'h-2 flex-1 rounded-pill transition-colors duration-short ease-out',
                index < referrals ? 'bg-accent' : 'bg-divider',
              )}
            />
          ))}
        </div>
        {celebrityBadge ? (
          <div className="flex items-center gap-2">
            <CelebrityBadge />
            <p className="text-small text-muted">Earned. Take the bow — it’s on your storefront.</p>
          </div>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              addReferral();
              if (referrals + 1 >= CELEBRITY_THRESHOLD) {
                toast.success('Celebrity status earned', 'The star is on your storefront.');
              } else {
                toast.info('Referral counted', `${CELEBRITY_THRESHOLD - referrals - 1} to go.`);
              }
            }}
            className="w-fit"
          >
            <Star size={14} aria-hidden="true" />
            Simulate a referral (demo)
          </Button>
        )}
      </Card>

      {/* the two badges, side by side, explained — never conflated */}
      <Card className="flex flex-col gap-4">
        <p className="text-label uppercase text-muted">Two badges, two meanings</p>
        <div className="flex items-start gap-3">
          <Badge variant="verified">Verified</Badge>
          <p className="flex-1 text-small text-muted">
            Identity, confirmed by KYC. Can’t be bought, can’t be referred. It answers
            “is this a real person?”
          </p>
        </div>
        <div className="flex items-start gap-3">
          <CelebrityBadge />
          <p className="flex-1 text-small text-muted">
            Standing, earned through referrals. It answers “does the community rate them?”
            — and says nothing about identity.
          </p>
        </div>
        <p className="flex items-center gap-1 text-small text-muted">
          <BadgeCheck size={14} aria-hidden="true" />
          You can hold neither, one, or both.
        </p>
      </Card>
    </PageShell>
  );
}
