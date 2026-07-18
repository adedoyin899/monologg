import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { CONTROL_CLASSES, controlBorder } from './controlStyles';
import { Field, type FieldMessages } from './Field';

export interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'>,
    FieldMessages {
  label?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, helper, error, success, required, disabled, className, rows = 4, ...rest },
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
        <textarea
          ref={ref}
          id={id}
          rows={rows}
          aria-describedby={describedBy}
          aria-invalid={invalid || undefined}
          required={required}
          disabled={disabled}
          className={cn(CONTROL_CLASSES, controlBorder(invalid, success), 'py-2')}
          {...rest}
        />
      )}
    </Field>
  );
});
