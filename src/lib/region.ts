import { MARKETS, type Region } from '@/config/markets';

/** Maps a country to its payment region; unknown countries default to 'rest'. */
export function regionForCountry(countryCode: string): Region {
  const market = MARKETS.find((m) => m.country === countryCode.toUpperCase());
  return market?.region ?? 'rest';
}

/**
 * Best-effort region guess from the browser locale (e.g. "en-NG" → africa).
 * A server/IP-based signal should replace this before launch.
 */
export function detectRegion(): Region {
  const locale = new Intl.Locale(navigator.language);
  return locale.region ? regionForCountry(locale.region) : 'rest';
}
