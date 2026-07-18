import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLaunchStore } from '@/app/stores/launch';
import { WaitlistWidget } from './WaitlistWidget';

/**
 * Fixed hero layout; the launch store swaps State A (waitlist) ↔ State B (live)
 * in the same slot — no rebuild (PRD §4.7).
 */
export function Hero() {
  const launchState = useLaunchStore((store) => store.state);

  return (
    <section className="mx-auto flex max-w-5xl flex-col items-start gap-6 px-4 py-16 sm:py-24">
      <h1 className="max-w-3xl text-h1 sm:text-display">
        Book the room.
        <br />
        Get paid on time<span className="text-accent-text">.</span>
      </h1>
      <p className="max-w-xl text-body-lg text-muted">
        Monologg is the first brief-to-booking pipeline for the performing arts — an agent
        in your pocket, minus the 20%. Post a brief, book verified talent, and let escrow
        do the chasing.
      </p>

      {launchState === 'waitlist' ? (
        <WaitlistWidget />
      ) : (
        <div className="flex flex-wrap gap-3">
          <Link
            to="/client"
            className="inline-flex h-12 items-center gap-2 rounded-btn bg-accent-solid px-6 text-body-lg text-accent-fg transition-colors duration-micro ease-out hover:bg-accent-hover"
          >
            Post a Project / Find Talent
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link
            to="/creator"
            className="inline-flex h-12 items-center rounded-btn border border-border-control px-6 text-body-lg font-medium text-ink transition-colors duration-micro ease-out hover:bg-surface-2"
          >
            Launch Your Storefront
          </Link>
        </div>
      )}
    </section>
  );
}
