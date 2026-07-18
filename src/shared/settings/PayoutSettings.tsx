import { zodResolver } from '@hookform/resolvers/zod';
import { Banknote } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAuthStore } from '@/app/stores/auth';
import { useSettingsStore } from '@/app/stores/settings';
import { Button, Card, Input, Select, toast } from '@/components';
import { MARKETS } from '@/config/markets';
import { PAYMENT_RAILS, type PaymentProvider } from '@/config/paymentRails';
import { regionForCountry } from '@/lib/region';
import { PageShell } from '../PageShell';

const schema = z.object({
  bankName: z.string().min(2, 'Which bank takes the bow?'),
  accountName: z.string().min(2, 'Name on the account.'),
  accountNumber: z.string().regex(/^\d{6,17}$/, 'Account numbers are 6–17 digits.'),
  currency: z.string().length(3),
});

type FormValues = z.infer<typeof schema>;

const RAIL_LABELS: Record<PaymentProvider, string> = {
  paystack: 'Paystack',
  stripe: 'Stripe',
  airwallex: 'Airwallex',
};

const CURRENCIES = [...new Set(MARKETS.map((market) => market.currency))];

/** SET-04 — Payout Settings. Rails come from PAYMENT_RAILS config (TODO(conflict: C4)). */
export default function PayoutSettings() {
  const user = useAuthStore((state) => state.user);
  const { payout, setPayout } = useSettingsStore();

  const region = regionForCountry(user?.location ?? 'NG');
  const rails = PAYMENT_RAILS[region];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: payout ?? { bankName: '', accountName: '', accountNumber: '', currency: 'NGN' },
  });

  const onSubmit = (values: FormValues) => {
    setPayout(values);
    toast.success('Payout details saved', 'Escrow releases land here.');
  };

  return (
    <PageShell title="Payout Settings">
      <Card className="flex items-center gap-3">
        <Banknote size={22} aria-hidden="true" className="shrink-0 text-accent" />
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <p className="text-body font-medium text-ink">Your payout rail</p>
          <p className="text-small text-muted">
            Region-appropriate, picked automatically from your market.
          </p>
        </div>
        <div className="flex flex-wrap gap-1">
          {rails.map((rail) => (
            <span
              key={rail}
              className="rounded-pill border border-divider px-3 py-1 text-small font-medium text-muted"
            >
              {RAIL_LABELS[rail]}
            </span>
          ))}
        </div>
      </Card>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
        <Input label="Bank name" error={errors.bankName?.message} {...register('bankName')} />
        <Input
          label="Account name"
          error={errors.accountName?.message}
          {...register('accountName')}
        />
        <div className="grid grid-cols-[1fr_110px] gap-3">
          <Input
            label="Account number"
            inputMode="numeric"
            className="font-mono"
            error={errors.accountNumber?.message}
            {...register('accountNumber')}
          />
          <Select label="Currency" {...register('currency')}>
            {CURRENCIES.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </Select>
        </div>
        <Button type="submit" loading={isSubmitting}>
          Save payout details
        </Button>
      </form>
    </PageShell>
  );
}
