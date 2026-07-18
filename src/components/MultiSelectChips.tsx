import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Field, type FieldMessages } from './Field';

export interface ChipOption {
  value: string;
  label: string;
}

export interface MultiSelectChipsProps extends FieldMessages {
  label?: string;
  options: readonly ChipOption[];
  value: readonly string[];
  onChange: (next: string[]) => void;
  disabled?: boolean;
  className?: string;
}

/** Multi-select as toggleable chips (aria-pressed); selection shows icon + fill. */
export function MultiSelectChips({
  label,
  helper,
  error,
  success,
  options,
  value,
  onChange,
  disabled,
  className,
}: MultiSelectChipsProps) {
  const toggle = (option: string) => {
    onChange(
      value.includes(option) ? value.filter((v) => v !== option) : [...value, option],
    );
  };

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
        <div
          id={id}
          role="group"
          aria-label={label}
          aria-describedby={describedBy}
          className="flex flex-wrap gap-2"
        >
          {options.map((option) => {
            const selected = value.includes(option.value);
            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={selected}
                disabled={disabled}
                onClick={() => toggle(option.value)}
                className={cn(
                  'inline-flex min-h-touch items-center gap-1 rounded-pill px-4 text-body font-medium transition-colors duration-200 ease-out',
                  'disabled:pointer-events-none',
                  selected
                    ? 'bg-accent-solid text-accent-fg'
                    : 'border border-border-control bg-surface text-ink hover:bg-surface-2',
                )}
              >
                {selected && <Check size={14} aria-hidden="true" />}
                {option.label}
              </button>
            );
          })}
        </div>
      )}
    </Field>
  );
}
