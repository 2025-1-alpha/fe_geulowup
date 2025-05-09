import { create } from 'zustand';

type ModalType = 'view' | 'create' | 'edit' | 'using' | 'profile' | null;

interface ModalState {
  currentModal: ModalType;
  selectedTemplateId: number | null;
  draftContent?: string;
  openModal: (type: ModalType, options?: { templateId?: number; draftContent?: string }) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  currentModal: null,
  selectedTemplateId: null,
  draftContent: '',

  openModal: (type, options) =>
    set(() => ({
      currentModal: type,
      selectedTemplateId: options?.templateId ?? null,
      draftContent: options?.draftContent ?? '',
    })),

  closeModal: () =>
    set(() => ({
      currentModal: null,
      selectedTemplateId: null,
      draftContent: '',
    })),
}));
