import { Moon, Sun, SunMoon, type LucideIcon } from 'lucide-react';
import { useAuthStore } from '@/app/stores/auth';
import { useThemeStore, type Theme } from '@/app/stores/theme';
import { Card } from '@/components';
import { cn } from '@/lib/utils';
import { PageShell } from '../PageShell';

const OPTIONS: ReadonlyArray<{ value: Theme; label: string; copy: string; icon: LucideIcon }> = [
  { value: 'light', label: 'Light', copy: 'Stage Cream, always on', icon: Sun },
  { value: 'dark', label: 'Dark', copy: 'Near-black, accents stay vivid', icon: Moon },
  { value: 'system', label: 'System', copy: 'Follows your device', icon: SunMoon },
];

/** SET-05b — Appearance: light / dark / system, same toggle for both audiences. */
export default function AppearanceSettings() {
  const { theme, setTheme } = useThemeStore();
  const userType = useAuthStore((state) => state.userType);
  const audienceLabel = userType === 'talent' ? 'Talent Coral' : 'Client Navy';

  return (
    <PageShell title="Appearance">
      <p className="text-body text-muted">
        Pick how monologg/ looks on this device. Your {audienceLabel} accent stays put —
        only the canvas changes.
      </p>

      <div role="radiogroup" aria-label="Theme" className="flex flex-col gap-3">
        {OPTIONS.map(({ value, label, copy, icon: OptionIcon }) => {
          const selected = theme === value;
          return (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => setTheme(value)}
              className={cn(
                'flex min-h-touch items-center gap-3 rounded-md border-2 bg-surface p-4 text-left transition-colors duration-micro ease-out',
                selected ? 'border-accent shadow-sm' : 'border-border-control hover:bg-surface-2',
              )}
            >
              <OptionIcon
                size={22}
                aria-hidden="true"
                className={selected ? 'text-accent' : 'text-muted'}
              />
              <span className="flex flex-1 flex-col">
                <span className="text-body font-medium text-ink">{label}</span>
                <span className="text-small text-muted">{copy}</span>
              </span>
              <span
                aria-hidden="true"
                className={cn(
                  'h-5 w-5 shrink-0 rounded-pill border-2',
                  selected ? 'border-accent bg-accent-solid' : 'border-border-control',
                )}
              />
            </button>
          );
        })}
      </div>

      {/* live preview, scoped independent of the page's own theme, so both are visible at once */}
      <div className="flex flex-col gap-2">
        <p className="text-label uppercase text-muted">Preview</p>
        <div className="grid grid-cols-2 gap-3">
          <Card className="light flex flex-col gap-2 bg-bg">
            <p className="text-small text-muted">Light</p>
            <p className="text-body font-medium text-ink">Book the room.</p>
            <span className="inline-flex w-fit rounded-btn bg-accent-solid px-3 py-1.5 text-small text-accent-fg">
              Primary
            </span>
          </Card>
          <Card className="dark flex flex-col gap-2 bg-bg">
            <p className="text-small text-muted">Dark</p>
            <p className="text-body font-medium text-ink">Get paid on time.</p>
            <span className="inline-flex w-fit rounded-btn bg-accent-solid px-3 py-1.5 text-small text-accent-fg">
              Primary
            </span>
          </Card>
        </div>
      </div>
    </PageShell>
  );
}
