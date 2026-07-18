import { create } from 'zustand';
import type {
  AvailabilityBlock,
  MediaAsset,
  Niche,
  RateCard,
  VerificationState,
} from '@/types';

/** Linear onboarding (PWA-02..08): niche → media → Thespian AI → tags → rates → availability. */
export type OnboardingStep =
  | 'niche'
  | 'media'
  | 'processing'
  | 'tags'
  | 'rates'
  | 'availability'
  | 'done';

const STEP_ORDER: readonly OnboardingStep[] = [
  'niche',
  'media',
  'processing',
  'tags',
  'rates',
  'availability',
  'done',
];

/** Weekly operating hours (PWA-08), keyed 0=Sun … 6=Sat. */
export interface DayHours {
  open: boolean;
  start: string; // "09:00"
  end: string; // "17:00"
}

const DEFAULT_HOURS: Record<number, DayHours> = {
  0: { open: false, start: '09:00', end: '17:00' },
  1: { open: true, start: '09:00', end: '17:00' },
  2: { open: true, start: '09:00', end: '17:00' },
  3: { open: true, start: '09:00', end: '17:00' },
  4: { open: true, start: '09:00', end: '17:00' },
  5: { open: true, start: '09:00', end: '17:00' },
  6: { open: false, start: '09:00', end: '17:00' },
};

interface CreatorState {
  step: OnboardingStep;
  niche: Niche | null;
  media: MediaAsset[];
  /** Thespian AI output — style/vibe only, never identity. */
  styleTags: string[];
  /** Identity KYC (Smile Identity, C5) — the Verified badge. Separate from styleTags. */
  verification: VerificationState;
  rateCards: RateCard[];
  availability: AvailabilityBlock[];
  operatingHours: Record<number, DayHours>;
  /** Referral programme (SET-06). Celebrity badge = reputation, NEVER KYC. */
  referrals: number;
  celebrityBadge: boolean;
  addReferral: () => void;
  setNiche: (niche: Niche) => void;
  addMedia: (asset: MediaAsset) => void;
  removeMedia: (id: string) => void;
  setStyleTags: (tags: string[]) => void;
  setVerification: (state: VerificationState) => void;
  upsertRateCard: (card: RateCard) => void;
  removeRateCard: (id: string) => void;
  setAvailability: (blocks: AvailabilityBlock[]) => void;
  setDayHours: (day: number, hours: DayHours) => void;
  goToStep: (step: OnboardingStep) => void;
  nextStep: () => void;
  reset: () => void;
}

const INITIAL = {
  step: 'niche' as OnboardingStep,
  niche: null,
  media: [],
  styleTags: [],
  verification: 'unverified' as VerificationState,
  rateCards: [],
  availability: [],
  operatingHours: DEFAULT_HOURS,
  referrals: 0,
  celebrityBadge: false,
};

/** Referrals needed to earn the celebrity/status badge (demo threshold). */
export const CELEBRITY_THRESHOLD = 5;

export const useCreatorStore = create<CreatorState>()((set) => ({
  ...INITIAL,
  addReferral: () =>
    set((state) => {
      const referrals = state.referrals + 1;
      return { referrals, celebrityBadge: referrals >= CELEBRITY_THRESHOLD };
    }),
  setNiche: (niche) => set({ niche }),
  addMedia: (asset) => set((state) => ({ media: [...state.media, asset] })),
  removeMedia: (id) => set((state) => ({ media: state.media.filter((m) => m.id !== id) })),
  setStyleTags: (styleTags) => set({ styleTags }),
  setVerification: (verification) => set({ verification }),
  upsertRateCard: (card) =>
    set((state) => {
      const exists = state.rateCards.some((c) => c.id === card.id);
      return {
        rateCards: exists
          ? state.rateCards.map((c) => (c.id === card.id ? card : c))
          : [...state.rateCards, card],
      };
    }),
  removeRateCard: (id) =>
    set((state) => ({ rateCards: state.rateCards.filter((c) => c.id !== id) })),
  setAvailability: (availability) => set({ availability }),
  setDayHours: (day, hours) =>
    set((state) => ({ operatingHours: { ...state.operatingHours, [day]: hours } })),
  goToStep: (step) => set({ step }),
  nextStep: () =>
    set((state) => {
      const index = STEP_ORDER.indexOf(state.step);
      const next = STEP_ORDER[index + 1];
      return next ? { step: next } : state;
    }),
  reset: () => set(INITIAL),
}));
