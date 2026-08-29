import { useTranslation } from 'react-i18next';
import { useOutletContext } from 'react-router';
import { Check, Download, Info } from 'lucide-react';

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

const PRODUCT = PRODUCTS.find((p) => p.id === 'ez3Cardamom') ?? PRODUCTS[2];
const BENEFITS = ['suckers', 'virus', 'nematodes', 'photosynthesis', 'biodegradable'];
const FAQS = ['thrips', 'dosage', 'combination', 'residue'];

export function meta({ params }) {
  const t = getI18n(params.lang).getFixedT(params.lang, 'products');
  return buildMeta({
    lang: params.lang,
    path: PRODUCT.slug,
    title: t('ez3Cardamom.meta.title'),
    description: t('ez3Cardamom.meta.description'),
  });
}

export default function ProductEz3Cardamom() {
  const { lang } = useOutletContext();
  const { t } = useTranslation(['products', 'common']);

  const faqItems = FAQS.map((id) => ({
    id,
    question: t(`ez3Cardamom.faq.items.${id}.question`),
    answer: t(`ez3Cardamom.faq.items.${id}.answer`),
  }));

  return (
    <>
      <JsonLd
        schema={productSchema({
          lang,
          name: t('ez3Cardamom.name'),
          description: t('ez3Cardamom.meta.description'),
          slug: PRODUCT.slug,
        })}
      />
      <JsonLd schema={faqSchema(faqItems)} />
      <JsonLd
        schema={breadcrumbSchema(lang, [
          { name: t('common:nav.products'), path: 'products' },
          { name: t('ez3Cardamom.name'), path: PRODUCT.slug },
        ])}
      />

      <PageHero
        lang={lang}
        eyebrow={t('ez3Cardamom.kicker')}
        title={t('ez3Cardamom.name')}
        description={t('ez3Cardamom.tagline')}
        crumbs={[
          { label: t('common:nav.products'), path: 'products' },
          { label: t('ez3Cardamom.name'), path: PRODUCT.slug },
        ]}
      />

      {/* Overview */}
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
            <p className="text-fluid-lg text-pretty text-slate-600">{t('ez3Cardamom.intro')}</p>

            <h2 className="text-fluid-2xl mt-10">{t('ez3Cardamom.benefits.heading')}</h2>
            <ul className="mt-5 flex flex-col gap-4">
              {BENEFITS.map((id) => (
                <li key={id} className="flex gap-3.5">
                  <span className="bg-brand-600 mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full">
                    <Check className="size-4 text-white" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-fluid-base font-semibold">{t(`ez3Cardamom.benefits.items.${id}.title`)}</h3>
                    <p className="text-fluid-sm mt-1 text-slate-600">{t(`ez3Cardamom.benefits.items.${id}.description`)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Dilution & Directions */}
      <Section tone="mist">
        <SectionHeading
          title={t('ez3Cardamom.dilution.heading')}
          description={t('ez3Cardamom.dilution.description')}
        />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-slate-100">
            <h3 className="font-display text-fluid-lg font-bold text-navy-800">Starting First Spray</h3>
            <p className="mt-3 font-display text-3xl font-extrabold text-brand-600">1 : 400</p>
            <p className="mt-2 text-sm text-slate-600">{t('ez3Cardamom.dilution.startingDose')}</p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-slate-100">
            <h3 className="font-display text-fluid-lg font-bold text-navy-800">Continuing Spray</h3>
            <p className="mt-3 font-display text-3xl font-extrabold text-brand-600">1 : 400</p>
            <p className="mt-2 text-sm text-slate-600">{t('ez3Cardamom.dilution.continuingDose')}</p>
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
          <h2 className="text-fluid-2xl">{t('ez3Cardamom.faq.heading')}</h2>
          <Accordion className="mt-8" items={faqItems} />
        </div>
      </Section>

      <CtaBand lang={lang} />
    </>
  );
}
