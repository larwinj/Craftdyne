import { useCallback, useSyncExternalStore } from 'react';

/**
 * Subscribe to a media query.
 *
 * Built on `useSyncExternalStore` rather than `useState` + `useEffect`: it gives
 * a correct server snapshot for prerendering, avoids a setState-in-effect
 * cascade, and never renders a stale value after hydration.
 *
 * The server snapshot is always `false`, so components must be written so that
 * the "no match" branch is the safe one to render first.
 */
export function useMediaQuery(query) {
  const subscribe = useCallback(
    (onChange) => {
      const list = window.matchMedia(query);
      list.addEventListener('change', onChange);
      return () => list.removeEventListener('change', onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}
