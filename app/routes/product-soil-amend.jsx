import { useTranslation } from 'react-i18next';
import { useOutletContext } from 'react-router';
import { Check, Download, Droplets, Info, Layers, Leaf, ShieldCheck } from 'lucide-react';

import { CtaBand } from '../components/sections/cta-band.jsx';
import { PageHero } from '../components/sections/page-hero.jsx';
import { Accordion } from '../components/ui/accordion.jsx';
import { JsonLd } from '../components/ui/json-ld.jsx';
import { ProductBottle } from '../components/ui/product-bottle.jsx';
import { Reveal } from '../components/ui/reveal.jsx';
import { Section, SectionHeading } from '../components/ui/section.jsx';
import { PRODUCTS } from '../data/products.js';
import { getI18n } from '../i18n/index.js';
import { breadcrumbSchema, buildMeta, faqSchema, productSchema } from '../lib/seo.js';

const PRODUCT = PRODUCTS.find((p) => p.id === 'soilAmend') ?? PRODUCTS[5];
const BENEFITS = ['porosity', 'nematode', 'durability', 'cec', 'usda'];
const MINERALS = ['n', 'p', 'k', 'ca', 'mg', 'fe', 'zn', 'mn', 'cu'];
const FAQS = ['water', 'duration', 'nematodes', 'organic'];

export function meta({ params }) {
  const t = getI18n(params.lang).getFixedT(params.lang, 'products');
  return buildMeta({
    lang: params.lang,
    path: PRODUCT.slug,
    title: t('soilAmend.meta.title'),
    description: t('soilAmend.meta.description'),
  });
}

export default function ProductSoilAmend() {
  const { lang } = useOutletContext();
  const { t } = useTranslation(['products', 'common']);

  const faqItems = FAQS.map((id) => ({
    id,
    question: t(`soilAmend.faq.items.${id}.question`),
    answer: t(`soilAmend.faq.items.${id}.answer`),
  }));

  return (
    <>
      <JsonLd
        schema={productSchema({
          lang,
          name: t('soilAmend.name'),
          description: t('soilAmend.meta.description'),
          slug: PRODUCT.slug,
        })}
      />
      <JsonLd schema={faqSchema(faqItems)} />
      <JsonLd
        schema={breadcrumbSchema(lang, [
          { name: t('common:nav.products'), path: 'products' },
          { name: t('soilAmend.name'), path: PRODUCT.slug },
        ])}
      />

      <PageHero
        lang={lang}
        eyebrow={t('soilAmend.kicker')}
        title={t('soilAmend.name')}
        description={t('soilAmend.tagline')}
        crumbs={[
          { label: t('common:nav.products'), path: 'products' },
          { label: t('soilAmend.name'), path: PRODUCT.slug },
        ]}
      />

      {/* Product Overview */}
      <Section tone="white">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-14">
          <Reveal className="lg:col-span-5">
            <div className="flex flex-col items-center">
              <ProductBottle className="mx-auto max-w-xs sm:max-w-sm" />
              {PRODUCT.brochureUrl && (
                <a
                  href={PRODUCT.brochureUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3 font-semibold text-white shadow-md transition-all hover:bg-brand-700 hover:shadow-lg"
                >
                  <Download className="size-5" />
                  {t('common:actions.downloadBrochure')}
                </a>
              )}
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <p className="text-fluid-lg text-pretty text-slate-600">{t('soilAmend.intro')}</p>

            <h2 className="text-fluid-2xl mt-10">{t('soilAmend.benefits.heading')}</h2>
            <ul className="mt-5 flex flex-col gap-4">
              {BENEFITS.map((id) => (
                <li key={id} className="flex gap-3.5">
                  <span className="bg-brand-600 mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full">
                    <Check className="size-4 text-white" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-fluid-base font-semibold">{t(`soilAmend.benefits.items.${id}.title`)}</h3>
                    <p className="text-fluid-sm mt-1 text-slate-600">{t(`soilAmend.benefits.items.${id}.description`)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Specifications & Mineral Profile */}
      <Section tone="mist">
        <SectionHeading
          title={t('soilAmend.specs.heading')}
          description="Technical specifications and lab-verified mineral content per block."
        />

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {/* Spec cards */}
          <div className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-slate-100">
            <h3 className="font-display text-fluid-lg flex items-center gap-2 font-bold text-navy-800">
              <Layers className="size-5 text-brand-600" /> Physical Specifications
            </h3>
            <dl className="mt-4 flex flex-col gap-3 text-sm">
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <dt className="text-slate-500">Dimensions</dt>
                <dd className="font-semibold text-slate-800">{t('soilAmend.specs.dimensions')}</dd>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <dt className="text-slate-500">Block Weight</dt>
                <dd className="font-semibold text-slate-800">{t('soilAmend.specs.weight')}</dd>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <dt className="text-slate-500">Water Hold Capacity</dt>
                <dd className="font-semibold text-brand-600">{t('soilAmend.specs.waterCapacity')}</dd>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <dt className="text-slate-500">Compression Ratio</dt>
                <dd className="font-semibold text-slate-800">{t('soilAmend.specs.compression')}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">pH / Electrical Cond. (EC)</dt>
                <dd className="font-semibold text-slate-800">
                  pH {t('soilAmend.specs.ph')} | EC {t('soilAmend.specs.ec')}
                </dd>
              </div>
            </dl>
          </div>

          {/* USDA & Mineral Profile */}
          <div className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-slate-100">
            <h3 className="font-display text-fluid-lg flex items-center gap-2 font-bold text-navy-800">
              <Leaf className="size-5 text-emerald-600" /> USDA NOP Mineral Profile
            </h3>
            <p className="mt-2 text-xs text-slate-500">
              Permitted per USDA Title 7 CFR 205.203.C3 for organic crop fertilization.
            </p>

            <div className="mt-4 grid grid-cols-3 gap-3">
              {MINERALS.map((m) => (
                <div key={m} className="rounded-xl bg-slate-50 p-3 text-center ring-1 ring-slate-200/60">
                  <span className="font-display text-xs font-bold uppercase text-slate-500">{m}</span>
                  <p className="font-display mt-1 text-base font-extrabold text-navy-900">
                    {t(`soilAmend.minerals.${m}`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Usage Instructions */}
      <Section tone="white">
        <SectionHeading title={t('soilAmend.usage.heading')} />
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200/70">
            <span className="bg-brand-600 font-display inline-flex size-9 items-center justify-center rounded-full font-bold text-white">
              1
            </span>
            <h3 className="font-display text-fluid-base mt-4 font-bold text-navy-900">Hydration & Mixing</h3>
            <p className="mt-2 text-sm text-slate-600">{t('soilAmend.usage.hydration')}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200/70">
            <span className="bg-brand-600 font-display inline-flex size-9 items-center justify-center rounded-full font-bold text-white">
              2
            </span>
            <h3 className="font-display text-fluid-base mt-4 font-bold text-navy-900">Nursery & Potting</h3>
            <p className="mt-2 text-sm text-slate-600">{t('soilAmend.usage.nursery')}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200/70">
            <span className="bg-brand-600 font-display inline-flex size-9 items-center justify-center rounded-full font-bold text-white">
              3
            </span>
            <h3 className="font-display text-fluid-base mt-4 font-bold text-navy-900">Plant Beds & Fields</h3>
            <p className="mt-2 text-sm text-slate-600">{t('soilAmend.usage.field')}</p>
          </div>
        </div>
      </Section>

      {/* Safety Notice */}
      <Section tone="sand">
        <div className="mx-auto max-w-3xl">
          <div className="border-brand-500 shadow-card flex gap-4 rounded-2xl border-l-4 bg-white p-5">
            <Info className="text-brand-700 mt-0.5 size-6 shrink-0" aria-hidden="true" />
            <div className="min-w-0">
              <h3 className="font-display text-fluid-base font-bold">{t('common:disclaimer.heading')}</h3>
              <p className="text-fluid-sm mt-1.5 text-slate-600">{t('common:disclaimer.short')}</p>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section tone="white">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-fluid-2xl">{t('soilAmend.faq.heading')}</h2>
          <Accordion className="mt-8" items={faqItems} />
        </div>
      </Section>

      <CtaBand lang={lang} />
    </>
  );
}
