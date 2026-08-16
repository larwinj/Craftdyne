import { cn } from '../../lib/cn.js';

/**
 * Horizontal rhythm for the whole site.
 *
 * The gutter starts at 1.25rem so content never touches the edge on a 320px
 * screen, and opens up progressively. Every full-width section should wrap its
 * content in one of these rather than inventing its own padding.
 */
export function Container({ as: Tag = 'div', className, children, size = 'default' }) {
  return (
    <Tag
      className={cn(
        'mx-auto w-full px-5 sm:px-6 lg:px-8',
        size === 'default' && 'max-w-6xl',
        size === 'wide' && 'max-w-7xl',
        size === 'narrow' && 'max-w-3xl',
        className,
      )}
    >
      {children}
    </Tag>
  );
}
