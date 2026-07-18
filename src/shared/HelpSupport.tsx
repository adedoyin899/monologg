import { CircleHelp, Mail, MessagesSquare } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Textarea, toast } from '@/components';
import { PageShell } from './PageShell';

/** SYS-03 — Help & Support: fast paths to a human, plus the knowledge base. */
export default function HelpSupport() {
  const [note, setNote] = useState('');

  const send = (event: React.FormEvent) => {
    event.preventDefault();
    if (note.trim().length < 10) {
      toast.warning('A little more detail', 'Ten characters minimum — help us help you.');
      return;
    }
    setNote('');
    toast.success('Message sent', 'A human replies within a day. Promise.');
  };

  return (
    <PageShell title="Help & Support">
      <div className="grid grid-cols-1 gap-3">
        <a
          href="mailto:support@monologg.app"
          className="flex min-h-touch items-center gap-3 rounded-md bg-surface p-4 shadow-sm transition-colors duration-micro ease-out hover:bg-surface-2"
        >
          <Mail size={20} aria-hidden="true" className="shrink-0 text-accent" />
          <span className="flex flex-col">
            <span className="text-body font-medium text-ink">Email support</span>
            <span className="text-small text-muted">support@monologg.app</span>
          </span>
        </a>
        <a
          href="https://chat.whatsapp.com/monologg"
          target="_blank"
          rel="noreferrer"
          className="flex min-h-touch items-center gap-3 rounded-md bg-surface p-4 shadow-sm transition-colors duration-micro ease-out hover:bg-surface-2"
        >
          <MessagesSquare size={20} aria-hidden="true" className="shrink-0 text-accent" />
          <span className="flex flex-col">
            <span className="text-body font-medium text-ink">Community</span>
            <span className="text-small text-muted">Creators helping creators</span>
          </span>
        </a>
        <Link
          to="/faq"
          className="flex min-h-touch items-center gap-3 rounded-md bg-surface p-4 shadow-sm transition-colors duration-micro ease-out hover:bg-surface-2"
        >
          <CircleHelp size={20} aria-hidden="true" className="shrink-0 text-accent" />
          <span className="flex flex-col">
            <span className="text-body font-medium text-ink">FAQ / Knowledge base</span>
            <span className="text-small text-muted">Straight answers, no hold music</span>
          </span>
        </Link>
      </div>

      <Card className="flex flex-col gap-3">
        <form onSubmit={send} className="flex flex-col gap-3">
          <Textarea
            label="Or tell us here"
            placeholder="What happened, and where? The more scene-setting, the faster the fix."
            value={note}
            onChange={(event) => setNote(event.target.value)}
          />
          <Button type="submit" size="md">
            Send message
          </Button>
        </form>
      </Card>
    </PageShell>
  );
}
