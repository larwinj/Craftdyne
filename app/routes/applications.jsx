import { useTranslation } from 'react-i18next';
import { useOutletContext, Link } from 'react-router';
import { Info, Sprout, TreePalm, ArrowRight, ShieldCheck } from 'lucide-react';

import { CtaBand } from '../components/sections/cta-band.jsx';
import { PageHero } from '../components/sections/page-hero.jsx';
import { JsonLd } from '../components/ui/json-ld.jsx';
import { Reveal } from '../components/ui/reveal.jsx';
import { Section, SectionHeading } from '../components/ui/section.jsx';
import { CROPS } from '../data/crops.js';
import { getI18n } from '../i18n/index.js';
import { cn } from '../lib/cn.js';
import { localePath } from '../lib/links.js';
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

      {/* Featured Applications of EcoAgta EZ3+ Concentrate */}
      <Section tone="sand">
        <SectionHeading
          eyebrow="Flagship Solution"
          title="EcoAgta EZ3+ Concentrate Applications"
          description="Specific application protocols for major plantation crops suffering from whitefly, honeydew, and sooty mold pressure."
        />

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {/* Coconut Trees */}
          <div className="flex flex-col justify-between rounded-3xl bg-white p-8 shadow-md ring-1 ring-slate-900/5">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 uppercase tracking-wider">
                <TreePalm className="size-4" /> Coconut Trees Application
              </span>
              <h3 className="font-display mt-4 text-2xl font-bold text-navy-900">
                EZ3+ Concentrate for Coconut Palms
              </h3>
              <p className="mt-3 text-sm text-slate-600">
                Eradicates Rugose Spiraling Whitefly (RSW) and clears black sooty mold fungus on coconut frond canopies, reviving photosynthesis.
              </p>
              <div className="mt-4 flex flex-col gap-2 text-xs font-semibold text-slate-700">
                <span className="flex items-center gap-2"><ShieldCheck className="size-4 text-emerald-600" /> Starting Dose: 1 : 300</span>
                <span className="flex items-center gap-2"><ShieldCheck className="size-4 text-emerald-600" /> Maintenance Dose: 1 : 400</span>
              </div>
            </div>

            <Link
              to={localePath(lang, 'products/ecoagta-ez3-plus#coconut')}
              className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-brand-600 hover:text-brand-700"
            >
              View Full Coconut Spray Guide <ArrowRight className="size-4" />
            </Link>
          </div>

          {/* Cardamom */}
          <div className="flex flex-col justify-between rounded-3xl bg-white p-8 shadow-md ring-1 ring-slate-900/5">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 uppercase tracking-wider">
                <Sprout className="size-4" /> Cardamom Crop Treatment
              </span>
              <h3 className="font-display mt-4 text-2xl font-bold text-navy-900">
                EZ3+ Concentrate for Cardamom Plantations
              </h3>
              <p className="mt-3 text-sm text-slate-600">
                Shields cardamom plantations from Thrips, Aphids, Spider Mites, and Mosaic Virus vectors while maintaining zero chemical residue on pods.
              </p>
              <div className="mt-4 flex flex-col gap-2 text-xs font-semibold text-slate-700">
                <span className="flex items-center gap-2"><ShieldCheck className="size-4 text-emerald-600" /> Recommended Dose: 1 : 400</span>
                <span className="flex items-center gap-2"><ShieldCheck className="size-4 text-emerald-600" /> Spray Schedule: 3 times per season</span>
              </div>
            </div>

            <Link
              to={localePath(lang, 'products/ecoagta-ez3-plus#cardamom')}
              className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-brand-600 hover:text-brand-700"
            >
              View Full Cardamom Spray Guide <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </Section>

      {/* Crop Groups */}
      <Section tone="mist">
        <SectionHeading title={t('applications.cropsHeading')} />

        <ul className="mt-12 flex flex-col gap-6">
          {CROPS.map((crop, index) => (
            <Reveal as="li" key={crop.id} delay={index * 0.05}>
              <div id={crop.id}>
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
                        alt={t(`applications.crops.${crop.id}.title`, crop.id === 'cash' ? 'Cash Crops' : crop.id)}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Sprout className="size-12 text-white/80" aria-hidden="true" />
                    )}
                  </div>
                  <div className="p-6 sm:p-7">
                    <h3 className="text-fluid-xl">
                      {t(`applications.crops.${crop.id}.title`, crop.id === 'cash' ? 'Cash Crops' : undefined)}
                    </h3>
                    <p className="font-display text-fluid-sm text-brand-700 mt-1.5 font-semibold">
                      {t(`applications.crops.${crop.id}.examples`)}
                    </p>
                    <p className="mt-3 text-slate-600">{t(`applications.crops.${crop.id}.note`)}</p>
                  </div>
                </article>
              </div>
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
