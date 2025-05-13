import { create } from 'zustand';

type ModalType = 'view' | 'create' | 'edit' | 'using' | 'profile' | null;

interface ModalState {
  currentModal: ModalType;
  selectedTemplateId?: number | null;
  draftTitle?: string;
  draftContent?: string;
  draftTags?: string[];
  openModal: (type: ModalType, options?: { templateId?: number; draftContent?: string; draftTitle?: string; draftTags?: string[] }) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  currentModal: null,
  selectedTemplateId: null,
  draftTitle:'',
  draftContent: '',
  draftTags: [],

  openModal: (type, options) =>
    set(() => ({
      currentModal: type,
      selectedTemplateId: options?.templateId ?? null,
      draftTitle: options?.draftTitle ?? '',
      draftContent: options?.draftContent ?? '',
      draftTags: options?.draftTags ?? []

    })),

  closeModal: () =>
    set(() => ({
      currentModal: null,
      selectedTemplateId: null,
      draftTitle: '',
      draftContent: '',
      draftTags:[]
    })),
}));
