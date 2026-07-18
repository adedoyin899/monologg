import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { WaitlistEntry } from '@/types';

/** First queue number assigned; the real backend takes over this counter at launch. */
export const QUEUE_BASE = 214;

interface WaitlistState {
  /** This visitor's spot in the verification queue (persisted across visits). */
  entry: WaitlistEntry | null;
  /** Running count of joins this session — drives sequential numbering. */
  joinCount: number;
  join: (email: string) => WaitlistEntry;
  leave: () => void;
}

export const useWaitlistStore = create<WaitlistState>()(
  persist(
    (set, get) => ({
      entry: null,
      joinCount: 0,
      join: (email) => {
        const existing = get().entry;
        if (existing && existing.email === email) return existing;
        const joinCount = get().joinCount + 1;
        const entry: WaitlistEntry = {
          id: crypto.randomUUID(),
          email,
          // sequential, not random — "#214", "#215", "#216"… one number per join
          queueNumber: QUEUE_BASE + joinCount - 1,
          referralCode: Math.random().toString(36).slice(2, 8),
        };
        set({ entry, joinCount });
        return entry;
      },
      leave: () => set({ entry: null }),
    }),
    { name: 'monologg-waitlist' },
  ),
);
