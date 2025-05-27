import { saveTemplate, TemplateSaveRequest } from '@/services/template/postTemplateSave';
import { useMutation } from '@tanstack/react-query';

export const useSaveTemplate = () => {
  return useMutation({
    mutationFn: ({ templateId, payload }: { templateId: number; payload: TemplateSaveRequest }) =>
      saveTemplate(templateId, payload),
  });
};
