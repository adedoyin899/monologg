import { cn } from '@/lib/utils';

/**
 * The cue-slash "/" — the brand's divider for breadcrumbs, meta rows, and
 * inline labels (design doc §5). Decorative; hidden from assistive tech.
 */
export function CueDivider({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn('select-none px-1 font-medium text-muted', className)}>
      /
    </span>
  );
}
