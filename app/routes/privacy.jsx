import { LegalPage } from '../components/sections/legal-page.jsx';
import { getI18n } from '../i18n/index.js';
import { buildMeta } from '../lib/seo.js';

export function meta({ params }) {
  const t = getI18n(params.lang).getFixedT(params.lang, 'pages');
  return buildMeta({
    lang: params.lang,
    path: 'privacy',
    title: t('legal.privacy.meta.title'),
    description: t('legal.privacy.meta.description'),
  });
}

export default function Privacy() {
  return (
    <LegalPage
      docKey="privacy"
      path="privacy"
      sectionKeys={['intro', 'collect', 'use', 'sharing', 'retention', 'rights', 'cookies', 'contact']}
    />
  );
}
