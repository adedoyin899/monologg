import { zodResolver } from '@hookform/resolvers/zod';
import { Copy, Share2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button, Input, toast } from '@/components';
import { useWaitlistStore } from '@/app/stores/waitlist';

const schema = z.object({
  email: z.email('That address won’t reach the green room — check it.'),
});

type FormValues = z.infer<typeof schema>;

/**
 * Hero State A widget (PRD §4.7). On submit it transitions IN PLACE to the
 * queue-position view — same layout slot, no navigation.
 */
export function WaitlistWidget() {
  const entry = useWaitlistStore((state) => state.entry);
  const join = useWaitlistStore((state) => state.join);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  if (entry) {
    const link = `${window.location.origin}/?ref=${entry.referralCode}`;
    const shareText = `I’m #${entry.queueNumber} in line for Monologg — the brief-to-booking pipeline for the performing arts. Climb the roster with me: ${link}`;

    const copyLink = async () => {
      try {
        await navigator.clipboard.writeText(link);
        toast.success('Copied', 'Now go climb the roster.');
      } catch {
        toast.error('Couldn’t copy', `Your link: ${link}`);
      }
    };

    return (
      <div className="animate-fade-in flex w-full max-w-xl flex-col gap-3" role="status">
        <p className="text-h3">
          You are Number{' '}
          <span className="font-mono text-accent-text">#{entry.queueNumber}</span> in the
          verification queue.
        </p>
        <p className="text-body text-muted">Share your link to climb the roster.</p>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="md" onClick={copyLink}>
            <Copy size={16} aria-hidden="true" />
            Copy link
          </Button>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-touch items-center gap-2 rounded-btn border border-border-control px-4 text-body font-medium text-ink transition-colors duration-micro ease-out hover:bg-surface-2"
          >
            <Share2 size={16} aria-hidden="true" />
            Share on X
          </a>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-touch items-center gap-2 rounded-btn border border-border-control px-4 text-body font-medium text-ink transition-colors duration-micro ease-out hover:bg-surface-2"
          >
            <Share2 size={16} aria-hidden="true" />
            WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit((values) => {
        join(values.email);
      })}
      className="flex w-full max-w-xl flex-col gap-2 sm:flex-row sm:items-start"
      noValidate
    >
      <Input
        type="email"
        aria-label="Email address"
        placeholder="you@stagename.com"
        autoComplete="email"
        error={errors.email?.message}
        className="flex-1"
        {...register('email')}
      />
      <Button type="submit" loading={isSubmitting} className="shrink-0">
        Join the waitlist
      </Button>
    </form>
  );
}
