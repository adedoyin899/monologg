import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import { useAuthStore } from '@/app/stores/auth';
import { useCreatorStore } from '@/app/stores/creator';
import { Button, Card, Input, Select, Textarea, toast } from '@/components';
import { MARKETS } from '@/config/markets';
import { NICHE_OPTIONS } from '@/creator/nicheMeta';
import type { Creator, Niche } from '@/types';
import { PageShell } from '../PageShell';

const schema = z.object({
  name: z.string().min(2, 'Give us a name for the marquee.'),
  location: z.string().length(2),
  bio: z.string().max(280, 'Keep it under 280 — leave them wanting more.').optional(),
  niche: z.string().optional(),
  orgName: z.string().optional(),
  orgType: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

/** SET-01 — Profile & Bio, fields adapt to the audience. */
export default function ProfileSettings() {
  const { user, userType, updateUser } = useAuthStore();
  const setNiche = useCreatorStore((state) => state.setNiche);
  const isCreator = userType === 'talent';

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: user?.name ?? '',
      location: user?.location ?? 'NG',
      bio: user && 'bio' in user ? (user as Creator).bio : '',
      niche: user && 'niche' in user ? (user as Creator).niche : undefined,
      orgName: user && 'orgName' in user ? (user.orgName ?? '') : '',
      orgType: user && 'orgType' in user ? (user.orgType ?? '') : '',
    },
  });

  if (!user) {
    return (
      <PageShell title="Profile & Bio">
        <Card className="flex flex-col gap-3">
          <p className="text-body text-muted">Sign in to edit your profile.</p>
          <Link to="/auth/signin" className="font-medium text-accent-text underline">
            Sign in
          </Link>
        </Card>
      </PageShell>
    );
  }

  const onSubmit = (values: FormValues) => {
    updateUser({
      name: values.name,
      location: values.location,
      ...(isCreator
        ? { bio: values.bio ?? '', niche: values.niche as Niche }
        : {
            orgName: values.orgName || undefined,
            orgType: (values.orgType || undefined) as
              | 'studio'
              | 'event'
              | 'brand'
              | 'church'
              | undefined,
          }),
    });
    if (isCreator && values.niche) setNiche(values.niche as Niche);
    toast.success('Saved', 'Looking sharp.');
  };

  return (
    <PageShell title="Profile & Bio">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
        <Input label="Name" error={errors.name?.message} {...register('name')} />
        <Select label="Market" helper="Your home market — sets currency defaults." {...register('location')}>
          {MARKETS.map((market) => (
            <option key={market.country} value={market.country}>
              {market.name}
            </option>
          ))}
        </Select>

        {isCreator ? (
          <>
            <Select label="Primary niche" {...register('niche')}>
              {NICHE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
            <Textarea
              label="Bio"
              placeholder="Two lines that sound like you — warm beats formal."
              error={errors.bio?.message}
              {...register('bio')}
            />
          </>
        ) : (
          <>
            <Input label="Organisation" placeholder="e.g. Brightlight Events" {...register('orgName')} />
            <Select label="Organisation type" {...register('orgType')}>
              <option value="">Choose…</option>
              <option value="studio">Production studio</option>
              <option value="event">Event management</option>
              <option value="brand">Brand</option>
              <option value="church">Church</option>
            </Select>
          </>
        )}

        <Button type="submit" loading={isSubmitting}>
          Save changes
        </Button>
      </form>
    </PageShell>
  );
}
