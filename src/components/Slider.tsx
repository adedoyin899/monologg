import { cn } from '@/lib/utils';
import { Field, type FieldMessages } from './Field';

export interface SliderProps extends FieldMessages {
  label?: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  /** Renders the current value (and min/max hints), e.g. money formatting. */
  formatValue?: (value: number) => string;
  disabled?: boolean;
  className?: string;
}

/** Budget slider — native range input (full keyboard support) with token styling. */
export function Slider({
  label,
  helper,
  error,
  success,
  min,
  max,
  step = 1,
  value,
  onChange,
  formatValue = String,
  disabled,
  className,
}: SliderProps) {
  return (
    <Field
      label={label}
      helper={helper}
      error={error}
      success={success}
      disabled={disabled}
      className={className}
    >
      {({ id, describedBy }) => (
        <div className="flex w-full flex-col gap-1">
          <output htmlFor={id} className="font-mono text-body-lg text-ink">
            {formatValue(value)}
          </output>
          <input
            id={id}
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            disabled={disabled}
            aria-describedby={describedBy}
            aria-valuetext={formatValue(value)}
            onChange={(event) => onChange(Number(event.target.value))}
            className={cn('min-h-touch w-full cursor-pointer disabled:cursor-not-allowed')}
            style={{ accentColor: 'var(--accent-solid)' }}
          />
          <div className="flex justify-between font-mono text-small text-muted" aria-hidden="true">
            <span>{formatValue(min)}</span>
            <span>{formatValue(max)}</span>
          </div>
        </div>
      )}
    </Field>
  );
}
