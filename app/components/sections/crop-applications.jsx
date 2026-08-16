import { useTranslation } from 'react-i18next';
import { ArrowRight, Sprout } from 'lucide-react';

import { CROPS } from '../../data/crops.js';
import { cn } from '../../lib/cn.js';
import { localePath } from '../../lib/links.js';
import { Button } from '../ui/button.jsx';
import { Section, SectionHeading } from '../ui/section.jsx';

export function CropApplications({ lang }) {
  const { t } = useTranslation('home');

  return (
    <Section tone="white">
      <SectionHeading eyebrow={t('crops.eyebrow')} title={t('crops.title')} description={t('crops.description')} />

      {/*
        On phones this is a horizontal scroll-snap rail: four tiles squeezed into
        320px would be unreadable, and a 1-column stack would push the rest of
        the page far down. From `sm` it becomes a normal grid.
        `-mx-5 px-5` lets the rail bleed to the screen edge so the next card
        peeks in, which is what signals that it scrolls.
      */}
      <ul className="-mx-5 mt-12 flex snap-x snap-mandatory [scrollbar-width:none] gap-4 overflow-x-auto px-5 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4 [&::-webkit-scrollbar]:hidden">
        {CROPS.map((crop) => (
          <li key={crop.id} className="xs:w-[65vw] w-[72vw] max-w-[17rem] shrink-0 snap-start sm:w-auto sm:max-w-none">
            <article className="group shadow-card h-full overflow-hidden rounded-2xl bg-white ring-1 ring-slate-100">
              <div className={cn('relative flex h-40 items-center justify-center bg-gradient-to-br', crop.accent)}>
                {/* TODO(client): licensed crop photography replaces this tile. */}
                <Sprout className="size-12 text-white/80" aria-hidden="true" />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,white,transparent_60%)] opacity-15"
                />
              </div>
              <div className="p-5">
                <h3 className="text-fluid-base">{t(`crops.items.${crop.id}.title`)}</h3>
                <p className="text-fluid-sm mt-1.5 text-slate-600">{t(`crops.items.${crop.id}.description`)}</p>
              </div>
            </article>
          </li>
        ))}
      </ul>

      <div className="mt-10 text-center">
        <Button to={localePath(lang, 'applications')} variant="outline">
          {t('crops.cta')}
          <ArrowRight className="size-5" aria-hidden="true" />
        </Button>
      </div>
    </Section>
  );
}
