import { useTranslation } from 'react-i18next';
import { Link, useOutletContext } from 'react-router';
import { ArrowRight, Check, Download, Package } from 'lucide-react';

import { CtaBand } from '../components/sections/cta-band.jsx';
import { PageHero } from '../components/sections/page-hero.jsx';
import { Button } from '../components/ui/button.jsx';
import { JsonLd } from '../components/ui/json-ld.jsx';
import { EcoAgtaLeaf, ProductBottle } from '../components/ui/product-bottle.jsx';
import { Section } from '../components/ui/section.jsx';
import { PRODUCTS } from '../data/products.js';
import { getI18n } from '../i18n/index.js';
import { localePath } from '../lib/links.js';
import { breadcrumbSchema, buildMeta } from '../lib/seo.js';

const BENEFITS_MAP = {
  ez3plus: ['whiteflies', 'sootyMold', 'growth', 'productivity'],
  blumennStrong: ['drop', 'yield', 'immunity', 'decay'],
  mycoSpectra: ['fungiControl', 'duration', 'bioavailable', 'yieldSupport'],
  mycoDelta: ['fungiControl', 'duration', 'bioavailable'],
  mycoSiga: ['fungiControl', 'duration', 'bioavailable'],
  soilAmend: ['porosity', 'nematode', 'durability', 'cec'],
};

export function meta({ params }) {
  const t = getI18n(params.lang).getFixedT(params.lang, 'products');
  return buildMeta({
    lang: params.lang,
    path: 'products',
    title: t('index.meta.title'),
    description: t('index.meta.description'),
  });
}

export default function Products() {
  const { lang } = useOutletContext();
  const { t } = useTranslation(['products', 'common']);

  return (
    <>
      <JsonLd schema={breadcrumbSchema(lang, [{ name: t('common:nav.products'), path: 'products' }])} />

      <PageHero
        lang={lang}
        eyebrow={t('index.eyebrow')}
        title={t('index.title')}
        description={t('index.description')}
        crumbs={[{ label: t('common:nav.products'), path: 'products' }]}
      />

      <Section tone="white">
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((product) => {
            const benefits = BENEFITS_MAP[product.id] || BENEFITS_MAP.ez3plus;
            return (
              <li key={product.id} className="flex">
                <article className="bg-mist ring-brand-100 hover:border-brand-300 flex w-full flex-col justify-between overflow-hidden rounded-2xl p-5 ring-1 transition-all hover:shadow-lg">
                  <div>
                    <div className="flex items-start gap-3">
                      <div className="bg-white/90 shrink-0 rounded-xl p-1.5 ring-1 ring-slate-200/60 shadow-xs flex items-center justify-center w-16 h-20 overflow-hidden">
                        <ProductBottle className="max-w-[3.2rem]" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <span className="bg-brand-600 font-display inline-block rounded-full px-2.5 py-0.5 text-[0.6875rem] font-bold text-white leading-tight">
                          {t(`${product.id}.kicker`, product.brand)}
                        </span>

                        <h2 className="text-base font-bold leading-snug mt-1.5 text-navy-900">
                          <Link
                            to={localePath(lang, product.slug)}
                            className="hover:text-brand-700 transition-colors flex items-center gap-1.5"
                          >
                            <EcoAgtaLeaf className="text-eco-green size-4 shrink-0" />
                            <span className="truncate">
                              {product.id === 'ez3plus' ? (
                                <span>
                                  EcoAgta EZ3+<sub className="text-[0.65rem] font-medium font-sans">concentrate</sub>
                                </span>
                              ) : (
                                t(`${product.id}.name`, product.name)
                              )}
                            </span>
                          </Link>
                        </h2>

                        <p className="mt-1 text-xs text-slate-600 line-clamp-2 leading-tight">
                          {t(`${product.id}.tagline`, 'Proactive Green Chemistry Solution')}
                        </p>
                      </div>
                    </div>

                    {/* Quantities / Packages Badges (Ref PDF Offerings) */}
                    {product.packages && product.packages.length > 0 ? (
                      <div className="mt-3.5 flex flex-wrap items-center gap-1.5 border-t border-slate-200/60 pt-2.5">
                        <span className="text-[0.6875rem] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                          <Package className="size-3 text-brand-600" /> Packages:
                        </span>
                        {product.packages.map((pkg) => (
                          <span
                            key={pkg}
                            className="inline-block rounded-md bg-white px-2 py-0.5 text-[0.6875rem] font-semibold text-navy-800 border border-slate-200 shadow-2xs"
                          >
                            {pkg}
                          </span>
                        ))}
                      </div>
                    ) : null}

                    {/* Compact Key Benefits Checklist */}
                    <ul className="mt-3 flex flex-col gap-1.5 border-t border-slate-200/60 pt-3">
                      {benefits.slice(0, 3).map((id) => (
                        <li key={id} className="flex items-center gap-2 text-xs text-slate-700">
                          <Check className="text-brand-600 size-3 shrink-0" aria-hidden="true" />
                          <span className="truncate">{t(`${product.id}.benefits.items.${id}.title`, id)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2 border-t border-slate-200/60 pt-3">
                    <Button to={localePath(lang, product.slug)} size="sm" className="w-full justify-center text-xs px-2 py-1.5 min-h-9">
                      {t('common:actions.viewProduct')}
                      <ArrowRight className="size-3.5" aria-hidden="true" />
                    </Button>
                    {product.brochureUrl && (
                      <a
                        href={product.brochureUrl}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-white px-2 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs transition-colors hover:bg-slate-50 hover:border-slate-400"
                        title={t('common:actions.downloadBrochure')}
                      >
                        <Download className="size-3.5 text-brand-600" />
                        <span className="truncate">Brochure</span>
                      </a>
                    )}
                  </div>
                </article>
              </li>
            );
          })}
        </ul>

        <div className="mt-10 rounded-2xl border border-dashed border-slate-300 p-6 text-center">
          <h2 className="text-fluid-lg font-bold">{t('index.moreSoon.title')}</h2>
          <p className="mx-auto mt-2 max-w-xl text-xs text-slate-600">{t('index.moreSoon.description')}</p>
          <Button to={localePath(lang, 'contact')} variant="outline" size="sm" className="mt-4">
            {t('index.moreSoon.cta')}
          </Button>
        </div>
      </Section>

      <CtaBand lang={lang} />
    </>
  );
}
