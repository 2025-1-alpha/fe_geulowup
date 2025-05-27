import { customFetch } from '@/utils/customFetch';
import { Template } from './getTemplates';

interface GetRecentlyUsedTemplatesResponse {
  templates: Template[];
  totalPage: number;
}

export const getRecentlyUsedTemplates =
  async (): Promise<GetRecentlyUsedTemplatesResponse | null> => {
    const data = await customFetch<GetRecentlyUsedTemplatesResponse>(`/templates/me/recently-used`);
    return data ?? null;
  };
