import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';

import { LOCALE_LABELS, LOCALES } from '../../config/site.js';
import { cn } from '../../lib/cn.js';
import { swapLocale } from '../../lib/links.js';

export function LanguageSwitcher({ lang, tone = 'dark', className }) {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  function choose(next) {
    if (next === lang) return;
    window.location.assign(swapLocale(pathname, next));
  }

  const light = tone === 'light';

  return (
    <div
      className={cn(
        'inline-flex shrink-0 items-center gap-0.5 rounded-full p-0.5 transition-all',
        light ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-700 ring-1 ring-slate-200/60',
        className,
      )}
      role="group"
      aria-label={t('actions.selectLanguage', 'Select language')}
    >
      {LOCALES.map((code) => {
        const selected = code === lang;
        const label = LOCALE_LABELS[code];

        return (
          <button
            key={code}
            type="button"
            onClick={() => choose(code)}
            aria-pressed={selected}
            aria-label={`Switch to ${label.name}`}
            className={cn(
              'relative rounded-full px-2 py-0.5 font-bold tracking-tight transition-all duration-200 focus:outline-none sm:px-2.5',
              code === 'ta' ? 'text-[0.625rem] sm:text-[0.6875rem]' : 'text-[0.6875rem] sm:text-xs',
              selected
                ? light
                  ? 'bg-white text-navy-900 shadow-xs'
                  : 'bg-emerald-600 text-white shadow-xs'
                : light
                  ? 'text-white/80 hover:bg-white/10 hover:text-white'
                  : 'text-slate-600 hover:bg-slate-200/70 hover:text-slate-900',
            )}
          >
            <span className="font-display leading-tight">{label.native}</span>
          </button>
        );
      })}
    </div>
  );
}
