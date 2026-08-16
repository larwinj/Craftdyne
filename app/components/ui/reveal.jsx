import { useEffect, useRef } from 'react';

/**
 * Scroll-reveal wrapper: a short fade-and-rise the first time an element scrolls
 * into view.
 *
 * Implemented with IntersectionObserver driving a `data-reveal` attribute, with
 * the animation itself in CSS (see `app.css`). Two reasons for that shape:
 *
 * - No animation library. Framer Motion costs ~38KB gzipped on the initial
 *   route, a poor trade for one fade on a mid-range Android over mobile data.
 * - No React state. Toggling state from an effect would re-render every revealed
 *   element twice; writing an attribute is exactly the "synchronise with an
 *   external system" case effects exist for.
 *
 * The hidden state is applied by the effect, never in the server-rendered
 * markup, so with JavaScript disabled — or before hydration on a slow
 * connection — content is simply visible rather than stuck at opacity 0.
 */
export function Reveal({ children, delay = 0, className, as: Tag = 'div' }) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') return undefined;

    node.dataset.reveal = 'pending';

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.dataset.reveal = 'shown';
            observer.disconnect();
          }
        }
      },
      { rootMargin: '0px 0px -60px 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={className} style={delay ? { transitionDelay: `${delay}s` } : undefined}>
      {children}
    </Tag>
  );
}
