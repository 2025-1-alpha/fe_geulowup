import { editTemplate } from '@/services/template/putEditTemplate';
import { TemplateRequset } from '@/types/templateRequest';
import { useMutation } from '@tanstack/react-query';

export const useEditTemplate = () =>
  useMutation<void, Error, TemplateRequset>({
    mutationFn: (data) => editTemplate(data),
  });
