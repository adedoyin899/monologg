import { CircleAlert, CircleCheck } from 'lucide-react';
import { useId, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface FieldMessages {
  helper?: string;
  error?: string;
  success?: string;
}

interface FieldProps extends FieldMessages {
  label?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  children: (control: {
    id: string;
    describedBy: string | undefined;
    invalid: boolean;
  }) => ReactNode;
}

/**
 * Shared shell for form controls: label, control slot, and one message line.
 * Error wins over success wins over helper; error/success always render with
 * an icon so state is never conveyed by color alone.
 */
export function Field({
  label,
  helper,
  error,
  success,
  required,
  disabled,
  className,
  children,
}: FieldProps) {
  const id = useId();
  const messageId = `${id}-message`;
  const message = error ?? success ?? helper;

  return (
    <div className={cn('flex w-full flex-col gap-2', disabled && 'opacity-50', className)}>
      {label && (
        <label htmlFor={id} className="text-label uppercase text-muted">
          {label}
          {required && (
            <span className="text-accent-text" aria-hidden="true">
              {' '}
              *
            </span>
          )}
        </label>
      )}
      {children({
        id,
        describedBy: message ? messageId : undefined,
        invalid: Boolean(error),
      })}
      {message && (
        <p
          id={messageId}
          className={cn(
            'flex items-center gap-1 text-small',
            error ? 'text-error' : success ? 'text-success' : 'text-muted',
          )}
        >
          {error && <CircleAlert size={14} aria-hidden="true" />}
          {!error && success && <CircleCheck size={14} aria-hidden="true" />}
          {message}
        </p>
      )}
    </div>
  );
}
