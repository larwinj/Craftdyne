import { useTranslation } from 'react-i18next';
import { ArrowRight, Leaf, Recycle, ShieldCheck, Sprout } from 'lucide-react';

import { localePath } from '../../lib/links.js';
import { Button } from '../ui/button.jsx';
import { Container } from '../ui/container.jsx';
import { Reveal } from '../ui/reveal.jsx';
import { Section } from '../ui/section.jsx';

/** "Who We Are" — the company statement from the brochure. */
export function Intro({ lang }) {
  const { t } = useTranslation('home');

  return (
    <Section tone="white">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-7">
          <p className="font-display text-brand-700 text-sm font-bold tracking-[0.14em] uppercase">
            {t('intro.eyebrow')}
          </p>
          <h2 className="text-fluid-3xl mt-3 text-balance">{t('intro.title')}</h2>
          <p className="text-fluid-lg mt-5 text-pretty text-slate-600">{t('intro.body')}</p>
          <Button to={localePath(lang, 'about')} variant="outline" className="mt-7">
            {t('intro.cta')}
            <ArrowRight className="size-5" aria-hidden="true" />
          </Button>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-5">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <MiniCard icon={Leaf} label={t('promise.items.innovation')} tone="brand" />
            <MiniCard icon={Recycle} label={t('promise.items.biodegradable')} tone="navy" />
            <MiniCard icon={ShieldCheck} label={t('promise.items.safe')} tone="navy" />
            <MiniCard icon={Sprout} label={t('promise.items.yield')} tone="brand" />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function MiniCard({ icon: Icon, label, tone }) {
  const brand = tone === 'brand';
  return (
    <div
      className={
        brand
          ? 'bg-brand-600 flex flex-col gap-3 rounded-2xl p-5 text-white'
          : 'bg-mist text-navy-700 ring-brand-100 flex flex-col gap-3 rounded-2xl p-5 ring-1'
      }
    >
      <Icon className={brand ? 'size-7 text-white' : 'text-brand-700 size-7'} aria-hidden="true" />
      <p className="font-display text-fluid-sm font-bold text-balance">{label}</p>
    </div>
  );
}

/** The closing promise strip from the brochure footer. */
export function PromiseStrip() {
  const { t } = useTranslation('home');
  const items = ['innovation', 'biodegradable', 'safe', 'yield'];

  return (
    <section className="bg-sand border-y border-slate-100 py-10 sm:py-12">
      <Container size="wide">
        <h2 className="text-fluid-2xl text-center text-balance">{t('promise.title')}</h2>
        <ul className="mt-8 grid gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((key) => (
            <li
              key={key}
              className="flex items-center gap-3 border-slate-200 lg:justify-center lg:border-l lg:first:border-l-0"
            >
              <span className="bg-brand-500 inline-flex size-2.5 shrink-0 rounded-full" aria-hidden="true" />
              <span className="font-display text-fluid-sm text-navy-700 font-semibold">
                {t(`promise.items.${key}`)}
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
