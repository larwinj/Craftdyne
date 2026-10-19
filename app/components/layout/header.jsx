import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation, Link } from 'react-router';
import { ChevronDown, Menu } from 'lucide-react';

import { MAIN_NAV } from '../../config/nav.js';
import { cn } from '../../lib/cn.js';
import { localePath } from '../../lib/links.js';
import { Button } from '../ui/button.jsx';
import { Container } from '../ui/container.jsx';
import { BrandMark } from './brand-mark.jsx';
import { LanguageSwitcher } from './language-switcher.jsx';
import { MobileNav } from './mobile-nav.jsx';

function FormattedNavLabel({ text, isTamil }) {
  if (!text) return null;
  if (!isTamil) {
    return <span className="whitespace-nowrap">{text}</span>;
  }
  const words = text.split(' ');
  if (words.length <= 1) {
    return <span className="block truncate">{text}</span>;
  }
  if (words.length === 2) {
    return (
      <span className="flex flex-col items-center leading-tight tracking-tighter">
        <span className="whitespace-nowrap">{words[0]}</span>
        <span className="whitespace-nowrap">{words[1]}</span>
      </span>
    );
  }
  const mid = Math.ceil(words.length / 2);
  const line1 = words.slice(0, mid).join(' ');
  const line2 = words.slice(mid).join(' ');
  return (
    <span className="flex flex-col items-center leading-tight tracking-tighter">
      <span className="whitespace-nowrap">{line1}</span>
      <span className="whitespace-nowrap">{line2}</span>
    </span>
  );
}

export function Header({ lang }) {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { pathname } = useLocation();

  const isTamil = lang === 'ta';

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenuOpen(false);
    setActiveDropdown(null);
  }

  return (
    <>
      <header
        className={cn(
          'ease-out-soft sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur-md transition-all duration-300',
          scrolled ? 'border-slate-200 shadow-xs' : 'border-slate-100',
        )}
      >
        <Container size="wide" className="px-3 sm:px-6 2xl:max-w-[92rem]">
          <div
            className={cn(
              'flex items-center justify-between gap-2 transition-all duration-300 xl:gap-3',
              scrolled ? 'py-1.5' : 'py-2 sm:py-2.5',
            )}
          >
            <div className="shrink-0">
              <BrandMark lang={lang} />
            </div>

            <nav aria-label="Main" className="hidden min-w-0 flex-1 px-1 xl:block">
              <ul
                className={cn('flex items-center justify-center', isTamil ? 'gap-0.5 2xl:gap-1.5' : 'gap-1 2xl:gap-3')}
              >
                {MAIN_NAV.map((item) => {
                  const hasChildren = item.children && item.children.length > 0;
                  const isOpen = activeDropdown === item.key;
                  const labelText = t(item.labelKey, item.key);

                  return (
                    <li
                      key={item.key}
                      className="group relative shrink-0"
                      onMouseEnter={() => hasChildren && setActiveDropdown(item.key)}
                      onMouseLeave={() => hasChildren && setActiveDropdown(null)}
                    >
                      <div className="flex items-center">
                        {item.external || (typeof item.path === 'string' && item.path.startsWith('http')) ? (
                          <a
                            href={item.path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                              'font-display relative inline-flex min-h-11 items-center gap-0.5 rounded-xl py-1 text-center font-extrabold transition-colors',
                              isTamil
                                ? 'px-1 text-[0.625rem] xl:px-1.5 xl:text-[0.6875rem] 2xl:px-2.5 2xl:text-[0.75rem]'
                                : 'px-1.5 text-xs xl:px-2.5 xl:text-[0.8125rem] 2xl:px-3 2xl:text-sm',
                              'text-navy-900 hover:text-brand-700',
                            )}
                          >
                            <FormattedNavLabel text={labelText} isTamil={isTamil} />
                          </a>
                        ) : (
                          <NavLink
                            to={localePath(lang, item.path)}
                            className={({ isActive }) =>
                              cn(
                                'font-display relative inline-flex min-h-11 items-center gap-0.5 rounded-xl py-1 text-center font-extrabold transition-colors',
                                isTamil
                                  ? 'px-1 text-[0.625rem] xl:px-1.5 xl:text-[0.6875rem] 2xl:px-2.5 2xl:text-[0.75rem]'
                                  : 'px-1.5 text-xs xl:px-2.5 xl:text-[0.8125rem] 2xl:px-3 2xl:text-sm',
                                'after:absolute after:inset-x-2 after:-bottom-0.5 after:h-0.5 after:rounded-full after:transition-colors',
                                isActive
                                  ? 'text-brand-700 after:bg-brand-600'
                                  : 'text-navy-900 hover:text-brand-700 after:bg-transparent',
                              )
                            }
                          >
                            <FormattedNavLabel text={labelText} isTamil={isTamil} />
                            {hasChildren ? (
                              <ChevronDown
                                className={cn(
                                  'ml-0.5 size-3.5 shrink-0 opacity-60 transition-transform duration-200',
                                  isOpen && 'text-brand-600 rotate-180 opacity-100',
                                )}
                                aria-hidden="true"
                              />
                            ) : null}
                          </NavLink>
                        )}
                      </div>

                      {hasChildren ? (
                        <div
                          className={cn(
                            'absolute top-full left-0 z-50 pt-2 transition-all duration-200',
                            isTamil ? 'w-80' : 'w-72',
                            isOpen
                              ? 'pointer-events-auto translate-y-0 opacity-100'
                              : 'pointer-events-none translate-y-2 opacity-0',
                          )}
                        >
                          <div className="rounded-xl border border-slate-200/80 bg-white p-2 shadow-xl ring-1 ring-slate-900/5 backdrop-blur-md">
                            <ul className="flex flex-col gap-0.5">
                              {item.children.map((sub) => (
                                <li key={sub.key}>
                                  <Link
                                    to={localePath(lang, sub.path)}
                                    onClick={() => setActiveDropdown(null)}
                                    className={cn(
                                      'hover:text-brand-700 flex items-center justify-between rounded-lg px-3 py-2 text-slate-700 transition-colors hover:bg-emerald-50',
                                      isTamil
                                        ? 'text-[0.6875rem] leading-snug font-semibold xl:text-xs'
                                        : 'text-xs font-semibold',
                                    )}
                                  >
                                    <span>{t(sub.labelKey, sub.fallbackLabel)}</span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
              <LanguageSwitcher lang={lang} />
              <Button
                to={localePath(lang, 'contact')}
                size="sm"
                className={cn(
                  'hidden min-h-10 shrink-0 py-2 font-bold xl:inline-flex',
                  isTamil ? 'px-2.5 text-[0.6875rem] xl:text-xs' : 'px-3.5 text-xs',
                )}
              >
                {t('actions.enquireShort')}
              </Button>

              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label={t('actions.openMenu')}
                aria-expanded={menuOpen}
                className="text-navy-700 inline-flex size-10 items-center justify-center rounded-full transition-colors hover:bg-slate-100 xl:hidden"
              >
                <Menu className="size-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </Container>
      </header>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} lang={lang} />
    </>
  );
}
