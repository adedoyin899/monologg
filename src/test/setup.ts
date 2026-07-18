import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';
import '@testing-library/jest-dom/vitest';

// RTL doesn't auto-unmount between tests under Vitest — without this, DOM from
// one test (e.g. a Modal left "open") leaks into the next test's container.
afterEach(() => cleanup());

/**
 * jsdom doesn't implement matchMedia, IntersectionObserver, or scrollTo —
 * the app touches all three (theme detection, scroll-reveal, modal focus).
 * Minimal stand-ins so component tests don't crash on mount.
 */
if (!window.matchMedia) {
  window.matchMedia = (query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }) as unknown as MediaQueryList;
}

if (!('IntersectionObserver' in window)) {
  class MockIntersectionObserver implements IntersectionObserver {
    readonly root = null;
    readonly rootMargin = '';
    readonly scrollMargin = '';
    readonly thresholds: ReadonlyArray<number> = [];
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }
  }
  // @ts-expect-error -- test-only stand-in
  window.IntersectionObserver = MockIntersectionObserver;
}

if (!window.HTMLElement.prototype.scrollIntoView) {
  window.HTMLElement.prototype.scrollIntoView = () => {};
}
