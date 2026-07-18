import { LifeBuoy } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components';
import { AuthLayout } from './AuthLayout';

/** Landing spot after 3 failed OTP attempts — calm, direct, kind. */
export default function AuthSupport() {
  const navigate = useNavigate();

  return (
    <AuthLayout>
      <div className="flex flex-col gap-4">
        <LifeBuoy size={32} aria-hidden="true" className="text-accent" />
        <h1 className="text-h2">Let’s get you unstuck</h1>
        <p className="text-body-lg text-muted">
          That code didn’t want to cooperate. No drama — it happens. A human can sort it
          faster than another retry.
        </p>
        <div className="flex flex-col gap-3">
          <a
            href="mailto:support@monologg.app?subject=Verification%20code%20trouble"
            className="inline-flex h-12 items-center justify-center rounded-btn bg-accent-solid px-6 text-body-lg text-accent-fg transition-colors duration-micro ease-out hover:bg-accent-hover"
          >
            Email support
          </a>
          <Button variant="outline" onClick={() => navigate('/auth/signin')}>
            Back to sign in
          </Button>
          <Link
            to="/faq"
            className="inline-flex min-h-touch items-center font-medium text-accent-text underline"
          >
            Browse the FAQ
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
