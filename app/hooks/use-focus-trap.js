import { useEffect } from 'react';

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

/**
 * Trap Tab focus inside an open overlay, close it on Escape, and hand focus
 * back to whatever opened it.
 *
 * Without this, tabbing out of an open drawer walks invisibly through the page
 * behind it — the classic keyboard and screen-reader failure for mobile menus.
 *
 * @param {{current: HTMLElement|null}} ref   container element
 * @param {boolean} active                    whether the overlay is open
 * @param {() => void} onClose                called on Escape
 */
export function useFocusTrap(ref, active, onClose) {
  useEffect(() => {
    if (!active) return undefined;

    const container = ref.current;
    if (!container) return undefined;

    const previouslyFocused = document.activeElement;

    // Move focus into the overlay so screen readers announce it immediately.
    const first = container.querySelector(FOCUSABLE);
    (first ?? container).focus({ preventScroll: true });

    function onKeyDown(event) {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;

      const items = [...container.querySelectorAll(FOCUSABLE)].filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      );
      if (items.length === 0) return;

      const firstItem = items[0];
      const lastItem = items[items.length - 1];

      if (event.shiftKey && document.activeElement === firstItem) {
        event.preventDefault();
        lastItem.focus();
      } else if (!event.shiftKey && document.activeElement === lastItem) {
        event.preventDefault();
        firstItem.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      if (previouslyFocused instanceof HTMLElement) {
        previouslyFocused.focus({ preventScroll: true });
      }
    };
  }, [ref, active, onClose]);
}
