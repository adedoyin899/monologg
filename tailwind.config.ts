import type { Config } from 'tailwindcss';

/**
 * Semantic-token bridge: every utility resolves to a CSS variable declared in
 * src/styles/globals.css (from MONOLOGG_DESIGN_SYSTEM-2.md §3–§4, §8, §11).
 * Components use these classes — never raw hexes, never Coral/Navy directly.
 */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: {
          DEFAULT: 'var(--surface)',
          2: 'var(--surface-2)',
        },
        ink: 'var(--text)',
        muted: 'var(--text-muted)',
        border: 'var(--border)',
        'border-control': 'var(--border-control)',
        divider: 'var(--divider)',
        focus: 'var(--focus)',
        scrim: 'var(--scrim)',
        accent: {
          DEFAULT: 'var(--accent)',
          solid: 'var(--accent-solid)',
          hover: 'var(--accent-hover)',
          fg: 'var(--accent-fg)',
          text: 'var(--accent-text)',
        },
        success: { DEFAULT: 'var(--success)', fg: 'var(--success-fg)' },
        warning: { DEFAULT: 'var(--warning)', fg: 'var(--warning-fg)' },
        error: { DEFAULT: 'var(--error)', fg: 'var(--error-fg)' },
        info: { DEFAULT: 'var(--info)', fg: 'var(--info-fg)' },
      },
      fontFamily: {
        // client decision 2026-07-16: Spline Sans headings, General Sans body
        sans: ['"General Sans"', 'system-ui', 'sans-serif'],
        heading: ['"Spline Sans"', '"General Sans"', 'system-ui', 'sans-serif'],
        display: ['"Spline Sans"', '"General Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        display: ['var(--size-display)', { lineHeight: '1.1', fontWeight: '800' }],
        h1: ['var(--size-h1)', { lineHeight: '1.2', fontWeight: '700' }],
        h2: ['var(--size-h2)', { lineHeight: '1.25', fontWeight: '700' }],
        h3: ['var(--size-h3)', { lineHeight: '1.3', fontWeight: '600' }],
        'body-lg': ['var(--size-body-lg)', { lineHeight: '1.5', fontWeight: '500' }],
        body: ['var(--size-body)', { lineHeight: '1.5' }],
        small: ['var(--size-small)', { lineHeight: '1.4' }],
        label: [
          'var(--size-label)',
          { lineHeight: '1.3', letterSpacing: '0.04em', fontWeight: '500' },
        ],
      },
      spacing: {
        // 4px-base scale (§8) — keys match Tailwind's defaults, values come from tokens
        1: 'var(--space-1)',
        2: 'var(--space-2)',
        3: 'var(--space-3)',
        4: 'var(--space-4)',
        6: 'var(--space-6)',
        8: 'var(--space-8)',
        12: 'var(--space-12)',
        16: 'var(--space-16)',
      },
      borderRadius: {
        xs: 'var(--radius-xs)', // chips/badges
        sm: 'var(--radius-sm)', // inputs
        btn: 'var(--radius-btn)', // buttons
        md: 'var(--radius-md)', // cards
        lg: 'var(--radius-lg)', // sheets/drawers
        pill: 'var(--radius-pill)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
      },
      transitionDuration: {
        micro: 'var(--dur-micro)', // 150ms
        short: 'var(--dur-short)', // 300ms
        medium: 'var(--dur-medium)', // 500ms
      },
      transitionTimingFunction: {
        out: 'var(--ease-out)',
      },
      minHeight: {
        touch: '44px',
      },
      minWidth: {
        touch: '44px',
      },
    },
  },
  plugins: [],
} satisfies Config;
