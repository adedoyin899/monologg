import {
  CalendarCheck,
  Lock,
  MessageSquare,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import { useState } from 'react';
import { Button, Card } from '@/components';
import { cn } from '@/lib/utils';
import { PageShell } from './PageShell';

/** SYS-01 — Notification Centre. Seeded demo items until the backend feeds it. */

interface Notification {
  id: string;
  icon: LucideIcon;
  title: string;
  body: string;
  time: string;
}

const SEED: Notification[] = [
  {
    id: 'n1',
    icon: CalendarCheck,
    title: 'New booking request',
    body: 'Brightlight Events wants “Live event voice-of-god” — Friday, 16:00.',
    time: '2h ago',
  },
  {
    id: 'n2',
    icon: Lock,
    title: 'Escrow locked',
    body: 'Funds held safely for BK-92A4. You’re on.',
    time: '2h ago',
  },
  {
    id: 'n3',
    icon: MessageSquare,
    title: 'New message from Tunde',
    body: '“Can we get the warm read by Thursday?”',
    time: '1d ago',
  },
  {
    id: 'n4',
    icon: Sparkles,
    title: 'Style tags refreshed',
    body: 'Thespian AI re-read your reel — style only, never identity.',
    time: '3d ago',
  },
];

export default function NotificationCentre() {
  const [unread, setUnread] = useState<Set<string>>(new Set(['n1', 'n2']));

  const markRead = (id: string) =>
    setUnread((current) => {
      const next = new Set(current);
      next.delete(id);
      return next;
    });

  return (
    <PageShell title="Notifications">
      <div className="flex items-center justify-between">
        <p className="text-small text-muted" role="status">
          {unread.size > 0 ? `${unread.size} unread` : 'All caught up'}
        </p>
        {unread.size > 0 && (
          <Button variant="ghost" size="sm" onClick={() => setUnread(new Set())}>
            Mark all read
          </Button>
        )}
      </div>
      <ul className="flex flex-col gap-3">
        {SEED.map((item) => {
          const isUnread = unread.has(item.id);
          const { icon: ItemIcon } = item;
          return (
            <li key={item.id}>
              <Card
                role="button"
                tabIndex={0}
                aria-label={`${item.title}${isUnread ? ' (unread)' : ''}`}
                onClick={() => markRead(item.id)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    markRead(item.id);
                  }
                }}
                className={cn(
                  'flex cursor-pointer items-start gap-3',
                  !isUnread && 'opacity-70',
                )}
              >
                <ItemIcon size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-accent" />
                <div className="min-w-0 flex-1">
                  <p className="text-body font-medium text-ink">{item.title}</p>
                  <p className="text-small text-muted">{item.body}</p>
                  <p className="pt-1 font-mono text-small text-muted">{item.time}</p>
                </div>
                {isUnread && (
                  <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-pill bg-accent" />
                )}
              </Card>
            </li>
          );
        })}
      </ul>
    </PageShell>
  );
}
