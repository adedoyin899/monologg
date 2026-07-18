import type { Client, Creator, UserType } from '@/types';

/**
 * In-memory auth backend for the beta build — swap for the real API without
 * touching the screens. Seeded with one demo account per audience so flows
 * (email-exists, sign-in, audience routing) are testable end to end.
 */

export const DEMO_TALENT_EMAIL = 'adaeze@demo.monologg.app';
export const DEMO_CLIENT_EMAIL = 'tunde@demo.monologg.app';

/** Demo OTP — every "sent" code is this until the real SMS/email service lands. */
export const OTP_DEMO_CODE = '424242';
export const OTP_MAX_ATTEMPTS = 3;

const now = () => new Date().toISOString();

const seedCreator: Creator = {
  id: 'demo-creator',
  userType: 'talent',
  name: 'Adaeze Obi',
  niche: 'vo_artist',
  bio: 'Warm, conversational voice-over for brands that talk like people.',
  location: 'NG',
  styleTags: ['Warm Texture', 'Conversational', 'Expressive'],
  verification: 'verified',
  celebrityBadge: false,
  referralCode: 'adaeze',
  media: [],
  rateCards: [],
  availability: [],
  createdAt: now(),
  updatedAt: now(),
};

const seedClient: Client = {
  id: 'demo-client',
  userType: 'client',
  name: 'Tunde Akinola',
  orgName: 'Brightlight Events',
  orgType: 'event',
  location: 'GB',
};

const users = new Map<string, Creator | Client>([
  [DEMO_TALENT_EMAIL, seedCreator],
  [DEMO_CLIENT_EMAIL, seedClient],
]);

const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

export async function emailExists(email: string): Promise<boolean> {
  await delay();
  return users.has(email.trim().toLowerCase());
}

export async function registerUser(input: {
  name: string;
  email: string;
  userType: UserType;
}): Promise<Creator | Client> {
  await delay();
  const email = input.email.trim().toLowerCase();
  const user: Creator | Client =
    input.userType === 'talent'
      ? {
          id: crypto.randomUUID(),
          userType: 'talent',
          name: input.name,
          niche: 'actor', // provisional — the creator picks theirs in PWA-02
          bio: '',
          location: 'NG',
          styleTags: [],
          verification: 'unverified',
          celebrityBadge: false,
          referralCode: Math.random().toString(36).slice(2, 8),
          media: [],
          rateCards: [],
          availability: [],
          createdAt: now(),
          updatedAt: now(),
        }
      : {
          id: crypto.randomUUID(),
          userType: 'client',
          name: input.name,
          location: 'NG',
        };
  users.set(email, user);
  return user;
}

/** Mock sign-in: matches by email; any password is accepted in the demo build. */
export async function signInUser(
  email: string,
  _password: string,
): Promise<Creator | Client | null> {
  await delay();
  return users.get(email.trim().toLowerCase()) ?? null;
}
