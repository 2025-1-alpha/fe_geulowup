import { createTemplate } from '@/services/template/postCreateTemplate';
import { TemplateRequest } from '@/types/templateRequest';
import { useMutation } from '@tanstack/react-query';

export const useCreateTemplate = () =>
  useMutation<void, Error, TemplateRequest>({
    mutationFn: (data) => createTemplate(data),
  });
