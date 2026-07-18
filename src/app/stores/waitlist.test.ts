import { beforeEach, describe, expect, it } from 'vitest';
import { QUEUE_BASE, useWaitlistStore } from './waitlist';

describe('useWaitlistStore — queue numbering', () => {
  beforeEach(() => {
    useWaitlistStore.setState({ entry: null, joinCount: 0 });
  });

  it('assigns the base queue number to the first join', () => {
    const entry = useWaitlistStore.getState().join('first@example.com');
    expect(entry.queueNumber).toBe(QUEUE_BASE);
  });

  it('assigns strictly increasing numbers to successive different joins', () => {
    const first = useWaitlistStore.getState().join('a@example.com');
    useWaitlistStore.setState({ entry: null }); // simulate a fresh visitor
    const second = useWaitlistStore.getState().join('b@example.com');
    useWaitlistStore.setState({ entry: null });
    const third = useWaitlistStore.getState().join('c@example.com');

    expect(second.queueNumber).toBe(first.queueNumber + 1);
    expect(third.queueNumber).toBe(second.queueNumber + 1);
  });

  it('is deterministic, not random — same join sequence yields the same numbers', () => {
    const runNumbers = () => {
      useWaitlistStore.setState({ entry: null, joinCount: 0 });
      const numbers: number[] = [];
      for (const email of ['x@example.com', 'y@example.com', 'z@example.com']) {
        numbers.push(useWaitlistStore.getState().join(email).queueNumber);
        useWaitlistStore.setState({ entry: null });
      }
      return numbers;
    };
    expect(runNumbers()).toEqual(runNumbers());
  });

  it('returns the existing entry — not a new number — when the same email rejoins', () => {
    const first = useWaitlistStore.getState().join('repeat@example.com');
    const second = useWaitlistStore.getState().join('repeat@example.com');
    expect(second.queueNumber).toBe(first.queueNumber);
    expect(second.id).toBe(first.id);
  });

  it('leave() clears the entry so a later join starts a fresh one', () => {
    useWaitlistStore.getState().join('gone@example.com');
    useWaitlistStore.getState().leave();
    expect(useWaitlistStore.getState().entry).toBeNull();
  });

  it('every entry gets a referral code', () => {
    const entry = useWaitlistStore.getState().join('ref@example.com');
    expect(entry.referralCode).toMatch(/^[a-z0-9]+$/);
  });
});
