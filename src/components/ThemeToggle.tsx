import { Moon, Sun } from 'lucide-react';
import { useResolvedTheme, useThemeStore } from '@/app/stores/theme';
import { cn } from '@/lib/utils';

export interface ThemeToggleProps {
  className?: string;
}

/**
 * Quick light/dark switch — a single tap flips the resolved theme directly
 * (bypassing 'system' for an immediate, predictable toggle). The fuller
 * light/dark/system picker with a preview lives at Settings → Appearance;
 * this is the always-visible shortcut. Mounted once at the app root
 * (see App.tsx) so it appears on every screen without per-page wiring.
 */
export function ThemeToggle({ className }: ThemeToggleProps) {
  const setTheme = useThemeStore((state) => state.setTheme);
  const resolved = useResolvedTheme();
  const isDark = resolved === 'dark';

  return (
    <button
      type="button"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={cn(
        'inline-flex min-h-touch min-w-touch items-center justify-center rounded-pill border border-divider bg-surface text-ink shadow-sm transition-colors duration-micro ease-out hover:bg-surface-2',
        className,
      )}
    >
      {isDark ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
    </button>
  );
}
