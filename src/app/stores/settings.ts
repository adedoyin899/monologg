import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/** Payout destination (SET-04) — details go to the region rail at payout time. */
export interface PayoutDetails {
  bankName: string;
  accountName: string;
  accountNumber: string;
  currency: string;
}

const DEFAULT_PREFS: Record<string, boolean> = {
  bookings: true,
  messages: true,
  escrow: true,
  digest: false,
};

interface SettingsState {
  notificationPrefs: Record<string, boolean>;
  setNotificationPref: (key: string, value: boolean) => void;
  payout: PayoutDetails | null;
  setPayout: (payout: PayoutDetails) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      notificationPrefs: DEFAULT_PREFS,
      setNotificationPref: (key, value) =>
        set((state) => ({
          notificationPrefs: { ...state.notificationPrefs, [key]: value },
        })),
      payout: null,
      setPayout: (payout) => set({ payout }),
    }),
    { name: 'monologg-settings' },
  ),
);
