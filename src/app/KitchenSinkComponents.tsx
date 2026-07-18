import { Heart, Pencil, Share2 } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import {
  Avatar,
  Badge,
  Button,
  Card,
  CueDivider,
  EscrowProgress,
  FileDropzone,
  IconButton,
  Input,
  Lettermark,
  Modal,
  MultiSelectChips,
  Select,
  Skeleton,
  SkeletonLines,
  Slider,
  Tabs,
  Textarea,
  toast,
  Toggle,
} from '@/components';
import { MARKETS } from '@/config/markets';
import { formatMoney } from '@/lib/money';
import { cn } from '@/lib/utils';
import type { Audience } from './stores/audience';

type Mode = 'light' | 'dark';

function ShowcaseNote({ children }: { children: ReactNode }) {
  return <p className="text-small text-muted">{children}</p>;
}

function Sub({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h3 className="text-h3">{title}</h3>
      {children}
    </section>
  );
}

/** Buttons rendered in all four audience × theme scopes. */
function ButtonScope({ audience, mode }: { audience: Audience; mode: Mode }) {
  return (
    <div
      data-audience={audience}
      className={cn(mode, 'flex flex-col gap-2 rounded-md bg-bg p-4 text-ink shadow-sm')}
    >
      <p className="text-label uppercase text-muted">
        {audience} · {mode}
      </p>
      <Button>Primary — Book now</Button>
      <Button variant="secondary" size="md">
        Secondary
      </Button>
      <Button variant="outline" size="md">
        Outline
      </Button>
      <Button variant="ghost" size="md">
        Ghost
      </Button>
      <Button variant="danger" size="md">
        Danger — Cancel booking
      </Button>
      <Button loading size="md">
        Loading
      </Button>
      <Button disabled size="md">
        Disabled
      </Button>
    </div>
  );
}

const SKILL_OPTIONS = [
  { value: 'mc', label: 'MC / Compère' },
  { value: 'comedy', label: 'Comedy' },
  { value: 'voiceover', label: 'Voice-over' },
  { value: 'spoken-word', label: 'Spoken word' },
] as const;

const ORDER_TABS = [
  { id: 'brief', label: 'Brief' },
  { id: 'deliverables', label: 'Deliverables' },
  { id: 'payments', label: 'Payments' },
] as const;

export function ComponentShowcase() {
  const [chips, setChips] = useState<string[]>(['mc']);
  const [budget, setBudget] = useState(45000000);
  const [notify, setNotify] = useState(true);
  const [tab, setTab] = useState<string>('brief');
  const [modalOpen, setModalOpen] = useState(false);
  const [reel, setReel] = useState<File | null>(null);

  return (
    <section className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-h2">Components</h2>
        <ShowcaseNote>
          Every primitive reads semantic tokens only, ships its full state set, and meets
          the 44px touch / visible-focus rules. Tab through anything below to see the
          focus rings; the toolbar above rebinds audience + theme live.
        </ShowcaseNote>
      </div>

      <Sub title="Button — 5 variants × both audiences × both themes">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {(['talent', 'client'] as const).map((audience) =>
            (['light', 'dark'] as const).map((mode) => (
              <ButtonScope key={`${audience}-${mode}`} audience={audience} mode={mode} />
            )),
          )}
        </div>
      </Sub>

      <Sub title="IconButton — 44×44, aria-label required">
        <div className="flex gap-2">
          <IconButton aria-label="Edit" variant="solid">
            <Pencil size={18} aria-hidden="true" />
          </IconButton>
          <IconButton aria-label="Share" variant="outline">
            <Share2 size={18} aria-hidden="true" />
          </IconButton>
          <IconButton aria-label="Save to favourites">
            <Heart size={18} aria-hidden="true" />
          </IconButton>
          <IconButton aria-label="Disabled example" disabled>
            <Heart size={18} aria-hidden="true" />
          </IconButton>
        </div>
      </Sub>

      <Sub title="Form controls">
        <div className="grid gap-6 rounded-md bg-surface p-4 shadow-sm sm:grid-cols-2">
          <Input label="Booking Service Title" placeholder="Wedding MC — full day" helper="Niche-agnostic, remember." />
          <Input
            label="Email"
            type="email"
            defaultValue="not-an-email"
            error="That address won’t reach the green room — check it."
          />
          <Input label="Stage name" defaultValue="Kofi the Compère" success="Free and yours." />
          <Input label="Disabled" placeholder="Waiting in the wings" disabled />
          <Textarea
            label="Brief description"
            placeholder="Set the scene: event, audience, tone…"
            helper="Short and declarative reads best."
            className="sm:col-span-2"
          />
          <Select label="Market" helper="The 13 launch markets, straight from config.">
            <option value="">Choose a market…</option>
            {MARKETS.map((market) => (
              <option key={market.country} value={market.country}>
                {market.name} ({market.currency})
              </option>
            ))}
          </Select>
          <MultiSelectChips
            label="Performance styles"
            helper="Thespian AI suggests these — style tags only, never identity."
            options={SKILL_OPTIONS}
            value={chips}
            onChange={setChips}
          />
          <Slider
            label="Budget"
            min={5000000}
            max={100000000}
            step={2500000}
            value={budget}
            onChange={setBudget}
            formatValue={(v) => formatMoney(v, 'NGN', 'en-NG')}
            helper="Fees stay in config — this is the gross figure."
          />
          <div className="flex flex-col justify-center gap-3">
            <Toggle
              label="Booking alerts"
              description="Ping me when a brief matches my styles"
              checked={notify}
              onChange={setNotify}
            />
            <Toggle label="Disabled toggle" checked={false} onChange={() => {}} disabled />
          </div>
          <FileDropzone
            label="Performance / Showcase Reel"
            file={reel}
            onChange={setReel}
            className="sm:col-span-2"
          />
        </div>
      </Sub>

      <Sub title="Tabs — arrow keys, Home/End, roving tabindex">
        <div className="rounded-md bg-surface p-4 shadow-sm">
          <Tabs aria-label="Order room sections" tabs={ORDER_TABS} value={tab} onChange={setTab} />
          <p className="pt-4 text-body text-muted">
            {tab === 'brief' && 'One brief. Any stage. Booked.'}
            {tab === 'deliverables' && 'Deliverables land here once the show is on.'}
            {tab === 'payments' && 'Escrow figures live in mono: '}
            {tab === 'payments' && (
              <span className="font-mono text-ink">{formatMoney(45000000, 'NGN', 'en-NG')}</span>
            )}
          </p>
        </div>
      </Sub>

      <Sub title="ProgressBar — stepped escrow timeline">
        <div className="flex flex-col gap-6 rounded-md bg-surface p-4 shadow-sm">
          <EscrowProgress current={1} />
          <ShowcaseNote>
            Completed = success green · current = audience accent · upcoming = muted.
            aria-current="step" marks the active node.
          </ShowcaseNote>
        </div>
      </Sub>

      <Sub title="Badge — color + icon + label, never color alone">
        <div className="flex flex-wrap gap-2 rounded-md bg-surface p-4 shadow-sm">
          <Badge variant="verified">Verified</Badge>
          <Badge variant="processing">Processing</Badge>
          <Badge variant="escrow">In escrow</Badge>
          <Badge variant="paid">Paid</Badge>
          <Badge variant="error">Failed</Badge>
          <Badge variant="info">Heads up</Badge>
        </div>
        <ShowcaseNote>
          Verified = identity KYC (accent, audience-tinted) — a separate concept from
          Thespian AI style tags, kept distinct everywhere.
        </ShowcaseNote>
      </Sub>

      <Sub title="Avatar — image fallback to initials, verified indicator">
        <div className="flex items-center gap-4 rounded-md bg-surface p-4 shadow-sm">
          <Avatar name="Kofi Mensah" size="sm" />
          <Avatar name="Adaeze Obi" size="md" verified />
          <Avatar name="Thandi Cele" size="lg" verified />
          <Avatar name="Broken Image" src="/does-not-exist.jpg" size="lg" />
        </div>
      </Sub>

      <Sub title="Card — static + interactive (hover lift)">
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <p className="text-h3">Static card</p>
            <p className="pt-1 text-body text-muted">12px radius, soft shadow, warm surface.</p>
          </Card>
          <Card interactive tabIndex={0} role="button" aria-label="Open storefront rate card">
            <div className="flex items-center justify-between">
              <p className="text-h3">Rate card</p>
              <Badge variant="verified">Verified</Badge>
            </div>
            <p className="pt-1 font-mono text-body-lg text-ink">
              {formatMoney(45000000, 'NGN', 'en-NG')}
            </p>
            <p className="text-small text-muted">Hover or focus me — 150ms lift, no bounce.</p>
          </Card>
        </div>
      </Sub>

      <Sub title="SkeletonLoader — Thespian AI processing state">
        <Card aria-busy="true" className="flex max-w-md flex-col gap-3">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-pill" />
            <SkeletonLines lines={2} className="flex-1" />
          </div>
          <SkeletonLines lines={3} />
          <div className="flex items-center gap-2">
            <Badge variant="processing">Processing</Badge>
            <ShowcaseNote>Thespian AI is reading the room… (style tags only)</ShowcaseNote>
          </div>
        </Card>
      </Sub>

      <Sub title="Modal / Drawer — bottom sheet on mobile, dialog on desktop">
        <div className="flex gap-2">
          <Button variant="outline" size="md" onClick={() => setModalOpen(true)}>
            Open modal
          </Button>
        </div>
        <ShowcaseNote>
          Escape or backdrop closes it; focus is trapped inside and restored after. Resize
          the window to see sheet ↔ dialog.
        </ShowcaseNote>
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Confirm booking"
          footer={
            <>
              <Button variant="ghost" size="md" onClick={() => setModalOpen(false)}>
                Not yet
              </Button>
              <Button
                size="md"
                onClick={() => {
                  setModalOpen(false);
                  toast.success('Booked', 'Escrow secured. Show confirmed. You’re on.');
                }}
              >
                Lock escrow
              </Button>
            </>
          }
        >
          <p>
            {formatMoney(45000000, 'NGN', 'en-NG')} goes into escrow now and is released when
            the deliverables land. No agents, no chasing.
          </p>
        </Modal>
      </Sub>

      <Sub title="Toast — auto-dismiss, role=status (error → alert)">
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => toast.success('Paid', 'Escrow released — before the coffee went cold.')}>
            Success toast
          </Button>
          <Button variant="outline" size="sm" onClick={() => toast.error('Payment failed', 'The card said no. Try another way to pay.')}>
            Error toast
          </Button>
          <Button variant="outline" size="sm" onClick={() => toast.warning('Still in escrow', 'Funds move when deliverables arrive.')}>
            Warning toast
          </Button>
          <Button variant="outline" size="sm" onClick={() => toast.info('New brief nearby', 'A stage in Lagos is looking for an MC.')}>
            Info toast
          </Button>
        </div>
      </Sub>

      <Sub title="Motif — the cue-slash / and m/ lettermark">
        <div className="flex flex-col gap-4 rounded-md bg-surface p-4 shadow-sm">
          <div className="flex items-center gap-4">
            <Lettermark size="sm" tile />
            <Lettermark size="md" tile />
            <Lettermark size="lg" tile />
            <Lettermark size="lg" />
          </div>
          <p className="flex items-center text-body text-muted">
            Lagos
            <CueDivider />
            MC
            <CueDivider />
            <span className="font-mono text-ink">{formatMoney(45000000, 'NGN', 'en-NG')}</span>
            <CueDivider />
            <Badge variant="escrow">In escrow</Badge>
          </p>
          <ShowcaseNote>
            The slash divides meta rows and breadcrumbs; the tile is the app-icon seed.
          </ShowcaseNote>
        </div>
      </Sub>
    </section>
  );
}
