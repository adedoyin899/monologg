import { ChevronLeft } from 'lucide-react';
import { useEffect, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAudienceStore } from '@/app/stores/audience';
import { useAuthStore } from '@/app/stores/auth';
import { IconButton } from '@/components';

/** Accent follows the signed-in audience on shared surfaces. */
function useFollowAudience() {
  const user = useAuthStore((state) => state.user);
  const setAudience = useAudienceStore((state) => state.setAudience);
  useEffect(() => {
    if (user) setAudience(user.userType === 'talent' ? 'talent' : 'client');
  }, [user, setAudience]);
}

/** Shared shell for settings + system screens: back chevron, title, single column. */
export function PageShell({
  title,
  backTo,
  children,
}: {
  title: string;
  /** Route for the back chevron; defaults to browser back. */
  backTo?: string;
  children: ReactNode;
}) {
  useFollowAudience();
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-bg text-ink">
      <div className="mx-auto flex w-full max-w-md flex-col gap-6 px-4 py-6">
        <header className="flex items-center gap-2">
          <IconButton
            aria-label="Go back"
            onClick={() => (backTo ? navigate(backTo) : navigate(-1))}
            className="-ml-2"
          >
            <ChevronLeft size={20} aria-hidden="true" />
          </IconButton>
          <h1 className="text-h2">{title}</h1>
        </header>
        {children}
      </div>
    </main>
  );
}
