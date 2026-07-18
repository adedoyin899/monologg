import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLaunchStore } from '@/app/stores/launch';
import { Hero } from './Hero';
import { HowItWorksSteps } from './HowItWorksSteps';
import { MarketingFooter } from './MarketingFooter';
import { MarketingNav } from './MarketingNav';
import { PersonaSplit } from './PersonaSplit';
import { ProductPreview } from './ProductPreview';
import { Reveal } from './Reveal';
import { Testimonials } from './Testimonials';
import { TrustBlock } from './TrustBlock';
import { usePageMeta } from './usePageMeta';
import { WaitlistWidget } from './WaitlistWidget';

/** Placeholder social proof until real numbers exist. */
const STATS = [
  { value: '2,400+', label: 'creators in the queue' },
  { value: '13', label: 'launch markets' },
  { value: '100%', label: 'escrow-backed bookings' },
] as const;

function StatStrip() {
  return (
    <section aria-label="Social proof" className="border-y border-divider">
      <div className="mx-auto flex max-w-5xl flex-wrap justify-around gap-6 px-4 py-6">
        {STATS.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-1">
            <span className="font-mono text-h2 text-ink">{stat.value}</span>
            <span className="text-small text-muted">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function FinalCta() {
  const launchState = useLaunchStore((store) => store.state);
  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      {/* Mode B moment: near-black color block via a scoped dark theme — token-pure */}
      <div className="dark flex flex-col items-start gap-6 rounded-lg bg-bg p-8 text-ink sm:p-12">
        <h2 className="font-heading text-h1 sm:text-display">
          The stage is set<span className="text-accent-text">.</span>
        </h2>
        <p className="text-body-lg text-muted">Book the room. Get paid on time.</p>
        {launchState === 'waitlist' ? (
          <WaitlistWidget />
        ) : (
          <Link
            to="/client"
            className="inline-flex h-12 items-center gap-2 rounded-btn bg-accent-solid px-6 text-body-lg text-accent-fg transition-colors duration-micro ease-out hover:bg-accent-hover"
          >
            Post a Project / Find Talent
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        )}
      </div>
    </section>
  );
}

/** Dev-only preview switch for the hero toggle (config flag drives production). */
function LaunchStatePreview() {
  const { state, setState } = useLaunchStore();
  if (!import.meta.env.DEV) return null;
  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-1 rounded-pill bg-surface p-1 shadow-md">
      <span className="px-2 text-small text-muted">Hero preview:</span>
      {(['waitlist', 'live'] as const).map((value) => (
        <button
          key={value}
          type="button"
          aria-pressed={state === value}
          onClick={() => setState(value)}
          className={`min-h-touch rounded-pill px-3 text-small font-medium transition-colors duration-micro ease-out ${
            state === value ? 'bg-accent-solid text-accent-fg' : 'text-muted hover:text-ink'
          }`}
        >
          {value}
        </button>
      ))}
    </div>
  );
}

export default function Landing() {
  usePageMeta(
    'monologg/ — Book the room. Get paid on time.',
    'Monologg is the first brief-to-booking pipeline for the performing arts. Post a brief, book verified talent, and let escrow do the chasing.',
  );

  return (
    <div className="min-h-screen bg-bg text-ink">
      <MarketingNav />
      <main>
        <Hero />
        <StatStrip />
        <Reveal>
          <ProductPreview />
        </Reveal>
        <Reveal>
          <PersonaSplit />
        </Reveal>
        <Reveal>
          <section className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-12">
            <h2 className="text-h2">How it works</h2>
            <HowItWorksSteps />
          </section>
        </Reveal>
        <Reveal>
          <TrustBlock />
        </Reveal>
        <Reveal>
          <Testimonials />
        </Reveal>
        <Reveal>
          <FinalCta />
        </Reveal>
      </main>
      <MarketingFooter />
      <LaunchStatePreview />
    </div>
  );
}
