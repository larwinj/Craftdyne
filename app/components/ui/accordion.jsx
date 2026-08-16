import { Plus } from 'lucide-react';

import { cn } from '../../lib/cn.js';

/**
 * FAQ accordion built on native `<details>`/`<summary>`.
 *
 * Deliberately not a JS-driven disclosure: the native element is keyboard
 * accessible and screen-reader correct for free, and — because these pages are
 * prerendered — it works before any JavaScript has loaded, which matters on a
 * slow connection.
 */
export function Accordion({ items, className }) {
  return (
    <div className={cn('divide-y divide-slate-200 border-y border-slate-200', className)}>
      {items.map((item) => (
        <details key={item.id} className="group">
          <summary
            className={cn(
              'flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4',
              'font-display text-fluid-base text-navy-700 font-semibold',
              'hover:text-brand-700 focus-visible:outline-brand-700 focus-visible:outline-3 focus-visible:outline-offset-2',
              '[&::-webkit-details-marker]:hidden',
            )}
          >
            <span className="min-w-0">{item.question}</span>
            <span
              aria-hidden="true"
              className="bg-brand-50 text-brand-700 inline-flex size-8 shrink-0 items-center justify-center rounded-full transition-transform duration-200 group-open:rotate-45"
            >
              <Plus className="size-4" />
            </span>
          </summary>
          <div className="pb-5 text-slate-600">{item.answer}</div>
        </details>
      ))}
    </div>
  );
}
