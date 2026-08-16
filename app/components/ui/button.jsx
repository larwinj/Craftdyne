import { Link } from 'react-router';

import { cn } from '../../lib/cn.js';

const VARIANTS = {
  primary: 'bg-brand-600 text-white shadow-sm hover:bg-brand-700 active:bg-brand-800',
  navy: 'bg-navy-600 text-white shadow-sm hover:bg-navy-700 active:bg-navy-800',
  outline: 'border-2 border-brand-600 text-brand-700 bg-white hover:bg-brand-50 active:bg-brand-100',
  white: 'bg-white text-navy-700 shadow-sm hover:bg-slate-50 active:bg-slate-100',
  ghost: 'text-navy-700 hover:bg-navy-50 active:bg-navy-100',
  whatsapp: 'bg-[#25D366] text-white shadow-sm hover:bg-[#1eb959] active:bg-[#189c4a]',
};

const SIZES = {
  // min-h-11 is 44px — the WCAG 2.5.5 / Apple HIG minimum touch target.
  sm: 'min-h-11 px-4 text-sm gap-1.5',
  md: 'min-h-12 px-5 text-fluid-base gap-2',
  lg: 'min-h-13 px-6 text-fluid-lg gap-2.5 sm:min-h-14 sm:px-8',
};

/**
 * One button, three renderings: an internal `Link` when `to` is set, an anchor
 * when `href` is set, otherwise a real `<button>`. Keeping this in one place is
 * what guarantees every tappable thing on the site clears 44px.
 */
export function Button({
  as,
  to,
  href,
  variant = 'primary',
  size = 'md',
  className,
  children,
  fullWidth = false,
  ...props
}) {
  const classes = cn(
    'inline-flex items-center justify-center rounded-full font-display font-semibold',
    'transition-colors duration-200 ease-out-soft',
    'focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand-700',
    'disabled:cursor-not-allowed disabled:opacity-60',
    VARIANTS[variant],
    SIZES[size],
    fullWidth && 'w-full',
    className,
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    const external = /^https?:/.test(href);
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...props}
      >
        {children}
      </a>
    );
  }

  const Tag = as ?? 'button';
  return (
    <Tag className={classes} {...props}>
      {children}
    </Tag>
  );
}
