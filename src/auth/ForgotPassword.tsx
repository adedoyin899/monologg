import { zodResolver } from '@hookform/resolvers/zod';
import { CircleCheck } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import { Button, Input } from '@/components';
import { AuthLayout } from './AuthLayout';
import { emailExists } from './mockAuthApi';

const schema = z.object({
  email: z.email('That address won’t reach the green room — check it.'),
});

type FormValues = z.infer<typeof schema>;

/** PWA-01 Forgot Password — always shows the generic confirmation (no account enumeration). */
export default function ForgotPassword() {
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    await emailExists(values.email); // mock "send" — result deliberately unused
    setSent(true);
  };

  return (
    <AuthLayout>
      {sent ? (
        <div className="animate-fade-in flex flex-col gap-4" role="status">
          <CircleCheck size={32} aria-hidden="true" className="text-success" />
          <h1 className="text-h2">Check your inbox</h1>
          <p className="text-body-lg text-muted">
            If that address is on the roster, a reset link is on its way. It’s valid for one
            hour.
          </p>
          <Link to="/auth/signin" className="font-medium text-accent-text underline">
            Back to sign in
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6" noValidate>
          <div className="flex flex-col gap-2">
            <h1 className="text-h2">Forgot your password?</h1>
            <p className="text-body text-muted">
              Happens to headliners too. Tell us your email and we’ll send a reset link.
            </p>
          </div>
          <Input
            label="Email"
            type="email"
            autoComplete="email"
            placeholder="you@stagename.com"
            error={errors.email?.message}
            {...register('email')}
          />
          <Button type="submit" loading={isSubmitting}>
            Send reset link
          </Button>
        </form>
      )}
    </AuthLayout>
  );
}
