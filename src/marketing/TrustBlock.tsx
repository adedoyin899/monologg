import { BadgeCheck, Lock, ShieldCheck } from 'lucide-react';
import { Badge, Card, EscrowProgress } from '@/components';
import { PAYMENT_RAILS } from '@/config/paymentRails';

const RAIL_LABELS: Record<string, string> = {
  paystack: 'Paystack',
  stripe: 'Stripe',
  airwallex: 'Airwallex',
};

const ALL_RAILS = [...new Set([...PAYMENT_RAILS.africa, ...PAYMENT_RAILS.rest])];

/** Security & escrow trust block (design doc §7) — partners come from config, never hardcoded. */
export function TrustBlock() {
  return (
    <section className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-12">
      <h2 className="text-h2">Your money waits in the wings — safely.</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="flex flex-col gap-3">
          <Lock size={24} aria-hidden="true" className="text-accent" />
          <h3 className="text-h3">Escrow on every booking</h3>
          <p className="text-body text-muted">
            Funds lock at checkout and release only when deliverables are confirmed. Both
            sides watch the same three steps.
          </p>
          <EscrowProgress current={0} />
        </Card>
        <Card className="flex flex-col gap-3">
          <ShieldCheck size={24} aria-hidden="true" className="text-accent" />
          <h3 className="text-h3">Region-aware payments</h3>
          <p className="text-body text-muted">
            The right rail for where you are — no workarounds, no wire-transfer suspense.
          </p>
          <div className="mt-auto flex flex-wrap gap-2">
            {ALL_RAILS.map((rail) => (
              <span
                key={rail}
                className="rounded-pill border border-divider px-3 py-1 text-small font-medium text-muted"
              >
                {RAIL_LABELS[rail] ?? rail}
              </span>
            ))}
          </div>
        </Card>
        <Card className="flex flex-col gap-3">
          <BadgeCheck size={24} aria-hidden="true" className="text-accent" />
          <h3 className="text-h3">Verified means verified</h3>
          <p className="text-body text-muted">
            The Verified badge is real identity verification — not vibes. Style tags are a
            separate, AI-suggested thing entirely.
          </p>
          <Badge variant="verified" className="mt-auto">
            Verified
          </Badge>
        </Card>
      </div>
    </section>
  );
}
