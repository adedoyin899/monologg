import { Link } from 'react-router-dom';
import { useBookingStore } from '@/app/stores/booking';
import { Badge, Card, CueDivider, type BadgeVariant } from '@/components';
import { formatMoneyValue } from '@/lib/money';
import type { BookingState } from '@/types';

/** Creator Bookings tab — every order room, payout-framed. */

const STATE_BADGE: Record<BookingState, { variant: BadgeVariant; label: string }> = {
  escrow_locked: { variant: 'escrow', label: 'In escrow' },
  deliverables_provided: { variant: 'info', label: 'Deliver now' },
  payment_released: { variant: 'paid', label: 'Paid' },
};

export default function Bookings() {
  // with the backend this filters by the signed-in creator's id
  const bookings = useBookingStore((state) => state.bookings);

  return (
    <main className="min-h-screen bg-bg px-4 py-8 text-ink">
      <div className="mx-auto flex w-full max-w-md flex-col gap-6">
        <header className="flex flex-col gap-2">
          <h1 className="text-h1">
            Bookings<span className="text-accent-text">.</span>
          </h1>
          <p className="text-body text-muted">Every gig, from escrow locked to paid.</p>
        </header>

        {bookings.length === 0 ? (
          <Card className="border border-dashed border-border-control bg-surface-2 shadow-none">
            <p className="text-body text-muted">
              No bookings yet — when a client locks escrow on your storefront, the order
              room opens here.
            </p>
          </Card>
        ) : (
          <ul className="flex flex-col gap-3">
            {[...bookings].reverse().map((booking) => {
              const badge = STATE_BADGE[booking.state];
              const net = {
                amount: booking.base.amount - booking.fees.talentFee.amount,
                currency: booking.base.currency,
              };
              return (
                <li key={booking.id}>
                  <Link to={`/order/${booking.id}`} className="group flex">
                    <Card interactive className="flex w-full items-center gap-3">
                      <div className="min-w-0 flex-1">
                        <p className="text-body font-medium text-ink group-hover:text-accent-text">
                          BK-{booking.id.slice(0, 4).toUpperCase()}
                        </p>
                        <p className="flex items-center font-mono text-small text-muted">
                          {booking.slot.date} {booking.slot.start}
                          {booking.engagementType === 'retainer' && (
                            <>
                              <CueDivider />
                              retainer · {booking.recurrence}
                            </>
                          )}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <p className="font-mono text-body text-ink">{formatMoneyValue(net)}</p>
                        <Badge variant={badge.variant}>{badge.label}</Badge>
                      </div>
                    </Card>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
        <p className="text-small text-muted">Amounts show your payout after the talent fee.</p>
      </div>
    </main>
  );
}
