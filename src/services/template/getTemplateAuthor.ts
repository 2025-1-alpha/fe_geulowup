import { TemplateRequset } from '@/types/templateRequest';
import { customFetch } from '@/utils/customFetch';

export interface AuthorDetail {
  author: {
    id: number;
    name: string;
    score: number;
    profileImageUrl: string;
  };
  templateTotalCount: number;
  templates: TemplateRequset;
}

export const getTemplateAuthor = async (templateId: number): Promise<AuthorDetail | null> => {
  const data = await customFetch<AuthorDetail>(`/templates/${templateId}/authors`);
  return data ?? null;
};
