import { Check, RefreshCw, Video } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCreatorStore, type DayHours } from '@/app/stores/creator';
import { Badge, Button, Card, Modal, toast, Toggle } from '@/components';
import { cn } from '@/lib/utils';

/**
 * PWA-08 — Calendly-style scheduling dashboard (US-4): weekly operating hours,
 * tap a day to open time slots in a drawer, Google Meet sync status.
 */

const DAY_LABELS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const WEEK_ORDER = [1, 2, 3, 4, 5, 6, 0]; // Monday-first
const DAYS_AHEAD = 14;

function toIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function upcomingDates(): Date[] {
  return Array.from({ length: DAYS_AHEAD }, (_, offset) => {
    const date = new Date();
    date.setHours(12, 0, 0, 0);
    date.setDate(date.getDate() + offset);
    return date;
  });
}

/** Hourly slot starts between the day's operating hours, e.g. 09:00 … 16:00. */
function slotStarts(hours: DayHours): string[] {
  const startHour = Number(hours.start.slice(0, 2));
  const endHour = Number(hours.end.slice(0, 2));
  return Array.from({ length: Math.max(0, endHour - startHour) }, (_, index) =>
    `${String(startHour + index).padStart(2, '0')}:00`,
  );
}

function endOf(start: string): string {
  return `${String(Number(start.slice(0, 2)) + 1).padStart(2, '0')}:00`;
}

export default function Scheduling() {
  const { operatingHours, setDayHours, availability, setAvailability } = useCreatorStore();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const blockFor = (iso: string) => availability.find((block) => block.date === iso);

  const slotOpen = (iso: string, start: string) =>
    blockFor(iso)?.slots.some((slot) => slot.start === start) ?? false;

  const toggleSlot = (iso: string, start: string) => {
    const block = blockFor(iso);
    const rest = availability.filter((b) => b.date !== iso);
    const slots = block?.slots.some((slot) => slot.start === start)
      ? (block?.slots ?? []).filter((slot) => slot.start !== start)
      : [...(block?.slots ?? []), { start, end: endOf(start), booked: false }];
    setAvailability(
      slots.length > 0
        ? [...rest, { date: iso, slots: slots.sort((a, b) => a.start.localeCompare(b.start)) }]
        : rest,
    );
  };

  const openCount = availability.reduce((sum, block) => sum + block.slots.length, 0);
  const selectedIso = selectedDate ? toIsoDate(selectedDate) : null;
  const selectedHours = selectedDate ? operatingHours[selectedDate.getDay()] : undefined;

  return (
    <main className="min-h-screen bg-bg px-4 py-8 text-ink">
      <div className="mx-auto flex w-full max-w-md flex-col gap-6">
        <header className="flex flex-col gap-2">
          <h1 className="text-h1">
            Your hours<span className="text-accent-text">.</span>
          </h1>
          <p className="text-body text-muted">
            Set when you work, open the slots you’ll take, and clients book straight in.{' '}
            <Link to="/creator" className="font-medium text-accent-text underline">
              Back to dashboard
            </Link>
          </p>
        </header>

        {/* Google Meet sync (US-4) */}
        <Card className="flex items-center gap-3">
          <Video size={22} aria-hidden="true" className="shrink-0 text-accent" />
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <div className="flex items-center gap-2">
              <p className="text-body font-medium text-ink">Google Meet</p>
              <Badge variant="paid">Synced</Badge>
            </div>
            <p className="text-small text-muted">
              Open slots mirror your calendar; every booking gets a Meet link.
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toast.success('Google Meet', 'Calendar re-synced. All slots current.')}
          >
            <RefreshCw size={14} aria-hidden="true" />
            Sync
          </Button>
        </Card>

        {/* Weekly operating hours */}
        <section aria-labelledby="hours-title" className="flex flex-col gap-3">
          <h2 id="hours-title" className="text-h3">
            Weekly hours
          </h2>
          <Card className="flex flex-col divide-y divide-divider p-0">
            {WEEK_ORDER.map((day) => {
              const hours = operatingHours[day] ?? { open: false, start: '09:00', end: '17:00' };
              const label = DAY_LABELS[day] ?? '';
              return (
                <div key={day} className="flex flex-wrap items-center gap-3 p-4">
                  <Toggle
                    label={label}
                    checked={hours.open}
                    onChange={(open) => setDayHours(day, { ...hours, open })}
                    className="min-w-40"
                  />
                  {hours.open ? (
                    <div className="ml-auto flex items-center gap-2">
                      <input
                        type="time"
                        aria-label={`${label} start time`}
                        value={hours.start}
                        onChange={(event) =>
                          setDayHours(day, { ...hours, start: event.target.value })
                        }
                        className="min-h-touch rounded-sm border border-border-control bg-surface px-2 font-mono text-body text-ink"
                      />
                      <span className="text-muted" aria-hidden="true">
                        –
                      </span>
                      <input
                        type="time"
                        aria-label={`${label} end time`}
                        value={hours.end}
                        onChange={(event) =>
                          setDayHours(day, { ...hours, end: event.target.value })
                        }
                        className="min-h-touch rounded-sm border border-border-control bg-surface px-2 font-mono text-body text-ink"
                      />
                    </div>
                  ) : (
                    <span className="ml-auto text-small text-muted">Dark night</span>
                  )}
                </div>
              );
            })}
          </Card>
        </section>

        {/* Next 14 days — tap to open slots */}
        <section aria-labelledby="dates-title" className="flex flex-col gap-3">
          <div className="flex items-baseline justify-between">
            <h2 id="dates-title" className="text-h3">
              Open your slots
            </h2>
            <span className="font-mono text-small text-muted">{openCount} open</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2" role="list" aria-label="Next 14 days">
            {upcomingDates().map((date) => {
              const iso = toIsoDate(date);
              const hasSlots = (blockFor(iso)?.slots.length ?? 0) > 0;
              const closed = !(operatingHours[date.getDay()]?.open ?? false);
              return (
                <button
                  key={iso}
                  type="button"
                  role="listitem"
                  onClick={() => setSelectedDate(date)}
                  className={cn(
                    'flex min-h-touch min-w-16 shrink-0 flex-col items-center gap-1 rounded-md border bg-surface p-2 transition-colors duration-micro ease-out hover:bg-surface-2',
                    hasSlots ? 'border-accent' : 'border-divider',
                    closed && 'opacity-60',
                  )}
                >
                  <span className="text-small text-muted">
                    {date.toLocaleDateString('en-GB', { weekday: 'short' })}
                  </span>
                  <span className="font-mono text-body-lg text-ink">{date.getDate()}</span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      'h-1.5 w-1.5 rounded-pill',
                      hasSlots ? 'bg-accent' : 'bg-transparent',
                    )}
                  />
                  <span className="sr-only">
                    {hasSlots ? `${blockFor(iso)?.slots.length} slots open` : 'no slots open'}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Slot drawer — bottom sheet on mobile, dialog on desktop */}
        <Modal
          open={selectedDate !== null}
          onClose={() => setSelectedDate(null)}
          title={
            selectedDate?.toLocaleDateString('en-GB', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
            }) ?? ''
          }
          footer={
            <Button size="md" onClick={() => setSelectedDate(null)}>
              Done
            </Button>
          }
        >
          {selectedIso && selectedHours?.open ? (
            <div className="flex flex-col gap-3">
              <p className="text-small text-muted">
                Tap the hours you’ll take bookings. Open slots sync to Google Meet.
              </p>
              <div className="grid grid-cols-2 gap-2">
                {slotStarts(selectedHours).map((start) => {
                  const open = slotOpen(selectedIso, start);
                  return (
                    <button
                      key={start}
                      type="button"
                      aria-pressed={open}
                      onClick={() => toggleSlot(selectedIso, start)}
                      className={cn(
                        'inline-flex min-h-touch items-center justify-center gap-1 rounded-btn border font-mono text-body transition-colors duration-micro ease-out',
                        open
                          ? 'border-transparent bg-accent-solid text-accent-fg'
                          : 'border-border-control bg-surface text-ink hover:bg-surface-2',
                      )}
                    >
                      {open && <Check size={14} aria-hidden="true" />}
                      {start} – {endOf(start)}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <p className="text-body text-muted">
              This day is dark — switch it on under Weekly hours to open slots.
            </p>
          )}
        </Modal>
      </div>
    </main>
  );
}
