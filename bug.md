# Monologg — Bug Journal

Every bug we find, what caused it, and how it was fixed. Newest entries at the top.

_Format for each entry:_

```
## [YYYY-MM-DD] Short bug title
- **Where:** file / feature affected
- **Symptom:** what went wrong, as the user would see it
- **Cause:** the underlying reason, in plain terms
- **Fix:** what we changed to resolve it
- **Status:** Fixed / Workaround / Open
```

---

## [2026-07-16] First production build failed (TypeScript config)
- **Where:** `tsconfig.app.json`, `vite.config.ts` — build tooling, not app code
- **Symptom:** `npm run build` failed with three errors; dev server and tests were unaffected
- **Cause:** (1) the freshly installed TypeScript 6.0 has deprecated the `baseUrl` option we'd set for the `@/` import alias, and (2) the Vite config file uses Node.js APIs (`node:url`) whose type definitions weren't installed
- **Fix:** removed `baseUrl` (the `paths` alias works without it in TS 6) and installed `@types/node`; build now passes cleanly
- **Status:** Fixed

## [2026-07-18] Waitlist queue numbers were random, not sequential
- **Where:** `src/app/stores/waitlist.ts`
- **Symptom:** every person joining the waitlist got a number randomly drawn from a 40-wide band around the base (#214–#253) instead of taking the next real spot in line — two different people could get the same number, and a real "queue" wouldn't behave this way
- **Cause:** the original mock used `QUEUE_BASE + Math.floor(Math.random() * 40)` — convenient for a quick demo, but not actually numbering a queue, and impossible to write a meaningful test against
- **Fix:** replaced with a running join counter so each new (different) email gets the next sequential number; same-email re-joins still correctly return their existing spot. Covered by 6 new tests
- **Status:** Fixed

## [2026-07-18] Referral link could force horizontal scroll on narrow screens
- **Where:** `src/shared/settings/ReferralProgramme.tsx`
- **Symptom:** the copyable referral URL rendered as plain monospace text with no wrap handling — a long link (base URL + `?ref=` + code) risked overflowing its container and creating horizontal scroll at 320px, which the beta hardening pass specifically checked for
- **Cause:** the paragraph had no `break-all`/`break-words` class, and unbroken strings like URLs don't wrap at arbitrary points by default
- **Fix:** added `break-all` to the link paragraph
- **Status:** Fixed

## [2026-07-18] RTL tests weren't cleaning up between runs
- **Where:** `src/test/setup.ts` (new file)
- **Symptom:** while writing the new axe accessibility tests, later tests in the same file failed with "multiple main landmark" and "multiple elements match label text 'Email'" — DOM from earlier tests (e.g. a previous test's `<main>`) was still present when a later test rendered
- **Cause:** Vitest doesn't auto-run Testing Library's `cleanup()` between tests the way Jest's `testEnvironment: jsdom` preset does by default — it has to be wired explicitly
- **Fix:** added `afterEach(() => cleanup())` to the new shared test setup file
- **Status:** Fixed
