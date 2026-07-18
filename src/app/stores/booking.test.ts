import { beforeEach, describe, expect, it } from 'vitest';
import type { Booking } from '@/types';
import { useBookingStore } from './booking';

function makeBooking(overrides: Partial<Booking> = {}): Booking {
  return {
    id: 'bk-1',
    creatorId: 'creator-1',
    clientId: 'client-1',
    rateCardId: 'rate-1',
    engagementType: 'one_off',
    slot: { date: '2026-08-01', start: '10:00', end: '11:00' },
    base: { amount: 100_000, currency: 'NGN' },
    fees: {
      talentFee: { amount: 11_000, currency: 'NGN' },
      clientFee: { amount: 15_000, currency: 'NGN' },
    },
    state: 'escrow_locked',
    createdAt: '2026-07-17T00:00:00.000Z',
    ...overrides,
  };
}

describe('useBookingStore — escrow state transitions', () => {
  beforeEach(() => {
    useBookingStore.setState({ bookings: [], orderRooms: {} });
  });

  it('a new booking starts escrow_locked and opens an order room mirroring that state', () => {
    useBookingStore.getState().addBooking(makeBooking());
    const { bookings, orderRooms } = useBookingStore.getState();
    expect(bookings[0]?.state).toBe('escrow_locked');
    expect(orderRooms['bk-1']?.timeline).toBe('escrow_locked');
    expect(orderRooms['bk-1']?.bookingId).toBe('bk-1');
  });

  it('advances one step at a time: locked → deliverables_provided → payment_released', () => {
    useBookingStore.getState().addBooking(makeBooking());

    useBookingStore.getState().advanceEscrow('bk-1');
    expect(useBookingStore.getState().bookings[0]?.state).toBe('deliverables_provided');
    expect(useBookingStore.getState().orderRooms['bk-1']?.timeline).toBe(
      'deliverables_provided',
    );

    useBookingStore.getState().advanceEscrow('bk-1');
    expect(useBookingStore.getState().bookings[0]?.state).toBe('payment_released');
    expect(useBookingStore.getState().orderRooms['bk-1']?.timeline).toBe('payment_released');
  });

  it('never advances past payment_released — it is a terminal state', () => {
    useBookingStore.getState().addBooking(makeBooking({ state: 'payment_released' }));
    useBookingStore.getState().advanceEscrow('bk-1');
    expect(useBookingStore.getState().bookings[0]?.state).toBe('payment_released');
  });

  it('cannot skip steps — one advanceEscrow call moves exactly one step', () => {
    useBookingStore.getState().addBooking(makeBooking());
    useBookingStore.getState().advanceEscrow('bk-1');
    // one call in: must be the middle state, never released
    expect(useBookingStore.getState().bookings[0]?.state).toBe('deliverables_provided');
  });

  it('is a no-op for an unknown booking id', () => {
    useBookingStore.getState().addBooking(makeBooking());
    useBookingStore.getState().advanceEscrow('does-not-exist');
    expect(useBookingStore.getState().bookings[0]?.state).toBe('escrow_locked');
  });

  it('addMessage appends to the correct room without touching escrow state', () => {
    useBookingStore.getState().addBooking(makeBooking());
    useBookingStore.getState().addMessage('bk-1', {
      id: 'm1',
      senderId: 'client-1',
      kind: 'text',
      content: 'Hello',
      createdAt: '2026-07-17T00:00:00.000Z',
    });
    const room = useBookingStore.getState().orderRooms['bk-1'];
    expect(room?.messages).toHaveLength(1);
    expect(room?.timeline).toBe('escrow_locked');
  });

  it('setActiveCall sets and clears the live-call url independent of escrow state', () => {
    useBookingStore.getState().addBooking(makeBooking());
    useBookingStore.getState().setActiveCall('bk-1', 'https://meet.google.com/abc-defg-hij');
    expect(useBookingStore.getState().orderRooms['bk-1']?.activeCallUrl).toBe(
      'https://meet.google.com/abc-defg-hij',
    );
    useBookingStore.getState().setActiveCall('bk-1', null);
    expect(useBookingStore.getState().orderRooms['bk-1']?.activeCallUrl).toBeUndefined();
  });
});
