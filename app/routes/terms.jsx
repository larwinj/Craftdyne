import { LegalPage } from '../components/sections/legal-page.jsx';
import { getI18n } from '../i18n/index.js';
import { buildMeta } from '../lib/seo.js';

export function meta({ params }) {
  const t = getI18n(params.lang).getFixedT(params.lang, 'pages');
  return buildMeta({
    lang: params.lang,
    path: 'terms',
    title: t('legal.terms.meta.title'),
    description: t('legal.terms.meta.description'),
  });
}

export default function Terms() {
  return (
    <LegalPage
      docKey="terms"
      path="terms"
      sectionKeys={['acceptance', 'information', 'product', 'ip', 'liability', 'links', 'law', 'contact']}
    />
  );
}
