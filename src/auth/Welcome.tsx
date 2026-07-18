import { useNavigate } from 'react-router-dom';
import { Button, Lettermark } from '@/components';
import { AuthLayout } from './AuthLayout';

/** PWA-01 Welcome/Splash. */
export default function Welcome() {
  const navigate = useNavigate();

  return (
    <AuthLayout back={false}>
      <div className="flex flex-col items-start gap-6">
        <Lettermark size="lg" tile />
        <div className="flex flex-col gap-2">
          <h1 className="text-h1">
            The stage is yours<span className="text-accent-text">.</span>
          </h1>
          <p className="text-body-lg text-muted">
            Set up a storefront that books itself, or cast your next show before lunch —
            either way, the boring parts are handled.
          </p>
        </div>
        <div className="flex w-full flex-col gap-3">
          <Button onClick={() => navigate('/auth/register')}>Create your account</Button>
          <Button variant="outline" onClick={() => navigate('/auth/signin')}>
            Sign in
          </Button>
        </div>
      </div>
    </AuthLayout>
  );
}
