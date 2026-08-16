import { useTranslation } from 'react-i18next';
import { useOutletContext } from 'react-router';
import { Leaf, ShieldCheck, Sprout } from 'lucide-react';

import { CtaBand } from '../components/sections/cta-band.jsx';
import { PageHero } from '../components/sections/page-hero.jsx';
import { JsonLd } from '../components/ui/json-ld.jsx';
import { Reveal } from '../components/ui/reveal.jsx';
import { Section, SectionHeading } from '../components/ui/section.jsx';
import { getI18n } from '../i18n/index.js';
import { breadcrumbSchema, buildMeta } from '../lib/seo.js';

const MISSION = [
  { id: 'healthier', icon: Sprout },
  { id: 'safer', icon: ShieldCheck },
  { id: 'lasting', icon: Leaf },
];
const FACTS = ['founded', 'based', 'industry', 'focus', 'brand', 'reach'];

export function meta({ params }) {
  const t = getI18n(params.lang).getFixedT(params.lang, 'pages');
  return buildMeta({
    lang: params.lang,
    path: 'about',
    title: t('about.meta.title'),
    description: t('about.meta.description'),
  });
}

export default function About() {
  const { lang } = useOutletContext();
  const { t } = useTranslation(['pages', 'common']);
  const story = t('about.story.body', { returnObjects: true });

  return (
    <>
      <JsonLd schema={breadcrumbSchema(lang, [{ name: t('common:nav.about'), path: 'about' }])} />

      <PageHero
        lang={lang}
        eyebrow={t('about.eyebrow')}
        title={t('about.title')}
        description={t('about.description')}
        crumbs={[{ label: t('common:nav.about'), path: 'about' }]}
      />

      <Section tone="white">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <h2 className="text-fluid-2xl">{t('about.story.heading')}</h2>
            <div className="text-fluid-base mt-5 flex flex-col gap-4 text-pretty text-slate-600">
              {(Array.isArray(story) ? story : [story]).map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-mist ring-brand-100 rounded-2xl p-6 ring-1 sm:p-8">
              <h2 className="text-fluid-lg">{t('about.facts.heading')}</h2>
              <dl className="divide-brand-100 mt-5 flex flex-col divide-y">
                {FACTS.map((id) => (
                  <div key={id} className="py-3 first:pt-0 last:pb-0">
                    <dt className="font-display text-brand-700 text-xs font-bold tracking-[0.1em] uppercase">
                      {t(`about.facts.items.${id}.label`)}
                    </dt>
                    <dd className="text-fluid-sm text-navy-700 mt-1">{t(`about.facts.items.${id}.value`)}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="mist">
        <SectionHeading title={t('about.mission.heading')} />
        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {MISSION.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal as="li" key={item.id} delay={index * 0.06}>
                <div className="shadow-card flex h-full flex-col rounded-2xl bg-white p-6 ring-1 ring-slate-100">
                  <span className="bg-brand-50 text-brand-700 inline-flex size-12 items-center justify-center rounded-xl">
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <h3 className="text-fluid-lg mt-4">{t(`about.mission.items.${item.id}.title`)}</h3>
                  <p className="text-fluid-sm mt-2 text-slate-600">{t(`about.mission.items.${item.id}.description`)}</p>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </Section>

      <Section tone="navy">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-fluid-2xl text-balance text-white">{t('about.tagline.heading')}</h2>
          <p className="text-fluid-lg mt-5 text-pretty text-white/80">{t('about.tagline.body')}</p>
        </div>
      </Section>

      <CtaBand lang={lang} />
    </>
  );
}
