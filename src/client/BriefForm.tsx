import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useAuthStore } from '@/app/stores/auth';
import { useClientStore } from '@/app/stores/client';
import { Button, FileDropzone, Input, MultiSelectChips, Select, Slider, toast } from '@/components';
import { NICHE_OPTIONS } from '@/creator/nicheMeta';
import { formatMoney, toMinorUnits } from '@/lib/money';
import { MARKETS } from '@/config/markets';
import type { Niche } from '@/types';
import { MOCK_CREATORS } from './mockDirectory';

const schema = z.object({
  projectName: z.string().min(3, 'Give the project a name worth casting for.'),
  projectType: z.string().min(1, 'Pick the kind of production.'),
});

type FormValues = z.infer<typeof schema>;

const PROJECT_TYPES = [
  'Film / TV',
  'Commercial',
  'Live event',
  'Corporate',
  'Church service',
  'Podcast / Stream',
] as const;

const NICHE_CHOICES = NICHE_OPTIONS.map((option) => ({
  value: option.value,
  label: option.label,
}));

/** Budget slider ranges in MAJOR units per currency (demo calibration). */
const BUDGET_RANGES: Record<string, { min: number; max: number; step: number }> = {
  NGN: { min: 50_000, max: 5_000_000, step: 50_000 },
  GHS: { min: 1_000, max: 100_000, step: 1_000 },
  INR: { min: 5_000, max: 500_000, step: 5_000 },
  MXN: { min: 2_000, max: 200_000, step: 2_000 },
  KRW: { min: 100_000, max: 10_000_000, step: 100_000 },
  CNY: { min: 500, max: 50_000, step: 500 },
};
const DEFAULT_RANGE = { min: 100, max: 20_000, step: 100 };

const CURRENCIES = [...new Set(MARKETS.map((market) => market.currency))];

/** PWA-09 — client project brief (US-5). */
export default function BriefForm() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const { addBrief, setFilters } = useClientStore();

  const [niches, setNiches] = useState<Niche[]>([]);
  const [nicheError, setNicheError] = useState<string>();
  const [asset, setAsset] = useState<File | null>(null);
  const [currency, setCurrency] = useState('NGN');
  const range = BUDGET_RANGES[currency] ?? DEFAULT_RANGE;
  const [budget, setBudget] = useState(BUDGET_RANGES.NGN?.min ?? DEFAULT_RANGE.min);

  const changeCurrency = (next: string) => {
    setCurrency(next);
    setBudget((BUDGET_RANGES[next] ?? DEFAULT_RANGE).min);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = (values: FormValues) => {
    if (niches.length === 0) {
      setNicheError('Pick at least one — who does this stage need?');
      return;
    }
    addBrief({
      id: crypto.randomUUID(),
      clientId: user?.id ?? 'demo-client',
      projectName: values.projectName,
      projectType: values.projectType,
      nicheRequirements: niches,
      // TODO: PDF scripts need a MediaKind extension; a/v assets map cleanly for now
      assets: asset
        ? [
            {
              id: crypto.randomUUID(),
              kind: asset.type.startsWith('audio/') ? 'audio' : 'video',
              url: URL.createObjectURL(asset),
              sizeBytes: asset.size,
            },
          ]
        : [],
      budget: { amount: toMinorUnits(budget, currency), currency },
      createdAt: new Date().toISOString(),
    });

    // notification stub — the real matching engine + SendGrid/Twilio land with the backend
    const matches = MOCK_CREATORS.filter((entry) => niches.includes(entry.niche)).length;
    toast.success(
      'Brief posted',
      `${matches} matching ${matches === 1 ? 'creator' : 'creators'} notified. Curtain’s up.`,
    );
    setFilters({ niches });
    navigate('/client/directory');
  };

  return (
    <main className="min-h-screen bg-bg px-4 py-8 text-ink">
      <div className="mx-auto flex w-full max-w-md flex-col gap-6">
        <header className="flex flex-col gap-2">
          <h1 className="text-h1">
            Post a project<span className="text-accent-text">.</span>
          </h1>
          <p className="text-body text-muted">
            Say what the stage needs — matching creators are curated and notified.{' '}
            <Link to="/client" className="font-medium text-accent-text underline">
              Back to home
            </Link>
          </p>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
          <Input
            label="Project Name"
            placeholder="e.g. Spring campaign voice"
            error={errors.projectName?.message}
            {...register('projectName')}
          />
          <Select
            label="Project Type"
            error={errors.projectType?.message}
            {...register('projectType')}
          >
            <option value="">Choose a type…</option>
            {PROJECT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Select>

          <MultiSelectChips
            label="Who do you need?"
            options={NICHE_CHOICES}
            value={niches}
            onChange={(next) => {
              setNiches(next as Niche[]);
              setNicheError(undefined);
            }}
            error={nicheError}
          />

          <FileDropzone
            label="Script or reference (optional)"
            accept="application/pdf,video/*,audio/*"
            helper="Script (PDF) or a reference clip · up to 150MB"
            file={asset}
            onChange={setAsset}
          />

          <div className="grid grid-cols-[1fr_120px] items-end gap-3">
            <Slider
              label="Budget"
              min={range.min}
              max={range.max}
              step={range.step}
              value={Math.min(budget, range.max)}
              onChange={setBudget}
              formatValue={(value) => formatMoney(toMinorUnits(value, currency), currency)}
              helper="Gross figure — the fee split shows at checkout."
            />
            <Select
              label="Currency"
              value={currency}
              onChange={(event) => changeCurrency(event.target.value)}
            >
              {CURRENCIES.map((code) => (
                <option key={code} value={code}>
                  {code}
                </option>
              ))}
            </Select>
          </div>

          <Button type="submit" loading={isSubmitting}>
            Post brief &amp; notify talent
          </Button>
        </form>
      </div>
    </main>
  );
}
