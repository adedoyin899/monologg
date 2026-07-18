/**
 * Blog content (WEB-04) — CMS-ready shape: swap this module for a CMS fetch
 * without touching the pages. The blog is a growth surface: the source doc's
 * creator channel is 100% organic, so every post targets search intent.
 */
export interface BlogPost {
  slug: string;
  title: string;
  /** Meta description + card excerpt (SEO). */
  excerpt: string;
  category: 'Creators' | 'Casting' | 'Trust & Money';
  author: string;
  authorRole: string;
  publishedAt: string; // ISO date
  readMinutes: number;
  /** Paragraphs for now; becomes rich text when the CMS lands. */
  body: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'stop-chasing-gigs-start-getting-booked',
    title: 'Stop chasing gigs. Start getting booked.',
    excerpt:
      'The unpaid second job every performer runs — finding work, chasing invoices, herding schedules — and how a storefront flips it.',
    category: 'Creators',
    author: 'The Monologg Team',
    authorRole: 'Editorial',
    publishedAt: '2026-07-01',
    readMinutes: 5,
    body: [
      'Performing is the fun part. The second, unpaid job — hunting briefs, negotiating in DMs, invoicing, waiting, nudging, waiting again — is the part nobody applauded for.',
      'A storefront changes the direction of travel. Instead of you chasing rooms, the room finds a page with your reel, your style tags, your rates, and your open dates — and books it like a table at a restaurant.',
      'Rate cards do the negotiating before the conversation starts. When your “Wedding MC — full day” card says what it costs and when it delivers, the client who books it has already agreed.',
      'And escrow does the chasing. The money locks before you perform and releases when you deliver. Your follow-up email retires undefeated.',
    ],
  },
  {
    slug: 'escrow-explained-in-one-coffee-break',
    title: 'Escrow, explained in one coffee break',
    excerpt:
      'Where the money actually sits between “booked” and “paid” — and why both sides sleep better because of it.',
    category: 'Trust & Money',
    author: 'The Monologg Team',
    authorRole: 'Editorial',
    publishedAt: '2026-07-08',
    readMinutes: 4,
    body: [
      'Every booking has an awkward moment: someone has to move first. Pay before the show, and the client carries the risk. Perform before the payment, and the creator does.',
      'Escrow removes the moment entirely. At checkout, the client’s money is locked with a licensed payment partner — Monologg never holds it, and the creator can see it’s really there.',
      'The order room shows the same three steps to both sides: Escrow Locked, Deliverables Provided, Payment Released. No he-said-she-said; the bar is the referee.',
      'When the deliverables are confirmed, the funds release. If something goes wrong before then, the money is exactly where everyone can reason about it — in the middle, not in the wind.',
    ],
  },
  {
    slug: 'casting-shouldnt-take-weeks',
    title: 'Casting shouldn’t take weeks: a producer’s playbook',
    excerpt:
      'From a Monday-morning brief to a booked, escrow-backed performer by Friday — the directory-first casting workflow.',
    category: 'Casting',
    author: 'The Monologg Team',
    authorRole: 'Editorial',
    publishedAt: '2026-07-15',
    readMinutes: 6,
    body: [
      'The old way: post in a group chat, collect fourteen PDFs, watch nine showreels, email four agents, and lose a week before anyone talks money.',
      'The directory-first way: write the brief once — niche, style, budget, dates. Filter verified talent by exactly those things. Watch reels that were uploaded for this purpose, tagged by style so “warm and conversational” is a filter, not a hope.',
      'Booking is where the time really comes back. A slot on the creator’s calendar, payment locked in escrow, contract terms attached to the booking itself — one flow, minutes long.',
      'Your shortlist becomes a roster. Rebook the MC who killed it last quarter in two taps, or put them on retainer and stop shortlisting altogether.',
    ],
  },
];

export function postBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
