import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useCreatorStore } from '@/app/stores/creator';
import { Button, Card, IconButton, Input, Select } from '@/components';
import { MARKETS } from '@/config/markets';
import { formatMoneyValue, toMinorUnits } from '@/lib/money';
import { OnboardingShell } from './OnboardingShell';

// "Add Booking Service Title" — niche-agnostic, never "Cast Role Title"
const schema = z.object({
  serviceTitle: z.string().min(3, 'Name the service — e.g. “Wedding MC — full day”.'),
  basePrice: z.number('Set a price worth the performance.').positive('Set a price worth the performance.'),
  currency: z.string().length(3),
  deliveryTimeline: z.string().min(2, 'How fast do you deliver? e.g. “3 days”, “1 session”.'),
});

type FormValues = z.infer<typeof schema>;

const CURRENCIES = [...new Set(MARKETS.map((market) => market.currency))];

/** PWA-06 rate cards — modular services with a live storefront preview (US-3). */
export default function StepRates() {
  const { rateCards, upsertRateCard, removeRateCard, goToStep } = useCreatorStore();

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { currency: 'NGN' },
  });

  const addCard = (values: FormValues) => {
    upsertRateCard({
      id: crypto.randomUUID(),
      serviceTitle: values.serviceTitle,
      basePrice: {
        amount: toMinorUnits(values.basePrice, values.currency),
        currency: values.currency,
      },
      deliveryTimeline: values.deliveryTimeline,
    });
    reset({ serviceTitle: '', basePrice: undefined, currency: getValues('currency'), deliveryTimeline: '' });
  };

  return (
    <OnboardingShell stepIndex={3} label="Your rates" onBack={() => goToStep('tags')}>
      <div className="flex flex-col gap-2">
        <h1 className="text-h2">Set your rates.</h1>
        <p className="text-body text-muted">
          Each service becomes a bookable card on your storefront — link-in-bio energy,
          escrow-backed.
        </p>
      </div>

      <form onSubmit={handleSubmit(addCard)} className="flex flex-col gap-4" noValidate>
        <Input
          label="Booking Service Title"
          placeholder="e.g. 30-second commercial VO"
          error={errors.serviceTitle?.message}
          {...register('serviceTitle')}
        />
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Base Price"
            type="number"
            inputMode="decimal"
            min="0"
            step="0.01"
            placeholder="450000"
            error={errors.basePrice?.message}
            {...register('basePrice', { valueAsNumber: true })}
          />
          <Select label="Currency" error={errors.currency?.message} {...register('currency')}>
            {CURRENCIES.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </Select>
        </div>
        <Input
          label="Delivery Timeline"
          placeholder="e.g. 3 days, 1 session"
          error={errors.deliveryTimeline?.message}
          {...register('deliveryTimeline')}
        />
        <Button type="submit" variant="outline" size="md">
          <Plus size={16} aria-hidden="true" />
          Add Booking Service Title
        </Button>
      </form>

      <div className="flex flex-col gap-3">
        <p className="text-label uppercase text-muted">Storefront preview</p>
        {rateCards.length === 0 ? (
          <Card className="border border-dashed border-border-control bg-surface-2 shadow-none">
            <p className="text-body text-muted">
              Your first card appears here — clean, stacked, one clear “Book”.
            </p>
          </Card>
        ) : (
          <ul className="flex flex-col gap-3">
            {rateCards.map((card) => (
              <li key={card.id}>
                <Card className="flex flex-col gap-2">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-body font-medium text-ink">{card.serviceTitle}</p>
                    <IconButton
                      aria-label={`Remove ${card.serviceTitle}`}
                      onClick={() => removeRateCard(card.id)}
                      className="-mr-2 -mt-2"
                    >
                      <X size={16} aria-hidden="true" />
                    </IconButton>
                  </div>
                  <p className="font-mono text-body-lg text-ink">
                    {formatMoneyValue(card.basePrice)}
                  </p>
                  <p className="text-small text-muted">Delivered in {card.deliveryTimeline}</p>
                  <Button size="md" disabled aria-hidden="true" tabIndex={-1}>
                    Book
                  </Button>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Button
        disabled={rateCards.length === 0}
        onClick={() => goToStep('availability')}
        className="mt-auto"
      >
        Continue
      </Button>
    </OnboardingShell>
  );
}
