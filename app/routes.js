import { index, layout, prefix, route } from '@react-router/dev/routes';

export default [
  // "/" resolves the visitor's language and forwards to /en, /ta or /hi.
  index('routes/root-redirect.jsx'),

  ...prefix(':lang', [
    layout('layouts/locale-layout.jsx', [
      index('routes/home.jsx'),
      route('about', 'routes/about.jsx'),
      route('eco-chemistry', 'routes/eco-chemistry.jsx'),
      route('green-chemistry', 'routes/green-chemistry.jsx'),
      route('sustainability', 'routes/sustainability.jsx'),
      route('products', 'routes/products.jsx'),
      route('products/ecoagta-ez3-plus', 'routes/product-ez3-plus.jsx'),
      route('products/ecoagta-blumenn-strong', 'routes/product-blumenn-strong.jsx'),
      route('applications', 'routes/applications.jsx'),
      route('contact', 'routes/contact.jsx'),
      route('privacy', 'routes/privacy.jsx'),
      route('terms', 'routes/terms.jsx'),
    ]),
  ]),

  route('*', 'routes/not-found.jsx'),
];
