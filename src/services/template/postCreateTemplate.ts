import { customFetch } from '@/utils/customFetch';

export interface CreateTemplatePayload {
  title: string;
  content: string;
  likeCount: number;
  tags: string[];
  isPrivate: boolean;
}

export const createTemplate = async (payload: CreateTemplatePayload) => {
  return customFetch('/templates', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
};
