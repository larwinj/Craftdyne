import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { ChevronRight } from 'lucide-react';

import { localePath } from '../../lib/links.js';
import { Container } from '../ui/container.jsx';
import { WaveDivider } from '../ui/wave-divider.jsx';

/**
 * Standard header for inner pages.
 *
 * `crumbs` is [{ label, path }] without the locale prefix; the final entry is
 * rendered as the current page and is not a link.
 */
export function PageHero({ lang, eyebrow, title, description, crumbs = [], image }) {
  const { t } = useTranslation();

  return (
    <section className="from-mist relative overflow-hidden bg-gradient-to-b to-white">
      <div
        aria-hidden="true"
        className="bg-brand-200/25 pointer-events-none absolute -top-24 -right-16 size-80 rounded-full blur-3xl"
      />

      <Container size="wide" className="relative pt-8 pb-14 sm:pt-10 sm:pb-16">
        {crumbs.length > 0 ? (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="text-fluid-sm flex flex-wrap items-center gap-x-1 gap-y-1 text-slate-600">
              <li>
                <Link to={localePath(lang)} className="hover:text-brand-700 rounded px-1 py-1">
                  {t('nav.home')}
                </Link>
              </li>
              {crumbs.map((crumb, index) => {
                const last = index === crumbs.length - 1;
                return (
                  <li key={crumb.label} className="flex items-center gap-1">
                    <ChevronRight className="size-4 shrink-0 text-slate-300" aria-hidden="true" />
                    {last ? (
                      <span aria-current="page" className="text-navy-700 px-1 py-1 font-medium">
                        {crumb.label}
                      </span>
                    ) : (
                      <Link to={localePath(lang, crumb.path)} className="hover:text-brand-700 rounded px-1 py-1">
                        {crumb.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        ) : null}

        {image ? (
          <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              {eyebrow ? (
                <p className="font-display text-brand-700 text-sm font-bold tracking-[0.14em] uppercase">{eyebrow}</p>
              ) : null}
              <h1 className="text-fluid-4xl text-navy-700 mt-3 font-extrabold text-balance">{title}</h1>
              {description ? (
                <p className="text-fluid-lg mt-5 leading-relaxed text-pretty text-slate-600">{description}</p>
              ) : null}
            </div>

            <div className="lg:col-span-5">
              <div className="group shadow-card relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/70 p-2 backdrop-blur-xs transition-all duration-300 hover:shadow-lg">
                {/* Soft gradient fade along the edge facing the text on desktop */}
                <div
                  aria-hidden="true"
                  className="from-mist/95 via-mist/50 pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-20 bg-gradient-to-r to-transparent lg:block"
                />
                <img
                  src={image.src || image}
                  alt={image.alt || (typeof title === 'string' ? title : 'EcoAgta Products')}
                  className="h-auto max-h-[340px] w-full rounded-xl object-cover transition-transform duration-500 group-hover:scale-[1.02] lg:[mask-image:linear-gradient(to_right,rgba(0,0,0,0.5),black_18%,black)] lg:[-webkit-mask-image:linear-gradient(to_right,rgba(0,0,0,0.5),black_18%,black)]"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl">
            {eyebrow ? (
              <p className="font-display text-brand-700 text-sm font-bold tracking-[0.14em] uppercase">{eyebrow}</p>
            ) : null}
            <h1 className="text-fluid-4xl text-navy-700 mt-3 text-balance">{title}</h1>
            {description ? <p className="text-fluid-lg mt-5 text-pretty text-slate-600">{description}</p> : null}
          </div>
        )}
      </Container>

      <WaveDivider fill="fill-white" />
    </section>
  );
}
