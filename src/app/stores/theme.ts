import { useSyncExternalStore } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme = 'light' | 'dark' | 'system';

interface ThemeState {
  /** User preference — 'system' follows prefers-color-scheme. */
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'system',
      setTheme: (theme) => set({ theme }),
    }),
    { name: 'monologg-theme' },
  ),
);

const DARK_QUERY = '(prefers-color-scheme: dark)';

function subscribeToSystemTheme(onChange: () => void) {
  const media = window.matchMedia(DARK_QUERY);
  media.addEventListener('change', onChange);
  return () => media.removeEventListener('change', onChange);
}

function systemPrefersDark() {
  return window.matchMedia(DARK_QUERY).matches;
}

/** The theme actually in effect, with 'system' resolved against the OS preference. */
export function useResolvedTheme(): 'light' | 'dark' {
  const theme = useThemeStore((state) => state.theme);
  const prefersDark = useSyncExternalStore(subscribeToSystemTheme, systemPrefersDark);
  return theme === 'system' ? (prefersDark ? 'dark' : 'light') : theme;
}
