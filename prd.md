# Monologg — PRD & Antigravity Prompt Pack

**Product:** Monologg — the first brief-to-booking pipeline for the performing arts
**Version:** 2.0 (Beta Launch, Phase 1 PWA)
**Owner:** Monologg (Bolu Olatunji, CEO · Deborah Ojengbede, CPO)
**Target delivery:** Q3 2026
**Platform:** Progressive Web App — mobile-first, desktop-adaptive · plus an evergreen marketing site
**Build system:** Google Antigravity (design-to-code)
**Companion file:** `MONOLOGG_DESIGN_SYSTEM.md` (single source of truth for look, tone, and tokens)

---

## How to use this document

This is both a **PRD** (what to build and why) and a **prompt pack** (ordered, self-contained prompts to feed a coding/design agent like Antigravity, v0, or Cursor).

- **Sections 1–8** are the PRD: product definition, audiences, scope, screen registry, data model, and success criteria.
- **Section 9** is the prompt pack: run the prompts in order; each assumes the previous succeeded.
- Keep `MONOLOGG_DESIGN_SYSTEM.md` in the repo so the agent can re-read tokens and voice at any time.

> **Source-of-truth rule.** Where documents disagree, the **Monologg Source Docs** and **Brand Strategy** document win. Every known conflict with the older PRD PDF and the two earlier design files is logged in the **Conflict Ledger** below and flagged inline with a ⚠️ marker. Resolve each before final build.

---

## ⚠️ Conflict Ledger — resolve before build

These are the contradictions found across your source material. The **"Truth (this PRD uses)"** column follows your instruction that the source + brand strategy docs win; the ledger is kept so you can confirm or override each one.

| # | Topic | Source Docs / Brand Strategy (truth) | Older PRD PDF / design files (conflict) | This PRD uses | Needs your call? |
|---|---|---|---|---|---|
| C1 | Talent booking fee | "give us **11%** of your bookings"; fee table: **11%** on successful bookings | PRD PDF: **9%** engine deduction (talent) | **11%** talent | Confirm 11% vs 9% |
| C2 | Client booking fee | Fee table: **15%** in successful booking fees | PRD PDF: **12%** escrow processing fee (client) | **15%** client | Confirm 15% vs 12% |
| C3 | Fee split (alt figure) | One table also lists "10% from talent + 10% from client" | — | Flagged — the 11%/15% fee table is treated as the operative one | Reconcile 11%/15% vs 10%/10% |
| C4 | Payment rails | **Paystack** (Africa), **Stripe & Airwallex** (rest of world) | PRD PDF + UX spec: **FINCRA** | **Paystack / Stripe / Airwallex**; "FINCRA" treated as a placeholder to replace | Confirm rails |
| C5 | KYC provider | **Smile Identity** (with "???" — unconfirmed) | "Thespian AI … quasi-KYC" | KYC = **Smile Identity** (identity); "Thespian AI" = style-tagging/analysis only, **not** a KYC authority | Confirm Smile Identity |
| C6 | Brand personality | **"Sprightly and quirky — energetic, a little playful, warm, human, theatrical"** | `MONOLOGG_BRAND_DESIGN_SYSTEM.md`: "**not playful** … never loud" | Sprightly/quirky + premium ("fun yet serious") per your brief | Resolved by your brief |
| C7 | Typography | **Sans-serif preferred** (clean, modern, app-led) | `monologg_design_prompt.md`: **display serif** (DM Serif Display) | **Sans-serif** primary; optional characterful sans for display | Resolved by your brief |
| C8 | Visual mode | Clean, modern, **vibrant, "lickable," light** UI-led | `monologg_design_prompt.md`: **cinematic dark-gold** primary | **Light-first**, vibrant, with full dark mode | Resolved by your brief |
| C9 | Palette | Directional: **Ink Navy / Cue Coral / Stage Cream** (for sign-off) | Red/Purple/Green/Gold; or dark-gold | New system built from the directional palette (see design doc) | Confirm final palette |
| C10 | Booking-fee wording | "11% on successful bookings" (single fee) vs two-sided 11%+15% | — | Treated as **two-sided**: talent pays 11%, client pays 15% | Confirm two-sided model |
| C11 | Subscriptions | Source: Creator **$10/mo**, Client **$100/mo** | Not in PRD PDF | Included as post-MVP / flagged | Confirm in/out of beta |

**Terminology note (from Brand Strategy, honoured throughout):** use niche-agnostic labels so extended creators aren't alienated — e.g. "Add Booking Service Title" (not "Add Cast Role Title"), "Upload Performance / Showcase Reel" (not "Upload Audition Tape").

---

## Source-doc coverage map

Confirms every product decision in the **Monologg Source Docs** (the single point of truth) is accounted for. "Beyond source" = a deliberate addition drawn from the Brand Strategy / PRD PDF, flagged so it's a conscious choice.

| Source-doc item | Where covered |
|---|---|
| Upload monologues & showreel | US-2, PWA-03 |
| Set price for services | US-3 rate cards, PWA-06 |
| Chat with clients | US-8 order room, PWA-13 |
| **Receive a call** from clients | US-8 live Google Meet call, PWA-13, `Booking.meetUrl` |
| Post gigs (clients) | US-5, PWA-09 |
| View talent availability | US-4, PWA-08; directory PWA-10 |
| Book on-platform | US-7, PWA-11/12 |
| Calendly + Upwork feel | §1 framing; scheduling + escrow |
| Web app, mobile-optimised | PWA, mobile-first throughout |
| Creator segments (Actors, Music/VO, Comedians, Compères) | §2.1 Core 4 |
| Markets (13 countries) | §2.3 launch markets |
| Client segments (studios, event mgrs, brand mgrs) | §2.3 |
| **Brand-manager retainers** | §4.4, `Booking.engagementType` |
| 11% talent / 15% client / 10%+10% | §3 + Conflict Ledger C1–C3 |
| Subscriptions ($10 / $100) | §3 + C11 |
| **Thespian AI (digital assistant)** | US-2 style-tagging; client AI assistant §4.6 |
| **Celebrity status badge (referral)** | §4.3, SET-06, `Creator.celebrityBadge` |
| Website domain / in-app email | §3 subscription row (post-MVP) |
| **AI cast-management assistant + HRIS** | §4.6 (deferred, named) |
| Payment rails (Paystack/Stripe/Airwallex) | §3, C4 |
| KYC (Smile Identity) | US-2, C5 |
| Google Meet APIs | US-8, §3 partners |
| Email/SMS (SendGrid, Twilio) | §3 partners |
| **Customer relationships (FAQ, support, blog, explainer videos)** | §4.5, SYS-05, WEB-04, WEB-05 |
| Waitlist landing page | US/§4.7, WEB-01/02 |
| Escrow payments | US-7/8 |
| Vision: go-to global talent directory | §1 |

**Beyond source (deliberate additions):** the Extended Creator niches (Pastors, Musicians, Streamers) come from the Brand Strategy's inclusive-architecture direction, not the source doc's tighter Core 4 — kept because the strategy doc explicitly calls for non-alienating category scaling. Escrow milestone UI, OTP auth, and the two-audience color system are implementation detail beyond the source's business-level brief.

---

## 1. What Monologg is

Monologg is the first **brief-to-booking pipeline** for the performing arts. It connects performing creators — actors, comedians, compères, voice-over artists, and the wider performative community (MCs, public speakers, musicians, content creators, streamers) — directly with the production houses and event planners who cast them. No agents, no 20%+ commissions, no weeks of manual searching.

Think of it as a focused hybrid of three familiar models, purpose-built for one industry:

- **A registry** (like IMDbPro) — verified talent profiles, reels, credits, and credentials.
- **A marketplace** (like Upwork) — briefs, secure escrow, messaging, and milestone contracts.
- **A storefront** (like a link-in-bio / Calendly) — one-tap booking, rate cards, and availability.

**The problem.** Creators lose 20%+ of their income to agents and intermediaries. Clients spend weeks sifting static portfolios with no way to instantly coordinate schedules or lock payment.

**The solution.** Monologg shrinks the hiring process from weeks to a few clicks: discover talent → post or accept a brief → schedule → lock funds in escrow → deliver → get paid. It positions itself as *"an agent in every creator's pocket"* — handling the unglamorous business side (finding work, contracts, scheduling, escrow payouts) so performers can focus on performing.

**Vision.** A world where any performer, anywhere, can own and run their business without the stress of the business side of it.

**Mission.** Replace the fragmented, commission-heavy, word-of-mouth casting economy with a single, transparent, community-driven pipeline.

**Core values:** Community · Creativity · Integrity.

**Platform.** A PWA, mobile-first but desktop-adaptive, plus an evergreen marketing website with a launch toggle (waitlist ↔ live).

---

## 2. Audiences — "The Core 4" + Extended Creators

Monologg balances an immediate launch beachhead with room to scale into any performative category. Designs must prioritise the launch niches while using flexible, welcoming terminology.

### 2.1 The Core Four (primary launch focus)
1. **Actors** — monologue reels; film/TV audition bookings.
2. **Comedians** — live sets; corporate stand-up bookings.
3. **Voice-Over (VO) Artists** — voice demos; remote studio sessions.
4. **Compères** — hosting reels; live-event emcee bookings.

### 2.2 Extended Creators (inclusive, non-alienating architecture)
Pastors / public speakers, musicians, content creators, streamers — all use Monologg to distribute booking links and coordinate appearance fees.

**UX rule for the designer.** Category grids, filter pills, and profile fields must adapt gracefully to the creator's chosen niche. Avoid hyper-specific casting jargon (see the terminology note above).

### 2.3 The two sides of the pipeline

| User type | Who they are | Core goal | Signature accent |
|---|---|---|---|
| **Talent / Creator** | Actors, comedians, VO artists, compères, + extended creators (16–65) | Build a bookable storefront, get discovered, get paid | **Talent Coral** |
| **Client / Casting** | Production houses/studios, event managers, brand managers, church admins | Find verified talent, post a brief, book with payment locked | **Client Navy** |

The two accents let the same design system serve both audiences. Each app commits fully to its own accent; the marketing site is the only surface where both appear together (the role picker). Full light + dark mode for both. (Accent naming and hexes live in the design doc, §3.)

**Launch markets (from Source Docs):** Nigeria, Ghana, Mexico, USA, Canada, UK, India, Italy, Spain, France, Australia, South Korea, China. Currency and payment rails must be region-aware (see C4).

---

## 3. Business model (from Source Docs — see Conflict Ledger)

| Stream | Talent / Creator | Client / Casting |
|---|---|---|
| Profile | Free | Free (profile viewing) |
| Calendar | Free | Free |
| **Booking fee** | **11%** on successful bookings ⚠️ C1 | **15%** on successful bookings ⚠️ C2 |
| Post gigs | — | Free |
| Escrow | Via Paystack / Stripe / Airwallex ⚠️ C4 | Via Paystack / Stripe / Airwallex ⚠️ C4 |
| Subscription (post-MVP) ⚠️ C11 | $10/mo — Thespian AI assistant, custom domain, in-app email, badge | $100/mo — AI cast-management assistant, HRIS, brief-to-cast automation |

**Escrow logic (beta).** Funds are locked when a client checks out and released to the creator on delivery confirmation. The checkout must clearly show the fee breakdown for each side. Because the two fee percentages are still unconfirmed (C1–C3), implement them as **configurable constants**, not hardcoded literals — a single `PLATFORM_FEES` config object the whole app reads from.

**Key partners (Source Docs):** Google Meet APIs (scheduling/calls); Paystack, Stripe, Airwallex (payments); Smile Identity (KYC — unconfirmed, C5); SendGrid + Twilio (email/SMS).

---

## 4. MVP feature set

### 4.1 Talent onboarding & storefront (creator experience)

**US-1 — Adaptive registration.** A creator selects "I am Talent" vs "I am looking to Hire," then picks a primary niche (Actor, VO Artist, Comedian/Compère, Speaker/Pastor, Musician, Content Creator/Streamer). The set-up adapts: e.g. selecting VO Artist shifts the media frame to prioritise audio (`.mp3` / `.wav`) over video.

**US-2 — Media upload + analysis + KYC.** Drag-and-drop a primary showreel or performance clip (video/audio, max 150 MB). A background engine ("Thespian AI") analyses the clip and auto-tags style (e.g. *Warm Texture, Conversational, Expressive*) so creators skip long tag lists. Identity verification (KYC) runs via Smile Identity ⚠️ C5 — keep the *style-tagging* and the *identity-verification* as two distinct concepts in copy and UI; a Verified badge reflects **identity** KYC, not vibe tags.

**US-3 — Rate cards.** Creators add modular booking services: **Service Title, Base Price, Delivery Timeline**. The public profile renders these as clean, vertically stacked, actionable cards (link-in-bio storefront style). Use "Add Booking Service Title," never "Add Cast Role Title."

**US-4 — Availability scheduling (Calendly-style).** Creators set operational hours and open specific day/time slots via Google Meet API sync, so clients can book open blocks directly. Presented as a clean mobile drawer with date indicators.

### 4.2 Clients & casting (employer experience)

**US-5 — Project brief creation.** A casting lead / brand coordinator / church admin outlines a brief: Project Name/Type, niche requirements, script/asset upload, and a budget scale slider. Matching creators are curated and notified.

**US-6 — Filter-driven discovery directory.** Browse verified talent, filter by primary category (Actors, VO, Comedians, Compères), extended focus (Pastors, Musicians, Streamers), style/vibe tags (Warm Tone, Dramatic, High Energy), pricing, and location.

**US-7 — Checkout & escrow gateway.** Select a date/time slot and pay through a secure escrow gateway. The checkout shows the fee breakdown per side (talent view: 11% deduction on delivery; client view: 15% added to base ⚠️ C1/C2). Card + bank-routing inputs via the region-appropriate rail (Paystack / Stripe / Airwallex ⚠️ C4). Display an escrow-hold reassurance for both parties.

**US-8 — Order room + timeline.** A shared communication room per booking with a prominent 3-step escrow progress bar: **[Escrow Locked] → [Deliverables Provided] → [Payment Released]**. Includes chat bubbles, in-chat voice players, document attachments, and system notifications. Per the source doc's core creator capability ("chat **and receive a call** from their clients"), the room also supports **launching and receiving live calls via the Google Meet API** — a call button in the room header schedules/joins a Meet session tied to the booking, distinct from async voice notes.

### 4.3 Badges — two distinct systems

The source doc lists a **celebrity / status badge** as a creator feature, earned via **referral**. This must be kept separate from identity verification (C5), so the platform has two independent badge concepts:

- **Verified badge (identity):** awarded on passing KYC (Smile Identity ⚠️ C5). Signals a real, verified person. Not purchasable, not referral-earned.
- **Celebrity / status badge (reputation):** earned through the **referral** programme (and/or standing). A distinct visual mark on the storefront and directory card. Never conflated with the Verified badge in UI or copy.

A creator can hold neither, one, or both. Directory filters and storefront headers render them as separate marks.

### 4.4 Brand-manager retainers

The source doc notes *"retainers can happen on monologg"* for brand managers. Beyond one-off bookings, a client (typically a brand manager) can set up a **retainer**: a recurring/ongoing engagement with a creator rather than a single dated slot. For beta this can be modelled as a recurring booking with its own escrow cadence; if full retainer billing is deferred, the PRD still names it so the data model and directory account for it (see the `engagementType` field in §6).

### 4.5 Customer-relationship & content surfaces

The source doc's "Customer relationships" section names four support/content surfaces. These are in scope (some on the marketing site, some in-app):

- **Knowledge base / FAQ** — searchable help content (marketing site + in-app Help).
- **Customer support** — contact/ticket entry point (in-app Help & Support, SYS-03).
- **Blog** — content marketing surface on the website (SEO, organic-growth channel per the source's "100% organic" creator channel).
- **Explainer videos** — onboarding/how-it-works video content, surfaced on the landing page and in empty/onboarding states.

### 4.6 Deferred client tooling (named now, built post-MVP) ⚠️ C11

The source doc describes two heavier client-side capabilities behind the $100/mo tier. They are **out of beta scope** but named here so they aren't lost and so the architecture leaves room:

- **AI cast-management assistant** — fulfils a cast brief from a prompt and/or an uploaded PDF, returns an estimate, schedules meetings, and helps manage talent across a project. (This is a superset of the beta's simple brief form, US-5.)
- **HRIS** — onboarding/offboarding management for talent a client works with repeatedly (pairs naturally with retainers, §4.4).

### 4.7 Marketing site (evergreen, toggleable)

The site's core layout is fixed; a single hero toggle swaps states with no engineering rebuild:

- **State A — Pre-launch (waitlist):** inline email widget → on submit, transitions in place to *"You are Number #{XYZ} in the verification queue. Share your link to climb the roster."*
- **State B — Live app:** email box hidden; two CTAs take its place — **Primary:** "Post a Project / Find Talent" (→ directory); **Secondary:** "Launch Your Storefront" (→ creator onboarding).

Landing-page structure and references live in the design doc (§9) and follow the FintechX pattern: social-proof hero, product/dashboard preview, security & trust messaging, testimonials, persona sections, conversion CTAs.

---

## 5. Screen registry (Antigravity-mapped)

Every row is a functional artboard/route. P0 = beta-critical, P1 = adaptive/secondary, P2 = system.

| Code | Screen | User | Mode | Priority |
|---|---|---|---|---|
| SYS-TOKENS | Design tokens, type scale, icons, color variables | — | — | P0 |
| WEB-01 | Landing — waitlist (desktop 1440) | Public | Toggle A | P0 |
| WEB-02 | Landing — waitlist (mobile 375) | Public | Toggle A | P0 |
| WEB-03 | Landing — live portal (desktop) | Public | Toggle B | P0 |
| PWA-01 | Welcome + Register + Sign In + OTP + Forgot | Both | Mobile-first | P0 |
| PWA-02 | Niche selection board (Core 4 + Extended) | Creator | Mobile-first | P0 |
| PWA-03 | Media upload panel (video/audio, drag-drop) | Creator | Mobile-first | P0 |
| PWA-04 | Thespian AI processing state (skeleton pulse) | Creator | Mobile-first | P0 |
| PWA-05 | AI complete — auto tags + Verified badge | Creator | Mobile-first | P0 |
| PWA-06 | Rate card creation settings | Creator | Mobile-first | P0 |
| PWA-07 | Public storefront profile (mobile) | Creator/Client | Mobile-first | P0 |
| PWA-07D | Public storefront profile (desktop adaptive) | Creator/Client | Desktop | P1 |
| PWA-08 | Scheduling dashboard (weekly hours + sync) | Creator | Mobile-first | P0 |
| PWA-09 | Client project brief form | Client | Mobile-first | P0 |
| PWA-10 | Casting directory feed + filters (mobile) | Client | Mobile-first | P0 |
| PWA-10D | Casting directory feed (desktop adaptive) | Client | Desktop | P1 |
| PWA-11 | Calendar slot / checkout sheet | Client | Mobile-first | P0 |
| PWA-12 | Payment gateway + escrow deposit overlay | Client | Mobile-first | P0 |
| PWA-13 | Order room + escrow bar + live-call (Google Meet) launch | Both | Mobile-first | P0 |
| SET-01–05 | Settings (profile, rate cards, media, payout, notifications) | Both | Mobile-first | P1 |
| SET-06 | Referral / celebrity-badge programme | Creator | Mobile-first | P2 |
| SYS-01–05 | Notifications, transaction history, help, terms, FAQ / knowledge base | Both | Mobile-first | P2 |
| WEB-04 | Blog / content index + article (marketing) | Public | Desktop + mobile | P2 |
| WEB-05 | How-it-works / explainer-video surface (marketing) | Public | Desktop + mobile | P2 |

### 5.1 Navigation

**Creator bottom nav:** Home (storefront preview) · Bookings (order rooms) · Discover (who's hiring) · Inbox · Profile.
**Client bottom nav:** Home (dashboard) · Find Talent (directory) · Projects (briefs + orders) · Inbox · Account.
**Desktop top nav (portal/landing):** `monologg/` logo · Find Talent · Post a Project · How it Works · Sign In · **Launch Your Storefront →**.
**Onboarding:** no bottom nav (linear); top progress indicator; back chevron only.

---

## 6. Data model (TypeScript-oriented)

Region-aware, escrow-driven. Fees are config, not literals (see C1–C3).

```ts
type UserType = 'talent' | 'client';

type Niche =
  | 'actor' | 'vo_artist' | 'comedian' | 'compere'         // Core 4
  | 'speaker_pastor' | 'musician' | 'content_creator';     // Extended

type MediaKind = 'video' | 'audio';
type BookingState = 'escrow_locked' | 'deliverables_provided' | 'payment_released';
type VerificationState = 'unverified' | 'processing' | 'verified' | 'failed';
type EngagementType = 'one_off' | 'retainer';   // retainer: brand-manager ongoing (§4.4)

interface PlatformFees {          // ⚠️ configurable — see Conflict Ledger C1–C3
  talentPct: number;              // default 0.11
  clientPct: number;              // default 0.15
}

interface Money { amount: number; currency: string; } // region-aware (NGN, USD, GBP, …)

interface Creator {
  id: string;
  userType: 'talent';
  name: string;
  niche: Niche;
  bio: string;
  location: string;              // country from launch-market list
  styleTags: string[];           // auto-generated by Thespian AI (vibe, NOT KYC)
  verification: VerificationState; // identity KYC via Smile Identity ⚠️ C5 — the "Verified" badge
  celebrityBadge: boolean;       // reputation/status badge, earned via referral (§4.3) — SEPARATE from KYC
  referralCode: string;          // drives the celebrity-badge/referral programme
  media: MediaAsset[];
  rateCards: RateCard[];
  availability: AvailabilityBlock[];
  createdAt: string; updatedAt: string;
}

interface MediaAsset {
  id: string; kind: MediaKind;   // audio prioritised for vo_artist
  url: string; sizeBytes: number; // max 150MB
  durationSec?: number;
}

interface RateCard {             // "Add Booking Service Title" — niche-agnostic
  id: string;
  serviceTitle: string;
  basePrice: Money;
  deliveryTimeline: string;      // e.g. "3 days", "1 session"
}

interface AvailabilityBlock {
  date: string;                  // ISO
  slots: { start: string; end: string; booked: boolean }[];
}

interface Client {
  id: string; userType: 'client';
  name: string; orgName?: string; orgType?: 'studio' | 'event' | 'brand' | 'church';
  location: string;
}

interface Brief {
  id: string; clientId: string;
  projectName: string; projectType: string;
  nicheRequirements: Niche[];
  assets: MediaAsset[];          // scripts / references
  budget: Money;                 // from a budget slider
  createdAt: string;
}

interface Booking {
  id: string;
  creatorId: string; clientId: string;
  rateCardId: string;
  engagementType: EngagementType; // 'one_off' | 'retainer' (§4.4)
  slot: { date: string; start: string; end: string };
  recurrence?: string;            // set when engagementType === 'retainer' (e.g. "monthly")
  base: Money;
  fees: { talentFee: Money; clientFee: Money }; // computed from PlatformFees
  state: BookingState;
  meetUrl?: string;               // Google Meet link for the live call (US-8)
  createdAt: string;
}

interface OrderRoom {
  id: string; bookingId: string;
  messages: Message[];           // text, voice, document, call events
  timeline: BookingState;        // mirrors Booking.state for the progress bar
  activeCallUrl?: string;        // live Google Meet call in progress (US-8)
}

interface Message {
  id: string; senderId: string;
  kind: 'text' | 'voice' | 'document' | 'call' | 'system'; // 'call' = live-call started/ended event
  content: string; createdAt: string;
}

interface WaitlistEntry {
  id: string; email: string;
  queueNumber: number;           // "#{XYZ} in the verification queue"
  referralCode: string;
}
```

---

## 7. Antigravity build guidelines (design-to-code)

To let Antigravity parse Figma → code cleanly:

1. **Auto-Layout mandate.** Every card, form, header, nav item, and list container uses Figma Auto-Layout. No floating vector groups (they break compilation).
2. **Semantic layer naming.** No `Frame 1024` / `Vector 2`. Use dev-aligned names: `btn-primary`, `btn-outline-hover`, `btn-disabled`; `card-creator-storefront`, `card-niche-select`, `card-rate`, `card-checkout`; `badge-verified`, `badge-processing`, `badge-escrow-locked`.
3. **Fluid design tokens.** Clean variables for padding, borders, gaps, and radii, scaling responsively across mobile → desktop. (Token values are defined once in `MONOLOGG_DESIGN_SYSTEM.md` and referenced everywhere — never hardcode hexes or pixel radii in a component.)
4. **State coverage.** Each interactive component ships all of: default, hover, focus, active, disabled, loading, success, error.
5. **Two-audience theming.** Components read a single `--accent` token; the creator app binds it to Talent Coral, the client app to Client Navy. No component hardcodes an audience color.

---

## 8. Success criteria (beta)

- A creator completes onboarding (niche → media → analysis → verified → rate cards → availability) and lands on a shareable storefront.
- A client posts a brief, discovers a verified creator, selects a slot, and completes an escrow-locked checkout with the correct region rail.
- The order room shows an accurate 3-step escrow timeline for both parties.
- Fee math is driven entirely by the `PlatformFees` config (no hardcoded percentages), so C1–C3 can be resolved with a one-line change.
- Both audiences work in full light and dark mode; every screen passes WCAG 2.2 AA contrast.
- Marketing site toggles between waitlist (A) and live (B) with no code rebuild.
- Fully responsive 320px → 1440px with no horizontal scroll.

---


## 9. Prompt Pack

The ordered, self-contained build prompts for Antigravity now live in their own file: **`PromptPack_Monologg.md`**.

Keep all three files in the repo root so the agent can cross-reference them:
- `prd.md` (this file) — product requirements, screen registry, data model, and the Conflict Ledger.
- `PromptPack_Monologg.md` — the 12 ordered build prompts + global context.
- `MONOLOGG_DESIGN_SYSTEM.md` — tokens, color, typography, motif, and voice.

The prompt pack references this PRD's Conflict Ledger (C1–C11) via `// TODO(conflict: Cx)` markers, so resolve those items here first.
