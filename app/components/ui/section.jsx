import { cn } from '../../lib/cn.js';
import { Container } from './container.jsx';

const TONES = {
  white: 'bg-white',
  mist: 'bg-mist',
  sand: 'bg-sand',
  navy: 'bg-navy-700 text-white',
  brand: 'bg-brand-600 text-white',
};

/** Vertical rhythm. Padding is deliberately tighter on phones so a page does
 *  not turn into endless scrolling on a small screen. */
export function Section({ id, tone = 'white', className, containerSize, children, as: Tag = 'section' }) {
  return (
    <Tag id={id} className={cn('py-14 sm:py-20 lg:py-24', TONES[tone], className)}>
      <Container size={containerSize}>{children}</Container>
    </Tag>
  );
}

/**
 * Standard section heading block. `eyebrow` is the small label above the title.
 * Headings are balanced so two-line titles break evenly rather than leaving one
 * orphan word — noticeable on phones where most titles wrap.
 */
export function SectionHeading({ eyebrow, title, description, align = 'center', tone = 'dark', className }) {
  const light = tone === 'light';
  return (
    <div
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        align === 'left' && 'text-left',
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            'font-display text-sm font-bold tracking-[0.14em] uppercase',
            light ? 'text-brand-200' : 'text-brand-700',
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2 className={cn('text-fluid-3xl mt-3 text-balance', light && 'text-white')}>{title}</h2>
      {description ? (
        <p className={cn('text-fluid-lg mt-4 text-pretty', light ? 'text-white/85' : 'text-slate-600')}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
