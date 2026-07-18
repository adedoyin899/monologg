import { cn } from '@/lib/utils';

export interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  description?: string;
  disabled?: boolean;
  className?: string;
}

/** Switch (role="switch") with a 44px touch row. */
export function Toggle({ label, checked, onChange, description, disabled, className }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        'flex min-h-touch w-fit items-center gap-3 rounded-btn text-left',
        'disabled:pointer-events-none disabled:opacity-50',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'relative h-6 w-11 shrink-0 rounded-pill transition-colors duration-200 ease-out',
          checked ? 'bg-accent-solid' : 'bg-border-control',
        )}
      >
        <span
          className={cn(
            'absolute top-0.5 h-5 w-5 rounded-pill bg-accent-fg shadow-sm transition-transform duration-200 ease-out',
            checked ? 'translate-x-[22px]' : 'translate-x-0.5',
          )}
        />
      </span>
      <span className="flex flex-col">
        <span className="text-body text-ink">{label}</span>
        {description && <span className="text-small text-muted">{description}</span>}
      </span>
    </button>
  );
}
