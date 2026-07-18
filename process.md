# Monologg — The Story So Far (Plain-English Process)

This file explains each step of building Monologg in simple terms — no jargon.
Think of it as the diary of the build: what we did, and why it matters.

---

## What is Monologg?

Monologg is an app (and website) that connects two groups of people in the performing arts:

- **Talent** — actors, performers, and creators who offer their skills.
- **Clients** — casting directors and producers who need to book them.

A client posts a brief ("I need this kind of performance"), talent responds, and the
booking — including payment — happens right inside the app. It works great on phones
first, and adapts beautifully to bigger screens.

---

## Step 1 — Setting the ground rules (2026-07-16)

Before writing any code, we agreed on the rules of the road:

- **One source of truth.** When older planning documents disagree with the newer ones,
  the newer ones win — and we leave a note in the code wherever that happened, so
  nothing gets lost or silently decided.
- **Money settings stay flexible.** The percentage Monologg takes from each booking is
  stored as a setting that can be changed easily — never baked permanently into the code.
  This matters because those numbers aren't final yet.
- **Payments adapt to where you are.** Someone in Africa pays through one provider
  (Paystack); everyone else through others (Stripe, Airwallex). The app picks the right
  one automatically.
- **Two different "smart" features stay clearly separate.** One AI feature tags a
  performer's style ("comedic", "dramatic"). A completely different system verifies
  that a person is who they say they are (the "Verified" badge). Mixing these up would
  confuse users, so we keep them apart everywhere — in the design and in the wording.
- **The look and feel.** Warm, playful, and a little theatrical — but polished and
  trustworthy, like a premium finance app. Light theme by default, with a full dark mode.

**What we achieved:** everyone (human and AI) is now working from the same playbook,
which prevents expensive misunderstandings later.

## Step 2 — Creating our project notebooks (2026-07-16)

We set up three living documents:

- **log.md** — a checklist of what's done and what's next, so progress is always visible.
- **bug.md** — a journal of every problem we find and how we fixed it, so nothing is
  fixed twice or forgotten.
- **process.md** — this file, keeping the whole journey understandable to anyone.

**What we achieved:** the project now documents itself as it grows. Anyone can open
these three files and know exactly where things stand.

## Step 3 — Building the foundation (2026-07-16)

Think of this step as constructing the empty theater before any shows are staged: the
building, the wiring, the dressing rooms — but no performances yet.

What we put in place:

- **The skeleton of the app.** A modern, fast setup that lets us see changes instantly
  while building, and produces a small, quick-loading app for users.
- **Rooms for every part of the product.** Separate, clearly-labeled folders for the
  marketing site, sign-in screens, the Talent side, the Client side, shared screens
  (like the order room), and reusable building blocks. Everything has a home before
  anything is built — so nothing ends up in the wrong place later.
- **The brand's paint and wallpaper.** Every color, font size, spacing value, and
  shadow from the design system is now loaded in one central place. The app
  automatically switches between light and dark themes, and between the two brand
  colors: coral when a performer is using it, indigo/navy when a casting client is.
  No color is ever "hand-painted" onto a screen — everything references the central
  palette, so a future rebrand is a one-file change.
- **The money rules, kept flexible.** The platform's fee percentages and the list of
  payment providers per region live in small settings files — easy to change, impossible
  to accidentally scatter through the code. We also left a visible note that the fee
  numbers still need confirmation.
- **A first safety net.** An automatic test already checks that money amounts format
  correctly (e.g. ₦, $, ¥) — the start of a test suite that grows with the app.

We then switched everything on and verified it: the code checker passes, the tests
pass, the app builds for production, and the development preview runs in the browser.
(One small tooling hiccup came up and was fixed — recorded in bug.md.)

**What we achieved:** a verified, working foundation. From here on, every task is
about building visible product on top of it, not plumbing.

## Step 4 — Installing the brand's DNA (2026-07-16)

If Step 3 built the empty theater, this step installed the lighting rig and the
house style — the exact colors, sizes, and rules every future screen will obey.

What we put in place:

- **The complete palette, wired for real.** Every color from the design system now
  lives in one central stylesheet: the warm cream backgrounds, the ink text, the
  coral for performers, the indigo/navy for casting clients, and the four "status"
  colors (green = paid, amber = in escrow, red = failed, blue = info). Light and
  dark theme values sit side by side, and the app flips between them instantly.
- **Accessibility, proven not promised.** Every text-on-background color pair used
  anywhere in the system carries its measured contrast score against the WCAG 2.2
  accessibility standard — so people with low vision can always read the app. Some
  shades exist *only* because of this (e.g. a deeper coral for text, because the
  bright coral is too faint to read on a light background).
- **Statuses never rely on color alone.** "Paid" is a green badge *plus* a check
  icon *plus* the word — so colorblind users are never guessing.
- **A theme brain and an audience brain.** Two small state managers now control the
  whole look: one remembers your light/dark choice (or follows your device), the
  other switches the accent color depending on who's using the app — performer or
  casting client.
- **A "kitchen sink" page.** A hidden page (/kitchen-sink) displays every color,
  font size, spacing step, corner radius, shadow, and animation speed — for both
  audiences, in both themes, at once. It's our showroom: one glance confirms the
  whole system looks right, and it's where we'll spot visual mistakes early.

**What we achieved:** the brand is now enforced by the code itself. A screen built
tomorrow literally cannot use an off-brand color without it being obvious — and
the accessibility standard is baked in from day one.

## Step 5 — Building the props department (2026-07-17)

A theater production doesn't build a new chair for every scene — it keeps a props
department. This step built ours: eighteen reusable building blocks that every screen
from now on will assemble from, instead of reinventing.

The highlights, in plain terms:

- **Buttons of every kind** — the main "do it" button, quieter secondary ones, and a
  red one for dangerous actions. Each knows how to look when pressed, disabled, or
  busy loading (it shows a small spinner and politely refuses double-clicks).
- **Every form ingredient** — text boxes, dropdowns, tag pickers ("Comedy", "MC"…),
  a budget slider that speaks in real money (₦), and switches. When something's
  wrong, the field says so in words with an icon — never just by turning red.
- **The escrow tracker** — a three-step progress line (money locked → work delivered
  → money released) so both sides always know exactly where the deal stands.
- **Status stamps** — small labeled badges like PAID, IN ESCROW, or VERIFIED. Each is
  always a color *plus* an icon *plus* the word, so no one is ever guessing.
- **Pop-ups done right** — on a phone they slide up from the bottom like a card; on a
  laptop they appear centered. The keyboard stays "trapped" inside until you close it,
  which is what makes them usable for people who don't use a mouse.
- **Toast notes** — the little confirmation slips ("Booked ✓") that appear briefly and
  tidy themselves away.
- **The upload stage door** — a drag-and-drop zone for showcase reels that checks the
  file is actually video/audio and under 150MB, and says so kindly when it isn't.
- **Shimmering placeholders** — while our AI reads a performer's reel to suggest style
  tags, gentle pulsing shapes hold the space so the wait feels intentional, not broken.
- **The brand's signature** — the "/" divider and the m/ mark, now real components.

Every piece automatically wears the right costume: coral on the performer side, navy
on the casting side, correct in light and dark — because they all drink from the same
central palette from Step 4. And every piece works by keyboard alone, with visible
focus outlines and finger-friendly sizes.

**What we achieved:** screens can now be assembled quickly from proven, accessible
parts. The showroom page (/kitchen-sink) displays every piece, and it's all visible
live at http://localhost:5173/kitchen-sink.

## Step 6 — Writing the script everyone acts from (2026-07-17)

Before actors improvise a scene, the production agrees on the script. This step wrote
the app's "script": a precise definition of every kind of thing Monologg deals with,
and the business rules around money.

- **A shared vocabulary.** We defined, in code, exactly what a Creator is, what a
  Client is, what a Brief, a Booking, an Order Room, a Rate Card, and a waitlist spot
  look like — every field, every allowed value. Now every future screen speaks the
  same language, and mistakes like "a booking without a price" simply can't compile.
- **Three things that must never blur** got their own distinct places: the AI's style
  tags ("warm, conversational"), the identity Verified badge, and the referral-earned
  celebrity badge. Keeping them separate in the data makes it impossible to
  accidentally merge them in the interface.
- **The 13 launch countries** are now official in the settings: Nigeria, Ghana, Mexico,
  USA, Canada, UK, India, Italy, Spain, France, Australia, South Korea, China — each
  with its currency and local formatting style (₦450,000 in Lagos reads as expected;
  a French user sees 1 234,56 €).
- **The fee calculator.** One small, well-tested function computes what the performer
  receives and what the client pays. Crucially, the percentages live in ONE settings
  file — the calculator provably has no numbers baked in. When the founders finalise
  the fees, it's a one-line change.
- **Five memory banks.** Small stores now hold what the app needs to remember while
  you use it: who's signed in, a creator's onboarding progress, a client's briefs and
  search filters, active bookings with their escrow stage (which can only move
  forward — never backward or skipped), and your waitlist spot (which survives a
  page refresh).
- **Automatic proof.** Ten automated tests now guard the money math and formatting —
  including one designed to fail loudly if anyone ever hardcodes a fee percentage.

**What we achieved:** the app now has a brain and a rulebook, not just a face. Screens
we build next will read and write real, well-defined data instead of placeholder text.

## Step 7 — Opening the front of house (2026-07-17)

Until now everything we built was backstage. This step opened the front of house:
the public website that convinces performers and casting people to walk in.

- **One page, two moods.** The site has a single fixed layout, but its most
  important moment — the big invitation at the top — has two versions. Before
  launch it asks for your email to join the waitlist; after launch it shows two
  buttons that take you straight into the product. Switching between them is
  literally a one-word change in a settings file. No rebuild, no redesign.
- **The waitlist that makes you someone.** Type your email and the box transforms
  on the spot into: "You are Number #227 in the verification queue. Share your
  link to climb the roster" — with a copy-link button and share buttons for X and
  WhatsApp. Your number survives even if you close the tab.
- **Proof before promises.** Right under the headline, visitors see the actual
  product: a performer's storefront card (photo, style tags, price, Book button)
  and a live-looking order room with the escrow progress bar — built from the very
  same components the real app uses, so the preview can never drift out of date.
- **The two-color moment.** A "Who it's for" section shows a coral panel for
  creators beside a navy panel for casting — deliberately the only place in the
  whole product where both brand colors share a stage.
- **Trust, spelled out.** A section explains escrow in plain words, shows the
  payment partners (pulled from the settings file, so they update everywhere at
  once), and clarifies that the Verified badge means real identity — not vibes.
- **A "How it works" page** with three slots ready for explainer videos and a
  proper FAQ — the same answers that will appear inside the app's Help section.
- **A blog, ready to grow.** Three real articles are live, and the structure is
  built so a content system can take over later without rebuilding the pages.
  Since the growth plan is 100% organic, this is the engine room for search traffic.
- Everything animates in gently as you scroll (and doesn't animate at all for
  people who've asked their device for less motion), works from a small phone to
  a wide desktop, and looks right in light and dark.

**What we achieved:** Monologg now has a public face that sells it, a waitlist that
captures demand before launch, and a flip-switch to go live — all at
http://localhost:5173/ (the toggle preview is the little pill bottom-left).

## Step 8 — The stage door (2026-07-17)

Every theater has a stage door where people check in. This step built Monologg's:
the screens where someone becomes a user.

- **A warm welcome.** The first screen greets you with the m/ mark and two clear
  doors: create an account or sign in.
- **"Which side of the stage?"** Registration starts with the one question that
  shapes everything: are you Talent, or looking to Hire? The moment you tap a card,
  the whole app dresses accordingly — coral for performers, navy for casting — and
  stays that way for your session.
- **Forms that catch mistakes kindly.** Try a bad email and you'll hear "That
  address won't reach the green room — check it." Try an email that already has an
  account and the form tells you right there — no dead ends, no page reloads.
- **The six-digit handshake.** After registering, you type a code from your email
  to prove you're real. Wrong code? You get three tries with a clear countdown —
  then, instead of locking you out coldly, we walk you to a support page with a
  human to email and an FAQ to browse.
- **Forgot password, done safely.** Whatever email you type, the answer is the same
  calm "if that address is on the roster, a reset link is on its way" — so nobody
  can use the form to fish for who has an account.
- **Where you land.** New performers go straight into setting up their craft;
  casting clients land in their hiring home. (While the real email service isn't
  connected yet, the demo code is shown on screen: 424242 — and two demo accounts
  are listed on the sign-in page so anyone can explore both sides.)

**What we achieved:** people can now enter the product — with the right colors, the
right words, and no way to get stranded. Try it at http://localhost:5173/auth

## Step 9 — The dressing room (2026-07-17)

A performer's first minutes in the app are like arriving at a new theater: someone
shows you to your dressing room and helps you get ready. This step built that
guided walk — four short scenes with a progress bar on top and no way to get lost.

- **Scene 1: your craft.** Six friendly cards — Actor, VO Artist, Comedian/Compère,
  Speaker/Pastor, Musician, Content Creator/Streamer. Your pick quietly shapes what
  comes next: choose VO Artist and the next screen leads with audio files, because
  your voice *is* the reel.
- **Scene 2: your reel.** Drag in one performance clip (up to 150MB). We
  deliberately call it a "Performance / Showcase Reel" — never an "audition tape" —
  so a pastor or a streamer feels as at home as an actor.
- **Scene 3: the listening.** While our AI reviews the clip, gentle pulsing shapes
  show something is genuinely happening. The screen says exactly what it's doing —
  reading your *style* — and just as clearly what it is not doing: verifying your
  identity. That's a separate check, and when it passes you get the Verified badge.
- **Scene 4: your vibe, your words.** The AI proposes style tags like "Warm
  Texture" and "Conversational" — but you stay the editor: remove any, add your
  own, six max.
- **Scene 5: your prices.** Add bookable services — a title, a price in your
  currency, a delivery time — and watch your actual storefront card assemble
  live beside the form as you type. What you see is what clients will book.
- The walk ends with a clear "what's next" (calendar scheduling, coming in the
  next act) and lands you on a summary of everything you just built.

**What we achieved:** a brand-new performer can now go from empty account to a
priced, styled, verified storefront in about two minutes — without reading a manual.
Try it: register as Talent at http://localhost:5173/auth/register

## Step 10 — The marquee and the box office hours (2026-07-17)

Two more rooms opened today: the performer's public page, and the calendar that
controls when they can be booked.

- **The storefront (the marquee).** Every performer now has a public page: their
  photo and name up top, what they do and where they're based, their style tags,
  their actual reel playing right on the page (video or audio), and their services
  stacked like a link-in-bio — each with a price and a Book button. On a phone it's
  one elegant column; on a laptop the booking cards sit in their own rail beside
  the profile. A share button puts the link anywhere — that page *is* the
  performer's business card now.
- **Two badges, two meanings — kept honestly apart.** The blue-check style
  "Verified" mark means one thing only: this is a real, identity-checked person.
  The separate star "Celebrity" pill is a reputation mark earned through
  referrals. They look different, sit apart, and explain themselves — because
  confusing "famous" with "genuine" is how marketplaces lose trust.
- **The hours (the box office).** Performers set their working week with simple
  switches — Monday through Friday on by default, weekends "dark night" (a little
  theater slang). Then a strip of the next 14 days lets them tap any date and
  flip open the exact hours they'll take bookings, in a slide-up panel. Days with
  open slots get a coral dot. A card confirms Google Meet is synced, so every
  future booking comes with a call link.
- Performers preview their own storefront with one tap from their dashboard, and
  the dashboard now shows how many slots they have open.

**What we achieved:** a performer is now genuinely discoverable and bookable-looking —
a shareable page plus published availability. See it at
http://localhost:5173/creator/storefront and /creator/schedule

## Step 11 — The casting office (2026-07-17)

We've been building for performers; today the people who *hire* them got their
rooms: a desk to post what they need, and a catalogue to browse who's available.

- **Post a project in one page.** A casting client describes their production —
  name, type (film, live event, church service…), who they need (tap-to-select
  chips: actors, VO artists, comedians, pastors, streamers…), an optional script
  or reference clip, and a budget set with a slider that speaks real money in
  their currency. On submit, the brief is saved and matching performers are
  notified (simulated for now — "6 matching creators notified"), and the client
  is taken straight to a talent list already filtered to who they asked for.
- **The talent directory.** Eight demo performers (our Lagos launch cohort)
  browsable like a casting catalogue: search by name, filter by craft — with the
  core four (Actors, VO, Comedians, Compères) and the extended family (Pastors,
  Musicians, Streamers) kept as separate rows — by vibe ("Warm Texture", "High
  Energy"…), by maximum price, by country, or verified-only. Each card shows the
  face, the craft, the top style tags, and a "From ₦…" starting price. On a
  phone it's a clean feed; on a desktop the filters move into a sidebar beside
  a three-column grid.
- **Tap a card, meet the performer.** Every card opens that performer's actual
  storefront — the same page from Step 10, now reachable at its own shareable
  address (like /t/adaeze-obi). Deliberate detail: even when a casting client is
  browsing (navy world), a performer's storefront stays coral — it's *their*
  stage, whoever's in the audience.
- Honest empty states throughout: filter too hard and you get "No one fits that
  bill yet — loosen a filter or two" with a one-tap reset.

**What we achieved:** the marketplace now has both halves — performers with
storefronts, and clients who can find and shortlist them. The only thing between
them is the checkout, which is exactly what comes next. Try it at
http://localhost:5173/client

## Step 12 — The handshake (2026-07-17)

Today the two halves of the marketplace finally shake hands: a client can book a
performer, put real money in the middle, and both sides watch the job through to
"paid" in one shared room.

- **Booking, in three taps.** From any performer's page, tap Book: choose whether
  this is a one-time gig or an ongoing retainer (for brands that keep talent on
  call — weekly, biweekly, or monthly), then pick from the performer's actual open
  time slots. Already-taken slots show crossed out — no double-booking, no
  back-and-forth emails.
- **Honest math, before any card comes out.** The summary shows the base rate,
  the client's service fee, and the exact total that will sit in escrow — and every
  number is computed from the single settings file, so when the founders finalise
  the percentages, every screen updates at once.
- **Paying feels local.** The payment sheet picks the right payment partner for
  where you are (Paystack in Africa; Stripe or Airwallex elsewhere) and takes a
  card or bank details. Before you commit, it shows BOTH sides of the deal in
  plain figures: what you pay today, and what the performer will receive on
  delivery after their fee. No surprises for anyone, ever — that's the trust
  the whole product stands on.
- **The order room.** The moment escrow locks, a shared room opens. At the top, the
  three-step money tracker (locked → delivered → paid), a running fee ledger, and
  the action button for whichever step is next. Below, a real conversation: text
  bubbles, voice notes with a little play button, attached documents, and quiet
  "/ escrow locked /" system lines marking the milestones.
- **A real call, one tap away.** The camera button in the room's header starts a
  live Google Meet session tied to this exact booking — for the "let's just talk
  it through" moments that voice notes can't cover. A banner shows the call is
  live with a join link until someone ends it.
- A nice detail: the same room dresses coral for the performer and navy for the
  client — same facts, each side's own colors.

**What we achieved:** the core promise — brief to booking to escrow to paid — now
works end to end. Walk it yourself: pick anyone at
http://localhost:5173/client/directory, tap through to Book, pay with any digits,
and run the order to "Paid".

## Step 13 — Backstage management (2026-07-17)

Every good venue has a back office. Today the app got its own: the screens where
people manage themselves rather than each other.

- **Settings, one tidy menu.** Profile & bio (the form politely changes shape
  depending on whether you're a performer or a casting organisation), rate cards
  and media (edit anytime what you built during onboarding), payout details
  (which automatically shows the right payment partner for your region), and
  notification switches that remember your choices.
- **The referral programme.** Performers get a personal invite link; bring five
  fellow creators onto the roster and the star "Celebrity" badge appears on your
  page. This screen also teaches the distinction we've been careful about all
  along, with both badges side by side: the Verified check answers "is this a
  real person?", the Celebrity star answers "does the community rate them?" —
  and you can hold neither, one, or both.
- **The system screens.** A notification centre (with unread dots and a
  mark-all-read), a transaction history where performers see what they'll
  receive and clients see what they paid — each row opening its order room — a
  help page with three fast paths to a human, readable draft terms & privacy
  (clearly labelled as awaiting legal review), and a searchable FAQ.
- **One FAQ, two doors.** The answers on the marketing site and the answers
  inside the app now come from literally the same file — fix a typo once, it's
  fixed everywhere.
- Every one of these screens automatically wears the right colors for whoever's
  signed in, works in light and dark, and is fully keyboard-navigable.

**What we achieved:** the app is no longer just a happy path — people can manage,
correct, and understand their account end to end. Explore from the gear icon on
any dashboard, or http://localhost:5173/settings

## Step 14 — One building, two wings (2026-07-17)

Until now, our screens were like finished rooms in a building without corridors.
This step connected everything: one front door, and two complete wings behind it.

- **One login decides everything.** Sign in as a performer and you get the entire
  coral wing; sign in as a casting client and you get the navy wing. Try to wander
  into the other side's rooms by typing an address, and the app politely walks you
  back to your own. Not signed in? Every app door leads to the sign-in desk first.
- **Your session stays put.** Close the tab, come back tomorrow — you're still
  signed in, still on your side, your bookings and settings intact.
- **A navigation bar that's always there.** Five tabs along the bottom, tailored
  per side. Performers get Home, Bookings, Discover, Inbox, Profile; clients get
  Home, Find Talent, Projects, Inbox, Account. (It politely disappears during
  the guided onboarding walk, where focus matters.)
- **The two sides now actually talk.** Post a project as a client, then sign in
  as a performer: your brief is sitting right there in their Discover tab, marked
  "New". Book a performer as a client: the booking appears in the performer's
  Bookings tab and both sides' Inboxes — same room, two doors, each in its own
  colors.
- **Try the full loop yourself** with the demo accounts (any 8+ character
  password): tunde@demo.monologg.app to hire, adaeze@demo.monologg.app to perform.
  Post a brief as Tunde, book Adaeze, send a message in the order room — then
  sign out, sign in as Adaeze, and see the same world from the stage.

**What we achieved:** Monologg is no longer a collection of screens — it's one
product with two complete, connected experiences behind a single login.

## Step 15 — The house lights switch (2026-07-17)

A small but visible addition: a real, findable way to switch between light and
dark mode, for both sides of the app.

- The app already *supported* dark mode from very early on — every screen was
  built to work in both — but there was no everyday way to switch it beyond a
  hidden developer toolbar. Now there's a proper "Appearance" entry in
  Settings, for performers and casting clients alike.
- Three choices: Light, Dark, or System (follow your device automatically).
  Your choice is remembered next time you open the app.
- A small preview on the same screen shows both looks side by side, so you can
  compare before committing — and your own brand color (coral for performers,
  navy for clients) stays correctly applied in either look, exactly as
  designed from the start.

**What we achieved:** switching themes is now a normal, visible setting instead
of a hidden trick — try it at Settings → Appearance, on either account.

## Step 16 — Opening night inspection (2026-07-18)

Before any show opens, someone walks every inch of the building: tests every
door, checks every light, reads the fine print on every contract. This step
was that inspection for Monologg — the last pass before calling this a beta.

- **A real bug, caught and fixed.** While building the automated checks, we
  found that the waitlist's "queue number" was actually random, not a real
  queue position — two people could theoretically get the same number. Fixed
  it to hand out numbers in true order, one per person, like a real line
  should.
- **A real overflow bug, caught and fixed.** The referral link on a phone
  screen could, in an edge case, force the page to scroll sideways — something
  we explicitly promised wouldn't happen. Found it during the width check,
  fixed it in one line.
- **42 automated tests now run with one command** (`npm test`), checking: the
  fee math (proving, with real evidence, that no percentage is secretly baked
  into the code — swap the settings file and every number in the app follows),
  the money formatting for different countries, the waitlist numbering, the
  escrow money-tracker (proving it can only move forward, one step at a time,
  never skip, never go backwards), and the marketing page's before/after-launch
  switch (proving both versions genuinely render correctly).
- **An automatic accessibility inspector now watches the app while we build**
  (in developer mode only — it adds nothing to what real users download) and
  is baked into the test suite too, checking labels, keyboard structure, and
  screen-reader compatibility on every run — zero issues found across every
  screen it checked.
- **A full paper trail for whoever finalizes the business decisions.** A new
  README.md now lists, in one place: how to run everything, exactly which
  settings file controls the still-undecided platform fees and payment
  providers, and a plain accounting of every open question from the original
  planning documents — what this build assumed, and what still needs a
  founder's final word.
- **An honest inventory of what's real versus simulated** — because a beta
  build should never quietly pretend a mock payment or a fake identity check
  is the real thing. The README says plainly which parts are working
  application logic and which are stand-ins waiting for real backend services.

**What we achieved:** the foundation has now been genuinely tested, not just
built — with real proof, real fixes, and a clear map for the next phase.

## Step 17 — A light switch by the door, everywhere (2026-07-18)

Until now, switching between light and dark mode meant digging into Settings —
correct, but hidden. A house's light switch should be by the door, not in a
drawer. This step put one on every page.

- **One small sun/moon button, always in reach.** Wherever you are in the app —
  browsing the marketing site, signing in, walking through onboarding, deep in
  a dashboard, or reviewing a booking — a small button now sits in the corner
  that flips the whole app between light and dark with a single tap.
- **Placed once, works everywhere.** Rather than adding this button to dozens
  of individual screens one by one (and risking missing some), it was wired
  into the four shared "frames" every screen already sits inside — the
  marketing header, the sign-in header, the onboarding header, and one shared
  wrapper around the entire signed-in app. That last one alone covers the
  large majority of the product: both dashboards, every settings page, the
  storefront, scheduling, checkout, the order room, and all the notification/
  help/FAQ pages — all from a single change.
- **No collisions.** We checked where else things already live on screen —
  the bottom navigation bar, the notification and settings icons on each
  dashboard — and placed the new button clear of all of them.
- The deeper "Light / Dark / Follow my device" picker from Settings →
  Appearance (with its side-by-side preview) is still there for anyone who
  wants that level of control — this new button is just the everyday
  shortcut sitting on top of the same switch.

**What we achieved:** switching themes is no longer a settings-page errand —
it's always one tap away, on every single screen in the product.

---

_Next up: PWA hardening (installable app manifest, offline behavior) — everything else on the beta punch list is now built and verified._
