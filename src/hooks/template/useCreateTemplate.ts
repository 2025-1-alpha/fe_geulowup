import { createTemplate, CreateTemplatePayload } from '@/services/template/postCreateTemplate';
import { useMutation } from '@tanstack/react-query';

export const useCreateTemplate = () =>
  useMutation<void, Error, CreateTemplatePayload>({
    mutationFn: (data) => createTemplate(data),
  });
