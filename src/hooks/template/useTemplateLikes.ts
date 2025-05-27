import { getTemplateLikes } from '@/services/template/getTemplateLikes';
import { useQuery } from '@tanstack/react-query';

export const useTemplatesLikes = () => {
  return useQuery({
    queryKey: ['templates', 'likes'],
    queryFn: () => getTemplateLikes(),
  });
};
