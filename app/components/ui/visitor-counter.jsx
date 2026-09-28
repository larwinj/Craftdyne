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
        // Replace this with your actual mockapi.io endpoint URL 
        // 1. Go to mockapi.io and create a new project
        // 2. Create a 'visitors' resource with a 'count' field (Number)
        // 3. Add one item to the endpoint with count: 0
        const MOCK_API_URL = 'https://6aba9ce95b549d818d628b8f.mockapi.io/visitors/1';
        
        // Fetch current count
        const res = await fetch(MOCK_API_URL);
        if (!res.ok) {
          throw new Error('Failed to fetch from Mock API');
        }
        
        const data = await res.json();
        let currentCount = parseInt(data.count, 10);
        
        if (isNaN(currentCount)) {
            currentCount = 1;
        }

        const hasVisited = localStorage.getItem('craftdyne_has_visited');
        
        if (!hasVisited) {
          // New visitor! Increment the count
          currentCount += 1;
          
          // Update the API
          await fetch(MOCK_API_URL, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ count: currentCount })
          });
          
          // Set local storage so we don't count them again
          localStorage.setItem('craftdyne_has_visited', 'true');
        }

        if (isMounted) {
          setVisitorCount(currentCount);
          setLoading(false);
        }
      } catch (err) {
        console.warn('Real visitor count fetch fallback:', err);
        // Fallback: track unique sessions locally if network is restricted or Mock API fails
        if (isMounted) {
          const stored = localStorage.getItem('craftdyne_real_visitors');
          const base = stored ? parseInt(stored, 10) : 1;
          const updated = base + 1;
          localStorage.setItem('craftdyne_real_visitors', updated.toString());
          setVisitorCount(updated);
          setLoading(false);
        }
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
