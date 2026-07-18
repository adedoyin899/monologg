import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useAudienceStore } from '@/app/stores/audience';
import { useAuthStore } from '@/app/stores/auth';
import { Button, Input, toast } from '@/components';
import { AuthLayout } from './AuthLayout';
import { DEMO_CLIENT_EMAIL, DEMO_TALENT_EMAIL, signInUser } from './mockAuthApi';

const schema = z.object({
  email: z.email('That address won’t reach the green room — check it.'),
  password: z.string().min(8, 'Passwords are 8+ characters.'),
});

type FormValues = z.infer<typeof schema>;

/** PWA-01 Sign In. */
export default function SignIn() {
  const navigate = useNavigate();
  const signIn = useAuthStore((state) => state.signIn);
  const setAudience = useAudienceStore((state) => state.setAudience);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    const user = await signInUser(values.email, values.password);
    if (!user) {
      setError('email', {
        message: 'No account under that email — check it, or register instead.',
      });
      return;
    }
    signIn(user);
    setAudience(user.userType === 'talent' ? 'talent' : 'client');
    toast.success('Welcome back', 'The stage missed you.');
    navigate(user.userType === 'talent' ? '/creator' : '/client');
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6" noValidate>
        <div className="flex flex-col gap-2">
          <h1 className="text-h2">Sign in</h1>
          <p className="text-body text-muted">Pick up where the applause left off.</p>
        </div>

        <div className="flex flex-col gap-4">
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
            autoComplete="current-password"
            error={errors.password?.message}
            {...register('password')}
          />
        </div>

        <Button type="submit" loading={isSubmitting}>
          Sign in
        </Button>

        <div className="flex flex-col gap-2 text-body text-muted">
          <Link to="/auth/forgot" className="font-medium text-accent-text underline">
            Forgot password?
          </Link>
          <p>
            New here?{' '}
            <Link to="/auth/register" className="font-medium text-accent-text underline">
              Create an account
            </Link>
          </p>
        </div>

        {/* Demo build helper — remove with the real backend */}
        <p className="rounded-sm bg-surface-2 p-3 font-mono text-small text-muted">
          Demo accounts (any 8+ char password):
          <br />
          {DEMO_TALENT_EMAIL} (talent) · {DEMO_CLIENT_EMAIL} (client)
        </p>
      </form>
    </AuthLayout>
  );
}
