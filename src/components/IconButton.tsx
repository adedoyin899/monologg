import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export type IconButtonVariant = 'solid' | 'outline' | 'ghost';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Required — icon-only controls must name themselves for screen readers. */
  'aria-label': string;
  variant?: IconButtonVariant;
}

const VARIANT_CLASSES: Record<IconButtonVariant, string> = {
  solid: 'bg-accent-solid text-accent-fg hover:bg-accent-hover',
  outline: 'border border-border-control bg-transparent text-ink hover:bg-surface-2',
  ghost: 'bg-transparent text-muted hover:bg-surface-2 hover:text-ink',
};

/** 44×44px icon-only button (WCAG touch target). */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { variant = 'ghost', className, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        'inline-flex min-h-touch min-w-touch items-center justify-center rounded-btn transition-colors duration-micro ease-out',
        'disabled:pointer-events-none disabled:opacity-50',
        VARIANT_CLASSES[variant],
        className,
      )}
      {...rest}
    />
  );
});
