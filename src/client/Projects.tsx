import { Link } from 'react-router-dom';
import { useBookingStore } from '@/app/stores/booking';
import { useClientStore } from '@/app/stores/client';
import { Badge, Card, CueDivider, type BadgeVariant } from '@/components';
import { NICHE_LABELS } from '@/creator/nicheMeta';
import { formatMoneyValue } from '@/lib/money';
import type { BookingState } from '@/types';
import { creatorById } from './mockDirectory';

/** Client Projects tab — briefs posted + bookings in flight, one place. */

const STATE_BADGE: Record<BookingState, { variant: BadgeVariant; label: string }> = {
  escrow_locked: { variant: 'escrow', label: 'In escrow' },
  deliverables_provided: { variant: 'info', label: 'Review now' },
  payment_released: { variant: 'paid', label: 'Paid' },
};

export default function Projects() {
  const briefs = useClientStore((state) => state.briefs);
  const bookings = useBookingStore((state) => state.bookings);

  return (
    <main className="min-h-screen bg-bg px-4 py-8 text-ink">
      <div className="mx-auto flex w-full max-w-md flex-col gap-6">
        <header className="flex flex-col gap-2">
          <h1 className="text-h1">
            Projects<span className="text-accent-text">.</span>
          </h1>
          <p className="text-body text-muted">Briefs out, bookings in flight — one bill.</p>
        </header>

        <section className="flex flex-col gap-3" aria-labelledby="orders-title">
          <h2 id="orders-title" className="text-label uppercase text-muted">
            Bookings
          </h2>
          {bookings.length === 0 ? (
            <Card className="border border-dashed border-border-control bg-surface-2 shadow-none">
              <p className="text-body text-muted">
                Nothing booked yet —{' '}
                <Link to="/client/directory" className="font-medium text-accent-text underline">
                  find talent
                </Link>{' '}
                and lock a slot.
              </p>
            </Card>
          ) : (
            <ul className="flex flex-col gap-3">
              {[...bookings].reverse().map((booking) => {
                const badge = STATE_BADGE[booking.state];
                const total = {
                  amount: booking.base.amount + booking.fees.clientFee.amount,
                  currency: booking.base.currency,
                };
                return (
                  <li key={booking.id}>
                    <Link to={`/order/${booking.id}`} className="group flex">
                      <Card interactive className="flex w-full items-center gap-3">
                        <div className="min-w-0 flex-1">
                          <p className="text-body font-medium text-ink group-hover:text-accent-text">
                            {creatorById(booking.creatorId)?.name ?? 'Creator'}
                          </p>
                          <p className="flex items-center font-mono text-small text-muted">
                            BK-{booking.id.slice(0, 4).toUpperCase()}
                            <CueDivider />
                            {booking.slot.date} {booking.slot.start}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <p className="font-mono text-body text-ink">
                            {formatMoneyValue(total)}
                          </p>
                          <Badge variant={badge.variant}>{badge.label}</Badge>
                        </div>
                      </Card>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        <section className="flex flex-col gap-3" aria-labelledby="briefs-title">
          <h2 id="briefs-title" className="text-label uppercase text-muted">
            Briefs
          </h2>
          {briefs.length === 0 ? (
            <Card className="border border-dashed border-border-control bg-surface-2 shadow-none">
              <p className="text-body text-muted">
                No briefs out —{' '}
                <Link to="/client/brief" className="font-medium text-accent-text underline">
                  post a project
                </Link>{' '}
                and let talent come to you.
              </p>
            </Card>
          ) : (
            <ul className="flex flex-col gap-3">
              {[...briefs].reverse().map((brief) => (
                <li key={brief.id}>
                  <Card className="flex flex-col gap-1">
                    <p className="text-body font-medium text-ink">{brief.projectName}</p>
                    <p className="flex flex-wrap items-center text-small text-muted">
                      {brief.projectType}
                      <CueDivider />
                      {brief.nicheRequirements.map((niche) => NICHE_LABELS[niche]).join(', ')}
                    </p>
                    <p className="font-mono text-body text-ink">
                      {formatMoneyValue(brief.budget)}
                    </p>
                  </Card>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
