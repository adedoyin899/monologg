import {
  FileText,
  Mic,
  Paperclip,
  Pause,
  Play,
  Send,
  Video,
  VideoOff,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAudienceStore } from '@/app/stores/audience';
import { useAuthStore } from '@/app/stores/auth';
import { useBookingStore } from '@/app/stores/booking';
import {
  Avatar,
  Badge,
  Button,
  Card,
  CueDivider,
  EscrowProgress,
  IconButton,
  toast,
  type BadgeVariant,
} from '@/components';
import { PLATFORM_FEES } from '@/config/platformFees';
import { creatorById } from '@/client/mockDirectory';
import { formatMoneyValue } from '@/lib/money';
import { cn } from '@/lib/utils';
import type { BookingState, Message } from '@/types';

/**
 * PWA-13 — shared order room: 3-step escrow bar, chat (text / voice / document /
 * call / system), and a LIVE Google Meet call tied to Booking.meetUrl (US-8) —
 * distinct from async voice notes. Accent follows the viewing audience.
 * Escrow figures come from lib/money via the stored Booking.fees — no literals.
 */

const STATE_META: Record<BookingState, { badge: BadgeVariant; label: string; step: number }> = {
  escrow_locked: { badge: 'escrow', label: 'In escrow', step: 1 },
  deliverables_provided: { badge: 'info', label: 'Deliverables in', step: 2 },
  payment_released: { badge: 'paid', label: 'Paid', step: 3 },
};

const talentPctLabel = `${Math.round(PLATFORM_FEES.talentPct * 100)}%`;
const clientPctLabel = `${Math.round(PLATFORM_FEES.clientPct * 100)}%`;

function newMessage(senderId: string, kind: Message['kind'], content: string): Message {
  return { id: crypto.randomUUID(), senderId, kind, content, createdAt: new Date().toISOString() };
}

const VOICE_BARS = [6, 10, 14, 8, 12, 16, 9, 6, 12, 8, 14, 7];

function VoiceNote({ mine, duration }: { mine: boolean; duration: string }) {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    const timer = setTimeout(() => setPlaying(false), 2800);
    return () => clearTimeout(timer);
  }, [playing]);

  return (
    <span className="flex items-center gap-2">
      <button
        type="button"
        aria-label={playing ? 'Pause voice note' : `Play voice note, ${duration}`}
        onClick={() => setPlaying((value) => !value)}
        className={cn(
          'inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-pill transition-colors duration-micro ease-out',
          mine ? 'bg-accent-hover text-accent-fg' : 'bg-surface text-ink',
        )}
      >
        {playing ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
      </button>
      <span className="flex items-end gap-0.5" aria-hidden="true">
        {VOICE_BARS.map((height, index) => (
          <span
            key={index}
            style={{ height }}
            className={cn(
              'w-1 rounded-pill transition-opacity duration-short ease-out',
              mine ? 'bg-accent-fg' : 'bg-border-control',
              playing ? 'opacity-100' : 'opacity-60',
            )}
          />
        ))}
      </span>
      <span className="font-mono text-small">{duration}</span>
    </span>
  );
}

function MessageBubble({ message, mine }: { message: Message; mine: boolean }) {
  if (message.kind === 'system' || message.kind === 'call') {
    return (
      <p className="flex items-center gap-1 self-center text-center text-small text-muted">
        {message.kind === 'call' && <Video size={12} aria-hidden="true" />}
        <span aria-hidden="true">/</span> {message.content} <span aria-hidden="true">/</span>
      </p>
    );
  }

  return (
    <div
      className={cn(
        'max-w-[85%] rounded-md p-3 text-body',
        mine ? 'self-end bg-accent-solid text-accent-fg' : 'self-start bg-surface-2 text-ink',
      )}
    >
      {message.kind === 'text' && message.content}
      {message.kind === 'voice' && <VoiceNote mine={mine} duration={message.content} />}
      {message.kind === 'document' && (
        <button
          type="button"
          onClick={() => toast.info('Demo file', 'Real attachments download at launch.')}
          className="flex items-center gap-2 underline-offset-2 hover:underline"
        >
          <FileText size={16} aria-hidden="true" />
          {message.content}
        </button>
      )}
    </div>
  );
}

export default function OrderRoom() {
  const { orderId } = useParams();
  const booking = useBookingStore((state) =>
    state.bookings.find((entry) => entry.id === orderId),
  );
  const room = useBookingStore((state) => (orderId ? state.orderRooms[orderId] : undefined));
  const addMessage = useBookingStore((state) => state.addMessage);
  const advanceEscrow = useBookingStore((state) => state.advanceEscrow);
  const setActiveCall = useBookingStore((state) => state.setActiveCall);
  const user = useAuthStore((state) => state.user);
  const setAudience = useAudienceStore((state) => state.setAudience);
  const [draft, setDraft] = useState('');

  // accent follows the viewing audience (coral creator / navy client)
  useEffect(() => {
    if (user) setAudience(user.userType === 'talent' ? 'talent' : 'client');
  }, [user, setAudience]);

  // seed the opening system message once per room
  useEffect(() => {
    if (!booking) return;
    const current = useBookingStore.getState().orderRooms[booking.id];
    if (current && current.messages.length === 0) {
      const held = {
        amount: booking.base.amount + booking.fees.clientFee.amount,
        currency: booking.base.currency,
      };
      addMessage(
        booking.id,
        newMessage('system', 'system', `Escrow locked — ${formatMoneyValue(held)} held safely`),
      );
    }
  }, [booking, addMessage]);

  if (!booking || !room) {
    return (
      <main className="flex min-h-screen flex-col items-start justify-center gap-4 bg-bg px-6 text-ink">
        <h1 className="text-h1">No booking on this stage.</h1>
        <p className="text-body-lg text-muted">
          Book a creator from the directory and the order room opens here.
        </p>
        <Link to="/client/directory" className="font-medium text-accent-text underline">
          Find talent
        </Link>
      </main>
    );
  }

  const entry = creatorById(booking.creatorId);
  const creatorName = entry?.name ?? 'Creator';
  const myId = user?.id ?? booking.clientId;
  const meta = STATE_META[booking.state];
  const shortCode = `BK-${booking.id.slice(0, 4).toUpperCase()}`;

  const send = (event: React.FormEvent) => {
    event.preventDefault();
    const content = draft.trim();
    if (!content) return;
    addMessage(booking.id, newMessage(myId, 'text', content));
    setDraft('');
  };

  const startCall = () => {
    if (!booking.meetUrl) return;
    setActiveCall(booking.id, booking.meetUrl);
    addMessage(booking.id, newMessage('system', 'call', 'Live call started — join on Google Meet'));
  };

  const endCall = () => {
    setActiveCall(booking.id, null);
    addMessage(booking.id, newMessage('system', 'call', 'Live call ended'));
  };

  const markDelivered = () => {
    advanceEscrow(booking.id);
    addMessage(
      booking.id,
      newMessage('system', 'system', 'Deliverables provided — awaiting confirmation'),
    );
    toast.info('Deliverables in', 'The client reviews, then payment releases.');
  };

  const releasePayment = () => {
    advanceEscrow(booking.id);
    addMessage(
      booking.id,
      newMessage(
        'system',
        'system',
        `Payment released — ${formatMoneyValue(booking.fees.talentFee)} fee deducted, ${creatorName} paid`,
      ),
    );
    toast.success('Paid', 'Before the coffee went cold.');
  };

  return (
    <main className="flex min-h-screen flex-col bg-bg text-ink">
      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-4 px-4 py-6">
        {/* Header with the live-call launcher (US-8) */}
        <header className="flex items-center gap-3">
          <Avatar name={creatorName} size="md" verified={entry?.verification === 'verified'} />
          <div className="min-w-0 flex-1">
            <p className="flex items-center gap-2 text-body-lg font-medium text-ink">
              {creatorName}
              <Badge variant={meta.badge}>{meta.label}</Badge>
            </p>
            <p className="flex items-center font-mono text-small text-muted">
              {shortCode}
              <CueDivider />
              {booking.slot.date} {booking.slot.start}
              {booking.engagementType === 'retainer' && (
                <>
                  <CueDivider />
                  retainer · {booking.recurrence}
                </>
              )}
            </p>
          </div>
          {room.activeCallUrl ? (
            <IconButton aria-label="End live call" variant="outline" onClick={endCall}>
              <VideoOff size={18} aria-hidden="true" />
            </IconButton>
          ) : (
            <IconButton aria-label="Start live call on Google Meet" variant="solid" onClick={startCall}>
              <Video size={18} aria-hidden="true" />
            </IconButton>
          )}
        </header>

        {/* Live call banner — a real Meet session, distinct from voice notes */}
        {room.activeCallUrl && (
          <Card className="flex items-center gap-3">
            <Video size={18} aria-hidden="true" className="shrink-0 text-accent" />
            <p className="min-w-0 flex-1 text-body text-ink">Live call in progress</p>
            <a
              href={room.activeCallUrl}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-accent-text underline"
            >
              Join on Meet
            </a>
          </Card>
        )}

        {/* 3-step escrow timeline */}
        <Card className="flex flex-col gap-4">
          <EscrowProgress current={meta.step} />
          <div className="flex flex-col gap-1 border-t border-divider pt-3">
            <div className="flex justify-between text-small">
              <span className="text-muted">Base rate</span>
              <span className="font-mono text-ink">{formatMoneyValue(booking.base)}</span>
            </div>
            <div className="flex justify-between text-small">
              <span className="text-muted">Client fee ({clientPctLabel})</span>
              <span className="font-mono text-ink">
                {formatMoneyValue(booking.fees.clientFee)}
              </span>
            </div>
            <div className="flex justify-between text-small">
              <span className="text-muted">Talent fee ({talentPctLabel}, on delivery)</span>
              <span className="font-mono text-ink">
                {formatMoneyValue(booking.fees.talentFee)}
              </span>
            </div>
            <div className="flex justify-between text-small">
              <span className="text-muted">{creatorName} receives</span>
              <span className="font-mono text-ink">
                {formatMoneyValue({
                  amount: booking.base.amount - booking.fees.talentFee.amount,
                  currency: booking.base.currency,
                })}
              </span>
            </div>
          </div>
          {booking.state === 'escrow_locked' && (
            <Button size="md" onClick={markDelivered}>
              Mark deliverables provided
            </Button>
          )}
          {booking.state === 'deliverables_provided' && (
            <Button size="md" onClick={releasePayment}>
              Confirm &amp; release payment
            </Button>
          )}
        </Card>

        {/* Chat */}
        <div className="flex flex-1 flex-col gap-3 rounded-md bg-surface p-4 shadow-sm">
          <div className="flex flex-1 flex-col gap-3" aria-live="polite">
            {room.messages.map((message) => (
              <MessageBubble key={message.id} message={message} mine={message.senderId === myId} />
            ))}
          </div>
          <form onSubmit={send} className="flex items-center gap-2 border-t border-divider pt-3">
            <IconButton
              aria-label="Attach a document"
              onClick={() =>
                addMessage(booking.id, newMessage(myId, 'document', 'Script_v2.pdf'))
              }
            >
              <Paperclip size={18} aria-hidden="true" />
            </IconButton>
            <IconButton
              aria-label="Record a voice note"
              onClick={() => addMessage(booking.id, newMessage(myId, 'voice', '0:42'))}
            >
              <Mic size={18} aria-hidden="true" />
            </IconButton>
            <input
              aria-label="Message"
              placeholder="Type a message…"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              className="min-h-touch min-w-0 flex-1 rounded-pill border border-border-control bg-surface px-4 text-body text-ink placeholder:text-muted"
            />
            <IconButton aria-label="Send message" variant="solid" type="submit">
              <Send size={18} aria-hidden="true" />
            </IconButton>
          </form>
        </div>
      </div>
    </main>
  );
}
