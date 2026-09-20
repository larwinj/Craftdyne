import { useTranslation } from 'react-i18next';
import { useOutletContext } from 'react-router';
import { Check, Download, Info, ShieldCheck, Sprout, Package, Sparkles, HelpCircle } from 'lucide-react';

import { CtaBand } from '../components/sections/cta-band.jsx';
import { PageHero } from '../components/sections/page-hero.jsx';
import { PackageCards } from '../components/ui/package-cards.jsx';
import { ProductSubNav } from '../components/ui/product-sub-nav.jsx';
import { Accordion } from '../components/ui/accordion.jsx';
import { Button } from '../components/ui/button.jsx';
import { JsonLd } from '../components/ui/json-ld.jsx';
import { ProductBottle } from '../components/ui/product-bottle.jsx';
import { Reveal } from '../components/ui/reveal.jsx';
import { Section, SectionHeading } from '../components/ui/section.jsx';
import { PRODUCTS } from '../data/products.js';
import { getI18n } from '../i18n/index.js';
import { breadcrumbSchema, buildMeta, faqSchema, productSchema } from '../lib/seo.js';

const PRODUCT = PRODUCTS.find((p) => p.id === 'blumennStrong') ?? PRODUCTS[1];

const INTERNAL_CAUSES = [
  'micros',
  'soil',
  'flowers',
  'ovules',
  'competition',
  'climate',
  'abscission',
];

const EXTERNAL_CAUSES = [
  'fungal',
  'suckers',
];

const FAQS = ['purpose', 'crops', 'dilution', 'safety'];

const BLUMENN_SECTIONS = [
  { id: 'overview', label: 'Overview', icon: Info },
  { id: 'packages', label: 'Package Sizes', icon: Package },
  { id: 'causes', label: 'Flower Drop Solved', icon: ShieldCheck },
  { id: 'mode-of-action', label: 'Dilution & Spray', icon: Sparkles },
  { id: 'faq', label: 'FAQ', icon: HelpCircle },
];

export function meta({ params }) {
  const t = getI18n(params.lang).getFixedT(params.lang, 'products');
  return buildMeta({
    lang: params.lang,
    path: PRODUCT.slug,
    title: t('blumennStrong.meta.title'),
    description: t('blumennStrong.meta.description'),
  });
}

export default function ProductBlumennStrong() {
  const { lang } = useOutletContext();
  const { t } = useTranslation(['products', 'common']);

  const faqItems = FAQS.map((id) => ({
    id,
    question: t(`blumennStrong.faq.items.${id}.question`),
    answer: t(`blumennStrong.faq.items.${id}.answer`),
  }));

  return (
    <>
      <JsonLd
        schema={productSchema({
          lang,
          name: t('blumennStrong.name'),
          description: t('blumennStrong.meta.description'),
          slug: PRODUCT.slug,
        })}
      />
      <JsonLd schema={faqSchema(faqItems)} />
      <JsonLd
        schema={breadcrumbSchema(lang, [
          { name: t('common:nav.products'), path: 'products' },
          { name: t('blumennStrong.name'), path: PRODUCT.slug },
        ])}
      />

      <PageHero
        lang={lang}
        eyebrow={t('blumennStrong.kicker')}
        title={t('blumennStrong.name')}
        description={t('blumennStrong.tagline')}
        crumbs={[
          { label: t('common:nav.products'), path: 'products' },
          { label: t('blumennStrong.name'), path: PRODUCT.slug },
        ]}
      />

      <ProductSubNav sections={BLUMENN_SECTIONS} />

      {/* Product Overview */}
      <Section id="overview" tone="white">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-14">
          <Reveal className="lg:col-span-5">
            <div className="flex flex-col items-center">
              <ProductBottle image={PRODUCT.image} alt={PRODUCT.name} className="mx-auto max-w-xs sm:max-w-sm" />
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
            <p className="text-fluid-lg text-pretty text-slate-600">{t('blumennStrong.intro')}</p>

            <div id="packages">
              <PackageCards productId="blumennStrong" />
            </div>

            <div id="causes" className="mt-8 rounded-2xl bg-brand-50/60 p-6 ring-1 ring-brand-100">
              <h3 className="font-display text-fluid-lg font-bold text-navy-800">
                {t('blumennStrong.causes.heading')}
              </h3>
              <p className="mt-1 text-sm text-slate-600">{t('blumennStrong.causes.sub')}</p>

              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <h4 className="font-display font-bold text-brand-700 flex items-center gap-2">
                    <Sprout className="size-5" /> {t('blumennStrong.causes.internalTitle')}
                  </h4>
                  <ul className="mt-3 flex flex-col gap-2">
                    {INTERNAL_CAUSES.map((id) => (
                      <li key={id} className="flex items-start gap-2 text-sm text-slate-700">
                        <Check className="mt-0.5 size-4 text-brand-600 shrink-0" />
                        <span>{t(`blumennStrong.causes.internal.${id}`)}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-display font-bold text-navy-700 flex items-center gap-2">
                    <ShieldCheck className="size-5" /> {t('blumennStrong.causes.externalTitle')}
                  </h4>
                  <ul className="mt-3 flex flex-col gap-2">
                    {EXTERNAL_CAUSES.map((id) => (
                      <li key={id} className="flex items-start gap-2 text-sm text-slate-700">
                        <Check className="mt-0.5 size-4 text-navy-600 shrink-0" />
                        <span>{t(`blumennStrong.causes.external.${id}`)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Dilution & Usage */}
      <Section id="mode-of-action" tone="mist">
        <SectionHeading
          title={t('blumennStrong.dilution.heading')}
          description={t('blumennStrong.dilution.description')}
        />

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-slate-100">
            <h3 className="font-display text-fluid-lg font-bold text-navy-800">
              {t('blumennStrong.dilution.ratioTitle')}
            </h3>
            <p className="mt-3 font-display text-3xl font-extrabold text-brand-600">1 : 2000</p>
            <p className="mt-1 text-sm text-slate-600">{t('blumennStrong.dilution.ratioExample')}</p>
            <p className="mt-4 text-sm text-slate-700">{t('blumennStrong.dilution.waterType')}</p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-slate-100">
            <h3 className="font-display text-fluid-lg font-bold text-navy-800">
              {t('blumennStrong.usage.timingTitle')}
            </h3>
            <p className="mt-3 text-sm text-slate-700">{t('blumennStrong.usage.timingBody')}</p>
            <p className="mt-3 text-sm text-slate-700">{t('blumennStrong.usage.coverage')}</p>
          </div>
        </div>
      </Section>

      {/* Safety Notice */}
      <Section tone="sand">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-fluid-2xl">{t('blumennStrong.safety.heading')}</h2>
          <div className="border-brand-500 shadow-card mt-6 flex gap-4 rounded-2xl border-l-4 bg-white p-5">
            <Info className="text-brand-700 mt-0.5 size-6 shrink-0" aria-hidden="true" />
            <div className="min-w-0">
              <h3 className="font-display text-fluid-base font-bold">{t('common:disclaimer.heading')}</h3>
              <p className="text-fluid-sm mt-1.5 text-slate-600">{t('blumennStrong.safety.notice')}</p>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq" tone="white">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-fluid-2xl">{t('blumennStrong.faq.heading')}</h2>
          <Accordion className="mt-8" items={faqItems} />
        </div>
      </Section>

      <CtaBand lang={lang} />
    </>
  );
}
