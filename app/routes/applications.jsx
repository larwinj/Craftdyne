import { useTranslation } from 'react-i18next';
import { useOutletContext } from 'react-router';
import { Info, Sprout } from 'lucide-react';

import { CtaBand } from '../components/sections/cta-band.jsx';
import { PageHero } from '../components/sections/page-hero.jsx';
import { JsonLd } from '../components/ui/json-ld.jsx';
import { Reveal } from '../components/ui/reveal.jsx';
import { Section, SectionHeading } from '../components/ui/section.jsx';
import { CROPS } from '../data/crops.js';
import { getI18n } from '../i18n/index.js';
import { cn } from '../lib/cn.js';
import { breadcrumbSchema, buildMeta } from '../lib/seo.js';

export function meta({ params }) {
  const t = getI18n(params.lang).getFixedT(params.lang, 'pages');
  return buildMeta({
    lang: params.lang,
    path: 'applications',
    title: t('applications.meta.title'),
    description: t('applications.meta.description'),
  });
}

export default function Applications() {
  const { lang } = useOutletContext();
  const { t } = useTranslation(['pages', 'common']);
  const problem = t('applications.problem.body', { returnObjects: true });

  return (
    <>
      <JsonLd schema={breadcrumbSchema(lang, [{ name: t('common:nav.applications'), path: 'applications' }])} />

      <PageHero
        lang={lang}
        eyebrow={t('applications.eyebrow')}
        title={t('applications.title')}
        description={t('applications.description')}
        crumbs={[{ label: t('common:nav.applications'), path: 'applications' }]}
      />

      <Section tone="white" containerSize="narrow">
        <h2 className="text-fluid-2xl">{t('applications.problem.heading')}</h2>
        <div className="text-fluid-base mt-5 flex flex-col gap-4 text-pretty text-slate-600">
          {(Array.isArray(problem) ? problem : [problem]).map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>
      </Section>

      <Section tone="mist">
        <SectionHeading title={t('applications.cropsHeading')} />

        <ul className="mt-12 flex flex-col gap-6">
          {CROPS.map((crop, index) => (
            <Reveal as="li" key={crop.id} delay={index * 0.05}>
              <article className="shadow-card overflow-hidden rounded-2xl bg-white ring-1 ring-slate-100 sm:flex">
                <div
                  className={cn(
                    'relative flex h-40 overflow-hidden items-center justify-center bg-gradient-to-br sm:h-auto sm:w-56 sm:shrink-0',
                    crop.accent,
                  )}
                >
                  {crop.image ? (
                    <img
                      src={crop.image}
                      alt={t(`applications.crops.${crop.id}.title`)}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Sprout className="size-12 text-white/80" aria-hidden="true" />
                  )}
                </div>
                <div className="p-6 sm:p-7">
                  <h3 className="text-fluid-xl">{t(`applications.crops.${crop.id}.title`)}</h3>
                  <p className="font-display text-fluid-sm text-brand-700 mt-1.5 font-semibold">
                    {t(`applications.crops.${crop.id}.examples`)}
                  </p>
                  <p className="mt-3 text-slate-600">{t(`applications.crops.${crop.id}.note`)}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>

        <div className="border-brand-500 shadow-card mt-10 flex gap-4 rounded-2xl border-l-4 bg-white p-5">
          <Info className="text-brand-700 mt-0.5 size-6 shrink-0" aria-hidden="true" />
          <div className="min-w-0">
            <h3 className="font-display text-fluid-base font-bold">{t('common:disclaimer.heading')}</h3>
            <p className="text-fluid-sm mt-1.5 text-slate-600">{t('applications.notice')}</p>
          </div>
        </div>
      </Section>

      <CtaBand
        lang={lang}
        title={t('applications.cta.title')}
        description={t('applications.cta.description')}
        primary={t('applications.cta.primary')}
        secondary={t('applications.cta.secondary')}
      />
    </>
  );
}
