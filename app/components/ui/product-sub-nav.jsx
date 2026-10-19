import { useEffect, useState } from 'react';
import { ChevronDown, Layers } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../lib/cn.js';

export function ProductSubNav({ sections = [] }) {
  const { t } = useTranslation(['products', 'common']);
  const [activeId, setActiveId] = useState(sections[0]?.id || 'overview');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px' },
    );

    sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const scrollTo = (id) => {
    setDropdownOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -110;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveId(id);
    }
  };

  if (sections.length === 0) return null;

  const currentSection = sections.find((s) => s.id === activeId) || sections[0];

  return (
    <div className="sticky top-[3.5rem] z-30 w-full border-b border-emerald-100/80 bg-white/95 shadow-xs backdrop-blur-md transition-all sm:top-[4.2rem]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2 sm:py-2.5">
          <div className="flex shrink-0 items-center gap-2">
            <span className="inline-flex size-7 items-center justify-center rounded-lg bg-emerald-100 text-xs font-bold text-emerald-800">
              <Layers className="size-4" />
            </span>
            <span className="font-display hidden text-xs font-extrabold tracking-wider text-slate-500 uppercase sm:inline-block">
              {t('productSubNav.title', 'Product Navigation')}
            </span>
          </div>

          {/* Desktop Pill Buttons */}
          <nav
            aria-label="Product Sections"
            className="no-scrollbar ml-4 hidden items-center gap-1.5 overflow-x-auto py-0.5 md:flex"
          >
            {sections.map((sec) => {
              const isActive = activeId === sec.id;
              const Icon = sec.icon;
              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => scrollTo(sec.id)}
                  className={cn(
                    'inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold whitespace-nowrap transition-all duration-200',
                    isActive
                      ? 'bg-brand-600 scale-102 text-white shadow-xs'
                      : 'hover:text-brand-700 bg-slate-100/90 text-slate-700 hover:bg-emerald-50',
                  )}
                >
                  {Icon ? <Icon className="size-3.5" /> : null}
                  <span>{sec.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Mobile Dropdown Button */}
          <div className="relative ml-auto max-w-[220px] flex-1 md:hidden">
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="text-navy-900 flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold shadow-2xs transition-colors hover:bg-slate-100"
            >
              <span className="flex items-center gap-1.5 truncate">
                {currentSection.icon ? <currentSection.icon className="text-brand-600 size-3.5 shrink-0" /> : null}
                {currentSection.label}
              </span>
              <ChevronDown
                className={cn(
                  'ml-1 size-4 shrink-0 text-slate-500 transition-transform duration-200',
                  dropdownOpen && 'rotate-180',
                )}
              />
            </button>

            {dropdownOpen ? (
              <div className="absolute top-full right-0 mt-1.5 w-60 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl ring-1 ring-slate-900/5 backdrop-blur-md">
                <ul className="flex flex-col gap-1">
                  {sections.map((sec) => {
                    const isActive = activeId === sec.id;
                    const Icon = sec.icon;
                    return (
                      <li key={sec.id}>
                        <button
                          type="button"
                          onClick={() => scrollTo(sec.id)}
                          className={cn(
                            'flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-bold transition-colors',
                            isActive ? 'text-brand-700 bg-emerald-50' : 'text-slate-700 hover:bg-slate-50',
                          )}
                        >
                          {Icon ? <Icon className="text-brand-600 size-3.5 shrink-0" /> : null}
                          <span>{sec.label}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
