import { startTransition, StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { HydratedRouter } from 'react-router/dom';

import { DEFAULT_LOCALE, LOCALES } from './config/site.js';
import { loadLocale } from './i18n/index.js';

/**
 * Custom client entry so the active locale's translations are in place before
 * React hydrates.
 *
 * The locale comes from the URL, which is authoritative here — every page is
 * served from a locale-prefixed path. Only that one language is fetched, which
 * is what keeps two thirds of the translation corpus off the wire.
 *
 * The visitor is looking at fully rendered, prerendered HTML for the whole of
 * this await, so it costs no perceived load time.
 */
const segment = window.location.pathname.split('/')[1];
const lang = LOCALES.includes(segment) ? segment : DEFAULT_LOCALE;

loadLocale(lang).then(() => {
  startTransition(() => {
    hydrateRoot(
      document,
      <StrictMode>
        <HydratedRouter />
      </StrictMode>,
    );
  });
});
