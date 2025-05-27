import { getTemplateDetail } from '@/services/template/getTemplateDetail';
import { useQuery } from '@tanstack/react-query';

export const useTemplateDetail = (templateId: number) => {
  return useQuery({
    queryKey: ['template', 'detail', templateId],
    queryFn: () => getTemplateDetail(templateId),
    enabled: !!templateId,
  });
};
