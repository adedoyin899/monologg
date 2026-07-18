import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarDays, Lock, Repeat } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import { useAuthStore } from '@/app/stores/auth';
import { useBookingStore } from '@/app/stores/booking';
import { Avatar, Button, Card, CueDivider, Input, Modal, Select, toast } from '@/components';
import { PLATFORM_FEES } from '@/config/platformFees';
import { PAYMENT_RAILS, type PaymentProvider } from '@/config/paymentRails';
import { NICHE_LABELS } from '@/creator/nicheMeta';
import { computeFees, formatMoneyValue, type FeeBreakdown } from '@/lib/money';
import { regionForCountry } from '@/lib/region';
import { cn } from '@/lib/utils';
import type { Creator, EngagementType, RateCard } from '@/types';
import { creatorById } from './mockDirectory';

/**
 * PWA-11 calendar slot / checkout sheet + PWA-12 payment & escrow overlay.
 * Every figure comes from computeFees(PLATFORM_FEES) — no inline fee literals.
 * TODO(conflict: C2): client fee % unconfirmed. TODO(conflict: C4): rails unconfirmed.
 */

interface Slot {
  date: string;
  start: string;
  end: string;
}

const RECURRENCES = ['weekly', 'biweekly', 'monthly'] as const;

const RAIL_LABELS: Record<PaymentProvider, string> = {
  paystack: 'Paystack',
  stripe: 'Stripe',
  airwallex: 'Airwallex',
};

const clientPctLabel = `${Math.round(PLATFORM_FEES.clientPct * 100)}%`;
const talentPctLabel = `${Math.round(PLATFORM_FEES.talentPct * 100)}%`;

function prettyDate(iso: string): string {
  return new Date(`${iso}T12:00:00`).toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
}

export default function Checkout() {
  const { creatorId, rateCardId } = useParams();
  const entry = creatorId ? creatorById(creatorId) : undefined;
  const card = entry?.rateCards.find((rate) => rate.id === rateCardId);

  const [engagement, setEngagement] = useState<EngagementType>('one_off');
  const [recurrence, setRecurrence] = useState<string>('monthly');
  const [activeDate, setActiveDate] = useState<string | null>(null);
  const [slot, setSlot] = useState<Slot | null>(null);
  const [payOpen, setPayOpen] = useState(false);

  if (!entry || !card) {
    return (
      <main className="flex min-h-screen flex-col items-start justify-center gap-4 bg-bg px-6 text-ink">
        <h1 className="text-h1">That booking missed its cue.</h1>
        <Link to="/client/directory" className="font-medium text-accent-text underline">
          Back to the directory
        </Link>
      </main>
    );
  }

  const fees = computeFees(card.basePrice, PLATFORM_FEES);
  const selectedDate = activeDate ?? entry.availability[0]?.date ?? null;
  const dayBlock = entry.availability.find((block) => block.date === selectedDate);

  return (
    <main className="min-h-screen bg-bg px-4 py-8 text-ink">
      <div className="mx-auto flex w-full max-w-md flex-col gap-6">
        <header className="flex flex-col gap-2">
          <h1 className="text-h1">
            Lock it in<span className="text-accent-text">.</span>
          </h1>
          <p className="text-body text-muted">
            <Link to={`/t/${entry.id}`} className="font-medium text-accent-text underline">
              ← Back to {entry.name}’s storefront
            </Link>
          </p>
        </header>

        {/* What's being booked */}
        <Card className="flex items-center gap-3">
          <Avatar name={entry.name} size="md" verified={entry.verification === 'verified'} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-body font-medium text-ink">{card.serviceTitle}</p>
            <p className="flex items-center text-small text-muted">
              {entry.name}
              <CueDivider />
              {NICHE_LABELS[entry.niche]}
            </p>
          </div>
          <p className="font-mono text-body-lg text-ink">{formatMoneyValue(card.basePrice)}</p>
        </Card>

        {/* One-off vs retainer (§4.4) */}
        <section className="flex flex-col gap-3">
          <h2 className="text-h3">How are you booking?</h2>
          <div role="radiogroup" aria-label="Engagement type" className="grid grid-cols-2 gap-3">
            {(
              [
                {
                  value: 'one_off',
                  icon: CalendarDays,
                  title: 'One-off',
                  copy: 'A single dated booking',
                },
                {
                  value: 'retainer',
                  icon: Repeat,
                  title: 'Retainer',
                  copy: 'Recurring — for ongoing engagements',
                },
              ] as const
            ).map(({ value, icon: TypeIcon, title, copy }) => {
              const selected = engagement === value;
              return (
                <button
                  key={value}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setEngagement(value)}
                  className={cn(
                    'flex min-h-touch flex-col items-start gap-2 rounded-md border-2 bg-surface p-4 text-left transition-colors duration-micro ease-out',
                    selected ? 'border-accent shadow-sm' : 'border-border-control hover:bg-surface-2',
                  )}
                >
                  <TypeIcon size={20} aria-hidden="true" className={selected ? 'text-accent' : 'text-muted'} />
                  <span className="text-body font-medium text-ink">{title}</span>
                  <span className="text-small text-muted">{copy}</span>
                </button>
              );
            })}
          </div>
          {engagement === 'retainer' && (
            <Select
              label="Repeats"
              helper="First session below; escrow renews each cycle."
              value={recurrence}
              onChange={(event) => setRecurrence(event.target.value)}
            >
              {RECURRENCES.map((option) => (
                <option key={option} value={option}>
                  {option[0]?.toUpperCase()}
                  {option.slice(1)}
                </option>
              ))}
            </Select>
          )}
        </section>

        {/* Slot pick from the creator's real availability (US-4) */}
        <section className="flex flex-col gap-3">
          <h2 className="text-h3">{engagement === 'retainer' ? 'First session' : 'Pick a slot'}</h2>
          <div className="flex gap-2 overflow-x-auto pb-2" role="list" aria-label="Available dates">
            {entry.availability.map((block) => {
              const active = block.date === selectedDate;
              return (
                <button
                  key={block.date}
                  type="button"
                  role="listitem"
                  onClick={() => setActiveDate(block.date)}
                  className={cn(
                    'min-h-touch shrink-0 rounded-md border px-3 text-body transition-colors duration-micro ease-out',
                    active
                      ? 'border-accent bg-surface font-medium text-ink'
                      : 'border-divider bg-surface text-muted hover:bg-surface-2',
                  )}
                >
                  {prettyDate(block.date)}
                </button>
              );
            })}
          </div>
          <div className="grid grid-cols-3 gap-2">
            {dayBlock?.slots.map((option) => {
              const selected =
                slot?.date === dayBlock.date && slot.start === option.start && !option.booked;
              return (
                <button
                  key={option.start}
                  type="button"
                  aria-pressed={selected}
                  disabled={option.booked}
                  onClick={() =>
                    setSlot({ date: dayBlock.date, start: option.start, end: option.end })
                  }
                  className={cn(
                    'inline-flex min-h-touch items-center justify-center rounded-btn border font-mono text-body transition-colors duration-micro ease-out',
                    selected
                      ? 'border-transparent bg-accent-solid text-accent-fg'
                      : 'border-border-control bg-surface text-ink hover:bg-surface-2',
                    option.booked && 'border-divider text-muted line-through opacity-60',
                  )}
                >
                  {option.start}
                  {option.booked && <span className="sr-only"> — already booked</span>}
                </button>
              );
            })}
          </div>
        </section>

        {/* Client-side summary — fee from config (TODO(conflict: C2)) */}
        <Card className="flex flex-col gap-2">
          <div className="flex justify-between text-body">
            <span className="text-muted">Base rate</span>
            <span className="font-mono text-ink">{formatMoneyValue(card.basePrice)}</span>
          </div>
          <div className="flex justify-between text-body">
            <span className="text-muted">Monologg client fee ({clientPctLabel})</span>
            <span className="font-mono text-ink">{formatMoneyValue(fees.clientFee)}</span>
          </div>
          <div className="flex justify-between border-t border-divider pt-2 text-body-lg">
            <span className="font-medium text-ink">Held in escrow today</span>
            <span className="font-mono font-medium text-ink">
              {formatMoneyValue(fees.clientTotal)}
            </span>
          </div>
          {slot && (
            <p className="text-small text-muted">
              {prettyDate(slot.date)}, {slot.start}–{slot.end}
              {engagement === 'retainer' && ` · repeats ${recurrence}`}
            </p>
          )}
        </Card>

        <Button disabled={!slot} onClick={() => setPayOpen(true)}>
          Continue to payment
        </Button>
      </div>

      {slot && (
        <PaymentOverlay
          open={payOpen}
          onClose={() => setPayOpen(false)}
          entry={entry}
          card={card}
          fees={fees}
          engagement={engagement}
          recurrence={recurrence}
          slot={slot}
        />
      )}
    </main>
  );
}

/* ---------------- PWA-12 — payment gateway + escrow deposit overlay ---------------- */

const cardSchema = z.object({
  cardNumber: z
    .string()
    .transform((value) => value.replace(/\s/g, ''))
    .pipe(z.string().regex(/^\d{12,19}$/, 'That card number is short of a full performance.')),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Use MM/YY.'),
  cvc: z.string().regex(/^\d{3,4}$/, '3–4 digits.'),
});

const bankSchema = z.object({
  routingNumber: z.string().regex(/^\d{6,12}$/, 'Routing numbers are 6–12 digits.'),
  accountNumber: z.string().regex(/^\d{6,17}$/, 'Account numbers are 6–17 digits.'),
});

function PaymentOverlay({
  open,
  onClose,
  entry,
  card,
  fees,
  engagement,
  recurrence,
  slot,
}: {
  open: boolean;
  onClose: () => void;
  entry: Creator;
  card: RateCard;
  fees: FeeBreakdown;
  engagement: EngagementType;
  recurrence: string;
  slot: Slot;
}) {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const addBooking = useBookingStore((state) => state.addBooking);

  // region-aware rail from config — TODO(conflict: C4); never a hardcoded provider
  const region = regionForCountry(user?.location ?? 'NG');
  const rails = PAYMENT_RAILS[region];
  const [rail, setRail] = useState<PaymentProvider>(rails[0] ?? 'paystack');
  const [method, setMethod] = useState<'card' | 'bank'>('card');
  const [paying, setPaying] = useState(false);

  const pay = async () => {
    setPaying(true);
    await new Promise((resolve) => setTimeout(resolve, 900)); // mock gateway roundtrip
    const bookingId = crypto.randomUUID();
    const code = bookingId.replace(/-/g, '');
    addBooking({
      id: bookingId,
      creatorId: entry.id,
      clientId: user?.id ?? 'demo-client',
      rateCardId: card.id,
      engagementType: engagement,
      slot,
      recurrence: engagement === 'retainer' ? recurrence : undefined,
      base: card.basePrice,
      fees: { talentFee: fees.talentFee, clientFee: fees.clientFee },
      state: 'escrow_locked',
      meetUrl: `https://meet.google.com/${code.slice(0, 3)}-${code.slice(3, 7)}-${code.slice(7, 10)}`,
      createdAt: new Date().toISOString(),
    });
    toast.success('Escrow secured', 'Show confirmed. You’re on.');
    navigate(`/order/${bookingId}`);
  };

  return (
    <Modal open={open} onClose={onClose} title="Payment & escrow">
      <div className="flex flex-col gap-4">
        {/* Rail — from PAYMENT_RAILS config */}
        <div className="flex flex-col gap-2">
          <p className="text-label uppercase text-muted">Paying via</p>
          <div role="radiogroup" aria-label="Payment provider" className="flex flex-wrap gap-2">
            {rails.map((provider) => (
              <button
                key={provider}
                type="button"
                role="radio"
                aria-checked={rail === provider}
                onClick={() => setRail(provider)}
                className={cn(
                  'inline-flex min-h-touch items-center rounded-pill border px-4 text-body font-medium transition-colors duration-micro ease-out',
                  rail === provider
                    ? 'border-transparent bg-accent-solid text-accent-fg'
                    : 'border-border-control bg-surface text-ink hover:bg-surface-2',
                )}
              >
                {RAIL_LABELS[provider]}
              </button>
            ))}
          </div>
          <p className="text-small text-muted">Region-appropriate rails, picked automatically.</p>
        </div>

        {/* Method */}
        <div role="radiogroup" aria-label="Payment method" className="flex gap-2">
          {(['card', 'bank'] as const).map((option) => (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={method === option}
              onClick={() => setMethod(option)}
              className={cn(
                'inline-flex min-h-touch flex-1 items-center justify-center rounded-btn border text-body font-medium transition-colors duration-micro ease-out',
                method === option
                  ? 'border-accent text-accent-text'
                  : 'border-border-control text-muted hover:text-ink',
              )}
            >
              {option === 'card' ? 'Card' : 'Bank transfer'}
            </button>
          ))}
        </div>

        {method === 'card' ? (
          <CardForm paying={paying} onValid={pay} total={formatMoneyValue(fees.clientTotal)} />
        ) : (
          <BankForm paying={paying} onValid={pay} total={formatMoneyValue(fees.clientTotal)} />
        )}

        {/* Full escrow-hold breakdown, BOTH sides — all from computeFees (C1/C2) */}
        <div className="flex flex-col gap-2 rounded-md bg-surface-2 p-4">
          <div className="flex justify-between text-body">
            <span className="text-muted">Base rate</span>
            <span className="font-mono text-ink">{formatMoneyValue(card.basePrice)}</span>
          </div>
          <div className="flex justify-between text-body">
            <span className="text-muted">You pay today (+{clientPctLabel} client fee)</span>
            <span className="font-mono text-ink">{formatMoneyValue(fees.clientTotal)}</span>
          </div>
          <div className="flex justify-between text-body">
            <span className="text-muted">
              {entry.name} receives on delivery (−{talentPctLabel} talent fee)
            </span>
            <span className="font-mono text-ink">{formatMoneyValue(fees.talentNet)}</span>
          </div>
        </div>

        <p className="flex items-start gap-2 text-small text-muted">
          <Lock size={14} aria-hidden="true" className="mt-0.5 shrink-0 text-success" />
          Your money waits in the wings — held in escrow by our licensed payment partner and
          released to {entry.name} only when the deliverables are confirmed. Neither of you
          has to chase anyone.
        </p>
      </div>
    </Modal>
  );
}

function CardForm({
  paying,
  onValid,
  total,
}: {
  paying: boolean;
  onValid: () => void;
  total: string;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.input<typeof cardSchema>>({ resolver: zodResolver(cardSchema) });

  return (
    <form onSubmit={handleSubmit(onValid)} className="flex flex-col gap-3" noValidate>
      <Input
        label="Card number"
        inputMode="numeric"
        autoComplete="cc-number"
        placeholder="4242 4242 4242 4242"
        className="font-mono"
        error={errors.cardNumber?.message}
        {...register('cardNumber')}
      />
      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Expiry"
          inputMode="numeric"
          autoComplete="cc-exp"
          placeholder="MM/YY"
          className="font-mono"
          error={errors.expiry?.message}
          {...register('expiry')}
        />
        <Input
          label="CVC"
          inputMode="numeric"
          autoComplete="cc-csc"
          placeholder="123"
          className="font-mono"
          error={errors.cvc?.message}
          {...register('cvc')}
        />
      </div>
      <Button type="submit" loading={paying}>
        Lock {total} in escrow
      </Button>
    </form>
  );
}

function BankForm({
  paying,
  onValid,
  total,
}: {
  paying: boolean;
  onValid: () => void;
  total: string;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof bankSchema>>({ resolver: zodResolver(bankSchema) });

  return (
    <form onSubmit={handleSubmit(onValid)} className="flex flex-col gap-3" noValidate>
      <Input
        label="Bank routing number"
        inputMode="numeric"
        placeholder="044000000"
        className="font-mono"
        error={errors.routingNumber?.message}
        {...register('routingNumber')}
      />
      <Input
        label="Account number"
        inputMode="numeric"
        placeholder="0123456789"
        className="font-mono"
        error={errors.accountNumber?.message}
        {...register('accountNumber')}
      />
      <Button type="submit" loading={paying}>
        Lock {total} in escrow
      </Button>
    </form>
  );
}
