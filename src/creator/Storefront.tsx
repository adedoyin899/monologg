import { Share2, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '@/app/stores/auth';
import { useCreatorStore } from '@/app/stores/creator';
import { Avatar, Badge, Button, Card, CueDivider, toast } from '@/components';
import { formatMoneyValue } from '@/lib/money';
import type { MediaAsset, Niche, RateCard } from '@/types';
import { NICHE_LABELS } from './nicheMeta';

/**
 * PWA-07 / PWA-07D — public storefront profile, mobile-first with a desktop
 * two-column layout. StorefrontView renders both the creator's own preview
 * (default export, from the creator store) and the client-facing public view
 * (/t/:id via client/PublicStorefront).
 *
 * Two independent badge systems (§4.3), never conflated:
 *  - Verified (identity KYC, Smile Identity — TODO(conflict: C5)) → Badge mark
 *  - Celebrity/status (referral-earned reputation) → distinct star pill
 */

export interface StorefrontProfile {
  name: string;
  niche: Niche;
  /** Display string, e.g. "Lagos, Nigeria". */
  location: string;
  styleTags: string[];
  verified: boolean;
  celebrityBadge: boolean;
  rateCards: RateCard[];
  media: MediaAsset | null;
}

const DEMO_RATE_CARDS: RateCard[] = [
  {
    id: 'demo-rate-1',
    serviceTitle: '30-second commercial VO',
    basePrice: { amount: 18_000_000, currency: 'NGN' },
    deliveryTimeline: '3 days',
  },
  {
    id: 'demo-rate-2',
    serviceTitle: 'Live event voice-of-god',
    basePrice: { amount: 45_000_000, currency: 'NGN' },
    deliveryTimeline: '1 session',
  },
];

const DEMO_TAGS = ['Warm Texture', 'Conversational', 'Expressive'];

export function CelebrityBadge() {
  return (
    <span
      title="Status badge — earned through the referral programme"
      className="inline-flex w-fit items-center gap-1 rounded-pill border border-border-control bg-surface-2 px-2 py-1 text-label uppercase text-ink"
    >
      <Star size={14} aria-hidden="true" />
      Celebrity
    </span>
  );
}

function ReelPlayer({ media }: { media: MediaAsset | null }) {
  if (!media) {
    return (
      <Card className="border border-dashed border-border-control bg-surface-2 shadow-none">
        <p className="text-body text-muted">
          The Performance / Showcase Reel plays here once uploaded.
        </p>
      </Card>
    );
  }
  return (
    <figure className="flex flex-col gap-2">
      {media.kind === 'video' ? (
        // creator-supplied reel — caption tracks arrive with real uploads
        <video src={media.url} controls className="w-full rounded-md bg-surface-2 shadow-sm" />
      ) : (
        <audio src={media.url} controls className="w-full" aria-label="Showcase reel audio" />
      )}
      <figcaption className="text-small text-muted">Performance / Showcase Reel</figcaption>
    </figure>
  );
}

export function StorefrontView({
  profile,
  ownerPreview = false,
  bookPath,
}: {
  profile: StorefrontProfile;
  ownerPreview?: boolean;
  /** When set, Book navigates to checkout (PWA-11); otherwise it explains itself. */
  bookPath?: (card: RateCard) => string;
}) {
  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: `${profile.name} — monologg/`, url });
        return;
      } catch {
        // fall through to clipboard (user may have dismissed the sheet)
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      toast.success('Link copied', 'Put it in your bio.');
    } catch {
      toast.error('Couldn’t copy', url);
    }
  };

  const bookLater = () =>
    toast.info('Preview only', 'Clients book from your public page — /t/your-handle.');

  return (
    <main className="min-h-screen bg-bg px-4 py-8 text-ink">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-md bg-surface-2 p-3">
          {ownerPreview ? (
            <p className="text-small text-muted">
              Preview — this is exactly what clients see.{' '}
              <Link to="/creator" className="font-medium text-accent-text underline">
                Back to dashboard
              </Link>
            </p>
          ) : (
            <p className="text-small text-muted">
              <Link to="/client/directory" className="font-medium text-accent-text underline">
                ← Back to the directory
              </Link>
            </p>
          )}
          <Button variant="outline" size="sm" onClick={share}>
            <Share2 size={14} aria-hidden="true" />
            Share storefront
          </Button>
        </div>

        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start lg:gap-8">
          <div className="flex flex-col gap-6">
            {/* Hero */}
            <header className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <Avatar name={profile.name} size="lg" verified={profile.verified} />
                <div className="flex flex-col gap-1">
                  <h1 className="text-h1">{profile.name}</h1>
                  <p className="flex items-center text-body text-muted">
                    {NICHE_LABELS[profile.niche]}
                    <CueDivider />
                    {profile.location}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {profile.verified && <Badge variant="verified">Verified</Badge>}
                {profile.celebrityBadge && <CelebrityBadge />}
              </div>
              <div className="flex flex-wrap gap-1">
                {profile.styleTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-pill bg-surface-2 px-3 py-1 text-small text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </header>

            <ReelPlayer media={profile.media} />
          </div>

          {/* Rate cards — clean vertical stack, link-in-bio style (US-3) */}
          <section aria-labelledby="services-title" className="flex flex-col gap-3">
            <h2 id="services-title" className="text-h3">
              Booking services
            </h2>
            <ul className="flex flex-col gap-3">
              {profile.rateCards.map((card) => (
                <li key={card.id}>
                  <Card interactive className="flex flex-col gap-2">
                    <p className="text-body font-medium text-ink">{card.serviceTitle}</p>
                    <p className="font-mono text-h3 text-ink">
                      {formatMoneyValue(card.basePrice)}
                    </p>
                    <p className="text-small text-muted">
                      Delivered in {card.deliveryTimeline}
                    </p>
                    {bookPath ? (
                      <Link
                        to={bookPath(card)}
                        className="inline-flex h-10 items-center justify-center rounded-btn bg-accent-solid px-4 text-body-lg text-accent-fg transition-colors duration-micro ease-out hover:bg-accent-hover"
                      >
                        Book
                      </Link>
                    ) : (
                      <Button size="md" onClick={bookLater}>
                        Book
                      </Button>
                    )}
                  </Card>
                </li>
              ))}
            </ul>
            <p className="text-small text-muted">
              Escrow-backed. Funds release when deliverables are confirmed.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

/** The creator's own preview — built from the creator store (demo fallback until onboarded). */
export default function Storefront() {
  const store = useCreatorStore();
  const user = useAuthStore((state) => state.user);

  const onboarded = store.step === 'done' && store.rateCards.length > 0;
  const profile: StorefrontProfile = {
    name: user?.name ?? 'Adaeze Obi',
    niche: store.niche ?? 'vo_artist',
    location: 'Lagos, Nigeria',
    styleTags: store.styleTags.length > 0 ? store.styleTags : DEMO_TAGS,
    verified: onboarded ? store.verification === 'verified' : true,
    // real programme state once onboarded; demo profile shows the mark (SET-06)
    celebrityBadge: onboarded ? store.celebrityBadge : true,
    rateCards: onboarded ? store.rateCards : DEMO_RATE_CARDS,
    media: store.media[0] ?? null,
  };

  return <StorefrontView profile={profile} ownerPreview />;
}
