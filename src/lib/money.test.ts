import { describe, expect, it } from 'vitest';
import { PLATFORM_FEES } from '@/config/platformFees';
import type { Money, PlatformFees } from '@/types';
import {
  computeFees,
  formatMoney,
  formatMoneyForCountry,
  formatMoneyValue,
  toMinorUnits,
} from './money';

describe('formatMoney', () => {
  it('formats minor units into decimal currency', () => {
    expect(formatMoney(125000, 'USD', 'en-US')).toBe('$1,250.00');
  });

  it('handles zero-decimal currencies', () => {
    expect(formatMoney(1250, 'JPY', 'en-US')).toBe('¥1,250');
  });

  it('formats a Money value', () => {
    expect(formatMoneyValue({ amount: 50000, currency: 'USD' }, 'en-US')).toBe('$500.00');
  });
});

describe('formatMoneyForCountry (region-aware)', () => {
  it('uses the Nigerian market locale for NG', () => {
    const naira: Money = { amount: 45000000, currency: 'NGN' };
    const formatted = formatMoneyForCountry(naira, 'NG');
    expect(formatted).toContain('450,000');
    expect(formatted).toContain('₦');
  });

  it('uses French conventions for FR', () => {
    const euros: Money = { amount: 123456, currency: 'EUR' };
    const formatted = formatMoneyForCountry(euros, 'FR');
    expect(formatted).toContain('€');
    // fr-FR groups with (narrow) no-break spaces and uses a decimal comma
    expect(formatted).toContain('234,56');
  });

  it('falls back to a neutral locale for unknown countries', () => {
    const dollars: Money = { amount: 100000, currency: 'USD' };
    expect(formatMoneyForCountry(dollars, 'ZZ')).toContain('1,000');
  });
});

describe('toMinorUnits', () => {
  it('converts major to minor units per currency', () => {
    expect(toMinorUnits(1250.5, 'USD')).toBe(125050);
    expect(toMinorUnits(450000, 'NGN')).toBe(45000000);
  });

  it('passes zero-decimal currencies through', () => {
    expect(toMinorUnits(1250, 'JPY')).toBe(1250);
  });
});

describe('computeFees', () => {
  const base: Money = { amount: 100_000, currency: 'NGN' };

  it('derives every figure from the PLATFORM_FEES config, not literals', () => {
    const breakdown = computeFees(base, PLATFORM_FEES);
    // Assert against the config values themselves — if C1–C3 change the config,
    // these expectations follow automatically. No 0.11/0.15 literals here.
    expect(breakdown.talentFee.amount).toBe(Math.round(base.amount * PLATFORM_FEES.talentPct));
    expect(breakdown.clientFee.amount).toBe(Math.round(base.amount * PLATFORM_FEES.clientPct));
    expect(breakdown.talentNet.amount).toBe(base.amount - breakdown.talentFee.amount);
    expect(breakdown.clientTotal.amount).toBe(base.amount + breakdown.clientFee.amount);
  });

  it('changes output when handed different config (proves no hardcoded percentages)', () => {
    const altFees: PlatformFees = { talentPct: 0.5, clientPct: 0.25 };
    const breakdown = computeFees(base, altFees);
    expect(breakdown.talentFee.amount).toBe(50_000);
    expect(breakdown.clientFee.amount).toBe(25_000);
    expect(breakdown.talentNet.amount).toBe(50_000);
    expect(breakdown.clientTotal.amount).toBe(125_000);
  });

  it('preserves the base currency on every figure', () => {
    const breakdown = computeFees({ amount: 9_999, currency: 'KRW' }, PLATFORM_FEES);
    for (const figure of Object.values(breakdown)) {
      expect(figure.currency).toBe('KRW');
    }
  });

  it('rounds to whole minor units', () => {
    const breakdown = computeFees({ amount: 9_999, currency: 'USD' }, PLATFORM_FEES);
    expect(Number.isInteger(breakdown.talentFee.amount)).toBe(true);
    expect(Number.isInteger(breakdown.clientFee.amount)).toBe(true);
  });

  it('applies talentPct and clientPct independently — a round-number sanity check', () => {
    // On a clean 1,000,000 base, hand-checkable math for both sides at once.
    // If either percentage ever leaks a literal or the two get swapped, this fails.
    const breakdown = computeFees({ amount: 1_000_000, currency: 'NGN' }, PLATFORM_FEES);
    expect(breakdown.talentFee.amount).toBe(1_000_000 * PLATFORM_FEES.talentPct);
    expect(breakdown.clientFee.amount).toBe(1_000_000 * PLATFORM_FEES.clientPct);
    expect(breakdown.talentFee.amount).not.toBe(breakdown.clientFee.amount);
  });

  it('handles a zero base without dividing by zero or producing NaN', () => {
    const breakdown = computeFees({ amount: 0, currency: 'NGN' }, PLATFORM_FEES);
    expect(breakdown.talentFee.amount).toBe(0);
    expect(breakdown.clientFee.amount).toBe(0);
    expect(breakdown.talentNet.amount).toBe(0);
    expect(breakdown.clientTotal.amount).toBe(0);
  });

  it('reflects a fee config update with no code changes (simulates resolving C1–C3)', () => {
    // The scenario the config indirection exists for: the product owner confirms
    // real percentages and only platformFees.ts changes — computeFees just obeys.
    const resolved: PlatformFees = { talentPct: 0.09, clientPct: 0.12 }; // e.g. older PDF figures
    const breakdown = computeFees({ amount: 1_000_000, currency: 'NGN' }, resolved);
    expect(breakdown.talentFee.amount).toBe(90_000);
    expect(breakdown.clientFee.amount).toBe(120_000);
  });
});
