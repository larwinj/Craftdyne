import { CONTACT } from '../config/contact.js';
import { DEFAULT_LOCALE, LOCALES, SITE_URL } from '../config/site.js';

/**
 * Build an internal path for a locale. Always use this rather than composing
 * strings inline, so the locale prefix stays consistent everywhere.
 *
 * @param {string} lang  a supported locale
 * @param {string} [path] path without a leading slash, e.g. "products/ecoagta-ez3-plus"
 */
export function localePath(lang, path = '') {
  if (typeof path === 'string' && (path.startsWith('http://') || path.startsWith('https://'))) {
    return path;
  }
  const safeLang = LOCALES.includes(lang) ? lang : DEFAULT_LOCALE;
  const clean = path.replace(/^\/+/, '');
  return clean ? `/${safeLang}/${clean}` : `/${safeLang}`;
}

/**
 * Swap the locale on the current pathname, keeping the visitor on the same page.
 * Falls back to the locale home if the path has no locale segment yet.
 */
export function swapLocale(pathname, nextLang) {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length && LOCALES.includes(segments[0])) {
    segments[0] = nextLang;
    return `/${segments.join('/')}`;
  }
  return localePath(nextLang);
}

/** Absolute URL for canonical tags, Open Graph and the sitemap. */
export function absoluteUrl(path = '/') {
  return new URL(path, SITE_URL).toString();
}

export const telHref = `tel:${CONTACT.phoneE164}`;
export const mailtoHref = `mailto:${CONTACT.email}`;

/**
 * WhatsApp deep link. `wa.me` is the officially supported format and opens the
 * installed app on mobile, or WhatsApp Web on desktop.
 */
export function whatsappHref(message) {
  const base = `https://wa.me/${CONTACT.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
