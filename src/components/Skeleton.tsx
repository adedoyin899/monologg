import { cn } from '@/lib/utils';

export interface SkeletonProps {
  className?: string;
}

/**
 * Pulse placeholder (e.g. the Thespian AI processing state). Purely decorative —
 * hidden from assistive tech; pair with visible text or aria-busy on the region.
 * prefers-reduced-motion collapses the pulse globally.
 */
export function Skeleton({ className }: SkeletonProps) {
  return <div aria-hidden="true" className={cn('animate-pulse rounded-sm bg-surface-2', className)} />;
}

/** Text-block convenience: n pulsing lines, last one shorter. */
export function SkeletonLines({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div aria-hidden="true" className={cn('flex flex-col gap-2', className)}>
      {Array.from({ length: lines }, (_, index) => (
        <Skeleton key={index} className={cn('h-3', index === lines - 1 ? 'w-2/3' : 'w-full')} />
      ))}
    </div>
  );
}
