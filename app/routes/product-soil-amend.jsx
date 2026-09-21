import { useTranslation } from 'react-i18next';
import { useOutletContext } from 'react-router';
import { Check, Download, Info, Layers, Leaf, ShieldCheck, Package, Sparkles, HelpCircle, FileText, ShieldAlert, HeartPulse } from 'lucide-react';

import { CtaBand } from '../components/sections/cta-band.jsx';
import { PageHero } from '../components/sections/page-hero.jsx';
import { PackageCards } from '../components/ui/package-cards.jsx';
import { ProductSubNav } from '../components/ui/product-sub-nav.jsx';
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
const FAQS = ['water', 'duration', 'nematodes', 'organic'];

const SOIL_AMEND_SECTIONS = [
  { id: 'overview', label: 'Overview', icon: Info },
  { id: 'packages', label: 'Package Sizes', icon: Package },
  { id: 'benefits', label: 'Benefits & Features', icon: ShieldCheck },
  { id: 'specifications', label: 'Physical Specs & Minerals', icon: FileText },
  { id: 'how-to-use', label: 'Hydration & Application', icon: Sparkles },
  { id: 'safety', label: 'Safety & Eco-Health', icon: HeartPulse },
  { id: 'faq', label: 'FAQ', icon: HelpCircle },
];

const MINERAL_VALUES = [
  { symbol: 'pH', value: '6.30', unit: '' },
  { symbol: 'Elec C.*', value: '0.40', unit: 'Micromhos/cm' },
  { symbol: 'N', value: '0.40%', unit: 'Nitrogen' },
  { symbol: 'P', value: '0.80%', unit: 'Phosphorus' },
  { symbol: 'K', value: '1.30%', unit: 'Potassium' },
  { symbol: 'Ca', value: '0.20%', unit: 'Calcium' },
  { symbol: 'Mg', value: '0.30%', unit: 'Magnesium' },
  { symbol: 'Fe', value: '23.00 ppm', unit: 'Iron' },
  { symbol: 'Zn', value: '22.00 ppm', unit: 'Zinc' },
  { symbol: 'Mn', value: '17.00 ppm', unit: 'Manganese' },
  { symbol: 'Cu', value: '5.00 ppm', unit: 'Copper' },
];

export function meta({ params }) {
  const t = getI18n(params.lang).getFixedT(params.lang, 'products');
  return buildMeta({
    lang: params.lang,
    path: PRODUCT.slug,
    title: 'CraftDyne Soil Amend — Pure Organic Plant-Based Soil Conditioner',
    description:
      'CraftDyne Soil Amend is a pure organic plant-based soil conditioner with high Carbon-to-Nitrogen ratio, rich Terpenoids & Limonoids, water retention (14-15L/kg), and USDA NOP compliance.',
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
          name: 'CraftDyne Soil Amend',
          description:
            'CraftDyne Soil Amend organic plant-based soil conditioner block with high Carbon-to-Nitrogen ratio and micro-nutrients.',
          slug: PRODUCT.slug,
        })}
      />
      <JsonLd schema={faqSchema(faqItems)} />
      <JsonLd
        schema={breadcrumbSchema(lang, [
          { name: t('common:nav.products'), path: 'products' },
          { name: 'CraftDyne Soil Amend', path: PRODUCT.slug },
        ])}
      />

      <PageHero
        lang={lang}
        eyebrow="Pure Organic Plant-Based Material"
        title="CraftDyne Soil Amend"
        description="High Carbon to Nitrogen Ratio with High Terpenoid & Limonoid Content and Micro-Nutrients."
        crumbs={[
          { label: t('common:nav.products'), path: 'products' },
          { label: 'CraftDyne Soil Amend', path: PRODUCT.slug },
        ]}
      />

      <ProductSubNav sections={SOIL_AMEND_SECTIONS} />

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
                  Download Technical & Usage PDF
                </a>
              )}
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-bold text-emerald-800 ring-1 ring-emerald-200">
              <Leaf className="size-4 text-emerald-600" />
              USDA NOP Permitted • Serves up to 4 Years • 100% Plant Based
            </div>

            <h2 className="font-display text-fluid-2xl mt-4 font-bold text-navy-900">
              Organic Soil Amendment & Root Zone Enhancer
            </h2>

            <p className="text-fluid-lg mt-3 text-pretty text-slate-600">
              CraftDyne Soil Amend is a pure organic plant-based material compressed into 5kg blocks. It features a high Carbon-to-Nitrogen ratio, rich Terpenoid & Limonoid content, and essential micro-nutrients to build excellent air porosity, retain soil moisture, and protect crops against soil-borne pathogens & nematodes.
            </p>

            <div id="packages">
              <PackageCards productId="soilAmend" />
            </div>

            <div id="benefits">
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
        </div>
      </Section>

      {/* Specifications & USDA Mineral Profile */}
      <Section id="specifications" tone="mist">
        <SectionHeading
          title="Technical Specifications & Lab Analysis"
          description="USDA NOP compliance details, mineral values, and block physical specs."
        />

        {/* USDA Banner */}
        <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50/80 p-6 text-emerald-950">
          <div className="flex items-start gap-3">
            <Leaf className="size-6 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-display text-lg font-bold">Organic Statement (USDA NOP)</h3>
              <p className="mt-1 text-sm text-emerald-900 leading-relaxed">
                <strong>CRAFTDYNE Soil Amend</strong> is Permitted per the USDA National Organic Program (NOP) Rule:
                <em> Title 7: CFR Agriculture, Part 205.203.C3 Un-composted, National Organic Program allowed as Crop Fertilizer & Soil Amendment.</em>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          {/* Physical specs */}
          <div className="lg:col-span-5 rounded-2xl bg-white p-6 shadow-card ring-1 ring-slate-200">
            <h3 className="font-display text-fluid-lg flex items-center gap-2 font-bold text-navy-800">
              <Layers className="size-5 text-brand-600" /> Physical Specifications
            </h3>
            <dl className="mt-4 flex flex-col gap-3 text-sm">
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <dt className="text-slate-500">Dimensions</dt>
                <dd className="font-semibold text-slate-800">30 cm x 30 cm x 10 cm</dd>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <dt className="text-slate-500">Block Weight</dt>
                <dd className="font-semibold text-slate-800">5.0 (+/- 0.2) Kgs</dd>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <dt className="text-slate-500">Particle Size</dt>
                <dd className="font-semibold text-slate-800">Passes 6 mm Mesh (Fines removed)</dd>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <dt className="text-slate-500">Compression Ratio</dt>
                <dd className="font-semibold text-slate-800">1 : 5 (Pressed volume to loose filled)</dd>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <dt className="text-slate-500">Water Hold Capacity</dt>
                <dd className="font-semibold text-brand-600">14 – 15 Liters per 1 Kg Block</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Soil Durability</dt>
                <dd className="font-semibold text-emerald-700">Serves for up to 4 Years</dd>
              </div>
            </dl>
          </div>

          {/* Average Property & Mineral Profile */}
          <div className="lg:col-span-7 rounded-2xl bg-white p-6 shadow-card ring-1 ring-slate-200">
            <h3 className="font-display text-fluid-lg flex items-center gap-2 font-bold text-navy-800">
              <Sparkles className="size-5 text-brand-600" /> Average Property & Mineral Values
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              * Electrical Conductivity (EC): 0.40 Micromhos per cM (Low Conductivity).
            </p>

            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {MINERAL_VALUES.map((m) => (
                <div key={m.symbol} className="rounded-xl bg-slate-50 p-3 text-center ring-1 ring-slate-200/60">
                  <span className="font-display text-xs font-bold uppercase text-slate-500">{m.symbol}</span>
                  <p className="font-display mt-1 text-base font-extrabold text-navy-900">{m.value}</p>
                  {m.unit && <span className="text-[0.6875rem] text-slate-500 block">{m.unit}</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Usage Instructions */}
      <Section id="how-to-use" tone="white">
        <SectionHeading title="Usage & Hydration Instructions" description="Steps for hydration, nursery potting, and open field soil amendment." />
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200/70">
            <span className="bg-brand-600 font-display inline-flex size-9 items-center justify-center rounded-full font-bold text-white">
              1
            </span>
            <h3 className="font-display text-fluid-base mt-4 font-bold text-navy-900">Hydration & Mixing</h3>
            <p className="mt-2 text-sm text-slate-600">
              Hydrate the block using fresh water (well, stream, or irrigation). The block will expand and break apart. Loosen and mix thoroughly before applying.
            </p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200/70">
            <span className="bg-brand-600 font-display inline-flex size-9 items-center justify-center rounded-full font-bold text-white">
              2
            </span>
            <h3 className="font-display text-fluid-base mt-4 font-bold text-navy-900">Nursery & Plant Potting</h3>
            <p className="mt-2 text-sm text-slate-600">
              Seeds or seedlings may be directly planted in a bed of hydrated Soil Amend, or blended with existing potting soil according to soil conditions.
            </p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200/70">
            <span className="bg-brand-600 font-display inline-flex size-9 items-center justify-center rounded-full font-bold text-white">
              3
            </span>
            <h3 className="font-display text-fluid-base mt-4 font-bold text-navy-900">Plant Beds & Open Fields</h3>
            <p className="mt-2 text-sm text-slate-600">
              Spread blocks over field rows or plant mounds. Water blocks to loosen and break. Till and mix into soil bed around areas of root spread.
            </p>
          </div>
        </div>
      </Section>

      {/* Safety & Environmental Health */}
      <Section id="safety" tone="sand">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
              <HeartPulse className="size-5 text-emerald-600" />
              <h3 className="font-display text-lg font-bold text-navy-900">Environmental Health & Safety</h3>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 text-sm text-slate-700">
              <div>
                <h4 className="font-bold text-navy-900">Handling Safety:</h4>
                <p className="mt-1 text-xs text-slate-600">Wear dust mask and gloves while handling. Wash hands thoroughly after handling. Follow SDS safety guidelines.</p>
              </div>
              <div>
                <h4 className="font-bold text-navy-900">Environmental Safety:</h4>
                <p className="mt-1 text-xs text-slate-600">NON-polluting and SAFE to air, soil, and water. NON-toxic to humans and animals. NON-hazardous and safe for farm usage.</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq" tone="white">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-fluid-2xl">{t('soilAmend.faq.heading')}</h2>
          <Accordion className="mt-8" items={faqItems} />
        </div>
      </Section>

      <CtaBand lang={lang} />
    </>
  );
}
