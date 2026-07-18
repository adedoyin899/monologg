import type { PlatformFees } from '@/types';

// TODO(conflict: C1/C2/C3): fee percentages are UNCONFIRMED — Source Docs say 11%
// talent / 15% client; the older PRD PDF says 9%/12%; one table says 10%/10%.
// Fees are CONFIG ONLY — the whole app reads this object; never hardcode them,
// so resolving C1–C3 is a one-line change here.
export const PLATFORM_FEES: PlatformFees = {
  talentPct: 0.11,
  clientPct: 0.15,
};
