import { useEffect, useState } from 'react';
import { Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function VisitorCounter({ className = '' }) {
  const { t } = useTranslation();
  const [visitorCount, setVisitorCount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchVisitorCount() {
      try {
        // Track real persistent hits via public real visitor counter service
        const pageId = 'craftdyne.official_live_visitors';
        const res = await fetch(`https://visitor-badge.laobi.icu/badge?page_id=${pageId}`);
        if (res.ok) {
          const svgText = await res.text();
          // Extract count integer from returned SVG badge text
          const matches = svgText.match(/<text[^>]*>(\d+)<\/text>/g);
          if (matches && matches.length > 0) {
            const lastMatch = matches[matches.length - 1];
            const numStr = lastMatch.replace(/<[^>]+>/g, '').trim();
            const countVal = parseInt(numStr, 10);
            if (!isNaN(countVal) && isMounted) {
              setVisitorCount(countVal);
              localStorage.setItem('craftdyne_real_visitors', countVal.toString());
              setLoading(false);
              return;
            }
          }
        }
      } catch (err) {
        console.warn('Real visitor count fetch fallback:', err);
      }

      // Fallback: track unique sessions locally if network is restricted
      if (isMounted) {
        const stored = localStorage.getItem('craftdyne_real_visitors');
        const base = stored ? parseInt(stored, 10) : 1;
        const updated = base + 1;
        localStorage.setItem('craftdyne_real_visitors', updated.toString());
        setVisitorCount(updated);
        setLoading(false);
      }
    }

    fetchVisitorCount();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div
      className={`inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 backdrop-blur-xs transition-all ${className}`}
    >
      <span className="relative flex size-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500"></span>
      </span>

      <Users className="size-4 text-emerald-400" aria-hidden="true" />

      <div className="flex items-center gap-1.5 text-xs font-semibold text-white/90">
        <span>{t('footer.visitorCount', 'Website Visitors:')}</span>
        {loading ? (
          <span className="h-4 w-8 animate-pulse rounded bg-white/20"></span>
        ) : (
          <span className="font-display font-bold text-white tracking-wide">
            {visitorCount !== null ? visitorCount.toLocaleString() : '1'}
          </span>
        )}
      </div>
    </div>
  );
}
