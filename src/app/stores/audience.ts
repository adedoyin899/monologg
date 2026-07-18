import { create } from 'zustand';

/**
 * The active audience binds --accent via data-audience on <html>:
 * "talent" → Talent Coral, "client" → Client Navy/indigo.
 * Set at app entry (creator vs client shell); not persisted.
 */
export type Audience = 'talent' | 'client';

interface AudienceState {
  audience: Audience;
  setAudience: (audience: Audience) => void;
}

export const useAudienceStore = create<AudienceState>()((set) => ({
  audience: 'talent',
  setAudience: (audience) => set({ audience }),
}));
