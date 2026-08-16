/**
 * Language-neutral site constants.
 *
 * This module is imported by BOTH the app and `react-router.config.js` (which runs
 * in plain Node at build time), so it must stay free of JSX, CSS imports and any
 * browser globals.
 */

/** Supported locales. `en` is the default and the x-default for hreflang. */
export const LOCALES = ['en', 'ta', 'hi'];
export const DEFAULT_LOCALE = 'en';

/** Human labels for the language switcher, each written in its own script. */
export const LOCALE_LABELS = {
  en: { name: 'English', native: 'English', dir: 'ltr' },
  ta: { name: 'Tamil', native: 'தமிழ்', dir: 'ltr' },
  hi: { name: 'Hindi', native: 'हिन्दी', dir: 'ltr' },
};

/**
 * Every page path, relative to the locale prefix. `''` is the locale home.
 * Used to build the route table, the prerender list and the sitemap, so adding a
 * page here wires it into all three.
 */
export const ROUTE_PATHS = [
  '',
  'about',
  'green-chemistry',
  'products',
  'products/ecoagta-ez3-plus',
  'applications',
  'sustainability',
  'contact',
  'privacy',
  'terms',
];

/** Canonical origin, used for absolute URLs in meta tags and the sitemap. */
export const SITE_URL = 'https://www.craftdyne.net';

/**
 * Shown on the privacy and terms pages. Bump this by hand whenever either
 * document changes — it must not track the build date, or every deploy would
 * claim the policy had been revised.
 */
export const LEGAL_LAST_UPDATED = '16 August 2026';

/** Every concrete URL the static build should emit. */
export function allRoutes() {
  return ['/', ...LOCALES.flatMap((lang) => ROUTE_PATHS.map((p) => (p ? `/${lang}/${p}` : `/${lang}`)))];
}
