# monologg/

The first brief-to-booking pipeline for the performing arts — a beta-scope PWA
plus an evergreen marketing site. Mobile-first, desktop-adaptive. Two audiences
(Talent and Client) sharing one design system.

This README is the final beta-hardening record: how to run the project, where
the business rules that are still unconfirmed by the product owner plug in, the
test and accessibility summary, and the full Conflict Ledger.

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
```

| Script | What it does |
|---|---|
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | Type-checks (`tsc -b`) then builds a production bundle to `dist/` |
| `npm run preview` | Serves the production build locally |
| `npm run lint` | ESLint across the project |
| `npm test` | Runs the full Vitest suite once |

**Demo accounts** (no real backend yet — see [What's mocked](#whats-mocked-vs-real)):

| Email | Password | Side |
|---|---|---|
| `adaeze@demo.monologg.app` | any 8+ characters | Talent |
| `tunde@demo.monologg.app` | any 8+ characters | Client |

The OTP screen accepts the demo code shown on-screen (`424242`).

**Try the full loop:** sign in as Tunde → post a project → book Adaeze → pay →
message in the order room → sign out → sign in as Adaeze → see the same brief
in Discover, the same booking in Bookings, the same conversation in Inbox.

---

## Where the unconfirmed business rules plug in

Three product decisions are still open with the founders (see the
[Conflict Ledger](#conflict-ledger-c1c11) below). Each is isolated to exactly
one config file — resolving the decision is a one-line change, and every
screen that displays or computes from it updates automatically.

### 1. Platform fees — `src/config/platformFees.ts`

```ts
export const PLATFORM_FEES: PlatformFees = {
  talentPct: 0.11,  // ⚠️ C1 — Source Docs say 11%; older PRD PDF says 9%
  clientPct: 0.15,  // ⚠️ C2 — Source Docs say 15%; older PRD PDF says 12%
};
```

Every fee figure in the app — the checkout summary (PWA-11/12), the order room
ledger (PWA-13), transaction history, and the rate-card preview — is computed
by [`computeFees()`](src/lib/money.ts) from this object. Nothing hardcodes
`0.11`/`0.15` or the literal strings `"11%"`/`"15%"`; percentage labels shown
in the UI are `Math.round(PLATFORM_FEES.talentPct * 100)`. Confirmed by test
(`src/lib/money.test.ts`): swapping in a different config object changes every
computed figure with no other code touched.

### 2. Payment rails — `src/config/paymentRails.ts`

```ts
export const PAYMENT_RAILS: Record<Region, readonly PaymentProvider[]> = {
  africa: ['paystack'],
  rest: ['stripe', 'airwallex'],
};
```

⚠️ **C4** — region-to-provider mapping is directionally confirmed (Paystack for
Africa, Stripe/Airwallex elsewhere) but not signed off. The older PRD PDF names
a different provider ("FINCRA"), which is a **placeholder only** — it does not
appear anywhere in the codebase (`grep -ri fincra src/` returns nothing) and
must never be hardcoded if it resurfaces in future source material. The
payout settings screen (SET-04) and the checkout payment overlay (PWA-12) both
read rails from this file via `regionForCountry()` in
[`src/lib/region.ts`](src/lib/region.ts).

### 3. KYC provider — not yet wired to a real provider

⚠️ **C5** — identity verification (the **Verified** badge) is specified to run
via **Smile Identity**, but this is unconfirmed and no integration exists yet.
`Creator.verification` (`unverified | processing | verified | failed`, in
[`src/types.ts`](src/types.ts)) is mocked: onboarding (PWA-04/05) flips it to
`processing` then `verified` after a timed delay, standing in for the real
webhook/callback. When Smile Identity (or an alternative) is confirmed, that
mock timer in [`src/creator/onboarding/StepProcessing.tsx`](src/creator/onboarding/StepProcessing.tsx)
is the only place to replace.

**Kept structurally distinct, everywhere, on purpose:**
- **Verified** (KYC/identity) — a `Badge variant="verified"`, always accent-colored, always paired with the word "Verified".
- **Celebrity/status** (referral-earned reputation, SET-06) — a separate star pill component (`CelebrityBadge` in [`src/creator/Storefront.tsx`](src/creator/Storefront.tsx)), different shape and color, own tooltip.
- **Thespian AI style tags** — free-text chips describing vibe, never identity. A creator can hold neither badge, one, or both; tags are unrelated to either.

### The 13 launch markets — `src/config/markets.ts`

Nigeria, Ghana, Mexico, USA, Canada, UK, India, Italy, Spain, France,
Australia, South Korea, China — each with currency and a formatting locale.
`formatMoneyForCountry()` in `src/lib/money.ts` renders every price using that
market's actual conventions (comma vs. decimal-comma grouping, symbol
placement). This list is not flagged in the Conflict Ledger — it's taken
directly from the Source Docs — but it's one file if the market list changes.

---

## Testing

```bash
npm test
```

**42 tests across 6 files, all passing:**

| File | Covers |
|---|---|
| `src/lib/money.test.ts` | `formatMoney` / `formatMoneyValue` / `toMinorUnits`; `formatMoneyForCountry` region formatting (NG, FR, unknown-country fallback); **`computeFees`** — both percentages independently, config-injection (proves no hardcoded literals), zero-base edge case, currency propagation, whole-unit rounding, and a simulated "C1/C2 resolved" scenario |
| `src/app/stores/waitlist.test.ts` | Sequential (not random) queue numbering, determinism, same-email re-join returns the existing entry, `leave()`, referral code shape |
| `src/app/stores/booking.test.ts` | Escrow state machine: starts `escrow_locked`; advances exactly one step per call through `deliverables_provided` → `payment_released`; **cannot skip a step**; **cannot advance past the terminal state**; no-ops on an unknown booking id; messages/live-call state are independent of escrow state |
| `src/app/stores/launch.test.ts` | Marketing hero toggle seeds from config and flips cleanly between the two valid states |
| `src/marketing/launchToggle.test.tsx` | **State A ↔ State B, proven by rendering**: State A shows the email widget and no live CTAs; State B shows both CTAs and no email field; re-rendering after a store flip swaps the DOM in place (no remount, no route change); the full Landing page renders end-to-end in both states without error |
| `src/test/a11y.test.tsx` | axe-core smoke tests (see below) |

### Fee-math correctness, specifically

The task called out "assert it reads config, not literals" — three tests do
this directly: one asserts output against `PLATFORM_FEES` **values** (so it
still passes after C1–C3 are resolved), one injects an arbitrary
`{ talentPct: 0.5, clientPct: 0.25 }` config and checks the output follows it
exactly, and one simulates resolving C1/C2 to the older PDF's `9%`/`12%` and
checks the math updates correctly with zero code changes.

---

## Accessibility

**Target: WCAG 2.2 AA, both themes (light/dark), both audiences (Talent
Coral/Client Navy).**

### 1. Contrast — audited by hand, not guessed

Every foreground/background pairing used anywhere in the token system (41
pairings: body text, muted text, both audiences' buttons and links in both
themes, all four status colors, control borders, focus rings) was measured and
recorded in `MONOLOGG_DESIGN_SYSTEM-2.md` §3.7. The results are load-bearing —
e.g. `--accent-text` exists *because* the raw brand hexes (`#FF5A5F` coral,
`#4C4CE0` indigo) fail AA as text on light surfaces (2.71:1), and the warning/
pending status color is documented to pair with **Ink** text only, never white
(white-on-amber fails). Components consume these as semantic Tailwind classes
(`text-accent-text`, `bg-warning`/`text-warning-fg`, …) — never a raw hex — so
it isn't possible to accidentally reintroduce a failing pairing without also
changing the token file.

Automated color-contrast checking is **not** run in CI/jsdom (see below for
why) — this hand audit is the source of truth for contrast.

### 2. axe-core — integrated two ways

**In tests** (`src/test/a11y.test.tsx`, runs on every `npm test`): `jest-axe`
against rendered output of the component showcase (buttons, forms, badges,
cards, tabs, escrow bar), the `Modal` (open state — verifies `role="dialog"`,
`aria-modal`, and that focus actually lands inside the panel), badge labeling,
the Register screen (audience radiogroup + labelled inputs), and a settings
screen (`PageShell` + `Toggle` switches).

**Results: 0 violations across all 6 axe runs**, on every screen tested.

**In dev, live in the browser** (`src/app/DevAxeWatcher.tsx`, mounted in
`router.tsx`): runs real `axe-core` against the actual rendered DOM on every
route change while `npm run dev` is running, logging violations to the
browser console (grouped, color-coded). Open the app, open DevTools console,
navigate around — every screen self-reports.

> **Why not `@axe-core/react`?** Its own README states it does **not** support
> React 18+ (it patches legacy `ReactDOM` internals). This project is on React
> 18, so wiring it in would be broken tooling dressed up as done. `DevAxeWatcher`
> runs the same underlying `axe-core` engine directly against the DOM instead —
> framework-agnostic, no React-version coupling, and confirmed to add **zero
> bytes to the production bundle** (`grep -c axe-core dist/assets/*.js` → `0` —
> Vite statically eliminates the dynamic import once `import.meta.env.DEV` is
> `false`).

**Why `color-contrast` is disabled in both:** jsdom (tests) doesn't paint
pixels, so axe's contrast rule has nothing real to sample and produces noise,
not signal. In the live dev watcher it's disabled for the same reason contrast
tools generally need a stable, settled paint — it would otherwise fire on
half-rendered intermediate states during route transitions. Real contrast
correctness comes from §1 above; run the browser's own axe DevTools extension
manually for an independent third check if desired.

### 3. Structural a11y built in from the component layer up

- **Keyboard**: every interactive primitive (`Button`, `IconButton`, `Tabs`,
  `Toggle`, `MultiSelectChips`, directory filter pills, onboarding niche/type
  cards) is a real `<button>` or uses correct ARIA roles (`radiogroup`/`radio`,
  `switch`, `tablist`/`tab` with roving `tabindex` and arrow/Home/End
  navigation) — nothing is a `<div onClick>`.
- **Visible focus**: a global `:focus-visible` ring (`--focus` token, AA
  contrast in both themes) applies everywhere; nothing suppresses the outline.
- **Focus trapping**: `Modal` traps Tab/Shift+Tab inside the panel, moves
  focus in on open, restores it to the trigger on close, and closes on Escape
  or backdrop click — covered by the axe test above and used for every
  drawer/sheet (payment overlay, scheduling slot picker).
- **`prefers-reduced-motion`**: a single global rule in `globals.css` collapses
  all animation/transition duration to near-zero for users who've asked for
  it — scroll-reveal, modal entrances, hover lifts, all of it.
- **44px touch targets**: enforced via a `min-h-touch`/`min-w-touch` Tailwind
  utility (44px) used on every tappable element, including icon-only buttons.
- **Labelled controls**: every form control goes through the shared `Field`
  wrapper, which wires `htmlFor`/`id`, `aria-describedby` for helper/error
  text, and `aria-invalid` — confirmed by the axe test's explicit
  `getByLabelText` assertions on the Register form.
- **Status is never color-only**: every `Badge` renders an icon **and** a text
  label alongside its color (confirmed by test), per the design system rule.

---

## Responsive — 320px → 1440px, no horizontal scroll

Verified by structural review (documented here since a real multi-viewport
visual pass needs a browser, which this environment doesn't have):

- No arbitrary fixed pixel widths anywhere in the codebase
  (`grep -rn "w-\[[0-9]\+px\]"` → 0 matches) — every layout uses relative units,
  `max-w-*` containers, or `flex-wrap`.
- Multi-column grids all collapse to a single column below their `sm:`/`lg:`
  breakpoint (directory results, testimonials, footer, blog index, storefront
  layout) — none apply a fixed 2–3 column grid unconditionally.
- The two genuinely fixed-width grid columns in the app (`Payout Settings`'
  currency select, the checkout budget-slider currency select) are ~110–120px
  next to a flexible column — sized for a 3–4 character currency code, not a
  risk at 320px.
- Intentional horizontal scrollers (the scheduling date strip, the checkout
  slot-date strip, the kitchen-sink spacing scale) are explicitly
  `overflow-x-auto`, scoped to their own container — they scroll internally
  and never force the page to scroll horizontally.
- **Found and fixed during this pass**: the referral link in
  `ReferralProgramme.tsx` rendered a raw URL as unwrapped monospace text — a
  real overflow risk at 320px on a long link. Now has `break-all`. Everywhere
  else `font-mono` is used, it's on bounded values (money, dates, short IDs,
  file sizes) that can't realistically overflow.

---

## What's mocked vs. real

Transparency for whoever picks this up next — this is a beta-scope frontend
build; the following are intentionally simulated pending a real backend:

| Area | Status |
|---|---|
| Auth | `src/auth/mockAuthApi.ts` — in-memory, two seeded demo accounts, any email "exists" check is a local Map. Session persists via `localStorage` (real behavior); the account data itself does not survive a hard reload for freshly-registered users. |
| KYC / Verified badge | Timed mock in onboarding (see §3 above) — no real Smile Identity or equivalent call. |
| Thespian AI style tags | Deterministic per-niche mock list — no real audio/video analysis. |
| Payments | Checkout collects card/bank input and validates its *shape* (zod), but never calls Paystack/Stripe/Airwallex — no real charge occurs. |
| Notifications | Toasts + a seeded Notification Centre; no real SendGrid/Twilio delivery. |
| Google Meet | `Booking.meetUrl` is a plausible-looking generated string, not a real Meet API call. |
| Directory / briefs | `src/client/mockDirectory.ts` — 8 seeded creators; briefs posted in a session are held in-memory (Zustand), not persisted server-side. |

Everything else — the component library, design tokens, routing/guards, form
validation, fee math, the escrow state machine, and the settings/system
screens — is real, working application logic, not a mock.

---

## Conflict Ledger — C1–C11

Carried forward from the PRD for the product owner. Where the Source Docs and
the older PRD PDF disagree, this build follows the Source Docs and flags the
conflict inline with `// TODO(conflict: Cx)` wherever it touches code.

| # | Topic | Source Docs / Brand Strategy (what this build uses) | Older PRD PDF / design files (the conflict) | Needs a decision? |
|---|---|---|---|---|
| **C1** | Talent booking fee | **11%** on successful bookings | 9% engine deduction | **Yes** — confirm 11% vs 9% |
| **C2** | Client booking fee | **15%** in successful booking fees | 12% escrow processing fee | **Yes** — confirm 15% vs 12% |
| **C3** | Fee split (alt figure) | 11%/15% table treated as operative | A separate table lists "10% from talent + 10% from client" | **Yes** — reconcile 11%/15% vs 10%/10% |
| **C4** | Payment rails | **Paystack** (Africa), **Stripe & Airwallex** (rest of world) | Names a different provider ("FINCRA") | **Yes** — confirm rails; the older name must never be hardcoded (verified clean, see above) |
| **C5** | KYC provider | **Smile Identity** (marked "???" — unconfirmed in source); Thespian AI is style-tagging only, never identity | An older doc calls Thespian AI "quasi-KYC" | **Yes** — confirm Smile Identity; keep style-tagging and identity verification distinct in all copy/UI (done — see badge section above) |
| **C6** | Brand personality | "Sprightly and quirky — energetic, a little playful, warm, human, theatrical" | An older design doc says "not playful… never loud" | Resolved — brief followed |
| **C7** | Typography | Sans-serif preferred | An older doc specifies a display serif (DM Serif Display) | Resolved — sans-serif used throughout (Spline Sans headings / General Sans body, per a later client decision superseding the design doc's Inter) |
| **C8** | Visual mode | Clean, modern, vibrant, "lickable," light UI-led | An older doc specifies cinematic dark-gold as primary | Resolved — light-first with full dark mode |
| **C9** | Palette | Directional: Ink Navy / Cue Coral / Stage Cream (marked "for client sign-off") | Red/Purple/Green/Gold, or dark-gold | **Yes** — palette hexes in `globals.css`/design doc §3 are directional, pending final sign-off |
| **C10** | Booking-fee wording | Treated as **two-sided**: talent pays 11%, client pays 15% | A single-fee reading ("11% on successful bookings") also appears | **Yes** — confirm the two-sided model (this build assumes it; `computeFees()` charges both sides independently) |
| **C11** | Subscriptions | Creator $10/mo (Thespian AI, custom domain, in-app email, badge), Client $100/mo (AI cast-management, HRIS, brief-to-cast automation) | Not present in the older PRD PDF | **Yes** — confirm in/out of beta scope; **not built** in this pass — named here per the PRD instruction so it isn't lost, data model (`EngagementType`, retainer support) leaves room for it |

**Net: 8 of 11 items (C1–C5, C9–C11) still need an explicit product-owner call.**
C6–C8 were resolved by the brand brief this build followed and require no
further action.

---

## Project structure

```
src/
  app/         router, guards (RequireAudience), theme/audience providers,
               Zustand stores, dev-only a11y watcher
  marketing/   evergreen site — landing, how-it-works, blog (WEB-01..05)
  auth/        register/sign-in/OTP/forgot (PWA-01)
  creator/     onboarding + storefront + scheduling + bookings (PWA-02..08)
  client/      brief form, directory, checkout (PWA-09..12)
  shared/      order room, settings (SET-01..06), system screens (SYS-01..05)
  components/  20 design-system primitives — every one reads semantic tokens
               only, ships default/hover/focus/active/disabled/loading/
               success/error, meets the 44px touch target
  config/      platformFees · paymentRails · markets · launch — see above
  lib/         money formatting + fee math, region detection, utils
  styles/      globals.css — every CSS-variable token, both themes, both
               audiences
  test/        Vitest setup (jsdom mocks) + axe accessibility tests
```

See `log.md` (build history), `bug.md` (issues found and fixed), and
`process.md` (the same history in plain language) for how this was built,
step by step.
