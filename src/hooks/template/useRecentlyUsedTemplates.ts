import { useQuery } from '@tanstack/react-query';
import { getRecentlyUsedTemplates } from '@/services/template/getRecentlyUsedTemplates';

export const useRecentlyUsedTemplates = () => {
  return useQuery({
    queryKey: ['templates', 'recently-used'],
    queryFn: getRecentlyUsedTemplates,
  });
};
