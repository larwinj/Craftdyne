import { useTranslation } from 'react-i18next';
import { ArrowRight, MessageCircle } from 'lucide-react';

import { FEATURED_PRODUCT } from '../../data/products.js';
import { localePath, whatsappHref } from '../../lib/links.js';
import { Button } from '../ui/button.jsx';
import { Container } from '../ui/container.jsx';
import { ProductBottle } from '../ui/product-bottle.jsx';
import { WaveDivider } from '../ui/wave-divider.jsx';

export function Hero({ lang }) {
  const { t } = useTranslation(['home', 'common']);

  return (
    <section className="from-mist relative overflow-hidden bg-gradient-to-b via-white to-white">
      {/* Soft organic wash behind the content — decorative only. */}
      <div
        aria-hidden="true"
        className="bg-brand-200/30 pointer-events-none absolute -top-32 -right-24 size-[28rem] rounded-full blur-3xl"
      />
      <div
        aria-hidden="true"
        className="bg-leaf/20 pointer-events-none absolute -bottom-40 -left-32 size-[26rem] rounded-full blur-3xl"
      />

      <Container size="wide" className="relative pt-12 pb-16 sm:pt-16 lg:pt-20 lg:pb-24">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <p className="font-display text-brand-700 text-sm font-bold tracking-[0.14em] uppercase">
              {t('hero.eyebrow')}
            </p>

            <h1 className="text-fluid-4xl text-navy-700 mt-4 text-balance">{t('hero.title')}</h1>

            <p className="text-fluid-lg mt-5 max-w-xl text-pretty text-slate-600">{t('hero.subtitle')}</p>

            {/* The brochure's headline claim, given the same prominence here. */}
            <div className="bg-brand-600 shadow-card mt-7 inline-flex flex-wrap items-baseline gap-x-2 gap-y-1 rounded-2xl px-5 py-3.5 text-white">
              <span className="font-display text-fluid-lg font-semibold">{t('hero.claimLead')}</span>
              <span className="font-display text-fluid-xl font-extrabold tracking-tight">
                {t('hero.claimHighlight')}
              </span>
            </div>

            <div className="xs:flex-row xs:flex-wrap mt-8 flex flex-col gap-3">
              <Button to={localePath(lang, FEATURED_PRODUCT.slug)} size="lg" className="xs:w-auto">
                {t('hero.primaryCta')}
                <ArrowRight className="size-5" aria-hidden="true" />
              </Button>
              <Button href={whatsappHref(t('common:whatsappMessage'))} variant="outline" size="lg">
                <MessageCircle className="size-5" aria-hidden="true" />
                {t('hero.secondaryCta')}
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <ProductBottle image={FEATURED_PRODUCT.image} alt={FEATURED_PRODUCT.name} className="mx-auto max-w-xs sm:max-w-sm lg:max-w-none" />
          </div>
        </div>
      </Container>

      <WaveDivider fill="fill-white" />
    </section>
  );
}
