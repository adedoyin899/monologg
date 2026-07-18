import {
  BadgeCheck,
  CircleCheck,
  CircleX,
  Info,
  LoaderCircle,
  Lock,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Status badges: always color + icon + label, never color alone (§3.2).
 * "verified" = identity KYC (Smile Identity concept) — audience accent, not a
 * status color. Never conflate with Thespian AI style tags.
 */
export type BadgeVariant = 'verified' | 'processing' | 'escrow' | 'paid' | 'error' | 'info';

const VARIANT_CONFIG: Record<BadgeVariant, { icon: LucideIcon; className: string; spin?: boolean }> =
  {
    verified: { icon: BadgeCheck, className: 'bg-accent-solid text-accent-fg' },
    processing: { icon: LoaderCircle, className: 'bg-warning text-warning-fg', spin: true },
    escrow: { icon: Lock, className: 'bg-warning text-warning-fg' },
    paid: { icon: CircleCheck, className: 'bg-success text-success-fg' },
    error: { icon: CircleX, className: 'bg-error text-error-fg' },
    info: { icon: Info, className: 'bg-info text-info-fg' },
  };

export interface BadgeProps {
  variant: BadgeVariant;
  children: string;
  className?: string;
}

export function Badge({ variant, children, className }: BadgeProps) {
  const { icon: Icon, className: variantClass, spin } = VARIANT_CONFIG[variant];
  return (
    <span
      className={cn(
        'inline-flex w-fit items-center gap-1 rounded-xs px-2 py-1 text-label uppercase',
        variantClass,
        className,
      )}
    >
      <Icon size={14} aria-hidden="true" className={cn(spin && 'animate-spin')} />
      {children}
    </span>
  );
}
