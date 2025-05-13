import { TemplateRequset } from '@/types/templateRequest';
import { customFetch } from '@/utils/customFetch';


export const editTemplate = async (payload: TemplateRequset): Promise<void> => {
  return customFetch('/templates', {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
};
