import { Link } from 'react-router-dom';
import { CueDivider, Lettermark } from '@/components';

const PRODUCT_LINKS = [
  { to: '/client', label: 'Find Talent' },
  { to: '/client', label: 'Post a Project' },
  { to: '/how-it-works', label: 'How it Works' },
  { to: '/blog', label: 'Blog' },
] as const;

const SUPPORT_LINKS = [
  // FAQ / knowledge base — same content source as in-app Help (SYS-05)
  { to: '/faq', label: 'FAQ / Knowledge base' },
  { to: '/how-it-works', label: 'Explainer videos' },
  { to: '/help', label: 'Support' },
] as const;

/** Socials per the design doc §7 — URLs are placeholders until handles exist. */
const SOCIAL_LINKS = [
  { href: 'https://instagram.com/monologg', label: 'Instagram' },
  { href: 'https://tiktok.com/@monologg', label: 'TikTok' },
  { href: 'https://linkedin.com/company/monologg', label: 'LinkedIn' },
  { href: 'https://chat.whatsapp.com/monologg', label: 'Community' },
] as const;

export function MarketingFooter() {
  return (
    <footer className="border-t border-divider bg-surface">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-3">
          <div className="flex flex-col gap-3">
            <Lettermark size="sm" tile />
            <p className="text-body text-muted">
              The brief-to-booking pipeline for the performing arts. Book the room. Get
              paid on time.
            </p>
          </div>
          <nav aria-label="Product" className="flex flex-col gap-1">
            <p className="text-label uppercase text-muted">Product</p>
            {PRODUCT_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="inline-flex min-h-touch items-center text-body text-muted hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <nav aria-label="Support" className="flex flex-col gap-1">
            <p className="text-label uppercase text-muted">Support</p>
            {SUPPORT_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="inline-flex min-h-touch items-center text-body text-muted hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-wrap items-center gap-2 border-t border-divider pt-6">
          {SOCIAL_LINKS.map((social, index) => (
            <span key={social.label} className="flex items-center">
              {index > 0 && <CueDivider />}
              <a
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-touch items-center text-body text-muted hover:text-ink"
              >
                {social.label}
              </a>
            </span>
          ))}
          <span className="ml-auto text-small text-muted">
            © {new Date().getFullYear()} monologg/ — community · creativity · integrity
          </span>
        </div>
      </div>
    </footer>
  );
}
