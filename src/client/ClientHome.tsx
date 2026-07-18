import { Bell, ClipboardList, Megaphone, Search, Settings } from 'lucide-react';
import { Link, Route, Routes } from 'react-router-dom';
import { useAuthStore } from '@/app/stores/auth';
import { useClientStore } from '@/app/stores/client';
import { Card, CueDivider } from '@/components';
import { formatMoneyValue } from '@/lib/money';
import { NICHE_LABELS } from '@/creator/nicheMeta';
import BriefForm from './BriefForm';
import Checkout from './Checkout';
import Directory from './Directory';
import Projects from './Projects';

/** Client area (PWA-09..12): home, brief form, directory, checkout, projects. */
export default function ClientHome() {
  return (
    <Routes>
      <Route index element={<ClientDashboard />} />
      <Route path="brief" element={<BriefForm />} />
      <Route path="directory" element={<Directory />} />
      <Route path="checkout/:creatorId/:rateCardId" element={<Checkout />} />
      <Route path="projects" element={<Projects />} />
    </Routes>
  );
}

function ClientDashboard() {
  const user = useAuthStore((state) => state.user);
  const briefs = useClientStore((state) => state.briefs);

  return (
    <main className="min-h-screen bg-bg px-4 py-8 text-ink">
      <div className="mx-auto flex w-full max-w-md flex-col gap-6">
        <header className="flex flex-col gap-2">
          <div className="flex items-start justify-between gap-2">
            <h1 className="text-h1">
              Cast your next show<span className="text-accent-text">.</span>
            </h1>
            <span className="flex shrink-0">
              <Link
                to="/notifications"
                aria-label="Notifications"
                className="inline-flex min-h-touch min-w-touch items-center justify-center rounded-btn text-muted transition-colors duration-micro ease-out hover:bg-surface-2 hover:text-ink"
              >
                <Bell size={20} aria-hidden="true" />
              </Link>
              <Link
                to="/settings"
                aria-label="Settings"
                className="inline-flex min-h-touch min-w-touch items-center justify-center rounded-btn text-muted transition-colors duration-micro ease-out hover:bg-surface-2 hover:text-ink"
              >
                <Settings size={20} aria-hidden="true" />
              </Link>
            </span>
          </div>
          <p className="text-body text-muted">
            {user?.name ? `${user.name} — ` : ''}one brief, any stage, booked.
          </p>
        </header>

        <div className="grid grid-cols-2 gap-3">
          <Link
            to="/client/brief"
            className="flex min-h-touch flex-col items-start gap-2 rounded-md bg-surface p-4 shadow-sm transition-[box-shadow,transform] duration-micro ease-out hover:-translate-y-0.5 hover:shadow-md"
          >
            <Megaphone size={22} aria-hidden="true" className="text-accent" />
            <span className="text-body font-medium text-ink">Post a Project</span>
            <span className="text-small text-muted">Brief in, talent notified</span>
          </Link>
          <Link
            to="/client/directory"
            className="flex min-h-touch flex-col items-start gap-2 rounded-md bg-surface p-4 shadow-sm transition-[box-shadow,transform] duration-micro ease-out hover:-translate-y-0.5 hover:shadow-md"
          >
            <Search size={22} aria-hidden="true" className="text-accent" />
            <span className="text-body font-medium text-ink">Find Talent</span>
            <span className="text-small text-muted">Browse verified creators</span>
          </Link>
        </div>

        <section className="flex flex-col gap-3">
          <h2 className="flex items-center gap-2 text-label uppercase text-muted">
            <ClipboardList size={14} aria-hidden="true" />
            Your briefs
          </h2>
          {briefs.length === 0 ? (
            <Card className="border border-dashed border-border-control bg-surface-2 shadow-none">
              <p className="text-body text-muted">
                No briefs yet — post one and let the talent come to you.
              </p>
            </Card>
          ) : (
            briefs.map((brief) => (
              <Card key={brief.id} className="flex flex-col gap-1">
                <p className="text-body font-medium text-ink">{brief.projectName}</p>
                <p className="flex flex-wrap items-center text-small text-muted">
                  {brief.projectType}
                  <CueDivider />
                  {brief.nicheRequirements.map((niche) => NICHE_LABELS[niche]).join(', ')}
                </p>
                <p className="font-mono text-body text-ink">{formatMoneyValue(brief.budget)}</p>
              </Card>
            ))
          )}
        </section>
      </div>
    </main>
  );
}
