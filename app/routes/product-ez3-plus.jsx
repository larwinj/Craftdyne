import { useTranslation } from 'react-i18next';
import { useOutletContext } from 'react-router';
import { Check, Download, Info, ShieldCheck, Package, Sparkles, FileText, HelpCircle } from 'lucide-react';

import { CtaBand } from '../components/sections/cta-band.jsx';
import { PageHero } from '../components/sections/page-hero.jsx';
import { PackageCards } from '../components/ui/package-cards.jsx';
import { ProductSubNav } from '../components/ui/product-sub-nav.jsx';
import { Accordion } from '../components/ui/accordion.jsx';
import { JsonLd } from '../components/ui/json-ld.jsx';
import { ProductBottle } from '../components/ui/product-bottle.jsx';
import { Reveal } from '../components/ui/reveal.jsx';
import { Section, SectionHeading } from '../components/ui/section.jsx';
import { FEATURED_PRODUCT } from '../data/products.js';
import { getI18n } from '../i18n/index.js';
import { breadcrumbSchema, buildMeta, faqSchema, productSchema } from '../lib/seo.js';

const BENEFITS = ['whiteflies', 'sootyMold', 'growth', 'productivity', 'safety'];
const STEPS = ['deter', 'prevent', 'promote'];
const PROPERTIES = ['type', 'targets', 'crops', 'toxicity', 'biodegradability', 'basis', 'foodChain', 'residue'];
const FAQS = ['howLong', 'organic', 'safety', 'crops', 'mixing', 'buy'];

const EZ3_SECTIONS = [
  { id: 'overview', label: 'Overview', icon: Info },
  { id: 'packages', label: 'Package Sizes', icon: Package },
  { id: 'how-it-works', label: 'Three-Step Action', icon: Sparkles },
  { id: 'specifications', label: 'Specifications', icon: FileText },
  { id: 'faq', label: 'FAQ', icon: HelpCircle },
];

export function meta({ params }) {
  const t = getI18n(params.lang).getFixedT(params.lang, 'products');
  return buildMeta({
    lang: params.lang,
    path: FEATURED_PRODUCT.slug,
    title: t('ez3plus.meta.title'),
    description: t('ez3plus.meta.description'),
  });
}

export default function ProductEz3Plus() {
  const { lang } = useOutletContext();
  const { t } = useTranslation(['products', 'common']);

  const faqItems = FAQS.map((id) => ({
    id,
    question: t(`ez3plus.faq.items.${id}.question`),
    answer: t(`ez3plus.faq.items.${id}.answer`),
  }));

  return (
    <>
      <JsonLd
        schema={productSchema({
          lang,
          name: t('ez3plus.name'),
          description: t('ez3plus.meta.description'),
          slug: FEATURED_PRODUCT.slug,
        })}
      />
      <JsonLd schema={faqSchema(faqItems)} />
      <JsonLd
        schema={breadcrumbSchema(lang, [
          { name: t('common:nav.products'), path: 'products' },
          { name: t('ez3plus.name'), path: FEATURED_PRODUCT.slug },
        ])}
      />

      <PageHero
        lang={lang}
        eyebrow={t('ez3plus.kicker')}
        title={
          <span>
            EcoAgta EZ3+<sub className="text-base font-medium font-sans">concentrate</sub>
          </span>
        }
        description={t('ez3plus.tagline')}
        crumbs={[
          { label: t('common:nav.products'), path: 'products' },
          { label: t('ez3plus.name'), path: FEATURED_PRODUCT.slug },
        ]}
      />

      <ProductSubNav sections={EZ3_SECTIONS} />

      {/* Overview */}
      <Section id="overview" tone="white">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-14">
          <Reveal className="lg:col-span-5">
            <div className="flex flex-col items-center">
              <ProductBottle image={FEATURED_PRODUCT.image} alt={FEATURED_PRODUCT.name} className="mx-auto max-w-xs sm:max-w-sm" />
              {FEATURED_PRODUCT.brochureUrl && (
                <a
                  href={FEATURED_PRODUCT.brochureUrl}
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
            <p className="text-fluid-lg text-pretty text-slate-600">{t('ez3plus.intro')}</p>

            {/* Product Packages / Quantities as Cards */}
            <div id="packages">
              <PackageCards productId="ez3plus" />
            </div>

            <h2 className="text-fluid-2xl mt-10">{t('ez3plus.benefits.heading')}</h2>
            <ul className="mt-5 flex flex-col gap-4">
              {BENEFITS.map((id) => (
                <li key={id} className="flex gap-3.5">
                  <span className="bg-brand-600 mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full">
                    <Check className="size-4 text-white" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-fluid-base font-semibold">{t(`ez3plus.benefits.items.${id}.title`)}</h3>
                    <p className="text-fluid-sm mt-1 text-slate-600">{t(`ez3plus.benefits.items.${id}.description`)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Triple action */}
      <Section id="how-it-works" tone="white">
        <SectionHeading
          eyebrow={t('ez3plus.kicker')}
          title={t('ez3plus.howItWorks.heading')}
          description={t('ez3plus.howItWorks.description')}
        />
        <ol className="mt-12 grid gap-5 md:grid-cols-3">
          {STEPS.map((id, index) => (
            <Reveal as="li" key={id} delay={index * 0.08}>
              <div className="shadow-card flex h-full flex-col rounded-2xl bg-white p-6 ring-1 ring-slate-100">
                <span className="bg-brand-600 font-display inline-flex size-11 items-center justify-center rounded-full font-extrabold text-white">
                  {index + 1}
                </span>
                <h3 className="text-fluid-lg mt-4">{t(`ez3plus.howItWorks.steps.${id}.title`)}</h3>
                <p className="text-fluid-sm mt-2 text-slate-600">{t(`ez3plus.howItWorks.steps.${id}.description`)}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* Properties */}
      <Section id="specifications" tone="mist">
        <SectionHeading align="left" title={t('ez3plus.properties.heading')} />
        <dl className="mt-8 grid gap-px overflow-hidden rounded-2xl bg-slate-200 ring-1 ring-slate-200 sm:grid-cols-2">
          {PROPERTIES.map((id) => (
            <div key={id} className="bg-white p-5">
              <dt className="font-display text-brand-700 text-sm font-bold tracking-wide uppercase">
                {t(`ez3plus.properties.items.${id}.label`)}
              </dt>
              <dd className="text-navy-700 mt-1.5">{t(`ez3plus.properties.items.${id}.value`)}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* Application guidance */}
      <Section tone="sand">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-fluid-2xl">{t('ez3plus.application.heading')}</h2>
          <p className="text-fluid-lg mt-4 text-slate-600">{t('ez3plus.application.description')}</p>

          <div className="border-brand-500 shadow-card mt-6 flex gap-4 rounded-2xl border-l-4 bg-white p-5">
            <Info className="text-brand-700 mt-0.5 size-6 shrink-0" aria-hidden="true" />
            <div className="min-w-0">
              <h3 className="font-display text-fluid-base font-bold">{t('common:disclaimer.heading')}</h3>
              <p className="text-fluid-sm mt-1.5 text-slate-600">{t('ez3plus.application.notice')}</p>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq" tone="white">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-fluid-2xl">{t('ez3plus.faq.heading')}</h2>
          <Accordion className="mt-8" items={faqItems} />
        </div>
      </Section>

      <CtaBand
        lang={lang}
        title={t('ez3plus.cta.title')}
        description={t('ez3plus.cta.description')}
        primary={t('ez3plus.cta.primary')}
        secondary={t('ez3plus.cta.secondary')}
      />
    </>
  );
}
