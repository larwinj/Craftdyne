import { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, Link } from 'react-router';
import { ChevronDown, Mail, MessageCircle, Phone, X } from 'lucide-react';

import { MAIN_NAV } from '../../config/nav.js';
import { CONTACT } from '../../config/contact.js';
import { useFocusTrap } from '../../hooks/use-focus-trap.js';
import { useLockBodyScroll } from '../../hooks/use-lock-body-scroll.js';
import { cn } from '../../lib/cn.js';
import { localePath, mailtoHref, telHref, whatsappHref } from '../../lib/links.js';
import { BrandMark } from './brand-mark.jsx';
import { LanguageSwitcher } from './language-switcher.jsx';

export function MobileNav({ open, onClose, lang }) {
  const { t } = useTranslation();
  const panelRef = useRef(null);
  const [expandedKeys, setExpandedKeys] = useState({});
  const close = useCallback(() => onClose(), [onClose]);

  useFocusTrap(panelRef, open, close);
  useLockBodyScroll(open);

  function toggleExpand(key, e) {
    e.preventDefault();
    e.stopPropagation();
    setExpandedKeys((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 overflow-hidden xl:hidden',
        open ? 'pointer-events-auto' : 'pointer-events-none',
      )}
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
              <DrawerLink to={localePath(lang)} end onClick={close} isTamil={lang === 'ta'}>
                {t('nav.home')}
              </DrawerLink>
            </li>
            {MAIN_NAV.map((item) => {
              const hasChildren = item.children && item.children.length > 0;
              const isExpanded = !!expandedKeys[item.key];
              const isTamil = lang === 'ta';

              return (
                <li key={item.key} className="flex flex-col">
                  <div className="flex items-center justify-between">
                    <DrawerLink to={localePath(lang, item.path)} onClick={close} isTamil={isTamil} className="flex-1">
                      {t(item.labelKey, item.key)}
                    </DrawerLink>
                    {hasChildren ? (
                      <button
                        type="button"
                        onClick={(e) => toggleExpand(item.key, e)}
                        className="inline-flex size-11 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
                        aria-label="Toggle section menu"
                      >
                        <ChevronDown
                          className={cn('size-5 transition-transform duration-200', isExpanded && 'rotate-180 text-brand-600')}
                        />
                      </button>
                    ) : null}
                  </div>

                  {hasChildren && isExpanded ? (
                    <ul className="my-1 ml-4 flex flex-col gap-1 border-l-2 border-brand-100 pl-3">
                      {item.children.map((sub) => (
                        <li key={sub.key}>
                          <Link
                            to={localePath(lang, sub.path)}
                            onClick={close}
                            className={cn(
                              "flex min-h-10 items-center rounded-lg px-3 font-medium text-slate-600 transition-colors hover:bg-emerald-50 hover:text-brand-700",
                              isTamil ? "text-xs" : "text-sm"
                            )}
                          >
                            {t(sub.labelKey, sub.fallbackLabel)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              );
            })}
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

function DrawerLink({ to, end, onClick, className, children, isTamil }) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          'font-display flex min-h-12 items-center rounded-lg px-4 font-semibold transition-colors',
          isTamil ? 'text-sm sm:text-base' : 'text-fluid-lg',
          isActive ? 'bg-brand-50 text-brand-800' : 'text-navy-700 hover:bg-slate-50',
          className,
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
