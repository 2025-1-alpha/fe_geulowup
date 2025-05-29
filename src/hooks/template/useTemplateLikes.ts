import { getTemplateLikes } from '@/services/template/getTemplateLikes';
import { postTemplateLike } from '@/services/template/postTemplateLike';
import { useQuery, useMutation } from '@tanstack/react-query';

export const useTemplatesLikes = () => {
  return useQuery({
    queryKey: ['templates', 'likes'],
    queryFn: () => getTemplateLikes(),
  });
};

export const useLikePost = () => {
    return useMutation({mutationFn : (templateId : number) => postTemplateLike(templateId)});
}
