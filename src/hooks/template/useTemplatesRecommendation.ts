import {
  getTemplatesRecommendation,
  GetTemplatesRecommendationRequest,
} from '@/services/template/getTemplatesRecommendation';
import { useQuery } from '@tanstack/react-query';

export const useTemplatesRecommendation = (params: GetTemplatesRecommendationRequest = {}) => {
  return useQuery({
    queryKey: ['templates', 'recommendation', params],
    queryFn: () => getTemplatesRecommendation(params),
  });
};
