import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/auth';
import type { UserType } from '@/types';

/**
 * Route guard: signed out → /auth; wrong side → your own home.
 * Keeps the creator and client PWAs fully separated behind one login.
 */
export function RequireAudience({
  userType,
  children,
}: {
  userType: UserType;
  children: ReactNode;
}) {
  const user = useAuthStore((state) => state.user);

  if (!user) return <Navigate to="/auth" replace />;
  if (user.userType !== userType) {
    return <Navigate to={user.userType === 'talent' ? '/creator' : '/client'} replace />;
  }
  return <>{children}</>;
}
