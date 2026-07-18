import { marketForCountry } from '@/config/markets';
import type { Money, PlatformFees } from '@/types';

/**
 * Formats an amount held in minor units (kobo, cents, pesewas…) as currency.
 * Amounts are stored in minor units everywhere; formatting is the only place
 * they become decimal.
 */
export function formatMoney(amountMinor: number, currency: string, locale = 'en'): string {
  const formatter = new Intl.NumberFormat(locale, { style: 'currency', currency });
  const fractionDigits = formatter.resolvedOptions().maximumFractionDigits ?? 2;
  return formatter.format(amountMinor / 10 ** fractionDigits);
}

/** Formats a Money value ({ amount: minor units, currency }). */
export function formatMoneyValue(money: Money, locale = 'en'): string {
  return formatMoney(money.amount, money.currency, locale);
}

/** "1,250.50" USD → 125050 kobo/cents; zero-decimal currencies pass through. */
export function toMinorUnits(amountMajor: number, currency: string): number {
  const formatter = new Intl.NumberFormat('en', { style: 'currency', currency });
  const fractionDigits = formatter.resolvedOptions().maximumFractionDigits ?? 2;
  return Math.round(amountMajor * 10 ** fractionDigits);
}

/**
 * Region-aware formatting: renders a Money value using the launch market's
 * locale conventions (e.g. NG → en-NG → ₦, FR → fr-FR → 1 234,56 €).
 */
export function formatMoneyForCountry(money: Money, countryCode: string): string {
  const market = marketForCountry(countryCode);
  return formatMoney(money.amount, money.currency, market?.locale ?? 'en');
}

export interface FeeBreakdown {
  /** Deducted from the creator's payout on release (talent side). */
  talentFee: Money;
  /** Added on top of base at checkout (client side). */
  clientFee: Money;
  /** What the creator receives: base − talentFee. */
  talentNet: Money;
  /** What the client pays: base + clientFee. */
  clientTotal: Money;
}

/**
 * Escrow fee math (US-7). Percentages come exclusively from the PlatformFees
 * config (Conflict Ledger C1–C3) — never from literals. Rounded to whole minor
 * units; currency follows the base.
 */
export function computeFees(base: Money, fees: PlatformFees): FeeBreakdown {
  const money = (amount: number): Money => ({ amount, currency: base.currency });
  const talentFee = Math.round(base.amount * fees.talentPct);
  const clientFee = Math.round(base.amount * fees.clientPct);
  return {
    talentFee: money(talentFee),
    clientFee: money(clientFee),
    talentNet: money(base.amount - talentFee),
    clientTotal: money(base.amount + clientFee),
  };
}
