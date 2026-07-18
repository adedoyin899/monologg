import type { Region } from './markets';

// TODO(conflict: C4): payment rails unconfirmed — Source Docs say Paystack (Africa)
// with Stripe & Airwallex for the rest of the world; the older PRD PDF names a
// different provider, which is a PLACEHOLDER and must never appear here or be
// hardcoded anywhere in the app.
export type PaymentProvider = 'paystack' | 'stripe' | 'airwallex';

export const PAYMENT_RAILS: Record<Region, readonly PaymentProvider[]> = {
  africa: ['paystack'],
  rest: ['stripe', 'airwallex'],
};

export function railsForRegion(region: Region): readonly PaymentProvider[] {
  return PAYMENT_RAILS[region];
}
