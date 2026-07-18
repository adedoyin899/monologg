import { ChevronDown } from 'lucide-react';
import { forwardRef, type SelectHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { CONTROL_CLASSES, controlBorder } from './controlStyles';
import { Field, type FieldMessages } from './Field';

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'id'>,
    FieldMessages {
  label?: string;
}

/** Native select (full keyboard + screen-reader behavior) with token styling. */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, helper, error, success, required, disabled, className, children, ...rest },
  ref,
) {
  return (
    <Field
      label={label}
      helper={helper}
      error={error}
      success={success}
      required={required}
      disabled={disabled}
      className={className}
    >
      {({ id, describedBy, invalid }) => (
        <span className="relative block w-full">
          <select
            ref={ref}
            id={id}
            aria-describedby={describedBy}
            aria-invalid={invalid || undefined}
            required={required}
            disabled={disabled}
            className={cn(CONTROL_CLASSES, controlBorder(invalid, success), 'appearance-none pr-9')}
            {...rest}
          >
            {children}
          </select>
          <ChevronDown
            size={16}
            aria-hidden="true"
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted"
          />
        </span>
      )}
    </Field>
  );
});
