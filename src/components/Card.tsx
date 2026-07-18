import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Lifts on hover (shadow-md + translate) — for clickable cards. */
  interactive?: boolean;
}

/** The "lickable" Mode A surface: 12px radius, 16px padding, soft shadow. */
export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { interactive, className, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        'rounded-md bg-surface p-4 shadow-sm',
        interactive &&
          'transition-[box-shadow,transform] duration-micro ease-out hover:-translate-y-0.5 hover:shadow-md',
        className,
      )}
      {...rest}
    />
  );
});
