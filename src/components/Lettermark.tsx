import { cn } from '@/lib/utils';

export type LettermarkSize = 'sm' | 'md' | 'lg';

const TEXT_SIZES: Record<LettermarkSize, string> = {
  sm: 'text-body-lg',
  md: 'text-h2',
  lg: 'text-h1',
};

const TILE_SIZES: Record<LettermarkSize, string> = {
  sm: 'h-8 w-8 rounded-sm',
  md: 'h-12 w-12 rounded-md',
  lg: 'h-16 w-16 rounded-lg',
};

export interface LettermarkProps {
  size?: LettermarkSize;
  /** App-icon seed: accent tile with the mark reversed out. */
  tile?: boolean;
  className?: string;
}

/** The m/ lettermark from monologue-script punctuation (design doc §5). */
export function Lettermark({ size = 'md', tile, className }: LettermarkProps) {
  if (tile) {
    return (
      <span
        role="img"
        aria-label="Monologg"
        className={cn(
          'inline-flex items-center justify-center bg-accent-solid font-heading font-bold text-accent-fg',
          TILE_SIZES[size],
          TEXT_SIZES[size],
          className,
        )}
      >
        m/
      </span>
    );
  }
  return (
    <span
      role="img"
      aria-label="Monologg"
      className={cn('font-heading font-bold text-ink', TEXT_SIZES[size], className)}
    >
      m<span className="text-accent-text">/</span>
    </span>
  );
}
