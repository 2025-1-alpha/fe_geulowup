import { getTemplates, GetTemplatesRequest } from '@/services/template/getTemplates';
import { useQuery } from '@tanstack/react-query';

export const useTemplates = (params: GetTemplatesRequest = {}) => {
  return useQuery({
    queryKey: ['templates', params],
    queryFn: () => getTemplates(params),
  });
};
