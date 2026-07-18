import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAudienceStore } from '@/app/stores/audience';
import { useAuthStore } from '@/app/stores/auth';
import { Button, Input, toast } from '@/components';
import { AuthLayout } from './AuthLayout';
import { OTP_DEMO_CODE, OTP_MAX_ATTEMPTS, registerUser } from './mockAuthApi';

/** PWA-01 OTP verify — 3 wrong entries route to support. */
export default function OtpVerify() {
  const navigate = useNavigate();
  const { pendingEmail, pendingRegistration, signIn } = useAuthStore();
  const setAudience = useAudienceStore((state) => state.setAudience);

  const [code, setCode] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [error, setError] = useState<string>();
  const [verifying, setVerifying] = useState(false);

  // no pending flow → nothing to verify; back to the start
  useEffect(() => {
    if (!pendingEmail) navigate('/auth/register', { replace: true });
  }, [pendingEmail, navigate]);

  if (!pendingEmail) return null;

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!/^\d{6}$/.test(code)) {
      setError('The code is 6 digits — check your inbox.');
      return;
    }
    if (code !== OTP_DEMO_CODE) {
      const used = attempts + 1;
      if (used >= OTP_MAX_ATTEMPTS) {
        navigate('/auth/support', { replace: true });
        return;
      }
      setAttempts(used);
      const left = OTP_MAX_ATTEMPTS - used;
      setError(`That’s not the cue — ${left} ${left === 1 ? 'try' : 'tries'} left.`);
      return;
    }

    if (!pendingRegistration) {
      navigate('/auth/register', { replace: true });
      return;
    }
    setVerifying(true);
    const user = await registerUser(pendingRegistration);
    signIn(user);
    setAudience(user.userType === 'talent' ? 'talent' : 'client');
    toast.success('You’re on', 'Welcome to the roster.');
    // creator → niche selection (PWA-02); client → client home
    navigate(user.userType === 'talent' ? '/creator' : '/client', { replace: true });
  };

  return (
    <AuthLayout>
      <form onSubmit={submit} className="flex flex-col gap-6" noValidate>
        <div className="flex flex-col gap-2">
          <h1 className="text-h2">Check your email</h1>
          <p className="text-body text-muted">
            We sent a 6-digit code to <span className="font-medium text-ink">{pendingEmail}</span>.
          </p>
        </div>

        <Input
          label="6-digit code"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={6}
          placeholder="••••••"
          value={code}
          onChange={(event) => {
            setCode(event.target.value.replace(/\D/g, ''));
            setError(undefined);
          }}
          error={error}
          className="font-mono"
        />

        <Button type="submit" loading={verifying}>
          Verify
        </Button>

        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              toast.info('Code resent', 'Give your inbox a moment — then take two.')
            }
          >
            Resend code
          </Button>
          <span className="text-small text-muted" aria-live="polite">
            {attempts > 0 && `${OTP_MAX_ATTEMPTS - attempts} of ${OTP_MAX_ATTEMPTS} tries left`}
          </span>
        </div>

        {/* Demo build helper — remove with the real backend */}
        <p className="rounded-sm bg-surface-2 p-3 font-mono text-small text-muted">
          Demo build: the code is {OTP_DEMO_CODE}.
        </p>
      </form>
    </AuthLayout>
  );
}
