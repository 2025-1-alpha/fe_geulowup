import { TemplateRequset } from '@/types/templateRequest';
import { customFetch } from '@/utils/customFetch';


export const createTemplate = async (payload: TemplateRequset): Promise<void> => {
  return customFetch('/templates', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
};
