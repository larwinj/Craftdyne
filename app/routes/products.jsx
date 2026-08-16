import { useTranslation } from 'react-i18next';
import { Link, useOutletContext } from 'react-router';
import { ArrowRight, Check } from 'lucide-react';

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

const BENEFITS = ['whiteflies', 'sootyMold', 'growth', 'productivity', 'safety'];

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
        <ul className="flex flex-col gap-8">
          {PRODUCTS.map((product) => (
            <li key={product.id}>
              <article className="bg-mist ring-brand-100 overflow-hidden rounded-3xl ring-1">
                <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-12 lg:items-center lg:gap-12 lg:p-10">
                  <div className="lg:col-span-4">
                    <ProductBottle className="mx-auto max-w-[15rem]" />
                  </div>

                  <div className="lg:col-span-8">
                    <div className="flex flex-wrap items-center gap-3">
                      <EcoAgtaLeaf className="text-eco-green size-8" />
                      <h2 className="text-fluid-2xl">
                        <Link
                          to={localePath(lang, product.slug)}
                          className="hover:text-brand-700 inline-flex min-h-11 items-center rounded transition-colors"
                        >
                          {t(`${product.id}.name`)}
                        </Link>
                      </h2>
                    </div>

                    <p className="bg-brand-600 font-display mt-3 inline-block rounded-full px-4 py-1.5 text-sm font-bold text-white">
                      {t(`${product.id}.kicker`)}
                    </p>

                    <p className="text-fluid-lg mt-5 text-pretty text-slate-600">{t(`${product.id}.tagline`)}</p>

                    <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                      {BENEFITS.map((id) => (
                        <li key={id} className="flex items-start gap-2.5">
                          <Check className="text-brand-600 mt-1 size-4 shrink-0" aria-hidden="true" />
                          <span className="text-fluid-sm text-slate-700">
                            {t(`${product.id}.benefits.items.${id}.title`)}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Button to={localePath(lang, product.slug)} size="lg" className="mt-8">
                      {t('common:actions.viewProduct')}
                      <ArrowRight className="size-5" aria-hidden="true" />
                    </Button>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <div className="mt-10 rounded-2xl border border-dashed border-slate-300 p-8 text-center">
          <h2 className="text-fluid-xl">{t('index.moreSoon.title')}</h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-600">{t('index.moreSoon.description')}</p>
          <Button to={localePath(lang, 'contact')} variant="outline" className="mt-6">
            {t('index.moreSoon.cta')}
          </Button>
        </div>
      </Section>

      <CtaBand lang={lang} />
    </>
  );
}
