/** Shared classes for text-like form controls (Input/Textarea/Select). */
export const CONTROL_CLASSES =
  'min-h-touch w-full rounded-sm border bg-surface px-3 text-body text-ink placeholder:text-muted transition-colors duration-micro ease-out disabled:cursor-not-allowed';

export function controlBorder(invalid: boolean, success?: string): string {
  if (invalid) return 'border-error';
  if (success) return 'border-success';
  return 'border-border-control';
}
