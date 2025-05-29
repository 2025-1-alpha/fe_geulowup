import { customFetch } from '@/utils/customFetch';

export const postTemplateLike = async (templateId: number): Promise<void> => {
  return customFetch(`/templates/${templateId}/likes`, { method: 'POST' });
};
