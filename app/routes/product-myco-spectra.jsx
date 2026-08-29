import { useTranslation } from 'react-i18next';
import { useOutletContext } from 'react-router';
import { Check, Download, Info, ShieldAlert } from 'lucide-react';

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

const PRODUCT = PRODUCTS.find((p) => p.id === 'mycoSpectra') ?? PRODUCTS[4];
const BENEFITS = ['fungiControl', 'duration', 'bioavailable', 'yieldSupport', 'greenSafety'];
const TARGET_FUNGI = ['colletotrichum', 'phytophthora', 'pythium', 'phyllosticta', 'alternaria', 'rootRot'];
const FAQS = ['fungi', 'cardamom', 'dilution', 'mixing'];

export function meta({ params }) {
  const t = getI18n(params.lang).getFixedT(params.lang, 'products');
  return buildMeta({
    lang: params.lang,
    path: PRODUCT.slug,
    title: t('mycoSpectra.meta.title'),
    description: t('mycoSpectra.meta.description'),
  });
}

export default function ProductMycoSpectra() {
  const { lang } = useOutletContext();
  const { t } = useTranslation(['products', 'common']);

  const faqItems = FAQS.map((id) => ({
    id,
    question: t(`mycoSpectra.faq.items.${id}.question`),
    answer: t(`mycoSpectra.faq.items.${id}.answer`),
  }));

  return (
    <>
      <JsonLd
        schema={productSchema({
          lang,
          name: t('mycoSpectra.name'),
          description: t('mycoSpectra.meta.description'),
          slug: PRODUCT.slug,
        })}
      />
      <JsonLd schema={faqSchema(faqItems)} />
      <JsonLd
        schema={breadcrumbSchema(lang, [
          { name: t('common:nav.products'), path: 'products' },
          { name: t('mycoSpectra.name'), path: PRODUCT.slug },
        ])}
      />

      <PageHero
        lang={lang}
        eyebrow={t('mycoSpectra.kicker')}
        title={t('mycoSpectra.name')}
        description={t('mycoSpectra.tagline')}
        crumbs={[
          { label: t('common:nav.products'), path: 'products' },
          { label: t('mycoSpectra.name'), path: PRODUCT.slug },
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
            <p className="text-fluid-lg text-pretty text-slate-600">{t('mycoSpectra.intro')}</p>

            <h2 className="text-fluid-2xl mt-10">{t('mycoSpectra.benefits.heading')}</h2>
            <ul className="mt-5 flex flex-col gap-4">
              {BENEFITS.map((id) => (
                <li key={id} className="flex gap-3.5">
                  <span className="bg-brand-600 mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full">
                    <Check className="size-4 text-white" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-fluid-base font-semibold">{t(`mycoSpectra.benefits.items.${id}.title`)}</h3>
                    <p className="text-fluid-sm mt-1 text-slate-600">{t(`mycoSpectra.benefits.items.${id}.description`)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Target Fungi Section */}
      <Section tone="mist">
        <SectionHeading
          title={t('mycoSpectra.targets.heading')}
          description="Engineered to control complex agricultural fungal blights for up to 6 months."
        />

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TARGET_FUNGI.map((id) => (
            <div key={id} className="flex items-start gap-3 rounded-2xl bg-white p-5 shadow-card ring-1 ring-slate-100">
              <ShieldAlert className="text-brand-600 mt-0.5 size-5 shrink-0" />
              <span className="font-display text-sm font-bold text-navy-900">
                {t(`mycoSpectra.targets.items.${id}`)}
              </span>
            </div>
          ))}
        </div>

        {/* Dilution box */}
        <div className="mt-10 rounded-2xl bg-white p-6 shadow-card ring-1 ring-slate-100">
          <h3 className="font-display text-fluid-lg font-bold text-navy-800">
            {t('mycoSpectra.dilution.heading')}
          </h3>
          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Starting First Dose</p>
              <p className="mt-1 font-display text-2xl font-extrabold text-brand-600">1 : 400</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Continuing Dose</p>
              <p className="mt-1 font-display text-2xl font-extrabold text-brand-600">1 : 400</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-slate-600">{t('mycoSpectra.dilution.directions')}</p>
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
          <h2 className="text-fluid-2xl">{t('mycoSpectra.faq.heading')}</h2>
          <Accordion className="mt-8" items={faqItems} />
        </div>
      </Section>

      <CtaBand lang={lang} />
    </>
  );
}
