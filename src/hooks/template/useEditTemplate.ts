import { editTemplate } from '@/services/template/putEditTemplate';
import { TemplateRequest } from '@/types/templateRequest';
import { useMutation } from '@tanstack/react-query';

export const useEditTemplate = () => {
  return useMutation({
    mutationFn: ({ templateId, payload }: { templateId: number; payload: TemplateRequest }) =>
      editTemplate(templateId, payload),
  });
};
