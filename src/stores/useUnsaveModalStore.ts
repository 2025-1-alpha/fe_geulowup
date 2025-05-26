import { create } from 'zustand';

interface UnsaveModalState {
  isUnsaveOpen: boolean;
  openUnsaveModal: () => void;
  closeUnsaveModal: () => void;
}

export const useUnsaveModalStore = create<UnsaveModalState>((set) => ({
  isUnsaveOpen: false,
  openUnsaveModal: () => set({ isUnsaveOpen: true }),
  closeUnsaveModal: () => set({ isUnsaveOpen: false }),
}));
