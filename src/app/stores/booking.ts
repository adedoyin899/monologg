import { create } from 'zustand';
import type { Booking, BookingState, Message, OrderRoom } from '@/types';

/** The escrow timeline (US-8) — advance only, never skip or reverse. */
const BOOKING_FLOW: readonly BookingState[] = [
  'escrow_locked',
  'deliverables_provided',
  'payment_released',
];

interface BookingStoreState {
  bookings: Booking[];
  /** Order rooms keyed by bookingId — one room per booking (PWA-13). */
  orderRooms: Record<string, OrderRoom>;
  /** Adds the booking and opens its order room. */
  addBooking: (booking: Booking) => void;
  /** Moves the booking one step along the escrow flow; mirrors into the room timeline. */
  advanceEscrow: (bookingId: string) => void;
  addMessage: (bookingId: string, message: Message) => void;
  /** Live Google Meet call in the room header (US-8); null ends the call. */
  setActiveCall: (bookingId: string, url: string | null) => void;
}

export const useBookingStore = create<BookingStoreState>()((set) => ({
  bookings: [],
  orderRooms: {},
  addBooking: (booking) =>
    set((state) => ({
      bookings: [...state.bookings, booking],
      orderRooms: {
        ...state.orderRooms,
        [booking.id]: {
          id: crypto.randomUUID(),
          bookingId: booking.id,
          messages: [],
          timeline: booking.state,
        },
      },
    })),
  advanceEscrow: (bookingId) =>
    set((state) => {
      const booking = state.bookings.find((b) => b.id === bookingId);
      if (!booking) return state;
      const next = BOOKING_FLOW[BOOKING_FLOW.indexOf(booking.state) + 1];
      if (!next) return state;
      const room = state.orderRooms[bookingId];
      return {
        bookings: state.bookings.map((b) => (b.id === bookingId ? { ...b, state: next } : b)),
        orderRooms: room
          ? { ...state.orderRooms, [bookingId]: { ...room, timeline: next } }
          : state.orderRooms,
      };
    }),
  addMessage: (bookingId, message) =>
    set((state) => {
      const room = state.orderRooms[bookingId];
      if (!room) return state;
      return {
        orderRooms: {
          ...state.orderRooms,
          [bookingId]: { ...room, messages: [...room.messages, message] },
        },
      };
    }),
  setActiveCall: (bookingId, url) =>
    set((state) => {
      const room = state.orderRooms[bookingId];
      if (!room) return state;
      return {
        orderRooms: {
          ...state.orderRooms,
          [bookingId]: { ...room, activeCallUrl: url ?? undefined },
        },
      };
    }),
}));
