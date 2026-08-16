import { DEFAULT_LOCALE, LOCALES, SITE_URL } from '../config/site.js';
import { COMPANY, CONTACT } from '../config/contact.js';

/**
 * Build the meta descriptor list for a page.
 *
 * Emits title, description, canonical, Open Graph and Twitter tags, plus
 * `hreflang` alternates for every locale. The alternates are what stop Google
 * treating /en, /ta and /hi as three competing duplicates.
 *
 * @param {object} opts
 * @param {string} opts.lang     current locale
 * @param {string} opts.path     path WITHOUT the locale prefix, e.g. "about"
 * @param {string} opts.title    page title, already localised
 * @param {string} opts.description
 * @param {string} [opts.image]  absolute or root-relative OG image
 */
export function buildMeta({ lang, path = '', title, description, image = '/og/craftdyne-og.png' }) {
  const localePart = path ? `/${lang}/${path}` : `/${lang}`;
  const canonical = new URL(localePart, SITE_URL).toString();
  const ogImage = new URL(image, SITE_URL).toString();
  const fullTitle = `${title} | ${COMPANY.shortName}`;

  return [
    { title: fullTitle },
    { name: 'description', content: description },

    { tagName: 'link', rel: 'canonical', href: canonical },

    // Lowercase `hreflang` deliberately: React Router passes these through as
    // raw attributes rather than React DOM props, so the camelCase form would
    // survive into the markup as `hrefLang`. HTML parsing lowercases attributes
    // so it would still work, but this keeps the emitted markup valid as written.
    ...LOCALES.map((code) => ({
      tagName: 'link',
      rel: 'alternate',
      hreflang: code,
      href: new URL(path ? `/${code}/${path}` : `/${code}`, SITE_URL).toString(),
    })),
    {
      tagName: 'link',
      rel: 'alternate',
      hreflang: 'x-default',
      href: new URL(path ? `/${DEFAULT_LOCALE}/${path}` : `/${DEFAULT_LOCALE}`, SITE_URL).toString(),
    },

    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: COMPANY.legalName },
    { property: 'og:title', content: fullTitle },
    { property: 'og:description', content: description },
    { property: 'og:url', content: canonical },
    { property: 'og:image', content: ogImage },
    { property: 'og:locale', content: lang },

    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: fullTitle },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: ogImage },
  ];
}

/** Organization schema — one per site, emitted on the home page. */
export function organizationSchema(lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: COMPANY.legalName,
    alternateName: COMPANY.shortName,
    url: new URL(`/${lang}`, SITE_URL).toString(),
    slogan: COMPANY.tagline,
    foundingDate: COMPANY.founded,
    email: CONTACT.email,
    telephone: CONTACT.phoneE164,
    address: {
      '@type': 'PostalAddress',
      addressLocality: CONTACT.city,
      addressRegion: CONTACT.state,
      addressCountry: 'IN',
    },
    sameAs: ['https://www.linkedin.com/company/craftdyne-private-limited/'],
  };
}

/** Product schema for a product detail page. */
export function productSchema({ lang, name, description, slug }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    brand: { '@type': 'Brand', name: COMPANY.brand.name },
    manufacturer: { '@type': 'Organization', name: COMPANY.legalName },
    category: 'Agricultural crop protection',
    url: new URL(`/${lang}/${slug}`, SITE_URL).toString(),
  };
}

/** Breadcrumb schema. `trail` is [{ name, path }] without the locale prefix. */
export function breadcrumbSchema(lang, trail) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: new URL(item.path ? `/${lang}/${item.path}` : `/${lang}`, SITE_URL).toString(),
    })),
  };
}

/** FAQPage schema. `faqs` is [{ question, answer }]. */
export function faqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}
