import {
  CircleCheck,
  CircleX,
  Clock3,
  Info,
  Moon,
  Sun,
  SunMoon,
  type LucideIcon,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { ComponentShowcase } from './KitchenSinkComponents';
import { useAudienceStore, type Audience } from './stores/audience';
import { useThemeStore, type Theme } from './stores/theme';

/**
 * Kitchen sink — renders every design token for both audiences in light + dark.
 * Dev/design surface only; contrast figures are from the §3.7 audit of
 * MONOLOGG_DESIGN_SYSTEM-2.md (WCAG 2.2 AA).
 */

type Mode = 'light' | 'dark';

const MODES: readonly Mode[] = ['light', 'dark'];

/* ---------- audited contrast notes per pairing ---------- */

const ACCENT_NOTES: Record<Audience, Record<Mode, { button: string; link: string }>> = {
  talent: {
    light: {
      button: 'white on #DC2F35 — 4.67:1 (AA)',
      link: '#C4262C on light surface — 5.09:1 (AA)',
    },
    dark: {
      button: 'white on #DC2F35 — 4.67:1 (AA)',
      link: '#FF5A5F on dark surface — 5.84:1 (AA)',
    },
  },
  client: {
    light: {
      button: 'white on #4C4CE0 — 6.14:1 (AA)',
      link: '#4C4CE0 on light surface — 5.45:1 (AA)',
    },
    dark: {
      button: 'white on #4C4CE0 — 6.14:1 (AA)',
      link: '#8A8AF5 on dark surface — 5.97:1 (AA)',
    },
  },
};

const NEUTRAL_NOTES: Record<Mode, { text: string; muted: string; control: string; focusRing: string }> = {
  light: {
    text: 'Ink on canvas/surface — 16.2–18.3:1 (AA)',
    muted: 'muted on surface — 6.0–6.7:1 (AA)',
    control: 'control border vs surface — 3.71:1 (AA, UI)',
    focusRing: 'focus ring vs canvas — 3.88:1 (AA, UI)',
  },
  dark: {
    text: 'off-white on canvas/surface — 14.6–17.4:1 (AA)',
    muted: 'muted on surface — 7.5–8.1:1 (AA)',
    control: 'control border vs surface — 3.13:1 (AA, UI)',
    focusRing: 'focus ring vs canvas — 7.12:1 (AA)',
  },
};

const STATUSES: ReadonlyArray<{
  icon: LucideIcon;
  label: string;
  badgeClass: string;
  note: string;
}> = [
  {
    icon: CircleCheck,
    label: 'Paid',
    badgeClass: 'bg-success text-success-fg',
    note: 'white on #0E7D52 — 5.15:1 (AA)',
  },
  {
    icon: Clock3,
    label: 'In escrow',
    badgeClass: 'bg-warning text-warning-fg',
    note: 'Ink on #F2A93B — 9.15:1 (AA) · never white on amber',
  },
  {
    icon: CircleX,
    label: 'Payment failed',
    badgeClass: 'bg-error text-error-fg',
    note: 'white on #D93A3F — 4.54:1 (AA)',
  },
  {
    icon: Info,
    label: 'Heads up',
    badgeClass: 'bg-info text-info-fg',
    note: 'white on #3E7BFA — 3.88:1 (AA for large text/UI only)',
  },
];

/* ---------- shared bits ---------- */

function Note({ children }: { children: ReactNode }) {
  return <p className="text-small text-muted">{children}</p>;
}

function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="text-h2">{children}</h2>;
}

function Swatch({ token, swatchClass }: { token: string; swatchClass: string }) {
  return (
    <div className="flex flex-col gap-1">
      <div className={cn('h-10 rounded-sm border border-divider', swatchClass)} />
      <span className="font-mono text-small text-muted">{token}</span>
    </div>
  );
}

/** Theme+audience scoped preview surface. Carries BOTH the mode class and
 *  data-audience so the theme-aware --accent-text resolves correctly. */
function Scope({
  mode,
  audience,
  title,
  children,
}: {
  mode: Mode;
  audience?: Audience;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      data-audience={audience}
      className={cn(mode, 'flex flex-col gap-3 rounded-md bg-bg p-4 text-ink shadow-sm')}
    >
      <h3 className="text-label uppercase text-muted">{title}</h3>
      {children}
    </section>
  );
}

/* ---------- sections ---------- */

function AccentScope({ audience, mode }: { audience: Audience; mode: Mode }) {
  const notes = ACCENT_NOTES[audience][mode];
  return (
    <Scope mode={mode} audience={audience} title={`${audience} · ${mode}`}>
      <div className="grid grid-cols-3 gap-2">
        <Swatch token="--accent" swatchClass="bg-accent" />
        <Swatch token="--accent-solid" swatchClass="bg-accent-solid" />
        <Swatch token="--accent-hover" swatchClass="bg-accent-hover" />
      </div>
      <div className="flex flex-col gap-2 rounded-md bg-surface p-4 shadow-sm">
        <button
          type="button"
          className="min-h-touch rounded-btn bg-accent-solid px-4 text-body-lg text-accent-fg transition-colors duration-micro ease-out hover:bg-accent-hover"
        >
          Book now
        </button>
        <Note>{notes.button}</Note>
        <a href="#top" className="text-body font-medium text-accent-text underline">
          View storefront
        </a>
        <Note>{notes.link}</Note>
      </div>
    </Scope>
  );
}

function NeutralScope({ mode }: { mode: Mode }) {
  const notes = NEUTRAL_NOTES[mode];
  return (
    <Scope mode={mode} title={`neutrals · ${mode}`}>
      <div className="grid grid-cols-3 gap-2">
        <Swatch token="--bg" swatchClass="bg-bg" />
        <Swatch token="--surface" swatchClass="bg-surface" />
        <Swatch token="--surface-2" swatchClass="bg-surface-2" />
        <Swatch token="--border" swatchClass="bg-border" />
        <Swatch token="--divider" swatchClass="bg-divider" />
        <Swatch token="--focus" swatchClass="bg-focus" />
      </div>
      <div className="flex flex-col gap-2 rounded-md bg-surface p-4 shadow-sm">
        <p className="text-body">Body text (--text)</p>
        <Note>{notes.text}</Note>
        <p className="text-body text-muted">Muted text (--text-muted)</p>
        <Note>{notes.muted}</Note>
        <input
          className="min-h-touch rounded-sm border border-border-control bg-surface px-3 text-body text-ink placeholder:text-muted"
          placeholder="Input — tab here to see the focus ring"
        />
        <Note>
          {notes.control} · {notes.focusRing}
        </Note>
      </div>
    </Scope>
  );
}

function StatusScope({ mode }: { mode: Mode }) {
  return (
    <Scope mode={mode} title={`status · ${mode}`}>
      <div className="flex flex-col gap-3 rounded-md bg-surface p-4 shadow-sm">
        {STATUSES.map(({ icon: StatusIcon, label, badgeClass, note }) => (
          <div key={label} className="flex flex-col gap-1">
            {/* status = color + icon + label, never color alone */}
            <span
              className={cn(
                'inline-flex w-fit items-center gap-1 rounded-xs px-2 py-1 text-label uppercase',
                badgeClass,
              )}
            >
              <StatusIcon size={14} aria-hidden="true" />
              {label}
            </span>
            <Note>{note}</Note>
          </div>
        ))}
      </div>
    </Scope>
  );
}

const TYPE_SCALE = [
  { name: 'Display', className: 'font-display text-display', sample: 'Book the room.', spec: '72px / 800 — Mode B (marketing) only' },
  { name: 'H1', className: 'text-h1', sample: 'Your stage. Your terms.', spec: '36px / 700' },
  { name: 'H2', className: 'text-h2', sample: 'Casting shouldn’t take weeks', spec: '26px / 700' },
  { name: 'H3', className: 'text-h3', sample: 'Booking Service Title', spec: '20px / 600' },
  { name: 'Body Large', className: 'text-body-lg', sample: 'Primary body copy and CTA labels.', spec: '16px / 500' },
  { name: 'Body', className: 'text-body', sample: 'Standard UI text — calm, clear, functional.', spec: '14px / 400' },
  { name: 'Small', className: 'text-small', sample: 'Captions, timestamps, helper text.', spec: '12px / 400' },
  { name: 'Label', className: 'text-label uppercase', sample: 'Field label', spec: '12px / 500, +0.04em, uppercase' },
  { name: 'Mono / Data', className: 'font-mono text-body-lg', sample: '₦450,000 · BK-2931 · 240-661', spec: 'IBM Plex Mono — prices, IDs, OTP' },
] as const;

const SPACING_STEPS = [
  { token: '--space-1', widthClass: 'w-1', px: 4 },
  { token: '--space-2', widthClass: 'w-2', px: 8 },
  { token: '--space-3', widthClass: 'w-3', px: 12 },
  { token: '--space-4', widthClass: 'w-4', px: 16 },
  { token: '--space-6', widthClass: 'w-6', px: 24 },
  { token: '--space-8', widthClass: 'w-8', px: 32 },
  { token: '--space-12', widthClass: 'w-12', px: 48 },
  { token: '--space-16', widthClass: 'w-16', px: 64 },
] as const;

const RADII = [
  { token: '--radius-xs', className: 'rounded-xs', use: 'chips/badges' },
  { token: '--radius-sm', className: 'rounded-sm', use: 'inputs' },
  { token: '--radius-btn', className: 'rounded-btn', use: 'buttons' },
  { token: '--radius-md', className: 'rounded-md', use: 'cards' },
  { token: '--radius-lg', className: 'rounded-lg', use: 'sheets' },
  { token: '--radius-pill', className: 'rounded-pill', use: 'pills' },
] as const;

const DURATIONS = [
  { token: '--dur-micro', className: 'duration-micro', label: '150ms · micro' },
  { token: '--dur-short', className: 'duration-short', label: '300ms · section' },
  { token: '--dur-medium', className: 'duration-medium', label: '500ms · modal/sheet' },
] as const;

/* ---------- toolbar ---------- */

const THEME_OPTIONS: ReadonlyArray<{ value: Theme; label: string; icon: LucideIcon }> = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'System', icon: SunMoon },
];

function Toolbar() {
  const { theme, setTheme } = useThemeStore();
  const { audience, setAudience } = useAudienceStore();

  const buttonClass = (active: boolean) =>
    cn(
      'inline-flex min-h-touch min-w-touch items-center justify-center gap-1 rounded-btn px-4 text-body font-medium transition-colors duration-micro ease-out',
      active
        ? 'bg-accent-solid text-accent-fg'
        : 'border border-border-control bg-surface text-ink hover:bg-surface-2',
    );

  return (
    <div className="flex flex-wrap items-center gap-4 rounded-md bg-surface p-4 shadow-sm">
      <div className="flex items-center gap-2" role="group" aria-label="Theme">
        {THEME_OPTIONS.map(({ value, label, icon: ThemeIcon }) => (
          <button
            key={value}
            type="button"
            aria-pressed={theme === value}
            onClick={() => setTheme(value)}
            className={buttonClass(theme === value)}
          >
            <ThemeIcon size={16} aria-hidden="true" />
            {label}
          </button>
        ))}
      </div>
      <span className="text-body text-muted" aria-hidden="true">
        /
      </span>
      <div className="flex items-center gap-2" role="group" aria-label="Audience">
        {(['talent', 'client'] as const).map((value) => (
          <button
            key={value}
            type="button"
            aria-pressed={audience === value}
            onClick={() => setAudience(value)}
            className={buttonClass(audience === value)}
          >
            {value === 'talent' ? 'Talent · Coral' : 'Client · Navy'}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------- page ---------- */

export default function KitchenSink() {
  return (
    <main id="top" className="min-h-screen bg-bg px-4 py-8 text-ink">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <header className="flex flex-col gap-2">
          <h1 className="text-h1">
            Design tokens <span className="text-accent-text">/</span>
          </h1>
          <Note>
            Every semantic token, both audiences, light + dark. Contrast figures are the
            audited WCAG 2.2 AA ratios from MONOLOGG_DESIGN_SYSTEM-2.md §3.7. The toolbar
            drives the real Zustand stores — the page (and app) rebinds live.
          </Note>
        </header>

        <Toolbar />

        <section className="flex flex-col gap-4">
          <SectionTitle>Audience accents</SectionTitle>
          <Note>
            Components read --accent tokens only; talent → Coral, client → Navy/indigo.
            Colored text always uses the theme-aware --accent-text — raw --accent fails AA
            as text on light surfaces (2.71:1).
          </Note>
          <div className="grid gap-4 sm:grid-cols-2">
            {(['talent', 'client'] as const).map((audience) =>
              MODES.map((mode) => (
                <AccentScope key={`${audience}-${mode}`} audience={audience} mode={mode} />
              )),
            )}
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <SectionTitle>Neutrals</SectionTitle>
          <div className="grid gap-4 sm:grid-cols-2">
            {MODES.map((mode) => (
              <NeutralScope key={mode} mode={mode} />
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <SectionTitle>Status</SectionTitle>
          <Note>
            Status colors map to real states only, identical in both themes, and always
            render as color + icon + label — never color alone.
          </Note>
          <div className="grid gap-4 sm:grid-cols-2">
            {MODES.map((mode) => (
              <StatusScope key={mode} mode={mode} />
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <SectionTitle>Typography</SectionTitle>
          <div className="flex flex-col gap-4 overflow-x-auto rounded-md bg-surface p-4 shadow-sm">
            {TYPE_SCALE.map(({ name, className, sample, spec }) => (
              <div key={name} className="flex flex-col gap-1 border-b border-divider pb-3 last:border-b-0 last:pb-0">
                <p className={className}>{sample}</p>
                <Note>
                  {name} — {spec}
                </Note>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <SectionTitle>Spacing · 4px base</SectionTitle>
          <div className="flex flex-col gap-2 rounded-md bg-surface p-4 shadow-sm">
            {SPACING_STEPS.map(({ token, widthClass, px }) => (
              <div key={token} className="flex items-center gap-3">
                <div className={cn('h-3 rounded-xs bg-accent', widthClass)} />
                <span className="font-mono text-small text-muted">
                  {token} · {px}px
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <SectionTitle>Radius</SectionTitle>
          <div className="flex flex-wrap gap-4 rounded-md bg-surface p-4 shadow-sm">
            {RADII.map(({ token, className, use }) => (
              <div key={token} className="flex flex-col items-center gap-1">
                <div className={cn('h-12 w-12 border border-border-control bg-surface-2', className)} />
                <span className="font-mono text-small text-muted">{token}</span>
                <Note>{use}</Note>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <SectionTitle>Elevation · Mode A only</SectionTitle>
          <div className="grid gap-4 sm:grid-cols-2">
            {MODES.map((mode) => (
              <Scope key={mode} mode={mode} title={`shadows · ${mode}`}>
                <div className="rounded-md bg-surface p-4 shadow-sm">
                  <span className="font-mono text-small text-muted">--shadow-sm</span>
                </div>
                <div className="rounded-md bg-surface p-4 shadow-md">
                  <span className="font-mono text-small text-muted">--shadow-md</span>
                </div>
              </Scope>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <SectionTitle>Motion</SectionTitle>
          <Note>
            150 / 300 / 500ms on the --ease-out curve; never bouncy. Hover the tiles —
            prefers-reduced-motion collapses all of it globally.
          </Note>
          <div className="flex flex-wrap gap-4 rounded-md bg-surface p-4 shadow-sm">
            {DURATIONS.map(({ token, className, label }) => (
              <div
                key={token}
                className={cn(
                  'flex min-h-touch items-center rounded-md bg-surface-2 px-4 transition-transform ease-out hover:-translate-y-1',
                  className,
                )}
              >
                <span className="font-mono text-small text-muted">{label}</span>
              </div>
            ))}
          </div>
        </section>

        <ComponentShowcase />
      </div>
    </main>
  );
}
