/**
 * Crop categories the EcoAgta range is intended for, per the brochure.
 *
 * `image` is null until the client supplies licensed photography — components
 * fall back to a tinted illustrative tile, so the layout is already final.
 * See CONTENT-TODO.md for the shot list.
 */
export const CROPS = [
  { id: 'vegetable', accent: 'from-brand-500/90 to-brand-700/90', image: null },
  { id: 'fruit', accent: 'from-eco-blue/90 to-navy-600/90', image: null },
  { id: 'plantation', accent: 'from-brand-600/90 to-navy-700/90', image: null },
  { id: 'field', accent: 'from-eco-green/90 to-brand-700/90', image: null },
];
