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
    name: 'EZ3+ Concentrate',
    formattedName: 'EZ3+<sub>concentrate</sub>',
    benefitCount: 5,
    faqCount: 6,
    brochureUrl: '/downloads/CraftDyne_EcoAgta_EZ3_Plus_Brochure.pdf',
    image: null,
    featured: true,
  },
  {
    id: 'blumennStrong',
    slug: 'products/ecoagta-blumenn-strong',
    brand: 'EcoAgta',
    name: 'Blumenn Strong Super Concentrate',
    formattedName: 'Blumenn Strong Super Concentrate',
    benefitCount: 5,
    faqCount: 4,
    brochureUrl: '/downloads/CraftDyne_EcoAgta_Blumenn_Strong_Tech_Info.pdf',
    image: null,
    featured: true,
  },
];

export const FEATURED_PRODUCT = PRODUCTS.find((p) => p.featured) ?? PRODUCTS[0];
