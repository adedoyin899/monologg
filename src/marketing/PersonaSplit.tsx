import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

/**
 * "Who it's for" — the ONLY surface where both accents appear together (§3.5).
 * Panels carry .light + data-audience so their tokens stay correct in both page
 * themes (panel visuals are theme-invariant Mode B color blocks).
 */
const PANELS = [
  {
    audience: 'talent',
    eyebrow: 'For creators',
    headline: 'Your stage. Your terms. Your money.',
    points: [
      'A storefront that books itself — rate cards, availability, escrow',
      'Thespian AI tags your style so casting finds you',
      'Paid on time. Every time.',
    ],
    cta: { to: '/creator', label: 'Launch Your Storefront' },
  },
  {
    audience: 'client',
    eyebrow: 'For casting',
    headline: 'One brief. Any stage. Booked.',
    points: [
      'Verified talent, filterable by niche, style, and budget',
      'Slots locked with payment held safely in escrow',
      'Find your next MC before lunch',
    ],
    cta: { to: '/client', label: 'Post a Project' },
  },
] as const;

export function PersonaSplit() {
  return (
    <section className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-12">
      <h2 className="text-h2">Who it’s for</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {PANELS.map((panel) => (
          <section
            key={panel.audience}
            data-audience={panel.audience}
            className={cn('light flex flex-col gap-4 rounded-lg bg-accent-solid p-6 sm:p-8')}
          >
            <p className="text-label uppercase text-accent-fg">{panel.eyebrow}</p>
            <h3 className="font-heading text-h2 text-accent-fg">{panel.headline}</h3>
            <ul className="flex flex-col gap-2">
              {panel.points.map((point) => (
                <li key={point} className="flex items-start gap-2 text-body-lg text-accent-fg">
                  <Check size={18} aria-hidden="true" className="mt-1 shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
            <Link
              to={panel.cta.to}
              className="mt-auto inline-flex min-h-touch w-fit items-center rounded-btn bg-accent-fg px-6 text-body-lg font-medium text-accent-text transition-transform duration-micro ease-out hover:-translate-y-0.5"
            >
              {panel.cta.label}
            </Link>
          </section>
        ))}
      </div>
    </section>
  );
}
