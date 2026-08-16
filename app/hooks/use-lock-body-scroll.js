import { useEffect } from 'react';

/**
 * Freeze background scrolling while an overlay is open.
 *
 * `position: fixed` is used rather than `overflow: hidden` because iOS Safari
 * ignores the latter on `body` and happily scrolls the page behind the drawer.
 * The scroll offset is captured and restored so closing the overlay does not
 * jump the visitor back to the top.
 */
export function useLockBodyScroll(locked) {
  useEffect(() => {
    if (!locked) return undefined;

    const { body } = document;
    const scrollY = window.scrollY;
    const previous = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      overflowY: body.style.overflowY,
    };

    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.width = '100%';
    body.style.overflowY = 'scroll'; // keep the scrollbar gutter, avoids a width jump

    return () => {
      body.style.position = previous.position;
      body.style.top = previous.top;
      body.style.width = previous.width;
      body.style.overflowY = previous.overflowY;
      window.scrollTo(0, scrollY);
    };
  }, [locked]);
}
