/**
 * Primary navigation with section dropdown definitions.
 * `path` is relative to the locale prefix.
 */
export const MAIN_NAV = [
  {
    key: 'about',
    path: 'about',
    labelKey: 'nav.about',
    children: [
      { key: 'overview', path: 'about#story', labelKey: 'nav.sub.overview', fallbackLabel: 'Who We Are' },
      { key: 'mission', path: 'about#mission', labelKey: 'nav.sub.mission', fallbackLabel: 'Our Mission' },
      { key: 'facts', path: 'about#facts', labelKey: 'nav.sub.facts', fallbackLabel: 'CraftDyne at a Glance' },
    ],
  },
  {
    key: 'green-chemistry',
    path: 'green-chemistry',
    labelKey: 'nav.greenChemistry',
    children: [
      { key: 'intro', path: 'green-chemistry#intro', labelKey: 'nav.sub.greenIntro', fallbackLabel: 'Designed Green' },
      { key: 'principles', path: 'green-chemistry#principles', labelKey: 'nav.sub.principles', fallbackLabel: '12 IUPAC Principles' },
      { key: 'meaning', path: 'green-chemistry#meaning', labelKey: 'nav.sub.farmMeaning', fallbackLabel: 'What it Means on Farm' },
    ],
  },
  {
    key: 'products',
    path: 'products',
    labelKey: 'nav.products',
    children: [
      { key: 'ez3plus', path: 'products/ecoagta-ez3-plus', labelKey: 'nav.sub.ez3plus', fallbackLabel: 'EcoAgta EZ3+ Concentrate' },
      { key: 'blumenn', path: 'products/ecoagta-blumenn-strong', labelKey: 'nav.sub.blumenn', fallbackLabel: 'Blumenn Strong Super Concentrate' },
      { key: 'myco-spectra', path: 'products/ecoagta-myco-spectra', labelKey: 'nav.sub.mycoSpectra', fallbackLabel: 'Myco Spectra Fungicide' },
      { key: 'myco-delta', path: 'products/ecoagta-myco-delta', labelKey: 'nav.sub.mycoDelta', fallbackLabel: 'EcoAgta Myco Delta' },
      { key: 'myco-siga', path: 'products/ecoagta-myco-siga', labelKey: 'nav.sub.mycoSiga', fallbackLabel: 'EcoAgta Myco Siga' },
      { key: 'soil-amend', path: 'products/craftdyne-soil-amend', labelKey: 'nav.sub.soilAmend', fallbackLabel: 'CraftDyne Soil Amend' },
    ],
  },
  {
    key: 'applications',
    path: 'applications',
    labelKey: 'nav.applications',
    children: [
      { key: 'cash-crops', path: 'applications#cash', labelKey: 'nav.sub.cashCrops', fallbackLabel: 'Cash Crops' },
      { key: 'plantation-crops', path: 'applications#plantation', labelKey: 'nav.sub.plantationCrops', fallbackLabel: 'Plantation Crops' },
      { key: 'fruit-crops', path: 'applications#fruit', labelKey: 'nav.sub.fruitCrops', fallbackLabel: 'Fruit Crops' },
      { key: 'vegetable-crops', path: 'applications#vegetable', labelKey: 'nav.sub.vegetableCrops', fallbackLabel: 'Vegetable Crops' },
      { key: 'mulberry-crops', path: 'applications#mulberry', labelKey: 'nav.sub.mulberryCrops', fallbackLabel: 'Mulberry Crops' },
    ],
  },
  {
    key: 'reviews',
    path: 'reviews',
    labelKey: 'nav.customerReviews',
  },
  {
    key: 'blogs',
    path: 'https://craftdyne.blogspot.com/',
    labelKey: 'nav.blogs',
    external: true,
  },
  {
    key: 'contact',
    path: 'contact',
    labelKey: 'nav.contact',
    children: [
      { key: 'enquiry', path: 'contact#enquiry-form', labelKey: 'nav.sub.enquiryForm', fallbackLabel: 'Send Enquiry' },
      { key: 'office', path: 'contact#office-info', labelKey: 'nav.sub.officeInfo', fallbackLabel: 'Office Location & Contact' },
      { key: 'map', path: 'contact#location-map', labelKey: 'nav.sub.locationMap', fallbackLabel: 'Office Location Map' },
    ],
  },
];

export const FOOTER_LEGAL_NAV = [
  { key: 'privacy', path: 'privacy', labelKey: 'footer.privacy' },
  { key: 'terms', path: 'terms', labelKey: 'footer.terms' },
];
