import { useTranslation } from 'react-i18next';
import { useOutletContext } from 'react-router';
import { Check, Download, Info, ShieldCheck, Package } from 'lucide-react';

import { CtaBand } from '../components/sections/cta-band.jsx';
import { PageHero } from '../components/sections/page-hero.jsx';
import { PackageCards } from '../components/ui/package-cards.jsx';
import { ProductSubNav } from '../components/ui/product-sub-nav.jsx';
import { JsonLd } from '../components/ui/json-ld.jsx';
import { ProductBottle } from '../components/ui/product-bottle.jsx';
import { Reveal } from '../components/ui/reveal.jsx';
import { Section } from '../components/ui/section.jsx';
import { PRODUCTS } from '../data/products.js';
import { getI18n } from '../i18n/index.js';
import { breadcrumbSchema, buildMeta, productSchema } from '../lib/seo.js';

const PRODUCT = PRODUCTS.find((p) => p.id === 'mycoSiga') ?? {
  id: 'mycoSiga',
  slug: 'products/ecoagta-myco-siga',
  brand: 'EcoAgta',
  name: 'EcoAgta Myco Siga',
};

const MYCO_SIGA_SECTIONS = [
  { id: 'overview', label: 'Overview', icon: Info },
  { id: 'packages', label: 'Package Sizes', icon: Package },
  { id: 'benefits', label: 'Benefits & Features', icon: ShieldCheck },
];

export function meta({ params }) {
  const t = getI18n(params.lang).getFixedT(params.lang, 'products');
  return buildMeta({
    lang: params.lang,
    path: PRODUCT.slug,
    title: t('mycoSiga.meta.title', 'EcoAgta Myco Siga — Sigatoka & Fungal Blight Control'),
    description: t('mycoSiga.meta.description', 'EcoAgta Myco Siga provides organic fungal protection against leaf spot and sigatoka blights.'),
  });
}

export default function ProductMycoSiga() {
  const { lang } = useOutletContext();
  const { t } = useTranslation(['products', 'common']);

  return (
    <>
      <JsonLd
        schema={productSchema({
          lang,
          name: t('mycoSiga.name', 'EcoAgta Myco Siga'),
          description: t('mycoSiga.meta.description', 'EcoAgta Myco Siga bio-fungicide formulation.'),
          slug: PRODUCT.slug,
        })}
      />
      <JsonLd
        schema={breadcrumbSchema(lang, [
          { name: t('common:nav.products'), path: 'products' },
          { name: t('mycoSiga.name', 'EcoAgta Myco Siga'), path: PRODUCT.slug },
        ])}
      />

      <PageHero
        lang={lang}
        eyebrow="Targeted Fungal Blight Shield"
        title={t('mycoSiga.name', 'EcoAgta Myco Siga')}
        description={t('mycoSiga.tagline', 'Specialized organic protection for fruit and commercial crops.')}
        crumbs={[
          { label: t('common:nav.products'), path: 'products' },
          { label: t('mycoSiga.name', 'EcoAgta Myco Siga'), path: PRODUCT.slug },
        ]}
      />

      <ProductSubNav sections={MYCO_SIGA_SECTIONS} />

      <Section id="overview" tone="white">
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
            <p className="text-fluid-lg text-pretty text-slate-600">
              {t(
                'mycoSiga.intro',
                'EcoAgta Myco Siga is a concentrated organic input formulated to protect agricultural crops against Sigatoka leaf spot, fungal blights, and early leaf drop.',
              )}
            </p>

            {/* Quantities / Offering Packages as Cards */}
            <div id="packages">
              <PackageCards productId="mycoSiga" />
            </div>

            <div id="benefits">
              <h2 className="text-fluid-2xl mt-10">Key Product Benefits</h2>
              <ul className="mt-5 flex flex-col gap-4">
                <li className="flex gap-3.5">
                  <span className="bg-brand-600 mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full">
                    <Check className="size-4 text-white" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-fluid-base font-semibold">Targeted Sigatoka & Leaf Spot Defense</h3>
                    <p className="text-fluid-sm mt-1 text-slate-600">Inhibits fungal hyphae growth on leaf surfaces, preserving green canopy area.</p>
                  </div>
                </li>
                <li className="flex gap-3.5">
                  <span className="bg-brand-600 mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full">
                    <Check className="size-4 text-white" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-fluid-base font-semibold">50 mL Liquid Concentrate Package</h3>
                    <p className="text-fluid-sm mt-1 text-slate-600">Packaged in 50 mL liquid containers for high-potency micro-dosage sprays.</p>
                  </div>
                </li>
                <li className="flex gap-3.5">
                  <span className="bg-brand-600 mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full">
                    <Check className="size-4 text-white" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-fluid-base font-semibold">Eco-Safe & Applicator Friendly</h3>
                    <p className="text-fluid-sm mt-1 text-slate-600">Non-toxic, non-irritating formulation safe for workers and natural pollinators.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <CtaBand lang={lang} />
    </>
  );
}
