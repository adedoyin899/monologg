import { ChevronLeft } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IconButton, ThemeToggle } from '@/components';

/**
 * Auth/onboarding shell (PRD §5.1): no bottom nav, back chevron only,
 * wordmark centered, single-column card width.
 */
export function AuthLayout({ children, back = true }: { children: ReactNode; back?: boolean }) {
  const navigate = useNavigate();

  return (
    <main className="flex min-h-screen flex-col bg-bg text-ink">
      <header className="mx-auto flex w-full max-w-md items-center justify-between p-4">
        {back ? (
          <IconButton aria-label="Go back" onClick={() => navigate(-1)}>
            <ChevronLeft size={20} aria-hidden="true" />
          </IconButton>
        ) : (
          <span className="w-11" aria-hidden="true" />
        )}
        <Link to="/" className="inline-flex min-h-touch items-center" aria-label="Monologg home">
          <span className="font-heading text-body-lg font-bold text-ink">
            monologg<span className="text-accent-text">/</span>
          </span>
        </Link>
        <ThemeToggle />
      </header>
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center gap-6 px-4 pb-16">
        {children}
      </div>
    </main>
  );
}
