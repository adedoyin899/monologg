import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { CONTROL_CLASSES, controlBorder } from './controlStyles';
import { Field, type FieldMessages } from './Field';

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id'>,
    FieldMessages {
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, helper, error, success, required, disabled, className, ...rest },
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
        <input
          ref={ref}
          id={id}
          aria-describedby={describedBy}
          aria-invalid={invalid || undefined}
          required={required}
          disabled={disabled}
          className={cn(CONTROL_CLASSES, controlBorder(invalid, success))}
          {...rest}
        />
      )}
    </Field>
  );
});
