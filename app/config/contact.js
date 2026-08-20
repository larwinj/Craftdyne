/**
 * Contact and social details.
 *
 * Everything here comes from the CraftDyne brochure or their LinkedIn page.
 * Items marked TODO still need to be confirmed by the client — see CONTENT-TODO.md.
 */

export const CONTACT = {
  email: 'customercare@craftdyne.net',

  /** E.164, used for tel: and wa.me links. Displayed separately below. */
  phoneE164: '+919944429101',
  phoneDisplay: '+91 99444 29101',

  /** WhatsApp uses the number without the leading "+". */
  whatsappNumber: '919944429101',

  city: 'Dindigul',
  state: 'Tamil Nadu',
  country: 'India',

  addressLines: [
    'Registered Office Address:',
    'CRAFTDYNE PRIVATE LIMITED',
    '1003/5, Saraswathi Nagar Collecterate post, Silapadi, Dindigul, Tamil Nadu, 624005.',
  ],
};

export const SOCIAL = [
  { key: 'x', label: 'X', href: 'https://x.com/CraftDyne' },
  { key: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/people/CraftDyne-Private-Limite/61593103934818/' },
  { key: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/_craftdyne_/?hl=en' },
];

export const COMPANY = {
  legalName: 'CraftDyne Private Limited',
  shortName: 'CraftDyne',
  tagline: 'Green & Efficient Molecules at Work',
  founded: '2023',
  brand: {
    name: 'EcoAgta',
    tagline: 'Proactive, Naturally',
  },
};
