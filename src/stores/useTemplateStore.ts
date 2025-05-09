import { create } from 'zustand';

interface Template {
  templateId: number;
  content: string;
}

interface TemplateStore {
  currentTemplate: Template | null;
  setCurrentTemplate: (data: Template) => void;
  clearTemplate: () => void;
}

export const useTemplateStore = create<TemplateStore>((set) => ({
  currentTemplate: null,
  setCurrentTemplate: (data) => set({ currentTemplate: data }),
  clearTemplate: () => set({ currentTemplate: null }),
}));
