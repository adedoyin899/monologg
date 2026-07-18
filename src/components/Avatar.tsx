import { BadgeCheck } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export type AvatarSize = 'sm' | 'md' | 'lg';

const SIZE_CLASSES: Record<AvatarSize, string> = {
  sm: 'h-8 w-8 text-small',
  md: 'h-10 w-10 text-body',
  lg: 'h-12 w-12 text-body-lg',
};

export interface AvatarProps {
  name: string;
  src?: string;
  size?: AvatarSize;
  /** Identity KYC badge (separate concept from Thespian AI style tags). */
  verified?: boolean;
  className?: string;
}

function initialsOf(name: string): string {
  return name
    .split(' ')
    .map((word) => word[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export function Avatar({ name, src, size = 'md', verified, className }: AvatarProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = src && !imageFailed;

  return (
    <span className={cn('relative inline-flex shrink-0', className)}>
      {showImage ? (
        <img
          src={src}
          alt={name}
          onError={() => setImageFailed(true)}
          className={cn('rounded-pill object-cover', SIZE_CLASSES[size])}
        />
      ) : (
        <span
          role="img"
          aria-label={name}
          className={cn(
            'inline-flex items-center justify-center rounded-pill bg-accent-solid font-medium text-accent-fg',
            SIZE_CLASSES[size],
          )}
        >
          {initialsOf(name)}
        </span>
      )}
      {verified && (
        <span
          title="Verified"
          className="absolute -bottom-0.5 -right-0.5 rounded-pill bg-surface p-px text-accent-text"
        >
          <BadgeCheck size={size === 'sm' ? 12 : 16} aria-label="Verified" />
        </span>
      )}
    </span>
  );
}
