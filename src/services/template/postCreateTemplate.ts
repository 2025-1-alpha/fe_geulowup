import { TemplateRequest } from '@/types/templateRequest';
import { customFetch } from '@/utils/customFetch';

export const createTemplate = async (payload: TemplateRequest): Promise<void> => {
  return customFetch('/templates', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
};
