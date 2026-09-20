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
    id: 1,
    quote:
      'EZ3+ completed repelled and controlled Spiraling Whiteflies from our coconut trees in a few days and completely removed the Sooty Mold Fungus [Capnodium) quickly improving the grade and quantity of the yield.',
    author: 'Mr. T. Naidu',
    location: 'Farm, Amaravathi, Thiruppur District, Tamilnadu',
    year: '2023',
  },
  {
    id: 2,
    quote:
      'After spraying EcoAgta EZ3 + in our mango and Coconut farm twice in a year, we have completed eradicated whiteflies and other sap sucking insects. The problem of fungus during the fruit season have also reduced substantially. The fruits are much bigger and better.',
    author: 'Mr. T. R. Thyaharajan.',
    location: 'Shenbaga Thoppu, Srivilliputtur, Tamilnadu',
    year: '2024',
  },
  {
    id: 3,
    quote:
      'EZ3 + completely repelled and controlled Whiteflies and Aphids in our Mulberry bushes and completely controlled the fungal attack in a week’s time. The use EZ3 + has reduced the withholding period from 20 days to 10; this increases our productivity. The silk worms which feed on the leaves treated with EZ3 + are healthy and produces 0.012 grams of silk per cocoon',
    author: 'Farm Manager',
    location: 'C Thai Silk, Petchabun, Thailand.',
    year: '2022 & 2023.',
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
          <span className="bg-emerald-100 text-emerald-800 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wider">
            <FlaskConical className="size-4 text-emerald-700" /> Proven Results
          </span>
          <h2 className="font-display text-fluid-2xl mt-4 font-bold text-navy-900">
            Tested & Proven Field Results
          </h2>
          <p className="text-fluid-lg mt-3 font-semibold text-slate-700">
            The EcoAgta products have been tested scientifically and proven to work as claimed.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {SCIENTIFIC_TESTIMONIALS.map((item, idx) => (
            <Reveal key={item.id} delay={idx * 0.08}>
              <div className="shadow-card flex h-full flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="bg-brand-50 text-brand-700 font-display rounded-md px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider">
                      Testimonial {item.id}
                    </span>
                    <CheckCircle2 className="size-5 text-emerald-600" />
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-slate-700 italic">
                    "{item.quote}"
                  </p>
                </div>

                <div className="mt-6 border-t border-slate-100 pt-4">
                  <h3 className="font-display font-bold text-navy-900">{item.author}</h3>
                  <p className="text-xs text-slate-600">{item.location}</p>
                  <p className="mt-1 text-[0.75rem] font-semibold text-brand-700">{item.year}</p>
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
