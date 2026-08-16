import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation } from 'react-router';
import { Menu } from 'lucide-react';

import { MAIN_NAV } from '../../config/nav.js';
import { cn } from '../../lib/cn.js';
import { localePath } from '../../lib/links.js';
import { Button } from '../ui/button.jsx';
import { Container } from '../ui/container.jsx';
import { BrandMark } from './brand-mark.jsx';
import { LanguageSwitcher } from './language-switcher.jsx';
import { MobileNav } from './mobile-nav.jsx';

export function Header({ lang }) {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  // Condense the header once the visitor scrolls, reclaiming vertical space on
  // short phone screens.
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the drawer whenever the route changes, including on browser
  // back/forward. Adjusting state during render rather than in an effect keeps
  // this to a single render pass — an effect would paint the new page with the
  // drawer still open, then close it.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenuOpen(false);
  }

  return (
    <>
      <header
        className={cn(
          'ease-out-soft sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur transition-all duration-300',
          scrolled ? 'border-slate-200 shadow-sm' : 'border-transparent',
        )}
      >
        {/* Wider than the standard container on very large screens: at 2xl the
            tagline returns and the nav type steps up, which leaves the Tamil
            header with no slack inside a 1280px shell. */}
        <Container size="wide" className="2xl:max-w-[88rem]">
          {/*
            Height is driven by the logo's own size (via padding), not a fixed
            h-* class — BrandMark now renders the client's real logo file at a
            size where its baked-in tagline stays legible (their explicit
            request), so the bar has to grow to fit it rather than the image
            being shrunk to fit a fixed bar. Only the padding condenses on
            scroll; the logo itself is never shrunk further, or the tagline
            baked into it would go straight back to being illegible.
          */}
          <div
            className={cn(
              'flex items-center justify-between gap-2 transition-all duration-300 xl:gap-3',
              scrolled ? 'py-1.5' : 'py-2.5 sm:py-3',
            )}
          >
            <BrandMark lang={lang} />

            {/* The desktop nav appears at xl, not lg: six Tamil or Hindi nav
                labels plus the CTA overflow a 1024px header, so iPad landscape
                uses the drawer in every language rather than only some. */}
            <nav aria-label="Main" className="hidden xl:block">
              <ul className="flex items-center gap-1 2xl:gap-2">
                {MAIN_NAV.map((item) => (
                  <li key={item.key}>
                    <NavLink
                      to={localePath(lang, item.path)}
                      className={({ isActive }) =>
                        cn(
                          'font-display relative inline-flex min-h-11 items-center rounded-lg px-3 text-[0.8125rem] font-semibold whitespace-nowrap transition-colors 2xl:px-4 2xl:text-[0.875rem]',
                          'after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:rounded-full after:transition-colors',
                          isActive
                            ? 'text-brand-700 after:bg-brand-600'
                            : 'text-navy-700 hover:text-brand-700 after:bg-transparent',
                        )
                      }
                    >
                      {t(item.labelKey)}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-1 sm:gap-2">
              {/* Visible at every width. On a site whose whole purpose is being
                  readable in three languages, burying the switcher inside the
                  menu on phones is the wrong trade — most of this audience is
                  on a phone. */}
              <LanguageSwitcher lang={lang} />
              <Button to={localePath(lang, 'contact')} size="sm" className="hidden xl:inline-flex">
                {t('actions.enquireShort')}
              </Button>

              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label={t('actions.openMenu')}
                aria-expanded={menuOpen}
                className="text-navy-700 inline-flex size-11 items-center justify-center rounded-full transition-colors hover:bg-slate-100 xl:hidden"
              >
                <Menu className="size-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </Container>
      </header>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} lang={lang} />
    </>
  );
}
