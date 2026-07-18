import { Play } from 'lucide-react';
import { Card } from '@/components';
import { FAQS } from '@/shared/faqContent';
import { HowItWorksSteps } from './HowItWorksSteps';
import { MarketingFooter } from './MarketingFooter';
import { MarketingNav } from './MarketingNav';
import { Reveal } from './Reveal';
import { usePageMeta } from './usePageMeta';

/** Explainer-video slots (WEB-05, §4.5) — thumbnails/URLs land when videos exist. */
const EXPLAINERS = [
  { title: 'Monologg in 90 seconds', duration: '1:30', for: 'Everyone' },
  { title: 'Launch your storefront', duration: '2:45', for: 'Creators' },
  { title: 'From brief to booked', duration: '3:10', for: 'Casting' },
] as const;

// FAQ content lives in src/shared/faqContent.ts — one source, two doors (SYS-05)

export default function HowItWorksPage() {
  usePageMeta(
    'How it works — monologg/',
    'Brief → book → get paid. How Monologg takes a performing-arts booking from first message to released escrow.',
  );

  return (
    <div className="min-h-screen bg-bg text-ink">
      <MarketingNav />
      <main className="mx-auto flex max-w-5xl flex-col gap-12 px-4 py-12">
        <header className="flex max-w-2xl flex-col gap-3">
          <h1 className="text-h1">
            How it works<span className="text-accent-text">.</span>
          </h1>
          <p className="text-body-lg text-muted">
            Three steps, one pipeline. Everything else — contracts, escrow, scheduling —
            happens backstage so you don’t have to think about it.
          </p>
        </header>

        <HowItWorksSteps />

        <Reveal>
          <section className="flex flex-col gap-4" aria-labelledby="explainers">
            <h2 id="explainers" className="text-h2">
              Watch it, don’t read it
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {EXPLAINERS.map((video) => (
                <Card key={video.title} interactive className="flex flex-col gap-3">
                  {/* Video slot — replace with the real embed when produced */}
                  <div className="flex aspect-video items-center justify-center rounded-sm bg-surface-2">
                    <span className="flex h-12 w-12 items-center justify-center rounded-pill bg-accent-solid text-accent-fg">
                      <Play size={20} aria-hidden="true" />
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-body font-medium text-ink">{video.title}</p>
                    <span className="font-mono text-small text-muted">{video.duration}</span>
                  </div>
                  <p className="text-small text-muted">For {video.for} · coming soon</p>
                </Card>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section id="faq" className="flex scroll-mt-20 flex-col gap-4" aria-labelledby="faq-title">
            <h2 id="faq-title" className="text-h2">
              FAQ / Knowledge base
            </h2>
            <div className="flex flex-col divide-y divide-divider rounded-md bg-surface shadow-sm">
              {FAQS.map((item) => (
                <details key={item.q} className="group p-4">
                  <summary className="flex min-h-touch cursor-pointer list-none items-center justify-between gap-4 text-body-lg font-medium text-ink">
                    {item.q}
                    <span
                      aria-hidden="true"
                      className="font-heading text-h3 text-accent-text transition-transform duration-micro ease-out group-open:rotate-90"
                    >
                      /
                    </span>
                  </summary>
                  <p className="pt-2 text-body text-muted">{item.a}</p>
                </details>
              ))}
            </div>
            <p className="text-small text-muted">
              Same knowledge base as in-app Help &amp; Support — one source, two doors.
            </p>
          </section>
        </Reveal>
      </main>
      <MarketingFooter />
    </div>
  );
}
