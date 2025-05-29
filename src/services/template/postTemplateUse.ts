import { customFetch } from '@/utils/customFetch';

export const postTemplateUse = async (templateId: number): Promise<void> => {
  return customFetch(`/templates/${templateId}/use`, { method: 'POST' });
};
