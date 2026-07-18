import { create } from 'zustand';
import { LAUNCH_STATE, type LaunchState } from '@/config/launch';

interface LaunchStoreState {
  /** Hero state — seeded from config; switchable at runtime (demo/remote flag). */
  state: LaunchState;
  setState: (state: LaunchState) => void;
}

export const useLaunchStore = create<LaunchStoreState>()((set) => ({
  state: LAUNCH_STATE,
  setState: (state) => set({ state }),
}));
