import { Badge } from '@/components';
import { PageShell } from './PageShell';

/** SYS-04 — Terms & Privacy. Placeholder copy pending counsel review. */

const SECTIONS = [
  {
    title: 'Terms of Service',
    body: [
      'Monologg connects performing creators with the clients who book them. Accounts must belong to real people or organisations; one person, one identity.',
      'Bookings are agreements between the creator and the client. Monologg provides the pipeline — discovery, scheduling, escrow, and the order room — and charges a percentage fee on successful bookings only, always shown before payment.',
      'Misrepresenting identity, work, or badges is grounds for removal from the roster.',
    ],
  },
  {
    title: 'Escrow & Payments',
    body: [
      'Client funds are held by our licensed regional payment partners — never by Monologg directly — from checkout until deliverables are confirmed.',
      'Payouts follow the region-appropriate rail for your market. Fee percentages are displayed at checkout for both sides of every booking.',
      'Disputes pause release; our support team mediates with both parties in the order room.',
    ],
  },
  {
    title: 'Privacy',
    body: [
      'We collect what the product needs: your profile, your media, your bookings. Identity documents used for KYC verification go to our verification partner and are not stored on Monologg servers.',
      'Style tags are generated from your uploaded media and describe the work, not the person. You can edit or remove them at any time.',
      'We never sell personal data. Analytics are aggregate and anonymised.',
    ],
  },
] as const;

export default function Terms() {
  return (
    <PageShell title="Terms & Privacy">
      <Badge variant="info">Placeholder — counsel review before launch</Badge>
      {SECTIONS.map((section) => (
        <section key={section.title} className="flex flex-col gap-2">
          <h2 className="text-h3">{section.title}</h2>
          {section.body.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="text-body text-muted">
              {paragraph}
            </p>
          ))}
        </section>
      ))}
      <p className="font-mono text-small text-muted">Last updated: 17 July 2026 (draft)</p>
    </PageShell>
  );
}
