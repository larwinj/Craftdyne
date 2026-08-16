/**
 * Product catalogue — structure only, no prose.
 *
 * Copy for each product lives in the `products` namespace keyed by `id`, so a
 * translation never has to touch this file and adding a locale never risks
 * changing a slug.
 */
export const PRODUCTS = [
  {
    id: 'ez3plus',
    slug: 'products/ecoagta-ez3-plus',
    brand: 'EcoAgta',
    name: 'EZ3+',
    /** Number of benefit bullets defined in the copy, used to render lists. */
    benefitCount: 5,
    faqCount: 6,
    // TODO(client): replace with the retouched bottle shot (background removed).
    image: null,
    featured: true,
  },
];

export const FEATURED_PRODUCT = PRODUCTS.find((p) => p.featured) ?? PRODUCTS[0];
