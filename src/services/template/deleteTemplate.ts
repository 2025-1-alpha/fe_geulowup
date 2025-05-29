import { customFetch } from '@/utils/customFetch';

export const deleteTemplate = async (templateId: number): Promise<void> => {
  return customFetch(`/templates/${templateId}`, { method: 'DELETE' });
};
