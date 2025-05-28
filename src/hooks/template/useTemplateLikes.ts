import { getTemplateLikes } from '@/services/template/getTemplateLikes';
import { useQuery } from '@tanstack/react-query';

export const useTemplatesLikes = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ['templates', 'likes'],
    queryFn: () => getTemplateLikes(),
    enabled: options?.enabled ?? true,
  });
};
