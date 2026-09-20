import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { CheckCircle2, Download, Filter, Star } from 'lucide-react';

import { PRODUCTS } from '../../data/products.js';
import { localePath } from '../../lib/links.js';
import { Button } from '../ui/button.jsx';
import { Container } from '../ui/container.jsx';
import { Reveal } from '../ui/reveal.jsx';
import { SectionHeading } from '../ui/section.jsx';

export const REVIEWS_DATA = [
  {
    id: 'rev-1',
    productId: 'ez3plus',
    name: 'Mr. T. Naidu',
    role: 'Farm Owner',
    location: 'Amaravathi, Thiruppur District, Tamil Nadu',
    crop: 'Coconut',
    rating: 5,
    date: '2023',
    verified: true,
    outcome: 'Whiteflies & Sooty Mold Fungus Controlled',
    headline: 'Quickly improved the grade and quantity of coconut yield',
    quote:
      'EZ3+ completed repelled and controlled Spiraling Whiteflies from our coconut trees in a few days and completely removed the Sooty Mold Fungus [Capnodium) quickly improving the grade and quantity of the yield.',
  },
  {
    id: 'rev-2',
    productId: 'ez3plus',
    name: 'Mr. T. R. Thyaharajan',
    role: 'Farm Owner',
    location: 'Shenbaga Thoppu, Srivilliputtur, Tamil Nadu',
    crop: 'Mango & Coconut',
    rating: 5,
    date: '2024',
    verified: true,
    outcome: 'Eradicated Whiteflies & Reduced Fungus',
    headline: 'Fruits are much bigger and better after spraying EcoAgta EZ3+',
    quote:
      'After spraying EcoAgta EZ3 + in our mango and Coconut farm twice in a year, we have completed eradicated whiteflies and other sap sucking insects. The problem of fungus during the fruit season have also reduced substantially. The fruits are much bigger and better.',
  },
  {
    id: 'rev-3',
    productId: 'ez3plus',
    name: 'Farm Manager',
    role: 'C Thai Silk',
    location: 'Petchabun, Thailand',
    crop: 'Mulberry & Silk',
    rating: 5,
    date: '2022 & 2023',
    verified: true,
    outcome: 'Reduced Withholding Period from 20 to 10 Days',
    headline: 'Silkworms produce 0.012g of silk per cocoon with healthy leaves',
    quote:
      'EZ3 + completely repelled and controlled Whiteflies and Aphids in our Mulberry bushes and completely controlled the fungal attack in a week’s time. The use EZ3+ has reduced the withholding period from 20 days to 10; this increases our productivity. The silk worms which feed on the leaves treated with EZ3 + are healthy and produces 0.012 grams of silk per cocoon',
  },
];

export function CustomerReviews({ lang, limit, showFilters = true, id = 'customer-reviews' }) {
  const { t } = useTranslation(['common', 'products']);
  const [selectedProduct, setSelectedProduct] = useState('all');

  const filteredReviews =
    selectedProduct === 'all'
      ? REVIEWS_DATA
      : REVIEWS_DATA.filter((r) => r.productId === selectedProduct);

  const displayedReviews = limit ? filteredReviews.slice(0, limit) : filteredReviews;

  return (
    <section id={id} className="scroll-mt-24 bg-slate-50 py-16 sm:py-24">
      <Container size="wide">
        <SectionHeading
          eyebrow={t('common:nav.customerReviews')}
          title={t('reviews.heading', 'Proven Results from Farmers & Planters')}
          description={t(
            'reviews.description',
            'Read how CraftDyne Green Chemistry products enhance yields, protect crops, and restore soil health across farms in India.',
          )}
        />

        {/* Aggregate rating banner */}
        <Reveal className="mt-8">
          <div className="bg-navy-900 border-brand-500/30 grid gap-6 rounded-3xl border p-6 text-white sm:p-8 md:grid-cols-12 md:items-center">
            <div className="flex flex-wrap items-center gap-4 md:col-span-7">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="size-6 fill-current text-amber-400" />
                ))}
              </div>
              <div>
                <span className="font-display text-3xl font-extrabold text-white">4.9 / 5.0</span>
                <span className="ml-2 text-sm text-slate-300">Average Farmer Satisfaction</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 border-t border-white/10 pt-4 md:col-span-5 md:border-t-0 md:border-l md:pt-0 md:pl-6">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-5 text-emerald-400" />
                <span className="text-sm font-semibold text-slate-200">500+ Verified Farms</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-5 text-emerald-400" />
                <span className="text-sm font-semibold text-slate-200">100% Non-Toxic</span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Filter buttons */}
        {showFilters && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <div className="mr-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <Filter className="size-4 text-brand-600" />
              Filter by Product:
            </div>
            <button
              type="button"
              onClick={() => setSelectedProduct('all')}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-all ${selectedProduct === 'all'
                  ? 'bg-brand-600 text-white shadow'
                  : 'bg-white text-slate-700 hover:bg-slate-100 ring-1 ring-slate-200'
                }`}
            >
              All Products ({REVIEWS_DATA.length})
            </button>
            {PRODUCTS.map((p) => {
              const count = REVIEWS_DATA.filter((r) => r.productId === p.id).length;
              if (count === 0) return null;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedProduct(p.id)}
                  className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-all ${selectedProduct === p.id
                      ? 'bg-brand-600 text-white shadow'
                      : 'bg-white text-slate-700 hover:bg-slate-100 ring-1 ring-slate-200'
                    }`}
                >
                  {p.name} ({count})
                </button>
              );
            })}
          </div>
        )}

        {/* Review Cards Grid */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayedReviews.map((review, idx) => {
            const product = PRODUCTS.find((p) => p.id === review.productId);
            return (
              <Reveal key={review.id} delay={idx * 0.05}>
                <article className="shadow-card flex h-full flex-col justify-between rounded-2xl bg-white p-6 ring-1 ring-slate-200/80 transition-all hover:shadow-md">
                  <div>
                    {/* Header bar */}
                    <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-4">
                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="size-4 fill-current text-amber-400" />
                        ))}
                      </div>
                      {review.verified && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
                          <CheckCircle2 className="size-3.5" />
                          Verified Farmer
                        </span>
                      )}
                    </div>

                    {/* Outcome Badge */}
                    <div className="mt-4">
                      <span className="bg-brand-50 text-brand-800 ring-brand-200 inline-block rounded-lg px-3 py-1 font-display text-xs font-bold ring-1">
                        {review.outcome}
                      </span>
                    </div>

                    {/* Headline & Quote */}
                    <h3 className="font-display mt-3 text-base font-bold text-navy-900">
                      "{review.headline}"
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      "{review.quote}"
                    </p>
                  </div>

                  {/* Footer details */}
                  <div className="mt-6 border-t border-slate-100 pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-display font-bold text-slate-900">{review.name}</h4>
                        <p className="text-xs text-slate-500">
                          {review.role} • {review.location}
                        </p>
                      </div>
                      <span className="rounded bg-slate-100 px-2 py-0.5 text-[0.75rem] font-medium text-slate-600">
                        {review.crop}
                      </span>
                    </div>

                    {/* Product Link & Brochure Download */}
                    {product && (
                      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-slate-50 p-2.5 ring-1 ring-slate-200/60">
                        <Link
                          to={localePath(lang, product.slug)}
                          className="font-display text-xs font-bold text-brand-700 hover:underline"
                        >
                          {product.name}
                        </Link>
                        {product.brochureUrl && (
                          <a
                            href={product.brochureUrl}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 rounded-md bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-xs hover:bg-brand-50 hover:text-brand-700"
                            title="Download Brochure"
                          >
                            <Download className="size-3 text-brand-600" />
                            Brochure
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {limit && (
          <div className="mt-10 text-center">
            <Button to={localePath(lang, 'reviews')} variant="outline" size="lg">
              {t('reviews.viewAll', 'Read All Farmer Reviews & Case Studies')}
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
}
