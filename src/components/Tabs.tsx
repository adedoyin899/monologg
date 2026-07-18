import { useRef, type KeyboardEvent } from 'react';
import { cn } from '@/lib/utils';

export interface TabItem {
  id: string;
  label: string;
}

export interface TabsProps {
  tabs: readonly TabItem[];
  value: string;
  onChange: (id: string) => void;
  'aria-label': string;
  className?: string;
}

/** Tablist with roving tabindex and arrow/Home/End keyboard navigation. */
export function Tabs({ tabs, value, onChange, 'aria-label': ariaLabel, className }: TabsProps) {
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next: number;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    else if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = tabs.length - 1;
    else return;

    event.preventDefault();
    const tab = tabs[next];
    if (!tab) return;
    onChange(tab.id);
    refs.current[next]?.focus();
  };

  return (
    <div role="tablist" aria-label={ariaLabel} className={cn('flex border-b border-divider', className)}>
      {tabs.map((tab, index) => {
        const selected = tab.id === value;
        return (
          <button
            key={tab.id}
            ref={(el) => {
              refs.current[index] = el;
            }}
            type="button"
            role="tab"
            aria-selected={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(tab.id)}
            onKeyDown={(event) => onKeyDown(event, index)}
            className={cn(
              '-mb-px min-h-touch border-b-2 px-4 text-body font-medium transition-colors duration-micro ease-out',
              selected
                ? 'border-accent text-accent-text'
                : 'border-transparent text-muted hover:text-ink',
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
