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
export function PageHero({ lang, eyebrow, title, description, crumbs = [] }) {
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

        <div className="max-w-3xl">
          {eyebrow ? (
            <p className="font-display text-brand-700 text-sm font-bold tracking-[0.14em] uppercase">{eyebrow}</p>
          ) : null}
          <h1 className="text-fluid-4xl text-navy-700 mt-3 text-balance">{title}</h1>
          {description ? <p className="text-fluid-lg mt-5 text-pretty text-slate-600">{description}</p> : null}
        </div>
      </Container>

      <WaveDivider fill="fill-white" />
    </section>
  );
}
