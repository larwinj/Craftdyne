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

  // TODO(client): full registered address, CIN and GST for the footer and legal pages.
  addressLines: ['Dindigul', 'Tamil Nadu', 'India'],
};

export const SOCIAL = [
  { key: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/company/craftdyne-private-limited/' },
  // TODO(client): confirm the Instagram and Facebook handles — the brochure shows
  // the icons but not the URLs. Both are hidden until `href` is filled in.
  { key: 'instagram', label: 'Instagram', href: null },
  { key: 'facebook', label: 'Facebook', href: null },
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
