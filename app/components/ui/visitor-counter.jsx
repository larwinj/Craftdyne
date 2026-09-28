import { useEffect, useState } from 'react';
import { Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const VISITOR_ID_KEY = 'craftdyne_visitor_id';
const LEGACY_KEYS = ['craftdyne_has_visited', 'craftdyne_real_visitors'];

/**
 * A random, anonymous ID per browser. The server counts distinct IDs, so
 * sending it on every page load is safe — only the first one ever counts.
 * Returns null when storage is unavailable; that browser is then shown the
 * count without being added to it, rather than counted on every visit.
 */
function getVisitorId() {
  try {
    LEGACY_KEYS.forEach((key) => localStorage.removeItem(key));
    let id = localStorage.getItem(VISITOR_ID_KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(VISITOR_ID_KEY, id);
    }
    return id;
  } catch {
    return null;
  }
}

// One request per page load, shared by every mount (StrictMode, route changes).
let countRequest;

function loadVisitorCount() {
  countRequest ??= (async () => {
    // Automated browsers (our own Playwright audits included) only read.
    const id = navigator.webdriver ? null : getVisitorId();
    const res = await fetch(
      '/api/visitors',
      id
        ? {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
          }
        : undefined,
    );
    if (!res.ok) throw new Error(`Visitor counter responded ${res.status}`);
    const { count } = await res.json();
    if (!Number.isSafeInteger(count) || count < 0) throw new Error('Invalid visitor count');
    return count;
  })().catch((err) => {
    countRequest = undefined; // let a later mount retry
    throw err;
  });
  return countRequest;
}

export function VisitorCounter({ className = '' }) {
  const { t, i18n } = useTranslation();
  const [state, setState] = useState({ status: 'loading', count: null });

  useEffect(() => {
    let active = true;
    loadVisitorCount().then(
      (count) => active && setState({ status: 'ready', count }),
      (err) => {
        console.warn('Visitor counter unavailable:', err);
        if (active) setState({ status: 'error', count: null });
      },
    );
    return () => {
      active = false;
    };
  }, []);

  // Never show a made-up number: if the real count can't be loaded, hide the badge.
  if (state.status === 'error') return null;

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
        <span>{t('footer.visitors')}:</span>
        {state.status === 'loading' ? (
          <span className="h-4 w-8 animate-pulse rounded bg-white/20" aria-hidden="true"></span>
        ) : (
          <span className="font-display font-bold tracking-wide text-white">
            {state.count.toLocaleString(`${i18n.language}-IN`)}
          </span>
        )}
      </div>
    </div>
  );
}
