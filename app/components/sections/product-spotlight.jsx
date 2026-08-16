import { useTranslation } from 'react-i18next';
import { ArrowRight, Check } from 'lucide-react';

import { FEATURED_PRODUCT } from '../../data/products.js';
import { localePath } from '../../lib/links.js';
import { Button } from '../ui/button.jsx';
import { Container } from '../ui/container.jsx';
import { EcoAgtaLeaf } from '../ui/product-bottle.jsx';
import { Reveal } from '../ui/reveal.jsx';

const BENEFIT_KEYS = ['whiteflies', 'sootyMold', 'growth', 'productivity', 'safety'];
const TRIPLE_ACTION_KEYS = ['deter', 'prevent', 'promote'];

export function ProductSpotlight({ lang }) {
  const { t } = useTranslation(['home', 'common']);

  return (
    <section className="bg-navy-700 py-14 text-white sm:py-20 lg:py-24">
      <Container size="wide">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal>
            <p className="font-display text-brand-200 text-sm font-bold tracking-[0.14em] uppercase">
              {t('product.eyebrow')}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <EcoAgtaLeaf className="text-brand-300 size-9" />
              <h2 className="text-fluid-3xl text-white">
                <span className="text-brand-300">EcoAgta</span> EZ3+
              </h2>
            </div>

            <p className="bg-brand-600 font-display mt-3 inline-block rounded-full px-4 py-1.5 text-sm font-bold">
              {t('product.kicker')}
            </p>

            <p className="text-fluid-lg mt-5 max-w-xl text-pretty text-white/80">{t('product.description')}</p>

            <ul className="mt-7 flex flex-col gap-3">
              {BENEFIT_KEYS.map((key) => (
                <li key={key} className="flex items-start gap-3">
                  <span className="bg-brand-500 mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full">
                    <Check className="size-4 text-white" aria-hidden="true" />
                  </span>
                  <span className="text-white/90">{t(`product.benefits.${key}`)}</span>
                </li>
              ))}
            </ul>

            <div className="xs:flex-row xs:flex-wrap mt-8 flex flex-col gap-3">
              <Button to={localePath(lang, FEATURED_PRODUCT.slug)} variant="white" size="lg">
                {t('product.cta')}
                <ArrowRight className="size-5" aria-hidden="true" />
              </Button>
              <Button
                to={localePath(lang, 'contact')}
                size="lg"
                className="border-2 border-white/30 bg-transparent hover:bg-white/10"
              >
                {t('product.enquiryCta')}
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="order-first lg:order-last">
            <div className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 sm:p-8">
              <h3 className="text-fluid-xl text-white">{t('product.tripleAction.title')}</h3>

              <ol className="mt-6 flex flex-col gap-4">
                {TRIPLE_ACTION_KEYS.map((key, index) => (
                  <li key={key} className="relative flex gap-4">
                    {/* Connector between steps, hidden on the last one. */}
                    {index < TRIPLE_ACTION_KEYS.length - 1 ? (
                      <span
                        aria-hidden="true"
                        className="from-brand-400/60 absolute top-12 left-6 h-[calc(100%-1rem)] w-px bg-gradient-to-b to-transparent"
                      />
                    ) : null}
                    <span className="bg-brand-700 font-display text-fluid-base relative inline-flex size-12 shrink-0 items-center justify-center rounded-full font-extrabold text-white">
                      {t(`product.tripleAction.steps.${key}.step`)}
                    </span>
                    <div className="min-w-0 pt-1">
                      <h4 className="font-display text-fluid-base font-bold text-white">
                        {t(`product.tripleAction.steps.${key}.title`)}
                      </h4>
                      <p className="text-fluid-sm mt-1 text-white/70">
                        {t(`product.tripleAction.steps.${key}.description`)}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              <p className="mt-7 border-t border-white/10 pt-5 text-xs text-white/70">{t('common:disclaimer.short')}</p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
