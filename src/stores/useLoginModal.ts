import { create } from 'zustand';

interface LoginModalState {
  isLoginOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
}

export const useLoginModalStore = create<LoginModalState>((set) => ({
  isLoginOpen: false,
  openLoginModal: () => set({ isLoginOpen: true }),
  closeLoginModal: () => set({ isLoginOpen: false }),
}));
