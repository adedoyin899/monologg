import type { Creator } from '@/types';

/**
 * Mock casting directory (US-6) — replaced by the real API at launch.
 * Beta cohort is Lagos-first, priced in NGN, so the pricing filter compares
 * like-for-like; other markets arrive with the backend.
 */

const now = new Date().toISOString();

/** Bookable slots for the next 7 days (Sundays dark); a few pre-booked for realism. */
function buildAvailability() {
  const starts = ['10:00', '13:00', '16:00'];
  const blocks = [];
  for (let offset = 1; offset <= 7; offset += 1) {
    const date = new Date();
    date.setHours(12, 0, 0, 0);
    date.setDate(date.getDate() + offset);
    if (date.getDay() === 0) continue;
    blocks.push({
      date: date.toISOString().slice(0, 10),
      slots: starts.map((start, index) => ({
        start,
        end: `${String(Number(start.slice(0, 2)) + 1).padStart(2, '0')}:00`,
        booked: (offset + index) % 4 === 0,
      })),
    });
  }
  return blocks;
}

function creator(
  input: Pick<Creator, 'id' | 'name' | 'niche' | 'bio' | 'styleTags' | 'rateCards'> &
    Partial<Pick<Creator, 'verification' | 'celebrityBadge' | 'location'>>,
): Creator {
  return {
    userType: 'talent',
    location: 'NG',
    verification: 'verified',
    celebrityBadge: false,
    referralCode: input.id,
    media: [],
    availability: buildAvailability(),
    createdAt: now,
    updatedAt: now,
    ...input,
  };
}

export const MOCK_CREATORS: Creator[] = [
  creator({
    id: 'adaeze-obi',
    name: 'Adaeze Obi',
    niche: 'vo_artist',
    bio: 'Warm, conversational voice-over for brands that talk like people.',
    styleTags: ['Warm Texture', 'Conversational', 'Expressive'],
    rateCards: [
      {
        id: 'adaeze-1',
        serviceTitle: '30-second commercial VO',
        basePrice: { amount: 18_000_000, currency: 'NGN' },
        deliveryTimeline: '3 days',
      },
      {
        id: 'adaeze-2',
        serviceTitle: 'Live event voice-of-god',
        basePrice: { amount: 45_000_000, currency: 'NGN' },
        deliveryTimeline: '1 session',
      },
    ],
  }),
  creator({
    id: 'kofi-mensah',
    name: 'Kofi Mensah',
    niche: 'comedian',
    bio: 'Corporate-safe stand-up that still actually lands.',
    styleTags: ['High Energy', 'Crowd Work', 'Quick-witted'],
    celebrityBadge: true,
    rateCards: [
      {
        id: 'kofi-1',
        serviceTitle: '20-minute corporate set',
        basePrice: { amount: 35_000_000, currency: 'NGN' },
        deliveryTimeline: '1 session',
      },
    ],
  }),
  creator({
    id: 'thandi-cele',
    name: 'Thandi Cele',
    niche: 'actor',
    bio: 'Screen and stage. Brings the quiet scenes to life.',
    styleTags: ['Dramatic', 'Grounded', 'Screen-ready'],
    rateCards: [
      {
        id: 'thandi-1',
        serviceTitle: 'Self-tape (up to 3 pages)',
        basePrice: { amount: 25_000_000, currency: 'NGN' },
        deliveryTimeline: '2 days',
      },
    ],
  }),
  creator({
    id: 'emeka-nwosu',
    name: 'Emeka Nwosu',
    niche: 'compere',
    bio: 'Weddings, galas, product launches — the room stays warm.',
    styleTags: ['High Energy', 'Polished', 'Crowd Work'],
    celebrityBadge: true,
    rateCards: [
      {
        id: 'emeka-1',
        serviceTitle: 'Full-day event MC',
        basePrice: { amount: 45_000_000, currency: 'NGN' },
        deliveryTimeline: '1 session',
      },
    ],
  }),
  creator({
    id: 'grace-adeyemi',
    name: 'Grace Adeyemi',
    niche: 'speaker_pastor',
    bio: 'Keynotes and congregations — messages that stay with the room.',
    styleTags: ['Uplifting', 'Commanding', 'Warm Texture'],
    rateCards: [
      {
        id: 'grace-1',
        serviceTitle: 'Conference keynote',
        basePrice: { amount: 30_000_000, currency: 'NGN' },
        deliveryTimeline: '1 session',
      },
    ],
  }),
  creator({
    id: 'tayo-bankole',
    name: 'Tayo Bankole',
    niche: 'musician',
    bio: 'Live sets and session work. Soul first, always.',
    styleTags: ['Soulful', 'Live-ready', 'Versatile'],
    rateCards: [
      {
        id: 'tayo-1',
        serviceTitle: 'Live set (45 mins, with band)',
        basePrice: { amount: 60_000_000, currency: 'NGN' },
        deliveryTimeline: '1 session',
      },
    ],
  }),
  creator({
    id: 'zainab-musa',
    name: 'Zainab Musa',
    niche: 'content_creator',
    bio: 'Streams, appearances, and collabs with actual chemistry.',
    styleTags: ['Relatable', 'High Energy', 'Quick-cut'],
    rateCards: [
      {
        id: 'zainab-1',
        serviceTitle: 'Brand appearance / co-stream',
        basePrice: { amount: 15_000_000, currency: 'NGN' },
        deliveryTimeline: '3 days',
      },
    ],
  }),
  creator({
    id: 'dapo-alade',
    name: 'Dapo Alade',
    niche: 'actor',
    bio: 'Fresh face, old-soul range.',
    styleTags: ['Dramatic', 'Expressive'],
    verification: 'processing',
    rateCards: [
      {
        id: 'dapo-1',
        serviceTitle: 'Self-tape (up to 2 pages)',
        basePrice: { amount: 12_000_000, currency: 'NGN' },
        deliveryTimeline: '2 days',
      },
    ],
  }),
];

export function creatorById(id: string): Creator | undefined {
  return MOCK_CREATORS.find((entry) => entry.id === id);
}

/** Cheapest rate card — the "From …" price on directory cards. */
export function startingPrice(entry: Creator) {
  return entry.rateCards.reduce(
    (min, card) => (card.basePrice.amount < min.amount ? card.basePrice : min),
    entry.rateCards[0]?.basePrice ?? { amount: 0, currency: 'NGN' },
  );
}

/** Distinct style tags across the cohort — drives the directory's vibe filter pills. */
export const DIRECTORY_STYLE_TAGS = [
  ...new Set(MOCK_CREATORS.flatMap((entry) => entry.styleTags)),
].sort();
