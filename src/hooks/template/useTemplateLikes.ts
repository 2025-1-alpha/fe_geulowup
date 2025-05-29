import { getTemplateLikes } from '@/services/template/getTemplateLikes';
import { postTemplateLike } from '@/services/template/postTemplateLike';
import { useQuery, useMutation } from '@tanstack/react-query';

export const useTemplatesLikes = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ['templates', 'likes'],
    queryFn: () => getTemplateLikes(),
    enabled: options?.enabled ?? true,
  });
};

export const useLikePost = () => {
    return useMutation({mutationFn : (templateId : number) => postTemplateLike(templateId)});
}
