import { beforeEach, describe, expect, it } from 'vitest';
import { LAUNCH_STATE } from '@/config/launch';
import { useLaunchStore } from './launch';

describe('useLaunchStore — marketing hero toggle (State A ↔ State B)', () => {
  beforeEach(() => {
    useLaunchStore.setState({ state: LAUNCH_STATE });
  });

  it('seeds from the LAUNCH_STATE config flag', () => {
    expect(useLaunchStore.getState().state).toBe(LAUNCH_STATE);
  });

  it('flips from waitlist to live and back with no other state change required', () => {
    useLaunchStore.getState().setState('live');
    expect(useLaunchStore.getState().state).toBe('live');
    useLaunchStore.getState().setState('waitlist');
    expect(useLaunchStore.getState().state).toBe('waitlist');
  });

  it('only ever holds one of the two valid states', () => {
    useLaunchStore.getState().setState('live');
    expect(['waitlist', 'live']).toContain(useLaunchStore.getState().state);
  });
});
