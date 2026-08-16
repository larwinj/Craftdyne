import { clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/**
 * tailwind-merge has to be told about the custom fluid font sizes.
 *
 * Without this it cannot classify `text-fluid-base`, falls back to treating it
 * as a text *colour*, and therefore drops any `text-*` colour that came before
 * it in the same `cn()` call. In practice that silently stripped `text-white`
 * from every medium and large Button — including one CTA that ended up rendering
 * white text on a white background.
 *
 * Any future `text-<name>` token added to `@theme` must be registered here too.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        { text: ['fluid-sm', 'fluid-base', 'fluid-lg', 'fluid-xl', 'fluid-2xl', 'fluid-3xl', 'fluid-4xl'] },
      ],
    },
  },
});

/** Merge class names, letting later Tailwind utilities win over earlier ones. */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
