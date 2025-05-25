import { customFetch } from '@/utils/customFetch';
import { Template } from './getTemplates';

interface GetTemplateLikesResponse {
  templates: Template[];
  totalPage: number;
}

export const getTemplateLikes = async (): Promise<GetTemplateLikesResponse | null> => {
  const data = await customFetch<GetTemplateLikesResponse>(`/templates/me/likes`);
  return data ?? null;
};
