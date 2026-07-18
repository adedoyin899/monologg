import { create } from 'zustand';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

export interface ToastItem {
  id: number;
  variant: ToastVariant;
  title: string;
  description?: string;
}

interface ToastState {
  toasts: ToastItem[];
  push: (toast: Omit<ToastItem, 'id'>) => void;
  dismiss: (id: number) => void;
}

let nextToastId = 1;

export const useToastStore = create<ToastState>()((set) => ({
  toasts: [],
  push: (toast) =>
    set((state) => ({ toasts: [...state.toasts, { ...toast, id: nextToastId++ }] })),
  dismiss: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));

function push(variant: ToastVariant) {
  return (title: string, description?: string) =>
    useToastStore.getState().push({ variant, title, description });
}

/** Imperative API: toast.success('Booked', 'Escrow secured. You’re on.') */
export const toast = {
  success: push('success'),
  error: push('error'),
  warning: push('warning'),
  info: push('info'),
};
