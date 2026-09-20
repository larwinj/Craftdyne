import { useTranslation } from 'react-i18next';
import { useOutletContext } from 'react-router';
import { Check, Download, Info, ShieldCheck, Package, AlertTriangle, Droplets, Sparkles, Sprout } from 'lucide-react';

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
  brochureUrl: '/downloads/CraftDyne_EcoAgta_Myco_Siga_Brochure.pdf',
};

const MYCO_SIGA_SECTIONS = [
  { id: 'overview', label: 'Overview', icon: Info },
  { id: 'packages', label: 'Package Sizes', icon: Package },
  { id: 'symptoms', label: 'Yellow Sigatoka Symptoms', icon: AlertTriangle },
  { id: 'usage', label: 'Mixing & Application', icon: Droplets },
  { id: 'benefits', label: 'Key Features', icon: ShieldCheck },
];

const SYMPTOMS = [
  {
    stage: 'Early Signs',
    desc: 'Light yellowish spots on lower leaves, starting near the leaf blades and petioles.',
  },
  {
    stage: 'Progression',
    desc: 'Spots enlarge, become oval, and the center dies, turning light grey with a distinct brown margin.',
  },
  {
    stage: 'Severe Infection',
    desc: 'Numerous spots coalesce, killing large portions of leaves, drastically reducing photosynthetic area.',
  },
  {
    stage: 'Pseudostem Effects',
    desc: 'Yellowish to reddish streaks appear, intensifying down toward the rhizome.',
  },
  {
    stage: 'Fruit Impact',
    desc: 'Infected plants produce smaller, lower-quality bunches; severe cases render fruit unmarketable.',
  },
];

export function meta({ params }) {
  const t = getI18n(params.lang).getFixedT(params.lang, 'products');
  return buildMeta({
    lang: params.lang,
    path: PRODUCT.slug,
    title: 'EcoAgta Myco Siga — Treatment for Yellow Sigatoka (Manjal Vaadal Noi) in Bananas',
    description:
      'EcoAgta Myco Siga is a fast, economic (less than ₹2 per tree) treatment for Yellow Sigatoka fungal disease (Manjal Vaadal Noi) in banana plantations.',
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
          name: 'EcoAgta Myco Siga',
          description:
            'EcoAgta Myco Siga treatment for Yellow Sigatoka (Manjal Vaadal Noi) fungal disease on banana trees.',
          slug: PRODUCT.slug,
        })}
      />
      <JsonLd
        schema={breadcrumbSchema(lang, [
          { name: t('common:nav.products'), path: 'products' },
          { name: 'EcoAgta Myco Siga', path: PRODUCT.slug },
        ])}
      />

      <PageHero
        lang={lang}
        eyebrow="Targeted Banana Fungal Defense"
        title="EcoAgta Myco Siga"
        description="Quick, Economic & Effective Treatment for Yellow Sigatoka Fungal Disease (Manjal Vaadal Noi) in Banana Trees."
        crumbs={[
          { label: t('common:nav.products'), path: 'products' },
          { label: 'EcoAgta Myco Siga', path: PRODUCT.slug },
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
                  Download Official PDF Brochure
                </a>
              )}
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-bold text-emerald-800 ring-1 ring-emerald-200">
              <Sparkles className="size-4 text-emerald-600" />
              PROVEN • Less than ₹2 per Tree • 100% Non-Toxic
            </div>

            <h2 className="font-display text-fluid-2xl mt-4 font-bold text-navy-900">
              Treatment for Yellow Sigatoka Fungal Disease (Manjal Vaadal Noi)
            </h2>

            <p className="text-fluid-lg mt-3 text-pretty text-slate-600">
              Yellow Sigatoka is a destructive fungal leaf-spot disease in banana crops that impairs photosynthesis, weakens plants, and severely lowers fruit yield, grade, and harvest quality. EcoAgta Myco Siga is presented as a safe, non-toxic, non-poisonous 1-part concentrate solution.
            </p>

            {/* Feature Highlights Grid */}
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
                <span className="font-display block text-xl font-extrabold text-brand-700">&lt; ₹2 / Tree</span>
                <span className="text-xs font-semibold text-slate-600">Ultra-Cost Effective</span>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
                <span className="font-display block text-xl font-extrabold text-emerald-700">1-Part</span>
                <span className="text-xs font-semibold text-slate-600">Easy Concentrate Mix</span>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
                <span className="font-display block text-xl font-extrabold text-navy-800">Pakka Kannu</span>
                <span className="text-xs font-semibold text-slate-600">Protects Side Suckers</span>
              </div>
            </div>

            <div id="packages">
              <PackageCards productId="mycoSiga" />
            </div>
          </div>
        </div>
      </Section>

      {/* Disease Symptoms Breakdown */}
      <Section id="symptoms" tone="mist">
        <div className="mx-auto max-w-4xl text-center">
          <span className="bg-amber-100 text-amber-900 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wider">
            <AlertTriangle className="size-4 text-amber-700" /> Disease Identification
          </span>
          <h2 className="font-display text-fluid-2xl mt-3 font-bold text-navy-900">
            Yellow Sigatoka Symptoms & Progression
          </h2>
          <p className="mt-2 text-slate-600">
            Diagnosing leaf-spot infections early prevents severe photosynthetic loss and crop failure.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SYMPTOMS.map((sym, idx) => (
            <Reveal key={sym.stage} delay={idx * 0.06}>
              <div className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition-all hover:shadow-md">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="bg-brand-50 text-brand-700 font-display flex size-7 items-center justify-center rounded-full text-xs font-bold">
                      {idx + 1}
                    </span>
                    <h3 className="font-display text-base font-bold text-navy-900">{sym.stage}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{sym.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Usage & Mixing Instructions */}
      <Section id="usage" tone="white">
        <div className="mx-auto max-w-4xl text-center">
          <span className="bg-brand-100 text-brand-800 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wider">
            <Droplets className="size-4 text-brand-600" /> Technical Instructions
          </span>
          <h2 className="font-display text-fluid-2xl mt-3 font-bold text-navy-900">
            Mixing & Application Instructions
          </h2>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {/* Part A: Mixing */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-xs">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
              <span className="bg-brand-600 text-white font-display flex size-7 items-center justify-center rounded-lg text-xs font-bold">
                A
              </span>
              <h3 className="font-display text-lg font-bold text-navy-900">Instructions for Mixing & Diluting</h3>
            </div>
            <ol className="mt-4 space-y-4 text-sm text-slate-700">
              <li className="flex gap-3">
                <span className="font-bold text-brand-700">1.</span>
                <span>Pour ALL contents of TWO Bottles labeled as <strong>Sigatoka Treatment Concentrate</strong> into 200 Liters of fresh water (2 bottles per 200L drum).</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-brand-700">2.</span>
                <span>Use a clean dry PVC pipe or clean dry bamboo stick to mix thoroughly for <strong>3 Minutes</strong>.</span>
              </li>
            </ol>
          </div>

          {/* Part B: Application */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-xs">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
              <span className="bg-emerald-600 text-white font-display flex size-7 items-center justify-center rounded-lg text-xs font-bold">
                B
              </span>
              <h3 className="font-display text-lg font-bold text-navy-900">Instructions for Spray Application</h3>
            </div>
            <ol className="mt-4 space-y-4 text-sm text-slate-700">
              <li className="flex gap-3">
                <span className="font-bold text-emerald-700">3.</span>
                <span><strong>SPRAY thoroughly</strong> all over affected and unaffected trees in the plot. Side suckers (<em>pakka kannu</em>) will be protected.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-emerald-700">4.</span>
                <span>Use up all prepared treatment quantity <strong>WITHIN 2 Hours</strong> after mixing.</span>
              </li>
            </ol>
          </div>
        </div>
      </Section>

      {/* Benefits Summary */}
      <Section id="benefits" tone="mist">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-display text-fluid-2xl font-bold text-navy-900">Product Highlights</h2>
        </div>
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          <li className="flex gap-3.5 rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
            <span className="bg-emerald-50 text-emerald-700 mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-full">
              <ShieldCheck className="size-5" />
            </span>
            <div>
              <h3 className="font-bold text-navy-900">Proven Efficacy</h3>
              <p className="mt-1 text-xs text-slate-600">Effective against Yellow Sigatoka even at late stages, best applied upon early diagnosis.</p>
            </div>
          </li>
          <li className="flex gap-3.5 rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
            <span className="bg-emerald-50 text-emerald-700 mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-full">
              <Sprout className="size-5" />
            </span>
            <div>
              <h3 className="font-bold text-navy-900">Side Sucker Protection</h3>
              <p className="mt-1 text-xs text-slate-600">Protects side suckers (pakka kannu) ensuring continuous healthy ratoon crops.</p>
            </div>
          </li>
          <li className="flex gap-3.5 rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
            <span className="bg-emerald-50 text-emerald-700 mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-full">
              <Check className="size-5" />
            </span>
            <div>
              <h3 className="font-bold text-navy-900">Safe & Non-Toxic</h3>
              <p className="mt-1 text-xs text-slate-600">100% non-toxic, non-poisonous formulation safe for workers, soil, and environment.</p>
            </div>
          </li>
        </ul>
      </Section>

      <CtaBand lang={lang} />
    </>
  );
}
