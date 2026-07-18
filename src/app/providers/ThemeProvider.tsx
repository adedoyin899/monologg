import { useEffect, type ReactNode } from 'react';
import { useResolvedTheme } from '../stores/theme';

/**
 * Applies the resolved theme (store preference + prefers-color-scheme) as the
 * .dark class on <html>. State itself lives in the Zustand theme store.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const resolvedTheme = useResolvedTheme();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', resolvedTheme === 'dark');
  }, [resolvedTheme]);

  return <>{children}</>;
}
