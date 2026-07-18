import { Link, useParams } from 'react-router-dom';
import { StorefrontView } from '@/creator/Storefront';
import { marketForCountry } from '@/config/markets';
import { creatorById } from './mockDirectory';

/** Client-facing storefront (PWA-07 public view) at /t/:id — talent-accented. */
export default function PublicStorefront() {
  const { id } = useParams();
  const entry = id ? creatorById(id) : undefined;

  if (!entry) {
    return (
      <main className="flex min-h-screen flex-col items-start justify-center gap-4 bg-bg px-6 text-ink">
        <h1 className="text-h1">That stage is empty.</h1>
        <p className="text-body-lg text-muted">
          This storefront doesn’t exist — it may have moved backstage.
        </p>
        <Link to="/client/directory" className="font-medium text-accent-text underline">
          Back to the directory
        </Link>
      </main>
    );
  }

  return (
    <StorefrontView
      profile={{
        name: entry.name,
        niche: entry.niche,
        location: `Lagos, ${marketForCountry(entry.location)?.name ?? entry.location}`,
        styleTags: entry.styleTags,
        verified: entry.verification === 'verified',
        celebrityBadge: entry.celebrityBadge,
        rateCards: entry.rateCards,
        media: entry.media[0] ?? null,
      }}
      bookPath={(card) => `/client/checkout/${entry.id}/${card.id}`}
    />
  );
}
