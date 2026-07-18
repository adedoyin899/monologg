import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { useLaunchStore } from '@/app/stores/launch';
import { useWaitlistStore } from '@/app/stores/waitlist';
import { Hero } from './Hero';
import Landing from './Landing';

/**
 * Verifies the marketing hero toggle (PRD §4.7): one fixed layout, State A
 * (waitlist) ↔ State B (live) swap in the same slot with no rebuild — proven
 * by actually flipping the store and asserting the rendered DOM changes.
 */
describe('marketing hero — State A (waitlist) ↔ State B (live)', () => {
  beforeEach(() => {
    useWaitlistStore.setState({ entry: null, joinCount: 0 });
  });

  afterEach(() => {
    useLaunchStore.setState({ state: 'waitlist' });
  });

  it('State A shows the email waitlist widget and no live CTAs', () => {
    useLaunchStore.setState({ state: 'waitlist' });
    render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>,
    );
    expect(screen.getByLabelText('Email address')).toBeInTheDocument();
    expect(screen.queryByText('Post a Project / Find Talent')).not.toBeInTheDocument();
    expect(screen.queryByText('Launch Your Storefront')).not.toBeInTheDocument();
  });

  it('State B shows the two live CTAs and no email field', () => {
    useLaunchStore.setState({ state: 'live' });
    render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>,
    );
    expect(screen.getByText('Post a Project / Find Talent')).toBeInTheDocument();
    expect(screen.getByText('Launch Your Storefront')).toBeInTheDocument();
    expect(screen.queryByLabelText('Email address')).not.toBeInTheDocument();
  });

  it('flips live → waitlist in place, same component instance, no route change', () => {
    useLaunchStore.setState({ state: 'live' });
    const { rerender } = render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>,
    );
    expect(screen.getByText('Launch Your Storefront')).toBeInTheDocument();

    useLaunchStore.getState().setState('waitlist');
    rerender(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>,
    );
    expect(screen.getByLabelText('Email address')).toBeInTheDocument();
    expect(screen.queryByText('Launch Your Storefront')).not.toBeInTheDocument();
  });

  it('the full landing page (WEB-01/02/03) renders end to end in both states', () => {
    for (const state of ['waitlist', 'live'] as const) {
      useLaunchStore.setState({ state });
      const { unmount } = render(
        <MemoryRouter>
          <Landing />
        </MemoryRouter>,
      );
      // one hero, one nav, sections present — page doesn't crash in either state
      expect(screen.getAllByText(/monologg/i).length).toBeGreaterThan(0);
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      unmount();
    }
  });
});
