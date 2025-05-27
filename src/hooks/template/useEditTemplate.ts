import { editTemplate } from '@/services/template/putEditTemplate';
import { TemplateRequset } from '@/types/templateRequest';
import { useMutation } from '@tanstack/react-query';

export const useEditTemplate = () => {
  return useMutation({
    mutationFn: ({ templateId, payload }: { templateId: number; payload: TemplateRequset }) =>
      editTemplate(templateId, payload),
  });
};
