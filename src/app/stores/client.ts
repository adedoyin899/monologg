import { create } from 'zustand';
import type { Brief, Niche } from '@/types';

/** Directory filters (US-6): search, category, style tags, price, location, badges. */
export interface DirectoryFilters {
  /** Free-text name search. */
  query: string;
  niches: Niche[];
  styleTags: string[];
  /** Launch-market country code, or null for anywhere. */
  location: string | null;
  /** Max starting price in minor units of the client's currency, or null for any. */
  maxBudget: number | null;
  verifiedOnly: boolean;
}

const INITIAL_FILTERS: DirectoryFilters = {
  query: '',
  niches: [],
  styleTags: [],
  location: null,
  maxBudget: null,
  verifiedOnly: false,
};

interface ClientState {
  briefs: Brief[];
  filters: DirectoryFilters;
  addBrief: (brief: Brief) => void;
  removeBrief: (id: string) => void;
  setFilters: (patch: Partial<DirectoryFilters>) => void;
  resetFilters: () => void;
}

export const useClientStore = create<ClientState>()((set) => ({
  briefs: [],
  filters: INITIAL_FILTERS,
  addBrief: (brief) => set((state) => ({ briefs: [...state.briefs, brief] })),
  removeBrief: (id) => set((state) => ({ briefs: state.briefs.filter((b) => b.id !== id) })),
  setFilters: (patch) => set((state) => ({ filters: { ...state.filters, ...patch } })),
  resetFilters: () => set({ filters: INITIAL_FILTERS }),
}));
