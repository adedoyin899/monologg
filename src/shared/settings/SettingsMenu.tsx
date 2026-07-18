import {
  Banknote,
  Bell,
  BellRing,
  ChevronRight,
  CircleHelp,
  Clapperboard,
  FileText,
  LogOut,
  Receipt,
  Star,
  SunMoon,
  Tags,
  UserRound,
  type LucideIcon,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/app/stores/auth';
import { Button } from '@/components';
import { PageShell } from '../PageShell';

interface MenuItem {
  to: string;
  icon: LucideIcon;
  label: string;
  hint: string;
  creatorOnly?: boolean;
}

const ACCOUNT_ITEMS: MenuItem[] = [
  { to: '/settings/profile', icon: UserRound, label: 'Profile & Bio', hint: 'Name, bio, market' },
  { to: '/settings/rates', icon: Tags, label: 'Rate Cards', hint: 'Your booking services', creatorOnly: true },
  { to: '/settings/media', icon: Clapperboard, label: 'Media', hint: 'Reels & clips', creatorOnly: true },
  { to: '/settings/payout', icon: Banknote, label: 'Payout Settings', hint: 'Where money lands' },
  { to: '/settings/notifications', icon: BellRing, label: 'Notification Preferences', hint: 'What pings you' },
  { to: '/settings/appearance', icon: SunMoon, label: 'Appearance', hint: 'Light, dark, or system' },
  { to: '/settings/referral', icon: Star, label: 'Referrals & Celebrity badge', hint: 'Share, earn the star', creatorOnly: true },
];

const SYSTEM_ITEMS: MenuItem[] = [
  { to: '/notifications', icon: Bell, label: 'Notification Centre', hint: 'Everything that happened' },
  { to: '/transactions', icon: Receipt, label: 'Transaction History', hint: 'Every booking, every figure' },
  { to: '/help', icon: CircleHelp, label: 'Help & Support', hint: 'A human, fast' },
  { to: '/faq', icon: CircleHelp, label: 'FAQ / Knowledge base', hint: 'Straight answers' },
  { to: '/terms', icon: FileText, label: 'Terms & Privacy', hint: 'The fine print, kindly' },
];

function MenuRow({ item }: { item: MenuItem }) {
  const { icon: RowIcon } = item;
  return (
    <Link
      to={item.to}
      className="flex min-h-touch items-center gap-3 px-4 py-3 transition-colors duration-micro ease-out hover:bg-surface-2"
    >
      <RowIcon size={20} aria-hidden="true" className="shrink-0 text-accent" />
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="text-body font-medium text-ink">{item.label}</span>
        <span className="text-small text-muted">{item.hint}</span>
      </span>
      <ChevronRight size={16} aria-hidden="true" className="text-muted" />
    </Link>
  );
}

export default function SettingsMenu() {
  const navigate = useNavigate();
  const { user, userType, signOut } = useAuthStore();
  const isCreator = (userType ?? 'talent') === 'talent';

  const visible = (items: MenuItem[]) =>
    items.filter((item) => !item.creatorOnly || isCreator);

  return (
    <PageShell title="Settings" backTo={isCreator ? '/creator' : '/client'}>
      <section aria-label="Account settings" className="flex flex-col divide-y divide-divider overflow-hidden rounded-md bg-surface shadow-sm">
        {visible(ACCOUNT_ITEMS).map((item) => (
          <MenuRow key={item.to} item={item} />
        ))}
      </section>
      <section aria-label="System" className="flex flex-col divide-y divide-divider overflow-hidden rounded-md bg-surface shadow-sm">
        {visible(SYSTEM_ITEMS).map((item) => (
          <MenuRow key={item.to} item={item} />
        ))}
      </section>
      {user && (
        <Button
          variant="ghost"
          size="md"
          onClick={() => {
            signOut();
            navigate('/');
          }}
          className="w-fit"
        >
          <LogOut size={16} aria-hidden="true" />
          Sign out
        </Button>
      )}
    </PageShell>
  );
}
