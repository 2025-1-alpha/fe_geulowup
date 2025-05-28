import { customFetch } from '@/utils/customFetch';

export interface AuthorRequest {
  templateId?: number;
  title: string;
  content: string;
  tags: string[];
  isPrivate: boolean;
  likeCount: number;
}

export interface AuthorDetail {
  author: {
    id: number;
    name: string;
    score: number;
    profileImageUrl: string;
  };
  templateTotalCount: number;
  templates: AuthorRequest[];
}

export const getTemplateAuthor = async (templateId: number): Promise<AuthorDetail | null> => {
  const data = await customFetch<AuthorDetail>(`/templates/${templateId}/authors`);
  return data ?? null;
};
