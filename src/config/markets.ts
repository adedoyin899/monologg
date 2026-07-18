export type Region = 'africa' | 'rest';

export interface Market {
  /** ISO 3166-1 alpha-2 country code */
  country: string;
  name: string;
  /** ISO 4217 currency code */
  currency: string;
  /** BCP 47 locale used for money/date formatting in this market */
  locale: string;
  region: Region;
}

/** The 13 launch markets (PRD §2.3, from the Source Docs). */
export const MARKETS: Market[] = [
  { country: 'NG', name: 'Nigeria', currency: 'NGN', locale: 'en-NG', region: 'africa' },
  { country: 'GH', name: 'Ghana', currency: 'GHS', locale: 'en-GH', region: 'africa' },
  { country: 'MX', name: 'Mexico', currency: 'MXN', locale: 'es-MX', region: 'rest' },
  { country: 'US', name: 'United States', currency: 'USD', locale: 'en-US', region: 'rest' },
  { country: 'CA', name: 'Canada', currency: 'CAD', locale: 'en-CA', region: 'rest' },
  { country: 'GB', name: 'United Kingdom', currency: 'GBP', locale: 'en-GB', region: 'rest' },
  { country: 'IN', name: 'India', currency: 'INR', locale: 'en-IN', region: 'rest' },
  { country: 'IT', name: 'Italy', currency: 'EUR', locale: 'it-IT', region: 'rest' },
  { country: 'ES', name: 'Spain', currency: 'EUR', locale: 'es-ES', region: 'rest' },
  { country: 'FR', name: 'France', currency: 'EUR', locale: 'fr-FR', region: 'rest' },
  { country: 'AU', name: 'Australia', currency: 'AUD', locale: 'en-AU', region: 'rest' },
  { country: 'KR', name: 'South Korea', currency: 'KRW', locale: 'ko-KR', region: 'rest' },
  { country: 'CN', name: 'China', currency: 'CNY', locale: 'zh-CN', region: 'rest' },
];

/** country code → currency code, e.g. NG → NGN */
export const CURRENCY_BY_COUNTRY: Record<string, string> = Object.fromEntries(
  MARKETS.map((market) => [market.country, market.currency]),
);

export function marketForCountry(countryCode: string): Market | undefined {
  return MARKETS.find((market) => market.country === countryCode.toUpperCase());
}
