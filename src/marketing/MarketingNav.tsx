import { ArrowRight, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconButton, ThemeToggle } from '@/components';

const NAV_LINKS = [
  { to: '/client', label: 'Find Talent' },
  { to: '/client', label: 'Post a Project' },
  { to: '/how-it-works', label: 'How it Works' },
  { to: '/auth', label: 'Sign In' },
] as const;

function Wordmark() {
  return (
    <Link to="/" className="inline-flex min-h-touch items-center" aria-label="Monologg home">
      <span className="font-heading text-body-lg font-bold text-ink">
        monologg<span className="text-accent-text">/</span>
      </span>
    </Link>
  );
}

function StorefrontCta({ className }: { className?: string }) {
  return (
    <Link
      to="/creator"
      className={`inline-flex min-h-touch items-center gap-1 rounded-btn bg-accent-solid px-4 text-body-lg text-accent-fg transition-colors duration-micro ease-out hover:bg-accent-hover ${className ?? ''}`}
    >
      Launch Your Storefront
      <ArrowRight size={16} aria-hidden="true" />
    </Link>
  );
}

/** Sticky top nav (design doc §7): wordmark · links · storefront CTA. */
export function MarketingNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-divider bg-bg">
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-2"
      >
        <Wordmark />
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="inline-flex min-h-touch items-center rounded-btn px-3 text-body text-muted transition-colors duration-micro ease-out hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
            <StorefrontCta className="ml-2" />
          </div>
          <IconButton
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="md:hidden"
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </IconButton>
        </div>
      </nav>
      {open && (
        <div className="animate-fade-in flex flex-col gap-1 border-t border-divider bg-surface px-4 py-3 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              onClick={() => setOpen(false)}
              className="inline-flex min-h-touch items-center rounded-btn px-2 text-body-lg text-ink hover:bg-surface-2"
            >
              {link.label}
            </Link>
          ))}
          <StorefrontCta className="mt-2 w-fit" />
        </div>
      )}
    </header>
  );
}
