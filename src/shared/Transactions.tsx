import { Link } from 'react-router-dom';
import { useAuthStore } from '@/app/stores/auth';
import { useBookingStore } from '@/app/stores/booking';
import { Badge, Card, CueDivider, type BadgeVariant } from '@/components';
import { creatorById } from '@/client/mockDirectory';
import { formatMoneyValue } from '@/lib/money';
import type { BookingState } from '@/types';
import { PageShell } from './PageShell';

/** SYS-02 — Transaction History, straight from the booking store. */

const STATE_BADGE: Record<BookingState, { variant: BadgeVariant; label: string }> = {
  escrow_locked: { variant: 'escrow', label: 'In escrow' },
  deliverables_provided: { variant: 'info', label: 'Deliverables in' },
  payment_released: { variant: 'paid', label: 'Paid' },
};

export default function Transactions() {
  const bookings = useBookingStore((state) => state.bookings);
  const userType = useAuthStore((state) => state.userType) ?? 'client';

  return (
    <PageShell title="Transactions">
      {bookings.length === 0 ? (
        <Card className="flex flex-col items-start gap-3 border border-dashed border-border-control bg-surface-2 shadow-none">
          <p className="text-body text-muted">
            No transactions yet — every booking’s money story lands here.
          </p>
          <Link to="/client/directory" className="font-medium text-accent-text underline">
            Find talent
          </Link>
        </Card>
      ) : (
        <ul className="flex flex-col gap-3">
          {[...bookings].reverse().map((booking) => {
            const badge = STATE_BADGE[booking.state];
            // client rows show the escrow total; talent rows show the net payout
            const amount =
              userType === 'talent'
                ? {
                    amount: booking.base.amount - booking.fees.talentFee.amount,
                    currency: booking.base.currency,
                  }
                : {
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
                        {booking.slot.date}
                        {booking.engagementType === 'retainer' && (
                          <>
                            <CueDivider />
                            retainer
                          </>
                        )}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <p className="font-mono text-body text-ink">{formatMoneyValue(amount)}</p>
                      <Badge variant={badge.variant}>{badge.label}</Badge>
                    </div>
                  </Card>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
      <p className="text-small text-muted">
        {userType === 'talent'
          ? 'Amounts show your payout after the talent fee.'
          : 'Amounts show the escrow total including the client fee.'}
      </p>
    </PageShell>
  );
}
