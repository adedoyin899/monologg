import { Search } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FAQS } from './faqContent';
import { PageShell } from './PageShell';

/** SYS-05 — FAQ / knowledge base (same content source as the marketing page). */
export default function Faq() {
  const [query, setQuery] = useState('');

  const needle = query.trim().toLowerCase();
  const results = needle
    ? FAQS.filter(
        (entry) =>
          entry.q.toLowerCase().includes(needle) || entry.a.toLowerCase().includes(needle),
      )
    : FAQS;

  return (
    <PageShell title="FAQ / Knowledge base">
      <div className="relative">
        <Search
          size={16}
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
        />
        <input
          type="search"
          aria-label="Search the knowledge base"
          placeholder="Search answers…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="min-h-touch w-full rounded-sm border border-border-control bg-surface pl-9 pr-3 text-body text-ink placeholder:text-muted"
        />
      </div>

      {results.length === 0 ? (
        <p className="text-body text-muted" role="status">
          Nothing on that yet —{' '}
          <Link to="/help" className="font-medium text-accent-text underline">
            ask a human
          </Link>
          .
        </p>
      ) : (
        <div className="flex flex-col divide-y divide-divider rounded-md bg-surface shadow-sm">
          {results.map((entry) => (
            <details key={entry.q} className="group p-4">
              <summary className="flex min-h-touch cursor-pointer list-none items-center justify-between gap-4 text-body-lg font-medium text-ink">
                {entry.q}
                <span
                  aria-hidden="true"
                  className="font-heading text-h3 text-accent-text transition-transform duration-micro ease-out group-open:rotate-90"
                >
                  /
                </span>
              </summary>
              <p className="pt-2 text-body text-muted">{entry.a}</p>
            </details>
          ))}
        </div>
      )}

      <p className="text-small text-muted">
        Same knowledge base as the marketing site — one source, two doors.
      </p>
    </PageShell>
  );
}
