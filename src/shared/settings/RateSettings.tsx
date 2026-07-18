import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useCreatorStore } from '@/app/stores/creator';
import { Button, Card, IconButton, Input, Select, toast } from '@/components';
import { MARKETS } from '@/config/markets';
import { formatMoneyValue, toMinorUnits } from '@/lib/money';
import { PageShell } from '../PageShell';

// same rules as onboarding PWA-06 — "Booking Service Title", never "Cast Role Title"
const schema = z.object({
  serviceTitle: z.string().min(3, 'Name the service — e.g. “Wedding MC — full day”.'),
  basePrice: z.number('Set a price worth the performance.').positive('Set a price worth the performance.'),
  currency: z.string().length(3),
  deliveryTimeline: z.string().min(2, 'How fast do you deliver? e.g. “3 days”.'),
});

type FormValues = z.infer<typeof schema>;

const CURRENCIES = [...new Set(MARKETS.map((market) => market.currency))];

/** SET-02 — Rate Card Management (same fields as onboarding, always editable). */
export default function RateSettings() {
  const { rateCards, upsertRateCard, removeRateCard } = useCreatorStore();

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
    toast.success('Card added', 'Live on your storefront now.');
  };

  return (
    <PageShell title="Rate Cards">
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
            error={errors.basePrice?.message}
            {...register('basePrice', { valueAsNumber: true })}
          />
          <Select label="Currency" {...register('currency')}>
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

      <section className="flex flex-col gap-3" aria-label="Your rate cards">
        {rateCards.length === 0 ? (
          <Card className="border border-dashed border-border-control bg-surface-2 shadow-none">
            <p className="text-body text-muted">No services yet — add your first above.</p>
          </Card>
        ) : (
          rateCards.map((card) => (
            <Card key={card.id} className="flex items-start justify-between gap-2">
              <div className="flex flex-col gap-1">
                <p className="text-body font-medium text-ink">{card.serviceTitle}</p>
                <p className="font-mono text-body-lg text-ink">{formatMoneyValue(card.basePrice)}</p>
                <p className="text-small text-muted">Delivered in {card.deliveryTimeline}</p>
              </div>
              <IconButton
                aria-label={`Remove ${card.serviceTitle}`}
                onClick={() => removeRateCard(card.id)}
              >
                <X size={16} aria-hidden="true" />
              </IconButton>
            </Card>
          ))
        )}
      </section>
    </PageShell>
  );
}
