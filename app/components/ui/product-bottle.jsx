import { useTranslation } from 'react-i18next';

import { cn } from '../../lib/cn.js';

/**
 * Ginkgo leaf from the EcoAgta mark.
 * TODO(client): replace with the supplied SVG logo.
 */
export function EcoAgtaLeaf({ className }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false" className={className}>
      <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 44V29" />
        <path d="M24 29c-9 0-15-4.6-15-11S15.4 5 24 5s15 6.6 15 13-6 11-15 11Z" />
        <path d="M24 29V6M18 28.2 14 8.4M30 28.2 34 8.4M13.2 26 10.5 12M34.8 26 37.5 12" />
      </g>
    </svg>
  );
}

/**
 * Vector stand-in for the EcoAgta EZ3+ bottle.
 *
 * The photograph supplied by the client is shot against a hard black vignette
 * that cannot sit on a white page, so this renders the pack cleanly and stays
 * crisp at any size. Label wording follows the printed label with its spelling
 * errors corrected — see CONTENT-TODO.md.
 *
 * Swap for the retouched photograph when it arrives; the surrounding layout
 * needs no changes.
 */
export function ProductBottle({ className }) {
  const { t } = useTranslation(['products', 'home']);

  return (
    <div className={cn('relative', className)}>
      <div
        aria-hidden="true"
        className="bg-navy-900/10 pointer-events-none absolute inset-x-6 top-10 bottom-0 rounded-[50%] blur-2xl"
      />

      {/*
        Exposed as a single image: this is a rendering of the physical pack, and
        its label text is duplicated as real content elsewhere on the page. Left
        as raw text it would be read out by screen readers as a stream of
        disconnected fragments, and its reproduced fine print would be held to
        body-text contrast rules that a photograph of the same bottle would not.
      */}
      <figure
        role="img"
        aria-label={t('ez3plus.name', { ns: 'products', defaultValue: 'EcoAgta EZ3+' })}
        className="relative mx-auto flex w-full max-w-[19rem] flex-col items-center"
      >
        {/* Cap */}
        <div className="h-9 w-24 rounded-t-lg bg-gradient-to-b from-slate-100 to-slate-300 shadow-sm" />
        <div className="h-3 w-28 rounded-sm bg-gradient-to-b from-slate-200 to-slate-300" />

        {/* Body */}
        <div className="shadow-lift relative w-full rounded-t-3xl rounded-b-2xl bg-gradient-to-br from-white via-slate-50 to-slate-200 px-4 pt-6 pb-7 ring-1 ring-slate-200/80">
          {/* Shoulder ribs, as on the moulded pack */}
          <div aria-hidden="true" className="absolute inset-x-6 top-2 space-y-1">
            <div className="h-0.5 rounded-full bg-slate-200/80" />
            <div className="h-0.5 rounded-full bg-slate-200/80" />
          </div>

          <div className="mt-3 rounded-lg bg-white px-3 py-4 text-center shadow-sm ring-1 ring-slate-200">
            <img
              src="/brand/ecoagta-logo.png"
              alt="EcoAgta — Proactive, Naturally"
              className="mx-auto h-16 w-auto object-contain rounded-sm"
            />

            <p className="font-display mt-3 text-2xl font-extrabold tracking-tight text-[#E8590C]">EZ3+</p>
            <p className="font-display text-navy-700 text-[0.6875rem] font-bold">CraftDyne Private Limited</p>
            <p className="text-[0.5625rem] text-slate-500">Dindigul, Tamil Nadu, India</p>

            <p className="font-display mt-2.5 text-[0.6875rem] font-bold text-[#C92A2A]">
              {t('ez3plus.kicker', { ns: 'products', defaultValue: 'Triple Acting Organic Farm Input' })}
            </p>

            <p className="mt-1.5 text-[0.5625rem] leading-snug text-slate-600">
              Prevents insects, worms and fungi. Promotes health, vigour, immunity and yield. Provides systemic
              protection against pathogens.
            </p>

            <p className="bg-navy-700 mt-2.5 rounded px-2 py-1.5 text-[0.5625rem] leading-snug font-bold text-amber-300">
              ZERO harm to air, water and soil.
              <br />
              ZERO harm to the food chain.
            </p>

            <p className="mt-2 text-[0.5rem] leading-snug text-slate-500">
              Non-toxic · Non-poisonous · Completely readily biodegradable · Made with Green Chemistry* principles
            </p>
            <p className="mt-1 text-[0.5rem] text-slate-400">* IUPAC Green Chemistry Principles</p>
          </div>
        </div>
      </figure>
    </div>
  );
}
