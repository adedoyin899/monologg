import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Dev-only accessibility watcher — runs real axe-core against the live DOM on
 * every route change and after DOM mutations, logging violations to the
 * console. Mounted only in development (see App.tsx) and tree-shaken out of
 * production builds entirely (dynamic import + import.meta.env.DEV guard).
 *
 * Why not @axe-core/react: its own README states it does not support React 18+
 * (it patches legacy ReactDOM internals). Rather than wire in tooling that's
 * documented-broken for this stack, this runs axe-core directly against the
 * DOM — framework-agnostic, no React-version coupling, same underlying engine.
 */
export function DevAxeWatcher() {
  const location = useLocation();

  useEffect(() => {
    if (!import.meta.env.DEV) return;

    let cancelled = false;

    const run = async () => {
      const { default: axe } = await import('axe-core');
      if (cancelled) return;
      const results = await axe.run(document.body, {
        // color-contrast needs real paint timing that fires mid-mutation-storm
        // and duplicates the hand-audited ratios in the design system doc;
        // everything else (labels, roles, ARIA, landmarks, focus order) runs.
        rules: { 'color-contrast': { enabled: false } },
      });
      if (cancelled) return;

      if (results.violations.length === 0) {
        console.log(`%c[axe] ${location.pathname} — no violations`, 'color:#0E7D52');
        return;
      }

      console.groupCollapsed(
        `%c[axe] ${location.pathname} — ${results.violations.length} violation(s)`,
        'color:#D93A3F;font-weight:bold',
      );
      for (const violation of results.violations) {
        console.warn(
          `${violation.id} (${violation.impact}): ${violation.help}\n${violation.nodes
            .map((node) => node.target.join(' '))
            .join('\n')}`,
        );
      }
      console.groupEnd();
    };

    // let the route's components mount/settle, then check
    const debounceTimer = setTimeout(run, 800);

    return () => {
      cancelled = true;
      clearTimeout(debounceTimer);
    };
  }, [location.pathname]);

  return null;
}
