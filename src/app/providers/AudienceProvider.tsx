import { useEffect, type ReactNode } from 'react';
import { useAudienceStore, type Audience } from '../stores/audience';

/**
 * Applies the active audience (Zustand store) as data-audience on <html>,
 * which binds --accent: talent → Coral, client → Navy/indigo.
 */
export function AudienceProvider({ children }: { children: ReactNode }) {
  const audience = useAudienceStore((state) => state.audience);

  useEffect(() => {
    document.documentElement.dataset.audience = audience;
  }, [audience]);

  return <>{children}</>;
}

/** Route-level wrapper: forces the given audience while its subtree is mounted. */
export function AudienceBoundary({
  audience,
  children,
}: {
  audience: Audience;
  children: ReactNode;
}) {
  const setAudience = useAudienceStore((state) => state.setAudience);

  useEffect(() => {
    setAudience(audience);
  }, [audience, setAudience]);

  return <>{children}</>;
}
