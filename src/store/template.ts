import { IEmailTemplate } from '@/components/email/type';
import { create } from 'zustand';

interface EmailTemplateStore {
  selectedTemplate: IEmailTemplate | null;
  setSelectedTemplate: (template: IEmailTemplate) => void;
  clearSelectedTemplate: () => void;
}

export const useEmailTemplateStore = create<EmailTemplateStore>((set) => ({
  selectedTemplate: null,
  setSelectedTemplate: (template) => set({ selectedTemplate: template }),
  clearSelectedTemplate: () => set({ selectedTemplate: null }),
}));
