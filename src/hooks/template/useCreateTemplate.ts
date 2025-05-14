import { createTemplate } from '@/services/template/postCreateTemplate';
import { TemplateRequset } from '@/types/templateRequest';
import { useMutation } from '@tanstack/react-query';

export const useCreateTemplate = () =>
  useMutation<void, Error, TemplateRequset>({
    mutationFn: (data) => createTemplate(data),
  });
