import i18next from 'i18next';

import { DEFAULT_LOCALE, LOCALES } from '../config/site.js';

/**
 * Locale files as per-file dynamic importers. Vite emits one chunk per JSON
 * file, which is what lets a browser download a single language instead of all
 * three (the whole corpus is ~38KB gzipped; one locale is ~11-14KB).
 *
 * There is deliberately no eager glob here, not even behind an
 * `import.meta.env.SSR` guard: Vite hoists a glob's imports to the top of the
 * module and the bundler does not eliminate them, so the guarded version still
 * shipped every language to the browser.
 */
const loaders = import.meta.glob('./locales/*/*.json');

const resources = {};
const instances = {};

function absorb(path, mod) {
  const match = path.match(/\.\/locales\/([^/]+)\/([^/]+)\.json$/);
  if (!match) return;
  const [, lng, ns] = match;
  resources[lng] ??= {};
  resources[lng][ns] = mod.default ?? mod;
}

async function loadResources(lng) {
  const entries = Object.entries(loaders).filter(([path]) => path.startsWith(`./locales/${lng}/`));
  await Promise.all(entries.map(async ([path, load]) => absorb(path, await load())));
}

/**
 * Register an already-resolved map of locale modules, keyed by glob path.
 *
 * Used by `resources.server.js` to make every language available synchronously
 * during prerendering. The browser never calls this.
 */
export function registerResources(modules) {
  for (const [path, mod] of Object.entries(modules)) absorb(path, mod);
  for (const lng of LOCALES) {
    if (resources[lng]) buildInstance(lng);
  }
}

function buildInstance(lng) {
  const instance = i18next.createInstance();
  instance.init({
    lng,
    // Untranslated keys fall back to English rather than rendering the raw key,
    // so a partially translated locale still reads as a finished page.
    fallbackLng: DEFAULT_LOCALE,
    supportedLngs: LOCALES,
    ns: Object.keys(resources[lng] ?? {}),
    defaultNS: 'common',
    resources,
    interpolation: { escapeValue: false }, // React already escapes
    initImmediate: false, // synchronous init, so rendering never waits
    returnEmptyString: false,
  });
  instances[lng] = instance;
  return instance;
}

/**
 * Load one locale and build its i18next instance.
 *
 * Called from the locale layout's `clientLoader` — which runs both during
 * prerendering (once per URL, in Node) and in the browser — and again from
 * `entry.client.jsx` before hydration, so translations are always in place
 * before anything renders. Repeat calls for an already-loaded locale are free.
 */
export async function loadLocale(lng) {
  const target = LOCALES.includes(lng) ? lng : DEFAULT_LOCALE;
  if (instances[target]) return instances[target];

  await loadResources(target);

  // English backs every other locale's missing keys, so it must be present too.
  if (target !== DEFAULT_LOCALE && !resources[DEFAULT_LOCALE]) {
    await loadResources(DEFAULT_LOCALE);
  }

  return buildInstance(target);
}

/**
 * Synchronous access to an already-loaded locale, for render and for route
 * `meta()` functions (which run after loaders have resolved).
 */
export function getI18n(lng) {
  return instances[lng] ?? instances[DEFAULT_LOCALE] ?? buildInstance(DEFAULT_LOCALE);
}
