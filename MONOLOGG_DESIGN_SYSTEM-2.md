# Monologg — Brand & Design System

**Direction:** Modern marketplace — clean, vibrant, premium, "fun yet serious"
**UI references:** Wise (clarity & trust) · Spotify (confident color & motion) · Revolut (fintech polish)
**Landing references:** FintechX (light, premium, conversion-led) + recent.design catalogue
**Status:** Working system, built from the Brand Strategy doc's directional palette — for client sign-off (see §3)
**Purpose:** The single source of truth for how Monologg looks, sounds, and feels across product and marketing. Hand this to any design/AI/build tool (Antigravity, v0, Figma AI, Framer AI) alongside `prd.md`.

> **Where this system comes from.** The Brand Strategy document is authoritative. It calls for a personality that is **sprightly and quirky — energetic, warm, human, a little theatrical, never corporate** — expressed through a **clean, modern, vibrant, "lickable," sans-serif, UI-led** aesthetic, with the **"m/" and "/"** script-punctuation motif. It gives a *directional* palette (Ink Navy / Cue Coral / Stage Cream) explicitly "for client sign-off." This document turns that direction into a complete, accessible, dual-audience token system, tuned to the Wise/Spotify/Revolut references and the light-first brief. Palette hexes are proposals to confirm (§3).

---

## 1. Brand overview

**What Monologg is:** the first brief-to-booking pipeline for the performing arts — connecting creators (actors, comedians, compères, voice-over artists, MCs, and the wider performative community) directly with the production houses and event planners who cast them. No agents, no 20%+ commissions, no weeks of manual searching.

**Name origin:** from *monologue* — one uninterrupted voice, taking the stage. The forward-slash (`/`) is drawn from monologue-script punctuation and is the brand's core visual motif; `m/` is the lettermark seed (see §5).

**Personality — the one-line brief:**
> Sprightly and quirky, warm and human — premium and classy, but never stiff. Fun yet serious. It belongs in the same room as the creators it serves.

**Where it sits (relative to its references):**
- Warmer and more human than **Wise**, but borrows its clarity and trust.
- As confident with color and motion as **Spotify**, but calmer inside the product.
- As polished as **Revolut**, but friendlier and less "meme-y" — this product moves people's money and books their careers, so trust is non-negotiable.

**Two audiences, one system:**
- **Talent / Creators** (performers booking gigs) → signalled by **Talent Coral**.
- **Clients / Casting** (production houses, event planners) → signalled by **Client Navy**.
- Each app commits fully to its own accent. The **marketing site is the only surface where both appear together** (the role-picker / persona split).

**Desired feeling:** relief, and a sense of belonging to a community — finally having a system on your side.

---

## 2. Voice & tone

The Brand Strategy voice, made practical. Warm and human, confident without being corporate, playful and a little theatrical — but calm and clear inside the product.

**Principles:**
- Warm and human, never bureaucratic — even when talking about contracts or escrow.
- Confident, not corporate. Playful, not cutesy. A little theatrical, never a clown.
- Short and declarative in marketing; calm and instructional in product UI.
- Sparing with exclamation points; the confidence carries the energy, not the punctuation.

**Tone by context:**

| Context | Tone |
|---|---|
| Marketing / social headlines | Bold, warm, short (3–6 words per line); a little theatrical |
| Product UI copy | Calm, clear, functional — friendly but out of the way |
| Confirmations / success | Warm and brief — "Booked", "Paid", "Signed", "You're on" |
| Errors / warnings | Direct, never alarmist — state the fact, state the fix, stay kind |
| Empty states | Encouraging and human — invite the next action, with a wink |

**Core messaging idea (from the strategy doc):** performing is fun; running a performing-arts business shouldn't be a second, unpaid job. Monologg takes care of the boring part so creators can keep having fun on the job.

**Approved copy bank (style reference):**

*Talent-facing (Coral):*
- "An agent in your pocket. Minus the 20%."
- "Your stage. Your terms. Your money."
- "Stop chasing gigs. Start getting booked."
- "Paid on time. Every time."
- "Built for the stage, not the spreadsheet."

*Client-facing (Navy):*
- "One brief. Any stage. Booked."
- "Casting shouldn't take weeks."
- "Find your next MC before lunch."
- "Real talent. Really fast."

*Trust / confirmation (status green):*
- "Escrow secured. Show confirmed. You're on."
- "Booked, signed, and paid — before the coffee went cold."

*Core brand line:* **"Book the room. Get paid on time."**

**Words that fit:** sprightly, warm, confident, clear, human, vibrant, community-driven, trustworthy, a little theatrical.
**Words to avoid:** corporate, bureaucratic, twee, cutesy, stiff, gimmicky, exclamation-heavy.

---

## 3. Color system (directional — for sign-off ⚠️)

Built from the strategy doc's three directional colors (Ink Navy, Cue Coral, Stage Cream), extended into a full accessible system with a second audience accent and semantic states. **Confirm these hexes with the client** (Brand Strategy §8 lists palette as an open item).

### 3.1 Brand core

| Token name | Hex | Role |
|---|---|---|
| **Talent Coral** | `#FF5A5F` | Talent/creator brand accent — highlights, active states, large display, marketing; also coral **text on dark** surfaces (passes AA) |
| **Talent Coral Deep** | `#DC2F35` | Talent **button fill** with white label (AA-safe; the bright coral fails AA under white text at normal size) |
| **Talent Coral Text** | `#C4262C` | Coral **text/links on light** surfaces (bright coral fails as light-mode text; use this instead) |
| **Client Navy** | `#1A1A2E` | Client/casting accent — CTAs, active states on the client app; also the deep-ink brand anchor |
| **Client Navy Bright** | `#4C4CE0` | Brightened navy/indigo for client CTAs where deep navy is too low-energy as a fill |
| **Client Indigo (dark text)** | `#8A8AF5` | Client accent **text on dark** surfaces (the `#4C4CE0` fill fails AA as text on elevated dark cards; use this for text/links in dark mode) |
| **Stage Cream** | `#F4F1EC` | Warm off-white — the signature "lickable" light canvas |
| **Ink** | `#14141F` | Primary text / near-black surfaces (softer than pure black) |

> Note on Client Navy: `#1A1A2E` is authoritative from the strategy doc as the *ink/anchor*. As a **button fill** it can read heavy, so client CTAs use a brighter indigo derived from it (`#4C4CE0`) while navy stays the text/anchor. Confirm both.

### 3.2 Semantic status (shared, status-only — never decorative)

| Token | Light hex | Role |
|---|---|---|
| **Success / Confirmed / Paid** | `#0E7D52` | "confirmed", "paid", "signed", "escrow released", "available" |
| **Warning / Pending / In-escrow** | `#F2A93B` | "pending", "in escrow", "awaiting", "processing" — pairs with **Ink** text, not white |
| **Error** | `#D93A3F` | destructive errors, payment failures |
| **Info** | `#3E7BFA` | informational banners, tips |

Status is **always color + icon + label**, never color alone (accessibility + the brand's clarity promise). Success and error hexes above are tuned so **white label text passes AA at normal size**; the warning/pending amber pairs with **Ink** text (white on amber fails AA).

### 3.3 Neutrals

| Token | Light | Dark |
|---|---|---|
| `--bg` (canvas) | `#F4F1EC` Stage Cream | `#0E0E14` |
| `--surface` (cards) | `#FFFFFF` | `#17171F` |
| `--surface-2` (elevated) | `#FAF8F3` | `#20202A` |
| `--text` | `#14141F` Ink | `#F5F3EE` |
| `--text-muted` | `#5B5B66` | `#A9A7B0` |
| `--border` | `#E6E2D9` | `#2A2A34` |
| `--border-control` (inputs, toggles — needs 3:1) | `#8A8479` | `#66666F` |
| `--divider` | `#EFEBE2` | `#22222C` |
| `--focus` | `#3E7BFA` | `#6C9BFF` |

### 3.4 The two-audience accent binding

Components never hardcode Coral or Navy. They read `--accent`, `--accent-hover`, and `--accent-fg`, which are bound at the app root:

```css
/* creator app */
:root[data-audience="talent"] {
  --accent:        #FF5A5F;  /* Talent Coral — accents, active states, icons, dark-mode text */
  --accent-solid:  #DC2F35;  /* AA-safe fill for buttons with white text */
  --accent-hover:  #C42D31;
  --accent-fg:     #FFFFFF;
  --accent-text:   #C4262C;  /* coral text/links on LIGHT surfaces (AA normal text) */
}
:root[data-audience="talent"].dark { --accent-text: #FF5A5F; } /* coral text on dark (AA) */

/* client app */
:root[data-audience="client"] {
  --accent:        #4C4CE0;  /* brightened Client Navy/indigo */
  --accent-solid:  #4C4CE0;  /* AA-safe under white (6.14:1) */
  --accent-hover:  #3A3AC4;
  --accent-fg:     #FFFFFF;
  --accent-text:   #4C4CE0;  /* indigo text on LIGHT surfaces (AA) */
}
:root[data-audience="client"].dark { --accent-text: #8A8AF5; } /* brighter indigo text on dark (AA) */

/* Buttons fill with --accent-solid; icons/active states use --accent;
   colored TEXT/LINKS use --accent-text (theme-aware). Never put --accent (raw) text
   on a light surface — it fails AA. */
```

### 3.5 Usage rules
- **Coral = talent, Navy = client — always, everywhere, no exceptions.** The only place both appear together is the marketing role-picker / persona split.
- **Status colors are status-only.** Green/gold/red/blue must map to a real state, never decoration.
- **Light-first.** Product surfaces are Stage Cream / white (light) or near-black (dark); accent is used on CTAs, active states, icons, and small blocks — not as full-bleed product backgrounds. Full-bleed accent belongs to marketing (§6, Mode B).
- **Dark mode keeps accents vivid** — do not desaturate Coral or the client indigo; only surfaces and text invert.

### 3.6 Accessibility rules (verified — see §3.7 audit)
These are not aspirational; every pairing below was contrast-tested. Follow them exactly:
- **Colored text/links** use `--accent-text` (theme-aware), **never** raw `--accent`. Bright coral `#FF5A5F` and indigo `#4C4CE0` **fail AA as text on light surfaces** — that's why `--accent-text` exists (coral `#C4262C` light / `#FF5A5F` dark; indigo `#4C4CE0` light / `#8A8AF5` dark).
- **Buttons** fill with `--accent-solid` + white; never fill a button with raw bright coral (fails AA under white).
- **Amber (warning/pending)** always pairs with **Ink** text, never white.
- **Input/control borders** use `--border-control` (3:1), not the softer decorative `--border` (which is for dividers only, where 3:1 isn't required).
- All body text meets **4.5:1**; large text and UI components meet **3:1** (WCAG 2.2 AA), in **both** light and dark, for **both** audiences.

### 3.7 Contrast audit results
Full audit of 41 pairings across both modes and both audiences. All pass at their required level after the fixes above:

| Pairing | Light | Dark |
|---|---|---|
| Body text on canvas / surface | 16.2–18.3 ✅ | 14.6–17.4 ✅ |
| Muted text on surface | 6.0–6.7 ✅ | 7.5–8.1 ✅ |
| Talent button (white on coral-deep) | 4.67 ✅ | 4.67 ✅ |
| Client button (white on indigo) | 6.14 ✅ | 6.14 ✅ |
| Coral text (`--accent-text`) | 5.09 ✅ | 5.84 ✅ |
| Indigo text (`--accent-text`) | 5.45 ✅ | 5.97 ✅ |
| Success (white on green) | 5.15 ✅ | 5.15 ✅ |
| Warning (ink on amber) | 9.15 ✅ | 9.63 ✅ (text on bg) |
| Error (white on red) | 4.54 ✅ | 4.54 ✅ |
| Info (white on blue) | 3.88 (large/UI) ✅ | 4.96 ✅ |
| Control border | 3.71 ✅ | 3.13 ✅ |
| Focus ring | 3.88 ✅ | 7.12 ✅ |

*Note:* raw bright coral-on-light-text (2.71) and raw indigo-on-dark-surface-text (2.90) intentionally do **not** appear in the system — `--accent-text` replaces both. Info-on-white is AA for large text / UI only; use info blue for banners/icons with an accompanying label, not for small body text on white.

---

## 4. Typography

The strategy doc calls for **sans-serif** — cleaner, more modern, app-led. One family carries the whole product; an optional characterful sans handles big display moments without breaking the system.

**Primary family:** **Inter** (400, 500, 600, 700, 800). Fallback: system-ui, Helvetica, Arial.
**Optional display sans (marketing only):** a slightly more characterful geometric sans (e.g. **Clash Display** or **General Sans**) for oversized statement headlines — used *only* in Mode B. If in doubt, Inter 800 covers it; never introduce a serif or script.
**Monospace (amounts, IDs, OTP):** **IBM Plex Mono** (400, 500).

| Role | Size | Weight | Notes |
|---|---|---|---|
| Marketing Display | 56–88px | 700–800 | Mode B only; tight leading (1.05–1.1); 2–3 short lines |
| Display / H1 | 32–40px | 700 | Page & hero titles |
| H2 | 24–28px | 700 | Section / card-group titles |
| H3 | 20px | 600 | Component titles |
| Body Large | 16px | 500 | Primary body, CTA labels |
| Body | 14px | 400 | Standard UI text |
| Small | 12–13px | 400 | Captions, timestamps, helper text |
| Label | 12px | 500 | Uppercase, +0.04em tracking — field labels, tab labels |
| Mono / Data | 14–22px | 500 | Prices, booking IDs, escrow figures, OTP |

**Rules:**
- Headlines are Ink (or off-white in dark) — never colored, except a single accent line inside a multi-line marketing headline.
- Prices, escrow amounts, and booking IDs always use the mono face (fintech-grade legibility, tabular feel).
- Never more than the one text family per execution (plus mono for data). No serif, no script, no decorative display fonts.
- Line-height 1.4–1.6 for body; 1.05–1.2 for display.

---

## 5. Motif & pattern — the cue-slash `/`

Drawn from monologue-script punctuation. This is the brand's recurring device.

- **Wordmark:** `monologg/` — the slash is the fixed terminal mark.
- **Lettermark / app-icon seed:** `m/`.
- **Divider:** the `/` separates UI elements (breadcrumbs, meta rows, inline labels).
- **Secondary punctuation family:** `...` (ellipsis) for loading / "more to come" / pending; `–` (dash) for progress rules and section underlines.
- **Pattern:** a repeating diagonal-slash texture (consistent bottom-left → top-right stroke, rounded caps). Two colorways:
  - **Light:** Stage Cream background, Talent Coral slashes.
  - **Dark:** near-black background, alternating Coral and client indigo slashes.
- Use the pattern on marketing collateral, section dividers, merch, empty-state backdrops — **never** as a full-screen texture behind functional product UI (too busy).

---

## 6. Visual style — two modes

Same tokens, two registers. The rule of thumb: **inside the app → Mode A. Marketing, social, OOH → Mode B. Never mix.**

### Mode A — Product UI (Wise / Spotify / Revolut-inspired)
- **Light-first.** Backgrounds are Stage Cream / white (light) or near-black (dark). Accent is used on CTAs, active states, icons, and small blocks — never as a full-bleed product background.
- **Cards:** 12px radius, soft shadow (`0 2px 8px rgba(20,20,31,0.06)`), no heavy borders. This is the "lickable" surface — rounded, warm, tactile.
- **Buttons:** 10px radius, solid `--accent-solid` fill with `--accent-fg` text, 150ms hover.
- **Status:** always color + icon + label together.
- **Motion:** minimal, fast (150–300ms), functional — never bouncy. One signature moment allowed: the Verified-badge reveal on onboarding completion.
- **Layout:** grid-based, generous whitespace, clear hierarchy. A banking app, not a poster.

### Mode B — Marketing / brand expression
- **Full-bleed color blocking:** Coral, client indigo/navy, or near-black filling the canvas.
- **Oversized display type** (56–88px, 700–800), 2–3 short lines, often one line in a contrasting accent.
- **Duotone photography:** a single accent color over black-and-white performer imagery — theatrical, spotlight-lit; no messy full-color, no gradients, no drop shadows.
- **"Spotlight" shapes:** soft flat-color circles (no blur/glow) as a recurring stage-lighting device.
- **Status badges** (CONFIRMED / IN ESCROW) can appear as a trust/proof device — same color logic as product.
- The cue-slash pattern can be a full-bleed background texture **in this mode only**.

---

## 7. Landing page — evergreen, light-first (FintechX-informed)

The marketing site follows the FintechX pattern (clean light UI, premium, conversion-led, trust-forward) rendered in Monologg's voice and palette. One fixed layout; a single hero toggle swaps waitlist ↔ live with no rebuild.

**Section order (top → bottom):**
1. **Sticky nav** — `monologg/` logo · Find Talent · Post a Project · How it Works · Sign In · **Launch Your Storefront →**.
2. **Hero** — warm headline (core line: *"Book the room. Get paid on time."*) + subhead + social-proof stat strip.
   - *State A (waitlist):* inline email widget → on submit transitions in place to *"You are Number #{XYZ} in the verification queue. Share your link to climb the roster."* + copy-link / share.
   - *State B (live):* two CTAs — Primary "Post a Project / Find Talent", Secondary "Launch Your Storefront".
3. **Product preview** — a real storefront card + order-room mock (dashboard-preview device, like FintechX's finance dashboard).
4. **Persona split — "Who it's for"** — the single surface where both accents appear: a **Talent Coral** panel ("For creators") and a **Client Navy** panel ("For casting"). This doubles as the role picker.
5. **How it works** — 3 steps: brief → book → get paid (escrow), with the `/` motif between steps.
6. **Trust & escrow** — security messaging, escrow explainer, payment-partner logos (region-aware), verified-badge explainer.
7. **Testimonials** — performer + casting quotes, warm and specific (use the approved copy bank's testimonial style).
8. **Final CTA** — restate the core line; waitlist or live CTA per state.
9. **Footer** — links, socials (IG/TikTok/LinkedIn + community channel), the `monologg/` mark.

**Feel:** light, premium, vibrant, trustworthy; subtle appear/scroll motion (reduced-motion safe); desktop 1440 + mobile 375; full light/dark.

---

## 8. Layout, spacing & components (Mode A)

**Grid:** 4px base unit. 12-column, 24px gutter (desktop) / 16px (mobile). Max content width 1200px.
**Spacing scale:** 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64px.
**Radius:** 4 (chips/badges) · 8 (inputs) · 10 (buttons) · 12 (cards) · 16 (sheets/drawers) · 999 (pills).

**Components (quick spec):**
- **Buttons:** 48 / 40 / 36px heights; 10px radius; `--accent-solid` fill; 150ms hover (→ `--accent-hover`). Variants: primary, secondary, outline, ghost, danger.
- **Cards:** 12px radius, 16px padding, `0 2px 8px rgba(20,20,31,0.06)`; hover → `0 8px 20px rgba(20,20,31,0.10)` + `translateY(-2px)`.
- **Inputs:** 44px height, 8px radius, `--border` border, focus ring in `--focus` (or `--accent` on branded forms).
- **Rate cards (storefront):** 12px radius, vertical stack, price in mono, one clear "Book" action — link-in-bio energy.
- **Status badges:** 4px radius (sharp, fintech), 12px/500 label, color + icon + text.
- **Escrow progress bar:** 3 stepped nodes — [Escrow Locked] → [Deliverables Provided] → [Payment Released]; completed = success green, current = accent, upcoming = muted.
- **Icons:** outline, 2px stroke, 24px default (lucide-react).

**Motion:** 150ms micro, 300ms section, 500ms modal/sheet; easing `ease-out` for entrances; never bouncy/elastic. Respect `prefers-reduced-motion`.

---

## 9. Dark mode

| Light | Dark |
|---|---|
| `#F4F1EC` / `#FFFFFF` surfaces | `#0E0E14` / `#17171F` |
| `#14141F` Ink text | `#F5F3EE` off-white text |
| Talent Coral, client indigo, status colors | **Unchanged — do not desaturate** |
| `0 2px 8px rgba(20,20,31,0.06)` shadow | `0 2px 8px rgba(0,0,0,0.40)` |

Dark is a first-class theme for both audiences. Only surfaces, text, borders, and shadow depth change; accents stay vivid. Respect `prefers-color-scheme`; manual toggle overrides and persists.

---

## 10. Do's & don'ts

**Do:**
- Coral for talent, Navy/indigo for client — consistently, everywhere.
- Keep status colors strictly for real states (confirmed/paid, pending/escrow, error, info).
- Use Mode A (clean, light, Wise/Spotify/Revolut) inside the product.
- Use Mode B (bold, full-bleed, theatrical) for marketing, social, OOH.
- Let the voice be warm, sprightly, and human — confident without shouting.
- Use the `/` and `m/` motif as the recurring signature.

**Don't:**
- Don't use accent colors as full-bleed backgrounds inside the product.
- Don't use status colors decoratively.
- Don't add gradients, glows, or blur — surfaces are flat, warm, and clean.
- Don't introduce a serif, script, or a second text family (Inter + mono only).
- Don't slip into corporate stiffness *or* cutesy exclamation-heavy copy — the brand is fun **and** serious.
- Don't hardcode Coral/Navy in components — read `--accent` / `--accent-solid`.

---

## 11. Design tokens (for direct implementation)

```css
/* ---------- NEUTRALS (light) ---------- */
--bg:          #F4F1EC;   /* Stage Cream canvas */
--surface:     #FFFFFF;
--surface-2:   #FAF8F3;
--text:        #14141F;   /* Ink */
--text-muted:  #5B5B66;
--border:      #E6E2D9;   /* decorative dividers only */
--border-control: #8A8479; /* inputs/toggles — meets 3:1 as a UI component */
--divider:     #EFEBE2;
--focus:       #3E7BFA;

/* ---------- NEUTRALS (dark, under .dark) ---------- */
--bg-dark:         #0E0E14;
--surface-dark:    #17171F;
--surface-2-dark:  #20202A;
--text-dark:       #F5F3EE;
--text-muted-dark: #A9A7B0;
--border-dark:     #2A2A34;
--border-control-dark: #66666F;
--divider-dark:    #22222C;
--focus-dark:      #6C9BFF;

/* ---------- BRAND ACCENTS ---------- */
--talent-coral:      #FF5A5F;   /* brand accent / marketing / active / dark-mode text */
--talent-coral-deep: #DC2F35;   /* AA-safe button fill (white text) */
--talent-coral-text: #C4262C;   /* coral text/links on LIGHT surfaces (AA) */
--client-navy:       #1A1A2E;   /* ink anchor / text */
--client-indigo:     #4C4CE0;   /* AA-safe client button fill + light-mode text */
--client-indigo-text-dark: #8A8AF5; /* indigo text/links on DARK surfaces (AA) */
--stage-cream:       #F4F1EC;

/* accent binding (set --accent* per audience via data-audience; --accent-text is theme-aware) */
/* talent light: --accent #FF5A5F / --accent-solid #DC2F35 / --accent-hover #C42D31 / --accent-fg #FFF / --accent-text #C4262C */
/* talent dark:  --accent-text #FF5A5F */
/* client light: --accent #4C4CE0 / --accent-solid #4C4CE0 / --accent-hover #3A3AC4 / --accent-fg #FFF / --accent-text #4C4CE0 */
/* client dark:  --accent-text #8A8AF5 */

/* ---------- STATUS (color + icon + label only) ---------- */
--success: #0E7D52;   /* confirmed / paid / released — white text AA-safe */
--warning: #F2A93B;   /* pending / in escrow — INK text, not white */
--error:   #D93A3F;   /* white text AA-safe */
--info:    #3E7BFA;

/* ---------- TYPOGRAPHY ---------- */
--font-sans: "Inter", system-ui, sans-serif;
--font-display: "Clash Display", "Inter", sans-serif;  /* Mode B only */
--font-mono: "IBM Plex Mono", monospace;
--size-display: 72px;  /* range 56–88, Mode B */
--size-h1: 36px; --size-h2: 26px; --size-h3: 20px;
--size-body-lg: 16px; --size-body: 14px; --size-small: 12px; --size-label: 12px;

/* ---------- SPACING ---------- */
--space-1:4px; --space-2:8px; --space-3:12px; --space-4:16px;
--space-6:24px; --space-8:32px; --space-12:48px; --space-16:64px;

/* ---------- RADIUS ---------- */
--radius-xs:4px; --radius-sm:8px; --radius-btn:10px;
--radius-md:12px; --radius-lg:16px; --radius-pill:999px;

/* ---------- ELEVATION (Mode A only) ---------- */
--shadow-sm: 0 2px 8px rgba(20,20,31,0.06);
--shadow-md: 0 8px 20px rgba(20,20,31,0.10);
--shadow-dark-sm: 0 2px 8px rgba(0,0,0,0.40);

/* ---------- MOTION ---------- */
--dur-micro:150ms; --dur-short:300ms; --dur-medium:500ms;
--ease-out: cubic-bezier(0.22, 0.61, 0.36, 1);
```

---

## 12. Prompt-ready summary (for image/design AI)

> Monologg is the first brief-to-booking platform for performing artists — sprightly, warm, and premium ("fun yet serious"). Product UI is light-first and "lickable," in the spirit of Wise, Spotify, and Revolut: warm Stage Cream (#F4F1EC) and white surfaces, rounded 12px cards, soft shadows, generous whitespace, functional color. Talent-facing surfaces use Talent Coral (#FF5A5F, buttons #DC2F35); client-facing surfaces use Client Navy/indigo (#1A1A2E / #4C4CE0). Status colors are used only for real states: green confirmed/paid, amber pending/in-escrow, red error. Typography is Inter (sans-serif) with IBM Plex Mono for prices and escrow figures — never a serif. The signature motif is the cue-slash "/" and lettermark "m/" from monologue scripts. Marketing/brand expression is bolder: full-bleed Coral, indigo, or near-black; oversized confident display type; duotone spotlight-lit performer photography; flat "spotlight" circles; the diagonal cue-slash pattern. No gradients, no glows, no blur, no serif. Full light and dark mode. Warm, confident, community-driven — never corporate, never cutesy.

---

**End of file.** Feed this to any design/build tool alongside `prd.md`. Palette hexes (§3) are directional per the Brand Strategy doc and await client sign-off.
