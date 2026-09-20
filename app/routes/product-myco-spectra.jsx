import { useTranslation } from 'react-i18next';
import { useOutletContext } from 'react-router';
import { Check, Download, Info, ShieldAlert, Package, Sparkles, HelpCircle, Leaf, ShieldCheck, DollarSign, Activity } from 'lucide-react';

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

const PRODUCT = PRODUCTS.find((p) => p.id === 'mycoSpectra') ?? PRODUCTS[2];
const BENEFITS = ['fungiControl', 'duration', 'bioavailable', 'yieldSupport', 'greenSafety'];
const TARGET_FUNGI = ['colletotrichum', 'phytophthora', 'pythium', 'phyllosticta', 'alternaria', 'rootRot'];
const FAQS = ['fungi', 'cardamom', 'dilution', 'mixing'];

const MYCO_SPECTRA_SECTIONS = [
  { id: 'overview', label: 'Overview', icon: Info },
  { id: 'packages', label: 'Package Sizes', icon: Package },
  { id: 'pillars', label: 'Four Pillars', icon: ShieldCheck },
  { id: 'mode-of-action', label: 'Modes of Action & Fungi', icon: Sparkles },
  { id: 'faq', label: 'FAQ', icon: HelpCircle },
];

const MODES_OF_ACTION = [
  {
    title: 'Contact Osmotic Action',
    targets: 'Powdery Mildew (Erysiphe, Podosphaera) & Botrytis Fungi (Gray Mold - Botrytis cinerea)',
    desc: 'Provides immediate osmotic pressure breakdown on fungal cell walls upon contact.',
  },
  {
    title: 'Systemic Acquired Resistance (SAR)',
    targets: 'Oomycetes: Phytophthora & Downy Mildew Fungi (Peronospora, Plasmopara)',
    desc: 'Triggers contact SAR pathways strengthening natural cellular immunity throughout the canopy.',
  },
  {
    title: 'Contact Disruption',
    targets: 'Fusarium, Colletotrichum & Anthracnose Fungi',
    desc: 'Disrupts fungal spore germination and hyphal elongation on stems, leaves, and fruit pods.',
  },
];

export function meta({ params }) {
  const t = getI18n(params.lang).getFixedT(params.lang, 'products');
  return buildMeta({
    lang: params.lang,
    path: PRODUCT.slug,
    title: 'EcoAgta Myco Spectra — Organic Broad Spectrum Fungal Suppressant',
    description:
      'EcoAgta Myco Spectra is an organic, water-based foliar spray treatment delivering up to 6 months systemic fungal control using IUPAC Green Chemistry principles.',
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
        eyebrow="Organic Broad Spectrum Fungal Suppressant"
        title="EcoAgta Myco Spectra"
        description="Foliar Spray Treatment for Systemic Control of Fungi — Made with IUPAC Green Chemistry Principles."
        crumbs={[
          { label: t('common:nav.products'), path: 'products' },
          { label: t('mycoSpectra.name'), path: PRODUCT.slug },
        ]}
      />

      <ProductSubNav sections={MYCO_SPECTRA_SECTIONS} />

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
                  Download Official PDF Brochure
                </a>
              )}
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-bold text-emerald-800 ring-1 ring-emerald-200">
              <Sparkles className="size-4 text-emerald-600" />
              100% Readily Biodegradable • Non-Toxic • Made with Green Chemistry
            </div>

            <h2 className="font-display text-fluid-2xl mt-4 font-bold text-navy-900">
              Organic, Water-Based Broad Spectrum Fungal Suppressant
            </h2>

            <p className="text-fluid-lg mt-3 text-pretty text-slate-600">
              EcoAgta Myco Spectra provides foliar spray treatment and systemic control against major plant fungi. Formulated on IUPAC Green Chemistry principles, it is non-toxic, non-poisonous, and completely readily biodegradable with zero harm to air, water, soil, or the food chain.
            </p>

            <div id="packages">
              <PackageCards productId="mycoSpectra" />
            </div>

            <div id="benefits">
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
        </div>
      </Section>

      {/* 4 Pillars Section */}
      <Section id="pillars" tone="mist">
        <div className="mx-auto max-w-4xl text-center">
          <span className="bg-brand-100 text-brand-800 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="size-4 text-brand-600" /> Core Design Pillars
          </span>
          <h2 className="font-display text-fluid-2xl mt-3 font-bold text-navy-900">
            Economics, Performance, Safety & Sustainability
          </h2>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
            <span className="bg-emerald-50 text-emerald-700 inline-flex size-10 items-center justify-center rounded-xl">
              <DollarSign className="size-5" />
            </span>
            <h3 className="font-display text-lg font-bold text-navy-900 mt-4">Economics</h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">Multiple benefits for longer periods. Saves farming costs.</p>
            <p className="mt-3 font-display text-xs font-bold text-emerald-700">→ Increases Yield</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
            <span className="bg-brand-50 text-brand-700 inline-flex size-10 items-center justify-center rounded-xl">
              <Activity className="size-5" />
            </span>
            <h3 className="font-display text-lg font-bold text-navy-900 mt-4">Performance</h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">Effective in preventing a wide range of destructive fungi.</p>
            <p className="mt-3 font-display text-xs font-bold text-brand-700">→ Systemic Immunity</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
            <span className="bg-sky-50 text-sky-700 inline-flex size-10 items-center justify-center rounded-xl">
              <ShieldCheck className="size-5" />
            </span>
            <h3 className="font-display text-lg font-bold text-navy-900 mt-4">Safety</h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">Non-poisonous, non-toxic, non-fuming, non-irritating.</p>
            <p className="mt-3 font-display text-xs font-bold text-sky-700">→ Safe for Persons & Animals</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
            <span className="bg-emerald-50 text-emerald-800 inline-flex size-10 items-center justify-center rounded-xl">
              <Leaf className="size-5" />
            </span>
            <h3 className="font-display text-lg font-bold text-navy-900 mt-4">Sustainability</h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">Readily biodegradable, efficient, reduces resources.</p>
            <p className="mt-3 font-display text-xs font-bold text-emerald-800">→ ZERO Harm to Environment</p>
          </div>
        </div>
      </Section>

      {/* Target Fungi & Modes of Action Section */}
      <Section id="mode-of-action" tone="white">
        <SectionHeading
          title="Target Fungi & Triple Mode of Action"
          description="Engineered to disrupt cell walls, trigger SAR immunity, and suppress spore germination."
        />

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {MODES_OF_ACTION.map((mode, idx) => (
            <Reveal key={mode.title} delay={idx * 0.08}>
              <div className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-xs">
                <div>
                  <span className="bg-brand-600 text-white font-display inline-block rounded-md px-2.5 py-0.5 text-xs font-bold">
                    Mode {idx + 1}
                  </span>
                  <h3 className="font-display text-lg font-bold text-navy-900 mt-3">{mode.title}</h3>
                  <p className="mt-2 text-xs font-semibold text-brand-700">{mode.targets}</p>
                  <p className="mt-3 text-sm text-slate-600">{mode.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Dilution box */}
        <div className="mt-10 rounded-2xl bg-white p-6 shadow-card ring-1 ring-slate-200">
          <h3 className="font-display text-fluid-lg font-bold text-navy-800">
            Dilution & Spraying Recommendations
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            For Tree & Plantation Crops (Guava, Mango, Coconut, Lemon, Lime, Tapioca, Banana) and Soft Leaf Plants (Tomatoes, Chiles, Cucumber, Groundnuts):
          </p>
          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Dilution Ratio</p>
              <p className="mt-1 font-display text-2xl font-extrabold text-brand-600">1 : 200</p>
              <p className="mt-1 text-xs text-slate-600">1000 mL poured into 200 Liters fresh non-chlorinated water (mix 5 mins).</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Spray Timing & Frequency</p>
              <p className="mt-1 font-display text-lg font-bold text-navy-900">6:00 - 10:30 AM or 3:30 - 6:30 PM</p>
              <p className="mt-1 text-xs text-slate-600">Spray symptomatically ~3 times during growing season, covering all plant parts.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq" tone="mist">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-fluid-2xl">{t('mycoSpectra.faq.heading')}</h2>
          <Accordion className="mt-8" items={faqItems} />
        </div>
      </Section>

      <CtaBand lang={lang} />
    </>
  );
}
