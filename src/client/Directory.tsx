import { Search, SlidersHorizontal, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useClientStore } from '@/app/stores/client';
import { Avatar, Badge, Button, Card, MultiSelectChips, Select, Toggle } from '@/components';
import { MARKETS } from '@/config/markets';
import { NICHE_LABELS } from '@/creator/nicheMeta';
import { formatMoneyValue } from '@/lib/money';
import type { Creator, Niche } from '@/types';
import { DIRECTORY_STYLE_TAGS, MOCK_CREATORS, startingPrice } from './mockDirectory';

/** PWA-10 / PWA-10D — filter-driven casting directory (US-6). */

const CORE_FOCUS: ReadonlyArray<{ value: Niche; label: string }> = [
  { value: 'actor', label: 'Actors' },
  { value: 'vo_artist', label: 'VO Artists' },
  { value: 'comedian', label: 'Comedians' },
  { value: 'compere', label: 'Compères' },
];

const EXTENDED_FOCUS: ReadonlyArray<{ value: Niche; label: string }> = [
  { value: 'speaker_pastor', label: 'Pastors / Speakers' },
  { value: 'musician', label: 'Musicians' },
  { value: 'content_creator', label: 'Streamers' },
];

const STYLE_CHOICES = DIRECTORY_STYLE_TAGS.map((tag) => ({ value: tag, label: tag }));

/** Max starting price brackets (beta cohort is NGN-priced). */
const PRICE_BRACKETS = [
  { label: 'Any price', value: '' },
  { label: 'Under ₦200,000', value: String(20_000_000) },
  { label: 'Under ₦400,000', value: String(40_000_000) },
  { label: 'Under ₦600,000', value: String(60_000_000) },
] as const;

function matchesFilters(
  entry: Creator,
  filters: ReturnType<typeof useClientStore.getState>['filters'],
): boolean {
  const query = filters.query.trim().toLowerCase();
  if (query && !entry.name.toLowerCase().includes(query)) return false;
  if (filters.niches.length > 0 && !filters.niches.includes(entry.niche)) return false;
  if (
    filters.styleTags.length > 0 &&
    !filters.styleTags.some((tag) => entry.styleTags.includes(tag))
  )
    return false;
  if (filters.location && entry.location !== filters.location) return false;
  if (filters.maxBudget !== null && startingPrice(entry).amount > filters.maxBudget) return false;
  if (filters.verifiedOnly && entry.verification !== 'verified') return false;
  return true;
}

function CreatorCard({ entry }: { entry: Creator }) {
  return (
    <Link to={`/t/${entry.id}`} className="group flex">
      <Card interactive className="flex w-full flex-col gap-3">
        <div className="flex items-center gap-3">
          <Avatar name={entry.name} size="md" verified={entry.verification === 'verified'} />
          <div className="min-w-0 flex-1">
            <p className="flex items-center gap-1 truncate text-body-lg font-medium text-ink group-hover:text-accent-text">
              {entry.name}
              {entry.celebrityBadge && (
                <Star size={14} aria-label="Celebrity status badge" className="shrink-0 text-muted" />
              )}
            </p>
            <p className="text-small text-muted">{NICHE_LABELS[entry.niche]}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-1">
          {entry.styleTags.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-pill bg-surface-2 px-2 py-0.5 text-small text-muted">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between gap-2">
          <p className="font-mono text-body-lg text-ink">
            From {formatMoneyValue(startingPrice(entry))}
          </p>
          {entry.verification === 'verified' && <Badge variant="verified">Verified</Badge>}
        </div>
      </Card>
    </Link>
  );
}

export default function Directory() {
  const { filters, setFilters, resetFilters } = useClientStore();

  const results = MOCK_CREATORS.filter((entry) => matchesFilters(entry, filters));
  const filtersActive =
    filters.query !== '' ||
    filters.niches.length > 0 ||
    filters.styleTags.length > 0 ||
    filters.location !== null ||
    filters.maxBudget !== null ||
    filters.verifiedOnly;

  return (
    <main className="min-h-screen bg-bg px-4 py-8 text-ink">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <header className="flex flex-col gap-2">
          <h1 className="text-h1">
            Find talent<span className="text-accent-text">.</span>
          </h1>
          <p className="text-body text-muted">
            Verified creators, filterable by craft, vibe, price, and place.{' '}
            <Link to="/client" className="font-medium text-accent-text underline">
              Back to home
            </Link>
          </p>
        </header>

        {/* PWA-10D: filters become a sidebar on desktop */}
        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[300px_minmax(0,1fr)] lg:items-start lg:gap-8">
          <section
            aria-label="Filters"
            className="flex flex-col gap-4 rounded-md bg-surface p-4 shadow-sm"
          >
            <div className="flex items-center gap-2 text-muted">
              <SlidersHorizontal size={16} aria-hidden="true" />
              <span className="text-label uppercase">Filters</span>
              {filtersActive && (
                <Button variant="ghost" size="sm" onClick={resetFilters} className="ml-auto">
                  Clear all
                </Button>
              )}
            </div>

            <div className="relative">
              <Search
                size={16}
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
              />
              <input
                type="search"
                aria-label="Search creators by name"
                placeholder="Search by name…"
                value={filters.query}
                onChange={(event) => setFilters({ query: event.target.value })}
                className="min-h-touch w-full rounded-sm border border-border-control bg-surface pl-9 pr-3 text-body text-ink placeholder:text-muted"
              />
            </div>

            <MultiSelectChips
              label="Core focus"
              options={CORE_FOCUS}
              value={filters.niches.filter((n) => CORE_FOCUS.some((c) => c.value === n))}
              onChange={(selected) =>
                setFilters({
                  niches: [
                    ...filters.niches.filter((n) => !CORE_FOCUS.some((c) => c.value === n)),
                    ...(selected as Niche[]),
                  ],
                })
              }
            />
            <MultiSelectChips
              label="Extended focus"
              options={EXTENDED_FOCUS}
              value={filters.niches.filter((n) => EXTENDED_FOCUS.some((c) => c.value === n))}
              onChange={(selected) =>
                setFilters({
                  niches: [
                    ...filters.niches.filter((n) => !EXTENDED_FOCUS.some((c) => c.value === n)),
                    ...(selected as Niche[]),
                  ],
                })
              }
            />
            <MultiSelectChips
              label="Style / vibe"
              options={STYLE_CHOICES}
              value={filters.styleTags}
              onChange={(styleTags) => setFilters({ styleTags })}
            />

            <div className="grid grid-cols-2 gap-3">
              <Select
                label="Max starting price"
                value={filters.maxBudget === null ? '' : String(filters.maxBudget)}
                onChange={(event) =>
                  setFilters({
                    maxBudget: event.target.value === '' ? null : Number(event.target.value),
                  })
                }
              >
                {PRICE_BRACKETS.map((bracket) => (
                  <option key={bracket.label} value={bracket.value}>
                    {bracket.label}
                  </option>
                ))}
              </Select>
              <Select
                label="Location"
                value={filters.location ?? ''}
                onChange={(event) =>
                  setFilters({ location: event.target.value === '' ? null : event.target.value })
                }
              >
                <option value="">Anywhere</option>
                {MARKETS.map((market) => (
                  <option key={market.country} value={market.country}>
                    {market.name}
                  </option>
                ))}
              </Select>
            </div>

            <Toggle
              label="Verified only"
              description="Identity-checked creators"
              checked={filters.verifiedOnly}
              onChange={(verifiedOnly) => setFilters({ verifiedOnly })}
            />
          </section>

          <section aria-label="Results" className="flex flex-col gap-3">
            <p className="text-small text-muted" role="status">
              {results.length} {results.length === 1 ? 'creator' : 'creators'} on the bill
            </p>
            {results.length === 0 ? (
              <Card className="flex flex-col items-start gap-3 border border-dashed border-border-control bg-surface-2 shadow-none">
                <p className="text-body-lg text-ink">No one fits that bill yet.</p>
                <p className="text-body text-muted">
                  Loosen a filter or two — the right act is usually one tweak away.
                </p>
                <Button variant="outline" size="sm" onClick={resetFilters}>
                  Clear filters
                </Button>
              </Card>
            ) : (
              <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {results.map((entry) => (
                  <li key={entry.id} className="flex">
                    <CreatorCard entry={entry} />
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
