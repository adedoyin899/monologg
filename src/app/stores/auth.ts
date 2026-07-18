import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Client, Creator, UserType } from '@/types';

/** Registration details held between the register form and OTP verification (PWA-01). */
export interface PendingRegistration {
  name: string;
  email: string;
  userType: UserType;
}

interface AuthState {
  user: Creator | Client | null;
  userType: UserType | null;
  /** Email awaiting OTP confirmation. */
  pendingEmail: string | null;
  pendingRegistration: PendingRegistration | null;
  startRegistration: (registration: PendingRegistration) => void;
  signIn: (user: Creator | Client) => void;
  /** Merges profile edits (SET-01) into the signed-in user. */
  updateUser: (patch: Partial<Creator> & Partial<Client>) => void;
  signOut: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      userType: null,
      pendingEmail: null,
      pendingRegistration: null,
      startRegistration: (registration) =>
        set({ pendingRegistration: registration, pendingEmail: registration.email }),
      signIn: (user) =>
        set({
          user,
          userType: user.userType,
          pendingEmail: null,
          pendingRegistration: null,
        }),
      updateUser: (patch) =>
        set((state) =>
          state.user ? { user: { ...state.user, ...patch } as Creator | Client } : state,
        ),
      signOut: () =>
        set({ user: null, userType: null, pendingEmail: null, pendingRegistration: null }),
    }),
    {
      // session survives refresh; OTP-in-flight state deliberately does not
      name: 'monologg-auth',
      partialize: (state) => ({ user: state.user, userType: state.userType }),
    },
  ),
);
