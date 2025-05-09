import { create } from 'zustand';

type ModalType = 'view' | 'create' | 'edit' | 'using' | 'profile' | null;

interface ModalState {
  currentModal: ModalType;
  selectedTemplateId: number | null;
  openModal: (type: ModalType, options?: { templateId?: number }) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  currentModal: null,
  selectedTemplateId: null,

  openModal: (type, options) =>
    set(() => ({
      currentModal: type,
      selectedTemplateId: options?.templateId ?? null,
    })),

  closeModal: () =>
    set(() => ({
      currentModal: null,
      selectedTemplateId: null,
    })),
}));
