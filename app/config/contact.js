/**
 * Contact and social details.
 *
 * Everything here comes from the CraftDyne brochure or their LinkedIn page.
 * Items marked TODO still need to be confirmed by the client — see CONTENT-TODO.md.
 */

export const CONTACT = {
  email: 'customercare@craftdyne.net',
  /** Target email for contact form enquiries (currently set for user testing, change to customercare@craftdyne.net for production) */
  enquiryEmail: 'raone2805@gmail.com',

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

  coordinates: {
    lat: 10.383085,
    lng: 77.977175,
  },
  mapsUrl: 'https://maps.app.goo.gl/LFHY4kycUT3e8r4h6?g_st=aw',
  directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=10.383085,77.977175',
  mapsEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d1962.4!2d77.9771751!3d10.3830849!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTDCsDIyJzffLjEiTiA3N8KwNTgnMzcuOCJF!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin',
  googleMapsEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d1962.4!2d77.9771751!3d10.3830849!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTDCsDIyJzffLjEiTiA3N8KwNTgnMzcuOCJF!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin',
};

export const SOCIAL = [
  { key: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/company/craftdyne-private-limited/' },
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
