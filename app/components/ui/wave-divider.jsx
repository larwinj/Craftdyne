import { cn } from '../../lib/cn.js';

/**
 * The green ribbon motif from the printed brochure, rebuilt as SVG so it scales
 * cleanly and costs nothing to load.
 *
 * `fill` should match the colour of the section BELOW the divider; `className`
 * carries the colour of the section above it.
 */
export function WaveDivider({ className, fill = 'fill-white', flip = false }) {
  return (
    <div className={cn('pointer-events-none relative -mt-px w-full leading-[0]', flip && 'rotate-180', className)}>
      <svg
        viewBox="0 0 1440 96"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
        className={cn('block h-10 w-full sm:h-16 lg:h-24', fill)}
      >
        <path d="M0 34c180 40 340 44 520 14s340-38 520-8 260 40 400 22v34H0V34Z" />
      </svg>
      {/* The thin accent line that runs along the ribbon in the brochure. */}
      <svg
        viewBox="0 0 1440 96"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
        className="absolute inset-0 block h-10 w-full sm:h-16 lg:h-24"
      >
        <path
          d="M0 22c180 40 340 44 520 14s340-38 520-8 260 40 400 22"
          className="stroke-leaf/70"
          strokeWidth="3"
          fill="none"
        />
      </svg>
    </div>
  );
}
