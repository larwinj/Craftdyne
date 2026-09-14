import { useOutletContext } from 'react-router';

import { CropApplications } from '../components/sections/crop-applications.jsx';
import { CustomerReviews } from '../components/sections/customer-reviews.jsx';
import { CtaBand } from '../components/sections/cta-band.jsx';
import { Hero } from '../components/sections/hero.jsx';
import { Intro, PromiseStrip } from '../components/sections/intro.jsx';
import { Offerings, Pillars } from '../components/sections/pillars.jsx';
import { JsonLd } from '../components/ui/json-ld.jsx';
import { getI18n } from '../i18n/index.js';
import { buildMeta, organizationSchema } from '../lib/seo.js';

export function meta({ params }) {
  const t = getI18n(params.lang).getFixedT(params.lang, 'home');
  return buildMeta({
    lang: params.lang,
    path: '',
    title: t('meta.title'),
    description: t('meta.description'),
  });
}

export default function Home() {
  const { lang } = useOutletContext();

  return (
    <>
      <JsonLd schema={organizationSchema(lang)} />
      <Hero lang={lang} />
      <Intro lang={lang} />
      <Offerings />
      <CropApplications lang={lang} />
      <CustomerReviews lang={lang} limit={3} showFilters={false} />
      <Pillars />
      <PromiseStrip />
      <CtaBand lang={lang} />
    </>
  );
}
