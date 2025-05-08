import { createTemplate, CreateTemplatePayload } from '@/services/template/postCreateTemplate';
import { useMutation } from '@tanstack/react-query';

export const useCreateTemplate = () => {
  return useMutation({
    mutationFn: (data: CreateTemplatePayload) => createTemplate(data),
  });
};
