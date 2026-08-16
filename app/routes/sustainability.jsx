import { useTranslation } from 'react-i18next';
import { useOutletContext } from 'react-router';
import { Droplets, HeartPulse, Leaf, Users } from 'lucide-react';

import { CtaBand } from '../components/sections/cta-band.jsx';
import { PageHero } from '../components/sections/page-hero.jsx';
import { JsonLd } from '../components/ui/json-ld.jsx';
import { Reveal } from '../components/ui/reveal.jsx';
import { Section, SectionHeading } from '../components/ui/section.jsx';
import { getI18n } from '../i18n/index.js';
import { breadcrumbSchema, buildMeta } from '../lib/seo.js';

const COMMITMENTS = [
  { id: 'people', icon: Users },
  { id: 'animals', icon: HeartPulse },
  { id: 'environment', icon: Droplets },
  { id: 'foodChain', icon: Leaf },
];

export function meta({ params }) {
  const t = getI18n(params.lang).getFixedT(params.lang, 'pages');
  return buildMeta({
    lang: params.lang,
    path: 'sustainability',
    title: t('sustainability.meta.title'),
    description: t('sustainability.meta.description'),
  });
}

export default function Sustainability() {
  const { lang } = useOutletContext();
  const { t } = useTranslation(['pages', 'common']);
  const biodegradable = t('sustainability.biodegradable.body', { returnObjects: true });

  return (
    <>
      <JsonLd schema={breadcrumbSchema(lang, [{ name: t('common:nav.sustainability'), path: 'sustainability' }])} />

      <PageHero
        lang={lang}
        eyebrow={t('sustainability.eyebrow')}
        title={t('sustainability.title')}
        description={t('sustainability.description')}
        crumbs={[{ label: t('common:nav.sustainability'), path: 'sustainability' }]}
      />

      <Section tone="white">
        <SectionHeading title={t('sustainability.commitments.heading')} />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2">
          {COMMITMENTS.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal as="li" key={item.id} delay={index * 0.05}>
                <div className="bg-mist ring-brand-100 flex h-full gap-4 rounded-2xl p-6 ring-1">
                  <span className="bg-brand-600 inline-flex size-12 shrink-0 items-center justify-center rounded-xl text-white">
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-fluid-lg">{t(`sustainability.commitments.items.${item.id}.title`)}</h3>
                    <p className="text-fluid-sm mt-2 text-slate-600">
                      {t(`sustainability.commitments.items.${item.id}.description`)}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </Section>

      <Section tone="sand" containerSize="narrow">
        <h2 className="text-fluid-2xl">{t('sustainability.biodegradable.heading')}</h2>
        <div className="text-fluid-base mt-5 flex flex-col gap-4 text-pretty text-slate-600">
          {(Array.isArray(biodegradable) ? biodegradable : [biodegradable]).map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>
      </Section>

      <Section tone="white" containerSize="narrow">
        <div className="border-brand-500 bg-mist rounded-2xl border-l-4 p-6 sm:p-8">
          <h2 className="text-fluid-lg">{t('sustainability.responsibility.heading')}</h2>
          <p className="mt-3 text-slate-600">{t('sustainability.responsibility.body')}</p>
        </div>
      </Section>

      <CtaBand lang={lang} />
    </>
  );
}
