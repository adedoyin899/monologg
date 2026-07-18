import { Bell, CalendarClock, RotateCcw, Settings, Store } from 'lucide-react';
import { Link, Route, Routes } from 'react-router-dom';
import { useAuthStore } from '@/app/stores/auth';
import { useCreatorStore } from '@/app/stores/creator';
import { Badge, Button, Card } from '@/components';
import { formatMoneyValue } from '@/lib/money';
import Bookings from './Bookings';
import Discover from './Discover';
import { NICHE_LABELS } from './nicheMeta';
import Onboarding from './Onboarding';
import Scheduling from './Scheduling';
import Storefront from './Storefront';

/** Creator area: onboarding until done, then the full tabbed side (PRD §5.1). */
export default function CreatorHome() {
  return (
    <Routes>
      <Route index element={<CreatorDashboard />} />
      <Route path="storefront" element={<Storefront />} />
      <Route path="schedule" element={<Scheduling />} />
      <Route path="bookings" element={<Bookings />} />
      <Route path="discover" element={<Discover />} />
    </Routes>
  );
}

function CreatorDashboard() {
  const { step, niche, styleTags, verification, rateCards, availability, reset } =
    useCreatorStore();
  const user = useAuthStore((state) => state.user);

  if (step !== 'done') return <Onboarding />;

  const openSlots = availability.reduce((sum, block) => sum + block.slots.length, 0);

  return (
    <main className="min-h-screen bg-bg px-4 py-8 text-ink">
      <div className="mx-auto flex w-full max-w-md flex-col gap-6">
        <header className="flex flex-col gap-2">
          <div className="flex items-start justify-between gap-2">
            <h1 className="text-h1">
              Your storefront is taking shape<span className="text-accent-text">.</span>
            </h1>
            <span className="flex shrink-0">
              <Link
                to="/notifications"
                aria-label="Notifications"
                className="inline-flex min-h-touch min-w-touch items-center justify-center rounded-btn text-muted transition-colors duration-micro ease-out hover:bg-surface-2 hover:text-ink"
              >
                <Bell size={20} aria-hidden="true" />
              </Link>
              <Link
                to="/settings"
                aria-label="Settings"
                className="inline-flex min-h-touch min-w-touch items-center justify-center rounded-btn text-muted transition-colors duration-micro ease-out hover:bg-surface-2 hover:text-ink"
              >
                <Settings size={20} aria-hidden="true" />
              </Link>
            </span>
          </div>
          <p className="text-body text-muted">
            {user?.name ? `${user.name} — ` : ''}
            {niche ? NICHE_LABELS[niche] : 'Creator'}
          </p>
        </header>

        <div className="grid grid-cols-2 gap-3">
          <Link
            to="/creator/storefront"
            className="flex min-h-touch flex-col items-start gap-2 rounded-md bg-surface p-4 shadow-sm transition-[box-shadow,transform] duration-micro ease-out hover:-translate-y-0.5 hover:shadow-md"
          >
            <Store size={22} aria-hidden="true" className="text-accent" />
            <span className="text-body font-medium text-ink">View my storefront</span>
            <span className="text-small text-muted">The page clients see</span>
          </Link>
          <Link
            to="/creator/schedule"
            className="flex min-h-touch flex-col items-start gap-2 rounded-md bg-surface p-4 shadow-sm transition-[box-shadow,transform] duration-micro ease-out hover:-translate-y-0.5 hover:shadow-md"
          >
            <CalendarClock size={22} aria-hidden="true" className="text-accent" />
            <span className="text-body font-medium text-ink">Set my hours</span>
            <span className="text-small text-muted">
              {openSlots > 0 ? `${openSlots} slots open` : 'No slots open yet'}
            </span>
          </Link>
        </div>

        {verification === 'verified' && (
          <Card className="flex items-center gap-3">
            <Badge variant="verified">Verified</Badge>
            <p className="text-small text-muted">Identity confirmed — clients see this badge.</p>
          </Card>
        )}

        <section className="flex flex-col gap-2">
          <h2 className="text-label uppercase text-muted">Style tags</h2>
          <div className="flex flex-wrap gap-2">
            {styleTags.map((tag) => (
              <span key={tag} className="rounded-pill bg-surface-2 px-3 py-1 text-small text-muted">
                {tag}
              </span>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-label uppercase text-muted">Booking services</h2>
          {rateCards.map((card) => (
            <Card key={card.id} className="flex flex-col gap-1">
              <p className="text-body font-medium text-ink">{card.serviceTitle}</p>
              <p className="font-mono text-body-lg text-ink">{formatMoneyValue(card.basePrice)}</p>
              <p className="text-small text-muted">Delivered in {card.deliveryTimeline}</p>
            </Card>
          ))}
        </section>

        <Button variant="ghost" size="sm" onClick={reset} className="w-fit">
          <RotateCcw size={14} aria-hidden="true" />
          Restart onboarding (demo)
        </Button>
      </div>
    </main>
  );
}
