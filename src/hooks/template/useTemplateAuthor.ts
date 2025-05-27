import { getTemplateAuthor } from '@/services/template/getTemplateAuthor';
import { useQuery } from '@tanstack/react-query';

export const useAuthorDetail = (templateId: number) => {
  return useQuery({
    queryKey: ['author', templateId],
    queryFn: () => getTemplateAuthor(templateId),
    enabled: !!templateId,
  });
};
