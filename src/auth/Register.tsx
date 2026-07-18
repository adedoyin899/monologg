import { zodResolver } from '@hookform/resolvers/zod';
import { Clapperboard, Drama } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useAudienceStore } from '@/app/stores/audience';
import { useAuthStore } from '@/app/stores/auth';
import { Button, Input } from '@/components';
import { cn } from '@/lib/utils';
import type { UserType } from '@/types';
import { AuthLayout } from './AuthLayout';
import { emailExists } from './mockAuthApi';

const schema = z.object({
  name: z.string().min(2, 'Give us a name for the marquee.'),
  email: z.email('That address won’t reach the green room — check it.'),
  password: z.string().min(8, 'At least 8 characters — make it a strong performance.'),
});

type FormValues = z.infer<typeof schema>;

const USER_TYPES: ReadonlyArray<{
  value: UserType;
  icon: typeof Drama;
  title: string;
  copy: string;
}> = [
  { value: 'talent', icon: Drama, title: 'I am Talent', copy: 'Perform. Get booked. Get paid.' },
  {
    value: 'client',
    icon: Clapperboard,
    title: 'I’m looking to Hire',
    copy: 'Post briefs. Book verified talent.',
  },
];

/** PWA-01 Register — audience choice up front binds data-audience for the session. */
export default function Register() {
  const navigate = useNavigate();
  const setAudience = useAudienceStore((state) => state.setAudience);
  const startRegistration = useAuthStore((state) => state.startRegistration);

  const [userType, setUserType] = useState<UserType>('talent');

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const chooseType = (value: UserType) => {
    setUserType(value);
    // the audience picked here re-binds --accent for the rest of the session
    setAudience(value);
  };

  const onSubmit = async (values: FormValues) => {
    if (await emailExists(values.email)) {
      setError('email', {
        message: 'That email’s already on the roster — sign in instead.',
      });
      return;
    }
    startRegistration({ name: values.name, email: values.email, userType });
    navigate('/auth/otp');
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6" noValidate>
        <div className="flex flex-col gap-2">
          <h1 className="text-h2">Create your account</h1>
          <p className="text-body text-muted">First things first — which side of the stage?</p>
        </div>

        <div role="radiogroup" aria-label="Account type" className="grid grid-cols-2 gap-3">
          {USER_TYPES.map(({ value, icon: TypeIcon, title, copy }) => {
            const selected = userType === value;
            return (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => chooseType(value)}
                className={cn(
                  'flex min-h-touch flex-col items-start gap-2 rounded-md border-2 bg-surface p-4 text-left transition-colors duration-micro ease-out',
                  selected
                    ? 'border-accent shadow-sm'
                    : 'border-border-control hover:bg-surface-2',
                )}
              >
                <TypeIcon
                  size={22}
                  aria-hidden="true"
                  className={selected ? 'text-accent' : 'text-muted'}
                />
                <span className="text-body-lg font-medium text-ink">{title}</span>
                <span className="text-small text-muted">{copy}</span>
              </button>
            );
          })}
        </div>

        <div className="flex flex-col gap-4">
          <Input
            label="Name"
            autoComplete="name"
            placeholder={userType === 'talent' ? 'Your stage name works too' : 'Your full name'}
            error={errors.name?.message}
            {...register('name')}
          />
          <Input
            label="Email"
            type="email"
            autoComplete="email"
            placeholder="you@stagename.com"
            error={errors.email?.message}
            {...register('email')}
          />
          <Input
            label="Password"
            type="password"
            autoComplete="new-password"
            helper="8+ characters."
            error={errors.password?.message}
            {...register('password')}
          />
        </div>

        <Button type="submit" loading={isSubmitting}>
          Continue
        </Button>
        <p className="text-body text-muted">
          Already on the roster?{' '}
          <Link to="/auth/signin" className="font-medium text-accent-text underline">
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
