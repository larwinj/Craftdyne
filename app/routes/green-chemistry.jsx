import { useTranslation } from 'react-i18next';
import { useOutletContext } from 'react-router';
import { FlaskConical, Leaf, Recycle, ShieldCheck, Sprout, Tractor } from 'lucide-react';

import { CtaBand } from '../components/sections/cta-band.jsx';
import { PageHero } from '../components/sections/page-hero.jsx';
import { JsonLd } from '../components/ui/json-ld.jsx';
import { Reveal } from '../components/ui/reveal.jsx';
import { Section, SectionHeading } from '../components/ui/section.jsx';
import { getI18n } from '../i18n/index.js';
import { breadcrumbSchema, buildMeta } from '../lib/seo.js';

const PRINCIPLES = [
  { id: 'prevention', icon: Recycle },
  { id: 'saferChemicals', icon: ShieldCheck },
  { id: 'degradation', icon: Leaf },
  { id: 'saferSolvents', icon: FlaskConical },
  { id: 'renewable', icon: Sprout },
  { id: 'accident', icon: Tractor },
];
const MEANING = ['applicator', 'land', 'produce', 'season'];

export function meta({ params }) {
  const t = getI18n(params.lang).getFixedT(params.lang, 'pages');
  return buildMeta({
    lang: params.lang,
    path: 'green-chemistry',
    title: t('greenChemistry.meta.title'),
    description: t('greenChemistry.meta.description'),
  });
}

export default function GreenChemistry() {
  const { lang } = useOutletContext();
  const { t } = useTranslation(['pages', 'common']);
  const intro = t('greenChemistry.intro.body', { returnObjects: true });

  return (
    <>
      <JsonLd schema={breadcrumbSchema(lang, [{ name: t('common:nav.greenChemistry'), path: 'green-chemistry' }])} />

      <PageHero
        lang={lang}
        eyebrow={t('greenChemistry.eyebrow')}
        title={t('greenChemistry.title')}
        description={t('greenChemistry.description')}
        crumbs={[{ label: t('common:nav.greenChemistry'), path: 'green-chemistry' }]}
      />

      <Section tone="white" containerSize="narrow">
        <h2 className="text-fluid-2xl">{t('greenChemistry.intro.heading')}</h2>
        <div className="text-fluid-base mt-5 flex flex-col gap-4 text-pretty text-slate-600">
          {(Array.isArray(intro) ? intro : [intro]).map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>
      </Section>

      <Section tone="mist">
        <SectionHeading
          title={t('greenChemistry.principles.heading')}
          description={t('greenChemistry.principles.description')}
        />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PRINCIPLES.map((principle, index) => {
            const Icon = principle.icon;
            return (
              <Reveal as="li" key={principle.id} delay={index * 0.05}>
                <div className="shadow-card flex h-full flex-col rounded-2xl bg-white p-6 ring-1 ring-slate-100">
                  <span className="bg-brand-600 inline-flex size-11 items-center justify-center rounded-xl text-white">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="text-fluid-base mt-4 font-semibold">
                    {t(`greenChemistry.principles.items.${principle.id}.title`)}
                  </h3>
                  <p className="text-fluid-sm mt-2 text-slate-600">
                    {t(`greenChemistry.principles.items.${principle.id}.description`)}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </Section>

      <Section tone="white">
        <SectionHeading align="left" title={t('greenChemistry.meaning.heading')} />
        <ul className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2">
          {MEANING.map((id) => (
            <li key={id} className="border-brand-500 border-l-4 pl-5">
              <h3 className="text-fluid-lg">{t(`greenChemistry.meaning.items.${id}.title`)}</h3>
              <p className="mt-2 text-slate-600">{t(`greenChemistry.meaning.items.${id}.description`)}</p>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand lang={lang} />
    </>
  );
}
