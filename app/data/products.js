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
    name: 'EZ3+ Multi-Crop Concentrate',
    formattedName: 'EZ3+<sub>concentrate</sub>',
    benefitCount: 5,
    faqCount: 6,
    brochureUrl: '/downloads/CraftDyne_EcoAgta_EZ3_Plus_Brochure.pdf',
    image: '/images/products/ez3-plus.jpg',
    featured: true,
    packages: ['1 Liter', '500 mL', '100 mL'],
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
    image: '/images/products/blumenn-strong.jpg',
    featured: false,
    packages: ['100 mL'],
  },
  {
    id: 'mycoSpectra',
    slug: 'products/ecoagta-myco-spectra',
    brand: 'EcoAgta',
    name: 'EcoAgta Myco Spectra Fungicide',
    formattedName: 'Myco Spectra',
    benefitCount: 5,
    faqCount: 4,
    brochureUrl: '/downloads/CraftDyne_EcoAgta_Myco_Spectra_Brochure.pdf',
    image: '/images/products/myco-spectra.jpg',
    featured: false,
    packages: ['1 Liter'],
  },
  {
    id: 'mycoDelta',
    slug: 'products/ecoagta-myco-delta',
    brand: 'EcoAgta',
    name: 'EcoAgta Myco Delta',
    formattedName: 'Myco Delta',
    benefitCount: 5,
    faqCount: 4,
    brochureUrl: '/downloads/CraftDyne_EcoAgta_Myco_Delta_Brochure.pdf',
    image: null,
    featured: false,
    packages: ['50 mL Liquid', 'Granules Package'],
  },
  {
    id: 'mycoSiga',
    slug: 'products/ecoagta-myco-siga',
    brand: 'EcoAgta',
    name: 'EcoAgta Myco Siga',
    formattedName: 'Myco Siga',
    benefitCount: 5,
    faqCount: 4,
    brochureUrl: '/downloads/CraftDyne_EcoAgta_Myco_Siga_Brochure.pdf',
    image: null,
    featured: false,
    packages: ['50 mL Liquid'],
  },
  {
    id: 'soilAmend',
    slug: 'products/craftdyne-soil-amend',
    brand: 'CraftDyne',
    name: 'CraftDyne Soil Amend',
    formattedName: 'Soil Amend',
    benefitCount: 5,
    faqCount: 4,
    brochureUrl: '/downloads/CraftDyne_Soil_Amend_Tech_Info.pdf',
    image: null,
    featured: false,
    packages: ['5 kg Block', 'Granules Package'],
  },
];

export const FEATURED_PRODUCT = PRODUCTS.find((p) => p.featured) ?? PRODUCTS[0];
