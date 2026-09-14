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
    productId: 'ez3Cardamom',
    name: 'R. Murugan',
    role: 'Cardamom & Pepper Planter',
    location: 'Idukki, Kerala',
    crop: 'Cardamom',
    rating: 5,
    date: 'August 2026',
    verified: true,
    outcome: '6 Months Whitefly & Thrips Protection',
    headline: 'Drastic reduction in thrips and whiteflies with zero chemical residue',
    quote:
      'We were dealing with severe whitefly infestation and mosaic virus risk in our hill-slope cardamom plot. Applying EZ3+ Cardamom Formula repelled sap suckers completely and kept fronds vibrant green without any chemical residue on harvested pods.',
  },
  {
    id: 'rev-2',
    productId: 'blumennStrong',
    name: 'S. Jayaraman',
    role: 'Guava & Coconut Grower',
    location: 'Pollachi, Tamil Nadu',
    crop: 'Coconut & Guava',
    rating: 5,
    date: 'July 2026',
    verified: true,
    outcome: '+28% Harvest Yield Increase',
    headline: 'Cut premature fruit drop significantly and boosted harvest yield',
    quote:
      'Premature fruit drop was wasting almost 30% of our guava and coconut crop every season. After using Blumenn Strong Super Concentrate at 1:2000 dilution, fruit drop stopped almost completely and our harvest yield increased by 28%.',
  },
  {
    id: 'rev-3',
    productId: 'ez3Coconut',
    name: 'K. Ananthakrishnan',
    role: 'Coconut Estate Manager',
    location: 'Coimbatore, Tamil Nadu',
    crop: 'Coconut Palms',
    rating: 5,
    date: 'August 2026',
    verified: true,
    outcome: 'Sooty Mold Eradicated in 40 Days',
    headline: 'Rugose Spiraling Whitefly & black mold cleared from coconut canopy',
    quote:
      'Our coconut palm fronds were covered in black sooty mold caused by Rugose Spiraling Whitefly. Within 40 days of spraying EZ3+ Coconut Formula, the black film cleared, palms regained lush green canopy, and nut formation improved noticeably.',
  },
  {
    id: 'rev-4',
    productId: 'mycoSpectra',
    name: 'M. Varghese',
    role: 'Spices & Horticulture Planter',
    location: 'Wayanad, Kerala',
    crop: 'Cardamom & Pepper',
    rating: 5,
    date: 'June 2026',
    verified: true,
    outcome: 'Complete Protection against Capsule Rot',
    headline: 'Myco Spectra controlled Phytophthora & Pythium during heavy monsoon',
    quote:
      'Fungal rot during monsoons used to wipe out our cardamom capsules. Myco Spectra gave us 6 months of systemic fungal control against Colletotrichum and Phytophthora. Our pods remained healthy and free of rot throughout the wet season.',
  },
  {
    id: 'rev-5',
    productId: 'soilAmend',
    name: 'P. Sundaram',
    role: 'Organic Farming Specialist',
    location: 'Dindigul, Tamil Nadu',
    crop: 'Vegetables & Nursery',
    rating: 5,
    date: 'May 2026',
    verified: true,
    outcome: 'Zero Nematode Damage & High Water Retention',
    headline: 'Transformed clay soil porosity and retained soil moisture through dry weeks',
    quote:
      'CraftDyne Soil Amend blocks built outstanding air porosity in our clay soil. Each 5kg block retains immense moisture so we water less often, and nematode damage in root zones has been completely eliminated.',
  },
  {
    id: 'rev-6',
    productId: 'ez3plus',
    name: 'Sunita & Ramesh Patel',
    role: 'Commercial Vegetable Growers',
    location: 'Nashik, Maharashtra',
    crop: 'Tomato & Chilli',
    rating: 5,
    date: 'July 2026',
    verified: true,
    outcome: 'Safe for Workers & Zero Harvest Wait',
    headline: '100% Non-toxic green chemistry with instant worker field re-entry',
    quote:
      'As commercial growers supplying retail markets, we needed effective pest control without chemical residues or worker safety hazards. EZ3+ Multi-Crop Concentrate deters whiteflies and aphids while being completely safe and eco-friendly.',
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
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-all ${
                selectedProduct === 'all'
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
                  className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-all ${
                    selectedProduct === p.id
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
