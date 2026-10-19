import { useTranslation } from 'react-i18next';
import { useOutletContext } from 'react-router';
import { CheckCircle2, FlaskConical, Leaf, ShieldCheck, Sprout } from 'lucide-react';

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

const SCIENTIFIC_TESTIMONIALS = [
  {
    num: 1,
    id: 'rev-naidu',
    year: '2023',
  },
  {
    num: 2,
    id: 'rev-thyaharajan',
    year: '2024',
  },
  {
    num: 3,
    id: 'rev-thai-silk',
    year: '2022 & 2023',
  },
];

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

      {/* Scientifically Tested & Proven Testimonials Section */}
      <Section tone="mist">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-bold tracking-wider text-emerald-800 uppercase">
            <FlaskConical className="size-4 text-emerald-700" /> {t('about.proven.badge', 'Proven Results')}
          </span>
          <h2 className="font-display text-fluid-2xl text-navy-900 mt-4 font-bold">
            {t('about.proven.heading', 'Tested & Proven Field Results')}
          </h2>
          <p className="text-fluid-lg mt-3 font-semibold text-slate-700">
            {t(
              'about.proven.subheading',
              'The EcoAgta products have been tested scientifically and proven to work as claimed.',
            )}
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {SCIENTIFIC_TESTIMONIALS.map((item, idx) => (
            <Reveal key={item.id} delay={idx * 0.08}>
              <div className="shadow-card flex h-full flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="bg-brand-50 text-brand-700 font-display rounded-md px-2.5 py-0.5 text-xs font-bold tracking-wider uppercase">
                      {t('about.proven.testimonial', 'Testimonial')} {item.num}
                    </span>
                    <CheckCircle2 className="size-5 text-emerald-600" />
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-slate-700 italic">
                    "{t(`reviews.items.${item.id}.quote`, { ns: 'common' })}"
                  </p>
                </div>

                <div className="mt-6 border-t border-slate-100 pt-4">
                  <h3 className="font-display text-navy-900 font-bold">
                    {t(`reviews.items.${item.id}.name`, { ns: 'common' })}
                  </h3>
                  <p className="text-xs text-slate-600">{t(`reviews.items.${item.id}.location`, { ns: 'common' })}</p>
                  <p className="text-brand-700 mt-1 text-[0.75rem] font-semibold">{item.year}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="white">
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
