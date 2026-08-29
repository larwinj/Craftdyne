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
    image: null,
    featured: true,
  },
  {
    id: 'ez3Coconut',
    slug: 'products/ecoagta-ez3-coconut',
    brand: 'EcoAgta',
    name: 'EZ3+ Concentrate for Coconut Trees',
    formattedName: 'EZ3+<sub>coconut</sub>',
    benefitCount: 5,
    faqCount: 5,
    brochureUrl: '/downloads/CraftDyne_EcoAgta_EZ3_Coconut_Brochure.pdf',
    image: null,
    featured: false,
  },
  {
    id: 'ez3Cardamom',
    slug: 'products/ecoagta-ez3-cardamom',
    brand: 'EcoAgta',
    name: 'EZ3+ Cardamom Crop Treatment',
    formattedName: 'EZ3+<sub>cardamom</sub>',
    benefitCount: 5,
    faqCount: 5,
    brochureUrl: '/downloads/CraftDyne_EcoAgta_EZ3_Cardamom_Brochure.pdf',
    image: null,
    featured: false,
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
    featured: false,
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
    image: null,
    featured: false,
  },
  {
    id: 'soilAmend',
    slug: 'products/craftdyne-soil-amend',
    brand: 'CraftDyne',
    name: 'CraftDyne Soil Amend (EcoPop)',
    formattedName: 'Soil Amend (EcoPop)',
    benefitCount: 5,
    faqCount: 4,
    brochureUrl: '/downloads/CraftDyne_Soil_Amend_Tech_Info.pdf',
    image: null,
    featured: false,
  },
];

export const FEATURED_PRODUCT = PRODUCTS.find((p) => p.featured) ?? PRODUCTS[0];
