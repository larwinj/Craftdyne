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

export const REVIEWS_CONFIG = [
  {
    id: 'rev-selvam',
    productId: 'ez3plus',
    rating: 5,
    date: '2024',
    verified: true,
  },
  {
    id: 'rev-ramesh',
    productId: 'ez3plus',
    rating: 5,
    date: '2024',
    verified: true,
  },
  {
    id: 'rev-varadarajan',
    productId: 'ez3plus',
    rating: 5,
    date: '2024',
    verified: true,
  },
  {
    id: 'rev-naidu',
    productId: 'ez3plus',
    rating: 5,
    date: '2023',
    verified: true,
  },
  {
    id: 'rev-thyaharajan',
    productId: 'ez3plus',
    rating: 5,
    date: '2024',
    verified: true,
  },
  {
    id: 'rev-thai-silk',
    productId: 'ez3plus',
    rating: 5,
    date: '2022 & 2023',
    verified: true,
  },
];

// Backwards-compatible export
export const REVIEWS_DATA = REVIEWS_CONFIG;

export function CustomerReviews({ lang, limit, showFilters = true, id = 'customer-reviews' }) {
  const { t } = useTranslation(['common', 'products']);
  const [selectedProduct, setSelectedProduct] = useState('all');

  const localizedReviews = REVIEWS_CONFIG.map((review) => {
    const itemKey = `reviews.items.${review.id}`;
    return {
      ...review,
      storyHeading: t(`${itemKey}.storyHeading`, ''),
      name: t(`${itemKey}.name`, ''),
      role: t(`${itemKey}.role`, ''),
      location: t(`${itemKey}.location`, ''),
      crop: t(`${itemKey}.crop`, ''),
      outcome: t(`${itemKey}.outcome`, ''),
      headline: t(`${itemKey}.headline`, ''),
      quote: t(`${itemKey}.quote`, ''),
      tagline: t(`${itemKey}.tagline`, ''),
    };
  });

  const filteredReviews =
    selectedProduct === 'all' ? localizedReviews : localizedReviews.filter((r) => r.productId === selectedProduct);

  const displayedReviews = limit ? filteredReviews.slice(0, limit) : filteredReviews;

  return (
    <section id={id} className="scroll-mt-24 bg-slate-50 py-16 sm:py-24">
      <Container size="wide">
        <SectionHeading
          eyebrow={t('common:nav.customerReviews', 'Customer Reviews')}
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
                <span className="ml-2 text-sm text-slate-300">
                  {t('reviews.avgSatisfaction', 'Average Farmer Satisfaction')}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 border-t border-white/10 pt-4 md:col-span-5 md:border-t-0 md:border-l md:pt-0 md:pl-6">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-5 text-emerald-400" />
                <span className="text-sm font-semibold text-slate-200">
                  {t('reviews.verifiedFarms', '500+ Verified Farms')}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-5 text-emerald-400" />
                <span className="text-sm font-semibold text-slate-200">{t('reviews.nonToxic', '100% Non-Toxic')}</span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Filter buttons */}
        {showFilters && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <div className="mr-2 flex items-center gap-1.5 text-xs font-semibold tracking-wider text-slate-500 uppercase">
              <Filter className="text-brand-600 size-4" />
              {t('reviews.filterBy', 'Filter by Product:')}
            </div>
            <button
              type="button"
              onClick={() => setSelectedProduct('all')}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-all ${
                selectedProduct === 'all'
                  ? 'bg-brand-600 text-white shadow'
                  : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-100'
              }`}
            >
              {t('reviews.allProducts', 'All Products')} ({localizedReviews.length})
            </button>
            {PRODUCTS.map((p) => {
              const count = localizedReviews.filter((r) => r.productId === p.id).length;
              if (count === 0) return null;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedProduct(p.id)}
                  className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-all ${
                    selectedProduct === p.id
                      ? 'bg-brand-600 text-white shadow'
                      : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-100'
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
                    {/* Header bar: Rating & Verified Farmer badge */}
                    <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="size-4 fill-current text-amber-400" />
                        ))}
                      </div>
                      {review.verified && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
                          <CheckCircle2 className="size-3.5" />
                          {t('reviews.verifiedFarmer', 'Verified Farmer')}
                        </span>
                      )}
                    </div>

                    {/* Story Heading */}
                    {review.storyHeading && (
                      <div className="mt-3">
                        <span className="font-display text-brand-700 inline-block text-xs font-extrabold tracking-wide uppercase">
                          {review.storyHeading}
                        </span>
                      </div>
                    )}

                    {/* Outcome Badge */}
                    <div className="mt-2">
                      <span className="bg-brand-50 text-brand-800 ring-brand-200 font-display inline-block rounded-lg px-3 py-1 text-xs font-bold ring-1">
                        {review.outcome}
                      </span>
                    </div>

                    {/* Headline & Quote */}
                    <h3 className="font-display text-navy-900 mt-3 text-base leading-snug font-bold">
                      "{review.headline}"
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">"{review.quote}"</p>

                    {/* Visually Separated Tagline */}
                    {review.tagline && (
                      <div className="mt-4 rounded-xl border border-emerald-200/70 bg-emerald-50/80 p-3 text-xs leading-relaxed font-medium text-emerald-900 shadow-2xs">
                        {review.tagline}
                      </div>
                    )}
                  </div>

                  {/* Footer details: Farmer info & Product link */}
                  <div className="mt-6 border-t border-slate-100 pt-4">
                    <div>
                      <h4 className="font-display font-bold text-slate-900">{review.name}</h4>
                      <p className="mt-0.5 text-xs text-slate-500">
                        {review.role} • 📍 {review.location}
                      </p>
                    </div>

                    {/* Crop tags */}
                    {review.crop && (
                      <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                        <span className="text-xs text-slate-400">🌱</span>
                        {review.crop.includes(',') ? (
                          review.crop.split(',').map((c, i) => (
                            <span
                              key={i}
                              className="rounded bg-slate-100 px-2 py-0.5 text-[0.75rem] font-medium text-slate-600"
                            >
                              {c.trim()}
                            </span>
                          ))
                        ) : (
                          <span className="rounded bg-slate-100 px-2 py-0.5 text-[0.75rem] font-medium text-slate-600">
                            {review.crop}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Product Link & Brochure Download */}
                    {product && (
                      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-slate-50 p-2.5 ring-1 ring-slate-200/60">
                        <Link
                          to={localePath(lang, product.slug)}
                          className="font-display text-brand-700 text-xs font-bold hover:underline"
                        >
                          {product.name}
                        </Link>
                        {product.brochureUrl && (
                          <a
                            href={product.brochureUrl}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:bg-brand-50 hover:text-brand-700 inline-flex items-center gap-1 rounded-md bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-xs"
                            title={t('common:actions.downloadBrochure', 'Download Brochure')}
                          >
                            <Download className="text-brand-600 size-3" />
                            {t('reviews.brochure', 'Brochure')}
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
