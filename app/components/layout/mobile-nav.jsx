import { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router';
import { Mail, MessageCircle, Phone, X } from 'lucide-react';

import { MAIN_NAV } from '../../config/nav.js';
import { CONTACT } from '../../config/contact.js';
import { useFocusTrap } from '../../hooks/use-focus-trap.js';
import { useLockBodyScroll } from '../../hooks/use-lock-body-scroll.js';
import { cn } from '../../lib/cn.js';
import { localePath, mailtoHref, telHref, whatsappHref } from '../../lib/links.js';
import { BrandMark } from './brand-mark.jsx';
import { LanguageSwitcher } from './language-switcher.jsx';

/**
 * Full-screen navigation drawer for phones and tablets.
 *
 * Deliberately full-screen rather than a narrow slide-over: at 320px a partial
 * panel leaves nav items cramped, and Tamil/Hindi labels are longer than their
 * English equivalents.
 */
export function MobileNav({ open, onClose, lang }) {
  const { t } = useTranslation();
  const panelRef = useRef(null);
  const close = useCallback(() => onClose(), [onClose]);

  useFocusTrap(panelRef, open, close);
  useLockBodyScroll(open);

  return (
    <div
      className={cn(
        // overflow-hidden matters: the panel parks off-screen via translate-x-full
        // when closed, and `overflow-x: hidden` on body does NOT clip fixed-position
        // descendants — so without this the closed drawer widens the document.
        'fixed inset-0 z-50 overflow-hidden xl:hidden',
        open ? 'pointer-events-auto' : 'pointer-events-none',
      )}
      // `inert` removes the closed drawer from both the tab order and the
      // accessibility tree without affecting the slide transition.
      inert={!open}
    >
      <div
        className={cn(
          'bg-navy-900/50 absolute inset-0 backdrop-blur-[2px] transition-opacity duration-300',
          open ? 'opacity-100' : 'opacity-0',
        )}
        onClick={close}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={t('nav.home')}
        tabIndex={-1}
        className={cn(
          'shadow-lift absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-white',
          'ease-out-soft transition-transform duration-300',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
          <BrandMark lang={lang} showTagline={false} />
          <button
            type="button"
            onClick={close}
            aria-label={t('actions.closeMenu')}
            className="text-navy-700 inline-flex size-11 items-center justify-center rounded-full transition-colors hover:bg-slate-100"
          >
            <X className="size-6" aria-hidden="true" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto overscroll-contain px-3 py-4">
          <ul className="flex flex-col gap-1">
            <li>
              <DrawerLink to={localePath(lang)} end onClick={close}>
                {t('nav.home')}
              </DrawerLink>
            </li>
            {MAIN_NAV.map((item) => (
              <li key={item.key}>
                <DrawerLink to={localePath(lang, item.path)} onClick={close}>
                  {t(item.labelKey)}
                </DrawerLink>
              </li>
            ))}
          </ul>

          <div className="mt-6 border-t border-slate-100 pt-5">
            <p className="font-display px-4 text-sm font-bold text-slate-500">{t('footer.getInTouch')}</p>
            <ul className="mt-2 flex flex-col gap-1">
              <li>
                <DrawerContact href={whatsappHref(t('whatsappMessage'))} icon={MessageCircle} external>
                  {t('actions.whatsapp')}
                </DrawerContact>
              </li>
              <li>
                <DrawerContact href={telHref} icon={Phone}>
                  {CONTACT.phoneDisplay}
                </DrawerContact>
              </li>
              <li>
                <DrawerContact href={mailtoHref} icon={Mail}>
                  {CONTACT.email}
                </DrawerContact>
              </li>
            </ul>
          </div>
        </nav>

        <div className="pb-safe border-t border-slate-100 px-3 py-3">
          <LanguageSwitcher lang={lang} />
        </div>
      </div>
    </div>
  );
}

function DrawerLink({ to, end, onClick, children }) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          'font-display text-fluid-lg flex min-h-12 items-center rounded-lg px-4 font-semibold transition-colors',
          isActive ? 'bg-brand-50 text-brand-800' : 'text-navy-700 hover:bg-slate-50',
        )
      }
    >
      {children}
    </NavLink>
  );
}

function DrawerContact({ href, icon: Icon, external, children }) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="text-navy-700 flex min-h-12 items-center gap-3 rounded-lg px-4 transition-colors hover:bg-slate-50"
    >
      <Icon className="text-brand-600 size-5 shrink-0" aria-hidden="true" />
      <span className="truncate">{children}</span>
    </a>
  );
}
