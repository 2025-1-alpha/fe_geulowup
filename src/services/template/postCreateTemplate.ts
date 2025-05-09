import { customFetch } from '@/utils/customFetch';

export interface CreateTemplatePayload {
  title: string;
  content: string;
  tags: string[];
  isPrivate: boolean;
}

export const createTemplate = async (payload: CreateTemplatePayload): Promise<void> => {
  return customFetch('/templates', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
};
