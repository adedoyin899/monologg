/**
 * FAQ / knowledge base (SYS-05) — ONE source, two doors: the marketing
 * how-it-works page and the in-app FAQ both render from here.
 */
export interface FaqEntry {
  q: string;
  a: string;
}

export const FAQS: readonly FaqEntry[] = [
  {
    q: 'What does escrow mean here?',
    a: 'When a client books, the money is locked with our payment partner — not with us, not with the creator. It releases to the creator only when the deliverables are confirmed. Nobody chases anybody.',
  },
  {
    q: 'What does the Verified badge mean?',
    a: 'It means the person passed real identity verification (KYC). It is not a style rating and can’t be bought or earned by referrals — that’s a separate status badge.',
  },
  {
    q: 'What are style tags?',
    a: 'When you upload a reel, Thespian AI listens and suggests style tags like “Warm Texture” or “High Energy” so casting can find your vibe. Tags describe your work — they never verify your identity.',
  },
  {
    q: 'What is the Celebrity badge?',
    a: 'A status mark earned through the referral programme — bring fellow creators onto the roster and the star appears on your storefront and directory card. It signals standing, never identity: that’s what Verified is for.',
  },
  {
    q: 'What does Monologg cost?',
    a: 'Profiles, calendars, and posting briefs are free. Monologg takes a percentage of successful bookings only — the exact split is shown clearly at checkout before anyone pays.',
  },
  {
    q: 'Which countries and currencies work?',
    a: 'We launch in 13 markets — Nigeria, Ghana, Mexico, USA, Canada, UK, India, Italy, Spain, France, Australia, South Korea, and China — with region-appropriate payment rails and local currency formatting.',
  },
];
