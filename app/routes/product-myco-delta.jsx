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

const PRODUCT = PRODUCTS.find((p) => p.id === 'mycoDelta') ?? {
  id: 'mycoDelta',
  slug: 'products/ecoagta-myco-delta',
  brand: 'EcoAgta',
  name: 'EcoAgta Myco Delta',
  brochureUrl: '/downloads/CraftDyne_EcoAgta_Myco_Delta_Brochure.pdf',
};

const MYCO_DELTA_SECTIONS = [
  { id: 'overview', label: 'Overview', icon: Info },
  { id: 'packages', label: 'Package Sizes', icon: Package },
  { id: 'symptoms', label: 'Fusarium Wilt Symptoms', icon: AlertTriangle },
  { id: 'usage', label: '2-Part Mixing & Application', icon: Droplets },
  { id: 'benefits', label: 'Key Features', icon: ShieldCheck },
];

const SYMPTOMS = [
  {
    title: 'Yellowing & Leaf Wilt',
    desc: 'Yellow and wilted leaves; yellowing typically progresses from the older to younger leaves.',
  },
  {
    title: 'Collapsed Leaves',
    desc: 'Leaves collapse and hang down, forming a skirt around the pseudostem.',
  },
  {
    title: 'Pseudostem Base Splitting',
    desc: 'Splitting of the pseudostem near the base of the tree.',
  },
  {
    title: 'Xylem & Feeder Root Discoloration',
    desc: 'Reddish-brown discoloration of the xylem develops in feeder roots (initial sites of infection).',
  },
  {
    title: 'Vascular Discoloration',
    desc: 'Internal vascular discoloration progresses upward into the rhizome.',
  },
];

export function meta({ params }) {
  const t = getI18n(params.lang).getFixedT(params.lang, 'products');
  return buildMeta({
    lang: params.lang,
    path: PRODUCT.slug,
    title: 'EcoAgta Myco Delta — Treatment for Fusarium Wilt (Vedi Vaalzhai Noi) in Bananas',
    description:
      'EcoAgta Myco Delta is a proven 2-part concentrate treatment for Fusarium Wilt (Panama Wilt / Vedi Vaalzhai Noi) caused by Fusarium oxysporum cubense in bananas.',
  });
}

export default function ProductMycoDelta() {
  const { lang } = useOutletContext();
  const { t } = useTranslation(['products', 'common']);

  return (
    <>
      <JsonLd
        schema={productSchema({
          lang,
          name: 'EcoAgta Myco Delta',
          description:
            'EcoAgta Myco Delta 2-part treatment for Fusarium Wilt (Vedi Vaalzhai Noi / Panama Wilt) in banana trees.',
          slug: PRODUCT.slug,
        })}
      />
      <JsonLd
        schema={breadcrumbSchema(lang, [
          { name: t('common:nav.products'), path: 'products' },
          { name: 'EcoAgta Myco Delta', path: PRODUCT.slug },
        ])}
      />

      <PageHero
        lang={lang}
        eyebrow="Targeted Systemic Fungi Treatment"
        title="EcoAgta Myco Delta"
        description="Quick, Economic & Effective Treatment for Vedi Vaalzhai Noi – Fusarium Wilt (Panama Wilt) in Banana Trees."
        crumbs={[
          { label: t('common:nav.products'), path: 'products' },
          { label: 'EcoAgta Myco Delta', path: PRODUCT.slug },
        ]}
      />

      <ProductSubNav sections={MYCO_DELTA_SECTIONS} />

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
              PROVEN • Systemic Fungi Control • Less than ₹2 per Tree
            </div>

            <h2 className="font-display text-fluid-2xl mt-4 font-bold text-navy-900">
              Treatment for Vedi Vaalzhai Noi – Fusarium Wilt (Panama Wilt)
            </h2>

            <p className="text-fluid-lg mt-3 text-pretty text-slate-600">
              Caused by <em>Fusarium oxysporum cubense</em> fungus, Fusarium Wilt is a severe vascular disease in bananas. EcoAgta Myco Delta Super Concentrate is effective against systemic fungi even at a late stage (better when diagnosed early). Presented in a 2-part concentrate (Part A liquid & Part B spherical white grains).
            </p>

            {/* Highlights Grid */}
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
                <span className="font-display block text-xl font-extrabold text-brand-700">&lt; ₹2 / Tree</span>
                <span className="text-xs font-semibold text-slate-600">Ultra-Cost Effective</span>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
                <span className="font-display block text-xl font-extrabold text-emerald-700">2-Part</span>
                <span className="text-xs font-semibold text-slate-600">Part A Liquid + Part B Grains</span>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
                <span className="font-display block text-xl font-extrabold text-navy-800">Trunk Pour</span>
                <span className="text-xs font-semibold text-slate-600">Root & Trunk Drench</span>
              </div>
            </div>

            <div id="packages">
              <PackageCards productId="mycoDelta" />
            </div>
          </div>
        </div>
      </Section>

      {/* Disease Symptoms Section */}
      <Section id="symptoms" tone="mist">
        <div className="mx-auto max-w-4xl text-center">
          <span className="bg-amber-100 text-amber-900 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wider">
            <AlertTriangle className="size-4 text-amber-700" /> Disease Identification
          </span>
          <h2 className="font-display text-fluid-2xl mt-3 font-bold text-navy-900">
            Fusarium Wilt Symptoms (Vedi Vaalzhai Noi)
          </h2>
          <p className="mt-2 text-slate-600">
            Watch for vascular wilt symptoms and pseudostem base cracking in banana plots.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SYMPTOMS.map((sym, idx) => (
            <Reveal key={sym.title} delay={idx * 0.06}>
              <div className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition-all hover:shadow-md">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="bg-brand-50 text-brand-700 font-display flex size-7 items-center justify-center rounded-full text-xs font-bold">
                      {idx + 1}
                    </span>
                    <h3 className="font-display text-base font-bold text-navy-900">{sym.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{sym.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 2-Part Mixing & Application Instructions */}
      <Section id="usage" tone="white">
        <div className="mx-auto max-w-4xl text-center">
          <span className="bg-brand-100 text-brand-800 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wider">
            <Droplets className="size-4 text-brand-600" /> Technical Usage Instructions
          </span>
          <h2 className="font-display text-fluid-2xl mt-3 font-bold text-navy-900">
            2-Part Mixing & Trunk Application Directions
          </h2>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {/* Part A: Mixing */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-xs">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
              <span className="bg-brand-600 text-white font-display flex size-7 items-center justify-center rounded-lg text-xs font-bold">
                A
              </span>
              <h3 className="font-display text-lg font-bold text-navy-900">Instructions for Mixing 2-Part Concentrates</h3>
            </div>
            <ol className="mt-4 space-y-3 text-sm text-slate-700">
              <li className="flex gap-2.5">
                <span className="font-bold text-brand-700">1.</span>
                <span>Fill <strong>1 Liter</strong> of fresh water in a 2-Liter bottle.</span>
              </li>
              <li className="flex gap-2.5">
                <span className="font-bold text-brand-700">2.</span>
                <span>Pour all <strong>30 mL of VEDI VALZHAI Concentrate Part A</strong> into the 1 Liter water.</span>
              </li>
              <li className="flex gap-2.5">
                <span className="font-bold text-brand-700">3.</span>
                <span>Empty all spherical white grains of <strong>VEDI VALZHAI Concentrate Part B</strong> into the 1 Liter water.</span>
              </li>
              <li className="flex gap-2.5">
                <span className="font-bold text-brand-700">4.</span>
                <span>Cap bottle and shake thoroughly until all white grains are completely dissolved.</span>
              </li>
              <li className="flex gap-2.5">
                <span className="font-bold text-brand-700">5.</span>
                <span>Pour the 1 Liter dissolved solution into a barrel filled with <strong>199 Liters</strong> of fresh water (Total 200 Liters).</span>
              </li>
              <li className="flex gap-2.5">
                <span className="font-bold text-brand-700">6.</span>
                <span>Mix <strong>Clockwise for 1.5 Minutes</strong> and <strong>Anti-clockwise for 1.5 Minutes</strong> using a PVC pipe or bamboo stick. Total 200L ready.</span>
              </li>
            </ol>
          </div>

          {/* Part B: Application */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-xs">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
              <span className="bg-emerald-600 text-white font-display flex size-7 items-center justify-center rounded-lg text-xs font-bold">
                B
              </span>
              <h3 className="font-display text-lg font-bold text-navy-900">Instructions for Trunk Drenching</h3>
            </div>
            <ol className="mt-4 space-y-4 text-sm text-slate-700">
              <li className="flex gap-3">
                <span className="font-bold text-emerald-700">7.</span>
                <span>Pour <strong>500 to 750 mL</strong> of diluted treatment <strong>AROUND the TRUNK</strong> at about 1.5 Feet (45 cm) from the ground. If pseudostem burst is above 1.5ft, pour above the burst, covering the main trunk.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-emerald-700">8.</span>
                <span>Side suckers (<em>pakka kannu</em>) will be protected during treatment.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-emerald-700">9.</span>
                <span>Use up all prepared 200 Liters <strong>WITHIN 2 Hours</strong> after mixing. Do NOT store leftover mixed product.</span>
              </li>
            </ol>
          </div>
        </div>
      </Section>

      {/* Features Summary */}
      <Section id="benefits" tone="mist">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-display text-fluid-2xl font-bold text-navy-900">Key Advantages</h2>
        </div>
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          <li className="flex gap-3.5 rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
            <span className="bg-emerald-50 text-emerald-700 mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-full">
              <ShieldCheck className="size-5" />
            </span>
            <div>
              <h3 className="font-bold text-navy-900">Late-Stage Recovery</h3>
              <p className="mt-1 text-xs text-slate-600">Effective against systemic fungi even at late infection stages.</p>
            </div>
          </li>
          <li className="flex gap-3.5 rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
            <span className="bg-emerald-50 text-emerald-700 mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-full">
              <Sprout className="size-5" />
            </span>
            <div>
              <h3 className="font-bold text-navy-900">Protects Side Suckers</h3>
              <p className="mt-1 text-xs text-slate-600">Drenching around main trunk protects pakka kannu for future harvest cycles.</p>
            </div>
          </li>
          <li className="flex gap-3.5 rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
            <span className="bg-emerald-50 text-emerald-700 mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-full">
              <Check className="size-5" />
            </span>
            <div>
              <h3 className="font-bold text-navy-900">100% Non-Toxic</h3>
              <p className="mt-1 text-xs text-slate-600">Safe and non-poisonous for soil health, water bodies, and workers.</p>
            </div>
          </li>
        </ul>
      </Section>

      <CtaBand lang={lang} />
    </>
  );
}
