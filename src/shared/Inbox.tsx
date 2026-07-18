import { Link } from 'react-router-dom';
import { useBookingStore } from '@/app/stores/booking';
import { Avatar, Card, CueDivider } from '@/components';
import { creatorById } from '@/client/mockDirectory';
import type { Message } from '@/types';
import { PageShell } from './PageShell';

/** Shared Inbox tab — one row per order room, latest message previewed. */

function preview(message: Message | undefined): string {
  if (!message) return 'Room open — say hello.';
  switch (message.kind) {
    case 'voice':
      return `Voice note · ${message.content}`;
    case 'document':
      return `Attachment · ${message.content}`;
    default:
      return message.content;
  }
}

export default function Inbox() {
  const bookings = useBookingStore((state) => state.bookings);
  const rooms = useBookingStore((state) => state.orderRooms);

  return (
    <PageShell title="Inbox">
      {bookings.length === 0 ? (
        <Card className="border border-dashed border-border-control bg-surface-2 shadow-none">
          <p className="text-body text-muted">
            Conversations live inside order rooms — book (or get booked) and they appear
            here.
          </p>
        </Card>
      ) : (
        <ul className="flex flex-col gap-3">
          {[...bookings].reverse().map((booking) => {
            const room = rooms[booking.id];
            const last = room?.messages[room.messages.length - 1];
            const name = creatorById(booking.creatorId)?.name ?? 'Creator';
            return (
              <li key={booking.id}>
                <Link to={`/order/${booking.id}`} className="group flex">
                  <Card interactive className="flex w-full items-center gap-3">
                    <Avatar name={name} size="md" />
                    <div className="min-w-0 flex-1">
                      <p className="flex items-center text-body font-medium text-ink group-hover:text-accent-text">
                        {name}
                        <CueDivider />
                        <span className="font-mono text-small text-muted">
                          BK-{booking.id.slice(0, 4).toUpperCase()}
                        </span>
                      </p>
                      <p className="truncate text-small text-muted">{preview(last)}</p>
                    </div>
                  </Card>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </PageShell>
  );
}
