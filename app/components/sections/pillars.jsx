import { useTranslation } from 'react-i18next';

import { OFFERINGS, PILLARS } from '../../data/pillars.js';
import { Section, SectionHeading } from '../ui/section.jsx';
import { Reveal } from '../ui/reveal.jsx';

/** "Why CraftDyne?" — the six brand pillars. */
export function Pillars() {
  const { t } = useTranslation('home');

  return (
    <Section tone="mist">
      <SectionHeading eyebrow={t('pillars.eyebrow')} title={t('pillars.title')} />

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PILLARS.map((pillar, index) => {
          const Icon = pillar.icon;
          return (
            <Reveal as="li" key={pillar.id} delay={index * 0.05}>
              <div className="shadow-card flex h-full flex-col rounded-2xl bg-white p-6 ring-1 ring-slate-100">
                <span className="bg-brand-50 text-brand-700 inline-flex size-12 items-center justify-center rounded-xl">
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <h3 className="text-fluid-lg mt-4">{t(`pillars.items.${pillar.id}.title`)}</h3>
                <p className="text-fluid-sm mt-2 text-slate-600">{t(`pillars.items.${pillar.id}.description`)}</p>
              </div>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}

/** "What We Offer" — the five capability statements. */
export function Offerings() {
  const { t } = useTranslation('home');

  return (
    <Section tone="white">
      <SectionHeading eyebrow={t('offerings.eyebrow')} title={t('offerings.title')} />

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {OFFERINGS.map((offering, index) => {
          const Icon = offering.icon;
          return (
            <Reveal as="li" key={offering.id} delay={index * 0.05}>
              <div className="hover:shadow-card flex h-full gap-4 rounded-2xl border border-slate-100 p-6 transition-shadow">
                <span className="bg-brand-600 inline-flex size-11 shrink-0 items-center justify-center rounded-full text-white">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-fluid-base font-semibold">{t(`offerings.items.${offering.id}.title`)}</h3>
                  <p className="text-fluid-sm mt-1.5 text-slate-600">
                    {t(`offerings.items.${offering.id}.description`)}
                  </p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
