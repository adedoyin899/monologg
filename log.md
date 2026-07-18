# Monologg — Build Log

A running map of the project: what's done, what's in progress, and what's still ahead.
Updated continuously as we build.

_Last updated: 2026-07-16_

---

## ✅ Done

- **2026-07-16** — Project brief confirmed. Ground rules locked in:
  - Source Docs + Brand Strategy are the single source of truth (Conflict Ledger governs PRD disagreements).
  - Platform fees live in config only (talentPct 0.11 / clientPct 0.15, unconfirmed).
  - Payment rails are region-aware: Paystack (Africa), Stripe & Airwallex (rest). FINCRA = placeholder, never hardcoded.
  - Thespian AI (style/vibe tagging) kept separate from identity KYC / Verified badge (Smile Identity, unconfirmed).
- **2026-07-16** — Project tracking files created: `log.md`, `bug.md`, `process.md`.
- **2026-07-16** — App scaffolded and verified (build, lint, tests, dev server all pass):
  - Vite + React 18 + TypeScript strict; Tailwind v3 (`darkMode: 'class'`); React Router; react-hook-form + zod + @hookform/resolvers; Zustand; lucide-react.
  - Full folder structure: `app/ marketing/ auth/ creator/ client/ shared/ components/ config/ lib/ styles/` with placeholder screens per PRD section (WEB-01..03, PWA-01..13).
  - All design tokens from `MONOLOGG_DESIGN_SYSTEM-2.md` §11 in `src/styles/globals.css`, incl. light/dark neutrals and the two-audience `--accent` binding (`data-audience` on `<html>`).
  - `ThemeProvider` (light/dark/system, persisted, follows `prefers-color-scheme`) and `AudienceProvider` + route-level `AudienceBoundary` (creator → talent coral, client → indigo).
  - `config/platformFees.ts` with `// TODO(conflict: C1/C2/C3)`; `config/paymentRails.ts` (Paystack africa / Stripe+Airwallex rest, FINCRA explicitly excluded); `config/markets.ts` (placeholder beta list).
  - `lib/money.ts` (minor-units formatter, tested), `lib/region.ts`, `lib/utils.ts`.
  - Scripts: `dev`, `build`, `preview`, `lint`, `test` (Vitest — 2 tests passing).

- **2026-07-16** — Design-system foundation implemented exactly per `MONOLOGG_DESIGN_SYSTEM-2.md` (build/lint/tests/dev server all pass):
  - `globals.css`: complete token set — neutrals (light + dark), audience accent binding via `[data-audience]`, status tokens with dedicated `-fg` pairs from the §3.7 contrast audit, typography sizes, 4px spacing scale, radius scale, elevation, motion. Theme/audience selectors are scoped (any element, not just `:root`) so previews can show all four combos at once; every pairing carries its audited AA ratio as a comment.
  - Tailwind maps every utility to the CSS variables (colors, fontSize, spacing, borderRadius, boxShadow, durations, easing).
  - Theme + audience state moved to **Zustand** (`app/stores/theme.ts` persisted via `persist` middleware + follows `prefers-color-scheme`; `app/stores/audience.ts` set at app entry); providers are now thin DOM-effect wrappers.
  - **`/kitchen-sink` route**: renders every token, both audiences, light + dark side by side, each fg/bg pairing annotated with its WCAG 2.2 AA ratio; status shown as color + icon + label; live theme/audience toolbar wired to the real stores.

- **2026-07-16** — Fonts changed per client decision (supersedes design doc §4): **Spline Sans** for headings/display, **General Sans** for body & subtext, IBM Plex Mono unchanged for money/IDs/OTP. Loaded via Google Fonts + Fontshare; `--font-heading` token added and applied to h1–h6.

- **2026-07-17** — Shared component library built in `src/components/` (lint/tests/build pass; all shown in `/kitchen-sink`):
  - **Form/action:** Button (primary/secondary/outline/ghost/danger + loading), IconButton (44×44, aria-label required), Input, Textarea, Select (native), MultiSelectChips (aria-pressed), Slider (budget, mono value + aria-valuetext), Toggle (role=switch), FileDropzone (video/audio, 150MB, drag feedback, keyboard path via Browse) — all on a shared `Field` shell (label + icon-carrying error/success/helper messages).
  - **Display/feedback:** Card (static/interactive lift), Tabs (roving tabindex, arrow/Home/End), EscrowProgress (Escrow Locked → Deliverables Provided → Payment Released; aria-current="step"), Badge (verified/processing/escrow/paid/error/info — color+icon+label always), Avatar (initials fallback + verified indicator), Skeleton/SkeletonLines (Thespian AI pulse).
  - **Overlay/async:** Modal (mobile bottom-sheet ↔ desktop dialog, focus trap/restore, Esc + backdrop, scroll lock), Toast (Zustand store + viewport, auto-dismiss 5s, error → role=alert), with `--scrim` token and fade/sheet keyframes (300ms ease-out, reduced-motion safe).
  - **Motif:** CueDivider ("/") and Lettermark (m/, inline + app-icon tile).
  - Everything reads semantic tokens only; ToastViewport mounted in App shell.
  - `// TODO(conflict:)` noted in Button: doc's 40/36px sizes vs 44px touch rule (doc heights kept; lg=48 for primary mobile actions).

- **2026-07-17** — Data layer + configuration implemented (lint clean, 10 tests passing, build passes):
  - `src/types.ts`: full PRD §6 data model — UserType, Niche (Core 4 + Extended), MediaKind, BookingState, VerificationState, EngagementType (retainers, §4.4), PlatformFees, Money (minor units), Creator (styleTags vs verification vs celebrityBadge kept distinct), MediaAsset, RateCard, AvailabilityBlock, Client, Brief, Booking (incl. meetUrl), OrderRoom, Message, WaitlistEntry.
  - `config/platformFees.ts` typed against the PRD interface, `TODO(conflict: C1/C2/C3)` kept; `config/paymentRails.ts` with `TODO(conflict: C4)` and **no FINCRA literal anywhere in src (verified by grep)**; `config/markets.ts` now the **13 launch markets** (NG GH MX US CA GB IN IT ES FR AU KR CN) with currency + locale map.
  - `lib/money.ts`: `formatMoneyValue`, region-aware `formatMoneyForCountry` (market locale), and `computeFees(base, fees)` → { talentFee, clientFee, talentNet, clientTotal } (round to minor units, currency follows base).
  - Zustand stores in `app/stores/`: `useAuthStore` (user + OTP pendingEmail), `useCreatorStore` (onboarding steps niche→media→processing→tags→rates→availability, media, rate cards, availability, verification), `useClientStore` (briefs + directory filters), `useBookingStore` (bookings + order rooms, advance-only escrow, messages, live-call url), `useWaitlistStore` (persisted queue entry + referral code).
  - Tests: computeFees asserts against config values (no 0.11/0.15 literals) + proves output follows injected config; region-aware formatting for NG/FR/unknown.
  - Kitchen-sink market dropdown now reads `MARKETS` from config instead of a hand-typed list.

- **2026-07-17** — Evergreen marketing site built (WEB-01..05; lint/tests/build pass; all routes serving):
  - **Hero toggle**: `config/launch.ts` flag (`LAUNCH_STATE`) seeds `useLaunchStore`; State A (waitlist) ↔ State B (live) swap in place with no rebuild. Dev-only preview pill for flipping states.
  - **State A**: RHF + zod email widget → transitions in place to "You are Number #{XYZ} in the verification queue" (persisted via waitlist store) + copy-link (clipboard + toast) + X/WhatsApp share with referral link.
  - **State B**: primary "Post a Project / Find Talent" → /client, secondary "Launch Your Storefront" → /creator.
  - **Sections**: sticky nav (mobile hamburger), social-proof stat strip (placeholder numbers), product preview using real components (storefront card + order-room mock w/ EscrowProgress), persona split (the ONLY dual-accent surface; `.light`-scoped Mode B color blocks), how-it-works 3-step with the "/" motif, trust block (escrow + rails from config + Verified≠style-tags), testimonials, dark-scoped final CTA (token-pure Mode B), footer (FAQ/knowledge-base link shared with SYS-05, socials incl. community, wordmark).
  - **WEB-05** `/how-it-works`: steps + 3 explainer-video slots (placeholders until produced) + FAQ knowledge base (native `<details>`, cue-slash disclosure marker, `#faq` anchor from footer).
  - **WEB-04** `/blog` + `/blog/:slug`: CMS-ready `BlogPost` shape, 3 seeded SEO posts, index cards + article template with byline/eyebrow/read-time, not-found fallback.
  - SEO: `usePageMeta` sets title + meta description per route. Scroll-reveal motion (IntersectionObserver, 300ms ease-out, reduced-motion safe).

- **2026-07-17** — Auth flow built (PWA-01; lint clean, tests pass, build passes, all 6 routes serving):
  - Nested routes under `/auth/*`: Welcome/Splash, Register, Sign In, OTP verify, Forgot Password, Support.
  - **Register**: Talent-vs-Client choice up front (radiogroup cards, Drama/Clapperboard icons) — choosing re-binds `data-audience` live for the rest of the session; zod + RHF validation; **email-exists → inline error, stays on form** ("That email's already on the roster — sign in instead").
  - **OTP**: 6-digit code (inputMode numeric, `autocomplete="one-time-code"`), 3 wrong attempts → routes to `/auth/support` (email support, back to sign-in, FAQ link); resend button; attempts-left announced via `aria-live`.
  - **Post-register routing**: creator → `/creator` (PWA-02 niche selection next), client → `/client`; sign-in routes by userType the same way.
  - **Forgot Password**: generic "if that address is on the roster…" confirmation in place (no account enumeration).
  - `mockAuthApi.ts`: in-memory backend seeded with demo accounts — adaeze@demo.monologg.app (talent), tunde@demo.monologg.app (client); demo OTP `424242` (hints shown on-screen, flagged for removal with the real backend).
  - AuthLayout per PRD §5.1: back chevron only, wordmark, no bottom nav. ESLint: allow `_`-prefixed unused args.

- **2026-07-17** — Creator onboarding built (PWA-02..06; lint clean, 12 tests pass, build passes, /creator serving):
  - **OnboardingShell**: top segmented progress indicator (role=progressbar, "Step N of 4"), back chevron only, no bottom nav, m/ mark.
  - **PWA-02**: 6-card niche radiogroup (Actor, VO Artist, Comedian/Compère, Speaker/Pastor, Musician, Content Creator/Streamer) with icons; selection stored and adapts later steps. Comedian/Compère card stores `comedian` (compère refinement deferred to settings).
  - **PWA-03**: "Upload your Performance / Showcase Reel" via FileDropzone (video/audio, 150MB); **VO Artist gets audio-first accept order + copy** (.mp3/.wav). FileDropzone gained a `helper` prop.
  - **PWA-04**: skeleton-pulse processing card, "Thespian AI is reviewing performance parameters…", explicit "style analysis only — never identity" microcopy; mock 2.8s analysis kicks KYC processing→verified alongside.
  - **PWA-05**: Verified badge card (`TODO(conflict: C5)` — Smile Identity unconfirmed) + editable style chips (remove ×, add custom, dedupe, 6 max) seeded per-niche (VO: Warm Texture / Conversational / Expressive).
  - **PWA-06**: rate-card form ("Booking Service Title" label + button — never "Cast Role Title"), price + currency (from launch-market list) + delivery timeline; **live stacked storefront preview** with mono prices and remove; continue requires ≥1 card. `toMinorUnits` added to lib/money (+2 tests).
  - Wrap screen notes PWA-08 scheduling as the next act → done → CreatorHome storefront summary with demo restart.

- **2026-07-17** — Storefront + Scheduling built (PWA-07/07D + PWA-08; lint clean, 12 tests pass, build passes, routes serving):
  - **PWA-07/07D** `/creator/storefront`: hero (avatar, name, niche `/` location), **two distinct badge systems** — Verified (identity KYC, accent Badge, `TODO(conflict: C5)`) and a separate Celebrity star pill (referral reputation, different shape/color, own tooltip) — style-tag chips, media player (video or audio per reel kind, placeholder when none), rate cards as stacked interactive Book cards with mono prices + escrow reassurance line. Share button (navigator.share → clipboard fallback + toast). Mobile single column → desktop two-column (content + 360px booking rail). Owner preview banner ("this is exactly what clients see"); Book fires a "next act" toast until PWA-11/12.
  - **PWA-08** `/creator/schedule`: weekly operating hours (Mon-first rows, Toggle + native time inputs, closed days read "Dark night"), Google Meet sync card (Synced badge + re-sync), horizontal next-14-days strip with accent dot indicators + sr-only slot counts, tapping a day opens the Modal drawer (bottom-sheet on mobile) with hourly slot toggle chips generated from that weekday's hours; open slots persist to `availability` in the creator store (`operatingHours`/`setDayHours` added).
  - CreatorHome restructured into nested routes (index dashboard + storefront + schedule) with dashboard quick links showing open-slot count.

- **2026-07-17** — Client side built (PWA-09 + PWA-10/10D; lint clean, 12 tests pass, build passes, all routes serving):
  - **PWA-09** `/client/brief`: Project Name + Type (select), niche requirements as MultiSelectChips (validated ≥1), optional script/reference upload (PDF + a/v; PDF-as-MediaKind flagged TODO), budget slider in Money with per-currency ranges (currency select, launch-market currencies) — saves a real `Brief` to the client store; **notification stub** counts matching mock creators and toasts "N matching creators notified", then lands on the directory pre-filtered to the brief's niches.
  - **PWA-10/10D** `/client/directory`: name search, Core Focus pills (Actors/VO/Comedians/Compères), Extended Focus pills (Pastors/Musicians/Streamers), style/vibe pills (derived from cohort tags), max-starting-price brackets, location (13 markets), Verified-only toggle — all persisted in the client store. Cards: avatar+verified indicator, name (+ tiny celebrity star when earned), niche, top-3 tags, mono "From …" starting price, Verified badge. Card → `/t/:id`. Warm empty state with one-tap clear. Mobile stacked → desktop sidebar + 2/3-col grid (10D).
  - **`/t/:id` public storefront route** (talent-accented even for client viewers): Storefront refactored into reusable `StorefrontView`; public view swaps the owner banner for a back-to-directory link; not-found fallback. `mockDirectory.ts`: 8-creator Lagos-first cohort (one unverified, two celebrity-badged) — replaced by the real API later. Client store filters gained `query`.
  - ClientHome restructured into nested routes with dashboard (Post a Project / Find Talent quick links + briefs list).

- **2026-07-17** — Booking pipeline complete (PWA-11 + PWA-12 + PWA-13; lint clean, 12 tests pass, build passes):
  - **PWA-11** `/client/checkout/:creatorId/:rateCardId`: creator/service summary, **one-off vs retainer** radiogroup (retainer → recurrence select, sets `Booking.recurrence`, §4.4), slot pick from the creator's real availability (booked slots disabled + struck through), client-side summary: base + client fee (label % computed from `PLATFORM_FEES`, `TODO(conflict: C2)`) = held in escrow today. Mock creators gained 7-day availability.
  - **PWA-12** payment overlay (Modal): region-aware rails from `PAYMENT_RAILS` config (client region via `regionForCountry` — Paystack africa / Stripe+Airwallex rest, `TODO(conflict: C4)`, no hardcoded provider), card AND bank-routing forms (zod-validated), **both-sides escrow breakdown** (you pay +15% / creator receives −11%, all via `computeFees`), escrow-hold reassurance. Pay → creates real `Booking` (state escrow_locked, mock `meetUrl`) → `/order/:id`.
  - **PWA-13** `/order/:id`: EscrowProgress bar mapped from BookingState (locked=1, delivered=2, released=3), state badge, fee ledger from stored `Booking.fees`, contextual advance buttons (Mark deliverables provided → Confirm & release payment) with system messages + toasts; chat with text bubbles, mock voice notes (custom player, animated bars, a11y labels), document attachments, `/`-styled system lines; **live-call header button** sets `activeCallUrl` from `Booking.meetUrl` with join banner + end-call — explicitly distinct from voice notes. Accent follows the signed-in audience via effect.
  - Storefront Book buttons now link into checkout (`bookPath` prop); owner preview keeps an explanatory toast.

- **2026-07-17** — Settings + system screens + referral programme (SET-01..06, SYS-01..05; lint clean, 12 tests pass, build passes, all 12 routes serving):
  - **Shared shell**: `PageShell` (back chevron + title) with a follow-audience hook — every settings/system page dresses coral or navy per the signed-in user. `/settings/*` menu adapts (rates/media/referral are creator-only rows); sign-out included.
  - **SET-01 Profile & Bio**: fields adapt per audience (creator: niche + bio; client: org name/type); saves via new `updateUser` on the auth store + syncs niche to creator store.
  - **SET-02 Rate Cards** & **SET-03 Media**: full CRUD reusing the onboarding field components ("Booking Service Title" naming preserved); first media asset flagged as headline reel.
  - **SET-04 Payout**: rail chips read from `PAYMENT_RAILS` config by the user's region (C4 TODO); bank details zod-validated, persisted in new `useSettingsStore`.
  - **SET-05 Notification Preferences**: persisted toggles (bookings/messages/escrow/digest).
  - **SET-06 Referral / celebrity badge**: copyable referral link, segmented progressbar to the 5-referral threshold, demo "simulate referral", and a side-by-side explainer card rendering **both badges as distinct marks** (Verified = KYC vs Celebrity = referral standing; "you can hold neither, one, or both"). Creator store gained `referrals`/`celebrityBadge`; own-storefront preview now shows the earned badge.
  - **SYS-01 Notification Centre** (seeded items, unread dots, mark-all-read, keyboard-operable rows), **SYS-02 Transactions** (rows from the booking store; talent sees net payout, client sees escrow total; links into order rooms), **SYS-03 Help & Support** (email/community/FAQ + message form), **SYS-04 Terms/Privacy** (placeholder flagged for counsel), **SYS-05 FAQ** — content extracted to `shared/faqContent.ts` so marketing + in-app render ONE source; in-app adds search.
  - Dashboards got Bell + Settings header links; marketing footer + auth support now point at `/faq`.

- **2026-07-17** — Everything merged into one interconnected app behind a single login (lint clean, 12 tests pass, build passes):
  - **Persistent sessions**: auth store persisted (`monologg-auth`) — login survives refresh; OTP-in-flight state deliberately not persisted.
  - **Route guards** (`RequireAudience`): `/creator/*` needs a talent login, `/client/*` a client login; signed-out → `/auth`; wrong side → redirected to your own home. `/auth` while signed in → straight to your side.
  - **Bottom navigation** (PRD §5.1) via a shared `AppLayout` shell: Creator — Home · Bookings · Discover · Inbox · Profile; Client — Home · Find Talent · Projects · Inbox · Account. Hidden while signed out and during linear onboarding.
  - **New connector screens**: creator **Bookings** (payout-framed order list), creator **Discover** (seeded open briefs **plus any brief a client posts in-session** — the two sides genuinely meet), client **Projects** (briefs + bookings in flight), shared **Inbox** (one row per order room with last-message preview).
  - Demo logins: adaeze@demo.monologg.app (talent) / tunde@demo.monologg.app (client), any 8+ char password.

- **2026-07-17** — Appearance settings added (`/settings/appearance`; lint clean, 12 tests pass, build passes, route serving): light/dark/system radiogroup wired to the existing `useThemeStore` (built in Step 4, previously only exposed via the kitchen-sink toolbar) + a live side-by-side light/dark preview scoped independently of the page's own theme so both are visible at once. Listed in the settings menu for **both audiences** (not creator-only) — each side keeps its own accent (coral/navy) while the canvas toggles.

- **2026-07-18** — Final beta hardening (lint clean, **42/42 tests passing**, build passes, prod bundle unaffected):
  - **Fixed a real bug found during hardening**: waitlist queue numbers were random (`QUEUE_BASE + Math.floor(Math.random() * 40)`), not sequential — impossible to test meaningfully and not how a real queue behaves. Now strictly sequential per join; covered by 6 new tests in `waitlist.test.ts`.
  - **New test infrastructure**: jsdom + `@testing-library/react` + `jest-axe` wired into Vitest (`vite.config.ts`, `src/test/setup.ts` — matchMedia/IntersectionObserver/scrollIntoView mocks + RTL auto-cleanup between tests, which was silently missing and causing cross-test DOM leakage).
  - **19 new tests** across `booking.test.ts` (escrow state machine — advances exactly one step, never skips, never advances past terminal, no-ops on unknown id), `waitlist.test.ts`, `launch.test.ts`, `launchToggle.test.tsx` (renders the marketing hero in both States A/B and proves the DOM actually swaps — not just that the store flips), `a11y.test.tsx` (6 axe-core runs: 0 violations), plus 3 new `computeFees` edge cases in `money.test.ts` (independent-percentage sanity check, zero-base, simulated C1/C2 resolution).
  - **Dev-mode axe integration**: `@axe-core/react` was evaluated and rejected — its own README states no React 18+ support (patches legacy ReactDOM). Built `DevAxeWatcher.tsx` instead: runs real `axe-core` against the live DOM on every route change, dev-only, logs to console. Confirmed **zero bytes added to the production bundle** (`grep -c axe-core dist/assets/*.js` → 0 — Vite dead-code-eliminates the dynamic import).
  - **Audits — all clean**: zero `FINCRA` anywhere in `src/`; zero hardcoded fee percentages outside `platformFees.ts` (every UI % label is computed); zero raw hex colors used to style anything in `src/components/` (three grep hits elsewhere were all false positives — console.log devtools formatting, a code comment, and the kitchen sink's audit-documentation text — reviewed individually, logged in README).
  - **Responsive audit**: no arbitrary fixed pixel widths anywhere; all multi-column grids collapse below `sm:`/`lg:`; **found and fixed** a real 320px overflow risk — the referral link rendered as unwrapped raw-URL mono text, now has `break-all`.
  - **README.md written** at repo root: run instructions, exactly where `PLATFORM_FEES`/`PAYMENT_RAILS`/KYC plug in (with file paths), full test summary, axe methodology + results, WCAG AA methodology, responsive audit, an honest "what's mocked vs. real" table, and the **complete Conflict Ledger C1–C11** with resolution status (8 of 11 still need a product-owner decision).

- **2026-07-18** — Light/dark toggle now visible on every page, not just Settings → Appearance (lint clean, **45/45 tests passing**, build passes, dev server verified):
  - New `ThemeToggle` component (`src/components/ThemeToggle.tsx`): single-tap flips the resolved theme directly (light ↔ dark, bypassing "system" for a predictable instant switch); sun/moon icon, dynamic `aria-label`, 44px touch target. Exported from the components barrel.
  - Mounted in **4 places** to cover every screen with zero per-page wiring: `MarketingNav` (landing, how-it-works, blog — WEB-01..05), `AuthLayout` (all `/auth/*` — PWA-01), `OnboardingShell` (creator onboarding PWA-02..06), and — the one covering the bulk of the app — a fixed floating button in `AppLayout` (`bottom-20 right-4`, clear of both the bottom nav and the dashboards' existing top-right Bell/Settings icons) that automatically applies to every signed-in screen plus `/t/:id`, `/order/:id`, all of `/settings/*`, and every system screen (Inbox/Notifications/Transactions/Help/FAQ/Terms).
  - The fuller light/dark/**system** picker with a live preview still lives at Settings → Appearance (built in Step 15) for anyone who wants "follow my device" — this new toggle is the always-visible quick switch layered on top of it, same underlying `useThemeStore`.
  - Tests: new `ThemeToggle.test.tsx` (label flips, store updates on click, touch-target class) + the Register a11y test now asserts the toggle is present and reachable inside `AuthLayout`.

## 🔨 In Progress

- _(nothing — awaiting next task)_

## 📋 Pending

- Initialize git repository (make first commit).
- Talent (creator) app flows.
- Client (casting) app flows.
- Marketing site.
- PWA setup (manifest, service worker, offline behavior).
- Accessibility pass: WCAG 2.2 AA in both themes, 44px touch targets, focus rings, reduced-motion support.

## ⚠️ Open Questions / Unconfirmed

- Exact fee percentages (talentPct / clientPct) — treat as config until confirmed.
- Smile Identity as the KYC provider — unconfirmed.
- Conflict Ledger items get `// TODO(conflict: Cx)` markers in code; track them here as they appear.
