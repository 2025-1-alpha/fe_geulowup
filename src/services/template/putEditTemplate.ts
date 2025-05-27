import { TemplateRequset } from '@/types/templateRequest';
import { customFetch } from '@/utils/customFetch';

export const editTemplate = async (templateId: number, payload: TemplateRequset): Promise<void> => {
  return customFetch(`/templates/${templateId}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
};
