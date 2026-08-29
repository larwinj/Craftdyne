import { useTranslation } from 'react-i18next';
import { useOutletContext } from 'react-router';

import { CustomerReviews } from '../components/sections/customer-reviews.jsx';
import { CtaBand } from '../components/sections/cta-band.jsx';
import { PageHero } from '../components/sections/page-hero.jsx';
import { JsonLd } from '../components/ui/json-ld.jsx';
import { getI18n } from '../i18n/index.js';
import { breadcrumbSchema, buildMeta } from '../lib/seo.js';

export function meta({ params }) {
  const t = getI18n(params.lang).getFixedT(params.lang, 'common');
  return buildMeta({
    lang: params.lang,
    path: 'reviews',
    title: `${t('nav.customerReviews')} | CraftDyne`,
    description:
      'Read verified farmer reviews, case studies, and field feedback on CraftDyne EcoAgta Green Chemistry products across India.',
  });
}

export default function ReviewsPage() {
  const { lang } = useOutletContext();
  const { t } = useTranslation(['common']);

  return (
    <>
      <JsonLd
        schema={breadcrumbSchema(lang, [{ name: t('nav.customerReviews'), path: 'reviews' }])}
      />

      <PageHero
        lang={lang}
        eyebrow={t('nav.customerReviews')}
        title={t('nav.customerReviews')}
        description="See how CraftDyne Green Chemistry products enhance harvest yields, eradicate whiteflies, control fungal rots, and restore soil health."
        crumbs={[{ label: t('nav.customerReviews'), path: 'reviews' }]}
      />

      <CustomerReviews lang={lang} showFilters={true} />

      <CtaBand lang={lang} />
    </>
  );
}
