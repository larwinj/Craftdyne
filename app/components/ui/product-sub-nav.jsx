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
      { rootMargin: '-20% 0px -60% 0px' }
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
    <div className="sticky top-[3.5rem] sm:top-[4.2rem] z-30 w-full border-b border-emerald-100/80 bg-white/95 backdrop-blur-md shadow-xs transition-all">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2 sm:py-2.5">
          <div className="flex items-center gap-2 shrink-0">
            <span className="inline-flex size-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs">
              <Layers className="size-4" />
            </span>
            <span className="font-display text-xs font-extrabold uppercase tracking-wider text-slate-500 hidden sm:inline-block">
              {t('productSubNav.title', 'Product Navigation')}
            </span>
          </div>

          {/* Desktop Pill Buttons */}
          <nav aria-label="Product Sections" className="hidden md:flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 ml-4">
            {sections.map((sec) => {
              const isActive = activeId === sec.id;
              const Icon = sec.icon;
              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => scrollTo(sec.id)}
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all duration-200 cursor-pointer whitespace-nowrap',
                    isActive
                      ? 'bg-brand-600 text-white shadow-xs scale-102'
                      : 'bg-slate-100/90 text-slate-700 hover:bg-emerald-50 hover:text-brand-700'
                  )}
                >
                  {Icon ? <Icon className="size-3.5" /> : null}
                  <span>{sec.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Mobile Dropdown Button */}
          <div className="relative md:hidden flex-1 max-w-[220px] ml-auto">
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-navy-900 shadow-2xs transition-colors hover:bg-slate-100"
            >
              <span className="truncate flex items-center gap-1.5">
                {currentSection.icon ? <currentSection.icon className="size-3.5 text-brand-600 shrink-0" /> : null}
                {currentSection.label}
              </span>
              <ChevronDown className={cn('size-4 text-slate-500 transition-transform duration-200 ml-1 shrink-0', dropdownOpen && 'rotate-180')} />
            </button>

            {dropdownOpen ? (
              <div className="absolute right-0 top-full mt-1.5 w-60 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl ring-1 ring-slate-900/5 backdrop-blur-md">
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
                            isActive ? 'bg-emerald-50 text-brand-700' : 'text-slate-700 hover:bg-slate-50'
                          )}
                        >
                          {Icon ? <Icon className="size-3.5 text-brand-600 shrink-0" /> : null}
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
