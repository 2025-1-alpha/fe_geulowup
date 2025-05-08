import { customFetch } from '@/utils/customFetch';

export interface TemplateDetail {
  templateId: number;
  author: {
    id: number;
    name: string;
    score: number;
    profileImageUrl: string;
  };
  isAuthor: boolean;
  title: string;
  content: string;
  tags: string[];
  likeCount: number;
  isPrivate: boolean;
}

export const getTemplateDetail = async (templateId: number) => {
  const query = new URLSearchParams({ templateId: String(templateId) }).toString();
  return customFetch<TemplateDetail>(`/templates/detail?${query}`, {
    skipAuth: true,
  });
};
