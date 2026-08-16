import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';
import { Check, Globe } from 'lucide-react';

import { LOCALE_LABELS, LOCALES } from '../../config/site.js';
import { useFocusTrap } from '../../hooks/use-focus-trap.js';
import { useLockBodyScroll } from '../../hooks/use-lock-body-scroll.js';
import { useMediaQuery } from '../../hooks/use-media-query.js';
import { cn } from '../../lib/cn.js';
import { swapLocale } from '../../lib/links.js';

/**
 * Language switcher.
 *
 * On phones the options open as a bottom sheet — a three-item dropdown makes for
 * poor touch targets, and a sheet puts them within thumb reach. From `md` up it
 * behaves as a conventional dropdown anchored under the button.
 *
 * The panel is rendered through a portal into `document.body`, which is not
 * optional: this component sits inside the site header, and that header carries
 * `backdrop-filter: blur()`. A non-`none` backdrop-filter makes an element a
 * containing block for its `position: fixed` descendants, so without the portal
 * the "full-screen" sheet anchors to the bottom of the 72px header instead of
 * the viewport, and renders across the top of the page.
 *
 * Because the panel is portalled it can no longer be positioned by an `absolute`
 * offset from the button, so the dropdown coordinates are measured from the
 * button when it opens and it closes on scroll or resize rather than drifting.
 */
export function LanguageSwitcher({ lang, tone = 'dark', className }) {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState(null);
  const panelRef = useRef(null);
  const buttonRef = useRef(null);

  const isDesktop = useMediaQuery('(min-width: 48rem)'); // md
  const close = useCallback(() => setOpen(false), []);

  useFocusTrap(panelRef, open, close);
  // Only the phone sheet covers the page, so only it should lock scrolling.
  useLockBodyScroll(open && !isDesktop);

  // Dismiss on outside click, and — for the anchored dropdown — on anything that
  // would move the button out from under it.
  useEffect(() => {
    if (!open) return undefined;

    function onPointerDown(event) {
      if (buttonRef.current?.contains(event.target)) return;
      if (panelRef.current?.contains(event.target)) return;
      close();
    }
    document.addEventListener('pointerdown', onPointerDown);

    if (!isDesktop) return () => document.removeEventListener('pointerdown', onPointerDown);

    window.addEventListener('scroll', close, { passive: true });
    window.addEventListener('resize', close);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('scroll', close);
      window.removeEventListener('resize', close);
    };
  }, [open, isDesktop, close]);

  function toggle() {
    if (!open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setAnchor({ top: rect.bottom + 8, right: Math.max(8, window.innerWidth - rect.right) });
    }
    setOpen((value) => !value);
  }

  function choose(next) {
    close();
    if (next === lang) return;

    // A full page load rather than a client-side navigation, deliberately.
    // The browser only ever holds one locale's translations, so switching
    // language has to fetch the new document. It also guarantees `<html lang>`,
    // the font stack and the meta tags all match the new language.
    window.location.assign(swapLocale(pathname, next));
  }

  const light = tone === 'light';

  const panel = (
    <>
      {/* Scrim, phone only — the dropdown does not dim the page. */}
      {!isDesktop ? (
        <div className="bg-navy-900/40 fixed inset-0 z-[90] backdrop-blur-[2px]" onClick={close} aria-hidden="true" />
      ) : null}

      <div
        ref={panelRef}
        role="listbox"
        aria-label={t('actions.selectLanguage')}
        tabIndex={-1}
        style={isDesktop && anchor ? { top: anchor.top, right: anchor.right } : undefined}
        className={cn(
          'shadow-lift z-[100] bg-white',
          isDesktop
            ? 'fixed w-56 rounded-xl p-2'
            : 'pb-safe fixed inset-x-0 bottom-0 max-h-[80dvh] overflow-y-auto rounded-t-2xl p-3',
        )}
      >
        <p className="font-display px-3 pt-1 pb-2 text-sm font-bold text-slate-500">{t('actions.selectLanguage')}</p>
        <ul className="flex flex-col gap-1">
          {LOCALES.map((code) => {
            const selected = code === lang;
            return (
              <li key={code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => choose(code)}
                  className={cn(
                    'flex min-h-12 w-full items-center justify-between gap-3 rounded-lg px-3 text-left transition-colors',
                    selected ? 'bg-brand-50 text-brand-800' : 'text-navy-700 hover:bg-slate-50',
                  )}
                >
                  <span className="flex flex-col leading-tight">
                    <span className="font-display font-semibold">{LOCALE_LABELS[code].native}</span>
                    <span className="text-xs text-slate-500">{LOCALE_LABELS[code].name}</span>
                  </span>
                  {selected ? <Check className="text-brand-600 size-5 shrink-0" aria-hidden="true" /> : null}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );

  return (
    <div className={cn('relative', className)}>
      <button
        ref={buttonRef}
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={t('actions.changeLanguage')}
        className={cn(
          'font-display inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-full px-2.5 text-sm font-semibold transition-colors sm:px-3',
          light
            ? 'text-white/90 hover:bg-white/10 hover:text-white'
            : 'text-navy-700 hover:bg-navy-50 hover:text-navy-800',
        )}
      >
        <Globe className="size-5 shrink-0" aria-hidden="true" />
        {/* `whitespace-nowrap` matters here: Tamil "தமிழ்" was breaking onto three
            stacked lines inside the flex header. The label itself is dropped
            below `xs` so the control still fits beside the logo at 320px. */}
        <span className="xs:inline hidden whitespace-nowrap">{LOCALE_LABELS[lang].native}</span>
      </button>

      {open && typeof document !== 'undefined' ? createPortal(panel, document.body) : null}
    </div>
  );
}
