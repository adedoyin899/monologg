import { LoaderCircle } from 'lucide-react';
import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'lg' | 'md' | 'sm';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'bg-accent-solid text-accent-fg hover:bg-accent-hover active:bg-accent-hover',
  secondary: 'bg-surface-2 text-ink hover:bg-divider active:bg-divider',
  outline:
    'border border-border-control bg-transparent text-ink hover:bg-surface-2 active:bg-surface-2',
  ghost: 'bg-transparent text-accent-text hover:bg-surface-2 active:bg-surface-2',
  danger: 'bg-error text-error-fg hover:opacity-90 active:opacity-90',
};

// TODO(conflict: design doc §8 gives 48/40/36px heights while the a11y rules ask
// 44px min touch targets — doc heights kept; use lg (48) for primary mobile actions.
const SIZE_CLASSES: Record<ButtonSize, string> = {
  lg: 'h-12 px-6 text-body-lg',
  md: 'h-10 px-4 text-body-lg',
  sm: 'h-9 px-3 text-body font-medium',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'lg', loading = false, disabled, className, children, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-btn transition-colors duration-micro ease-out',
        'disabled:pointer-events-none disabled:opacity-50',
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        className,
      )}
      {...rest}
    >
      {loading && <LoaderCircle size={16} className="animate-spin" aria-hidden="true" />}
      {children}
    </button>
  );
});
