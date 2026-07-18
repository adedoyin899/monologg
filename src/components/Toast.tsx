import { CircleAlert, CircleCheck, CircleX, Info, X, type LucideIcon } from 'lucide-react';
import { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { IconButton } from './IconButton';
import { useToastStore, type ToastItem, type ToastVariant } from './toastStore';

const AUTO_DISMISS_MS = 5000;

const VARIANT_CONFIG: Record<
  ToastVariant,
  { icon: LucideIcon; accentClass: string; iconClass: string }
> = {
  success: { icon: CircleCheck, accentClass: 'border-l-success', iconClass: 'text-success' },
  error: { icon: CircleX, accentClass: 'border-l-error', iconClass: 'text-error' },
  warning: { icon: CircleAlert, accentClass: 'border-l-warning', iconClass: 'text-warning' },
  info: { icon: Info, accentClass: 'border-l-info', iconClass: 'text-info' },
};

function ToastCard({ item }: { item: ToastItem }) {
  const dismiss = useToastStore((state) => state.dismiss);
  const { icon: Icon, accentClass, iconClass } = VARIANT_CONFIG[item.variant];

  useEffect(() => {
    const timer = setTimeout(() => dismiss(item.id), AUTO_DISMISS_MS);
    return () => clearTimeout(timer);
  }, [item.id, dismiss]);

  return (
    <div
      role={item.variant === 'error' ? 'alert' : 'status'}
      className={cn(
        'animate-sheet-in flex items-start gap-3 rounded-md border-l-4 bg-surface p-4 shadow-md',
        accentClass,
      )}
    >
      <Icon size={20} aria-hidden="true" className={cn('mt-0.5 shrink-0', iconClass)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <p className="text-body font-medium text-ink">{item.title}</p>
        {item.description && <p className="text-small text-muted">{item.description}</p>}
      </div>
      <IconButton aria-label="Dismiss" onClick={() => dismiss(item.id)} className="-mr-2 -mt-2">
        <X size={16} aria-hidden="true" />
      </IconButton>
    </div>
  );
}

/** Mount once in App; renders the toast stack bottom-center (mobile) / bottom-right (desktop). */
export function ToastViewport() {
  const toasts = useToastStore((state) => state.toasts);
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-50 flex w-[calc(100%-32px)] max-w-sm -translate-x-1/2 flex-col gap-2 sm:left-auto sm:right-4 sm:translate-x-0">
      {toasts.map((item) => (
        <ToastCard key={item.id} item={item} />
      ))}
    </div>
  );
}
