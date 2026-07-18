import {
  CalendarCheck,
  ClipboardList,
  Compass,
  House,
  MessageSquare,
  Search,
  UserRound,
  type LucideIcon,
} from 'lucide-react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { ThemeToggle } from '@/components';
import { cn } from '@/lib/utils';
import type { UserType } from '@/types';
import { useAuthStore } from './stores/auth';
import { useCreatorStore } from './stores/creator';

/** Bottom navigation per PRD §5.1 — one nav per audience, same shell. */

interface NavItem {
  to: string;
  icon: LucideIcon;
  label: string;
  end?: boolean;
}

const CREATOR_NAV: NavItem[] = [
  { to: '/creator', icon: House, label: 'Home', end: true },
  { to: '/creator/bookings', icon: CalendarCheck, label: 'Bookings' },
  { to: '/creator/discover', icon: Compass, label: 'Discover' },
  { to: '/inbox', icon: MessageSquare, label: 'Inbox' },
  { to: '/creator/storefront', icon: UserRound, label: 'Profile' },
];

const CLIENT_NAV: NavItem[] = [
  { to: '/client', icon: House, label: 'Home', end: true },
  { to: '/client/directory', icon: Search, label: 'Find Talent' },
  { to: '/client/projects', icon: ClipboardList, label: 'Projects' },
  { to: '/inbox', icon: MessageSquare, label: 'Inbox' },
  { to: '/settings', icon: UserRound, label: 'Account' },
];

function AppNav({ userType }: { userType: UserType }) {
  const items = userType === 'talent' ? CREATOR_NAV : CLIENT_NAV;

  return (
    <nav
      aria-label="App"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-divider bg-surface"
    >
      <div className="mx-auto flex w-full max-w-md">
        {items.map(({ to, icon: ItemIcon, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              cn(
                'flex min-h-touch flex-1 flex-col items-center justify-center gap-0.5 py-2 text-small transition-colors duration-micro ease-out',
                isActive ? 'font-medium text-accent-text' : 'text-muted hover:text-ink',
              )
            }
          >
            <ItemIcon size={20} aria-hidden="true" />
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

/**
 * Layout for signed-in app surfaces: renders the audience nav under every page.
 * Hidden while signed out and during linear onboarding (PRD: no bottom nav there).
 */
export function AppLayout() {
  const userType = useAuthStore((state) => state.userType);
  const onboardingStep = useCreatorStore((state) => state.step);
  const location = useLocation();

  const inOnboarding =
    userType === 'talent' &&
    onboardingStep !== 'done' &&
    location.pathname.startsWith('/creator');
  const showNav = userType !== null && !inOnboarding;

  return (
    <div className={cn(showNav && 'pb-16')}>
      <Outlet />
      {/* floats above every signed-in/app screen — bottom-right, clear of the
          bottom nav and of dashboards' own top-right header icons */}
      <ThemeToggle className="fixed bottom-20 right-4 z-40" />
      {showNav && userType && <AppNav userType={userType} />}
    </div>
  );
}
