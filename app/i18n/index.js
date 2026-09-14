import i18next from 'i18next';

import { DEFAULT_LOCALE, LOCALES } from '../config/site.js';

const loaders = import.meta.glob('./locales/*/*.json');

const resources = {};
const instances = {};

function absorb(path, mod) {
  const match = path.match(/\.\/locales\/([^/]+)\/([^/]+)\.json$/);
  if (!match) return;
  const [, lng, ns] = match;
  resources[lng] ??= {};
  const data = mod.default ?? mod;
  resources[lng][ns] = data;

  if (instances[lng]) {
    instances[lng].addResourceBundle(lng, ns, data, true, true);
  }
}

async function loadResources(lng) {
  const entries = Object.entries(loaders).filter(([path]) => path.startsWith(`./locales/${lng}/`));
  await Promise.all(entries.map(async ([path, load]) => absorb(path, await load())));
}

export function registerResources(modules) {
  for (const [path, mod] of Object.entries(modules)) absorb(path, mod);
  for (const lng of LOCALES) {
    if (resources[lng]) buildInstance(lng);
  }
}

function buildInstance(lng) {
  const instance = i18next.createInstance();
  const allNamespaces = ['common', 'contact', 'home', 'pages', 'products'];

  instance.init({
    lng,
    fallbackLng: DEFAULT_LOCALE,
    supportedLngs: LOCALES,
    ns: allNamespaces,
    defaultNS: 'common',
    resources,
    interpolation: { escapeValue: false },
    initImmediate: false,
    returnEmptyString: false,
  });

  // Ensure all absorbed bundles are explicitly registered with the instance
  if (resources[lng]) {
    for (const [ns, data] of Object.entries(resources[lng])) {
      instance.addResourceBundle(lng, ns, data, true, true);
    }
  }
  if (resources[DEFAULT_LOCALE]) {
    for (const [ns, data] of Object.entries(resources[DEFAULT_LOCALE])) {
      instance.addResourceBundle(DEFAULT_LOCALE, ns, data, true, true);
    }
  }

  instances[lng] = instance;
  return instance;
}

export async function loadLocale(lng) {
  const target = LOCALES.includes(lng) ? lng : DEFAULT_LOCALE;

  await loadResources(target);

  if (target !== DEFAULT_LOCALE && !resources[DEFAULT_LOCALE]) {
    await loadResources(DEFAULT_LOCALE);
  }

  return buildInstance(target);
}

export function getI18n(lng) {
  const target = LOCALES.includes(lng) ? lng : DEFAULT_LOCALE;
  if (!instances[target]) {
    buildInstance(target);
  }
  return instances[target] ?? instances[DEFAULT_LOCALE];
}
