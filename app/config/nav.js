/**
 * Primary navigation. `path` is relative to the locale prefix and must match an
 * entry in ROUTE_PATHS; `labelKey` resolves against the `common` namespace.
 */
export const MAIN_NAV = [
  { key: 'about', path: 'about', labelKey: 'nav.about' },
  { key: 'green-chemistry', path: 'green-chemistry', labelKey: 'nav.greenChemistry' },
  { key: 'products', path: 'products', labelKey: 'nav.products' },
  { key: 'applications', path: 'applications', labelKey: 'nav.applications' },
  { key: 'sustainability', path: 'sustainability', labelKey: 'nav.sustainability' },
  { key: 'contact', path: 'contact', labelKey: 'nav.contact' },
];

export const FOOTER_LEGAL_NAV = [
  { key: 'privacy', path: 'privacy', labelKey: 'footer.privacy' },
  { key: 'terms', path: 'terms', labelKey: 'footer.terms' },
];
