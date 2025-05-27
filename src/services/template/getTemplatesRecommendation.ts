import { customFetch } from '@/utils/customFetch';
import { Template } from './getTemplates';

export interface GetTemplatesRecommendationRequest {
  summary?: boolean;
}

export interface GetTemplatesRecommendationResponse {
  templates: Template[];
  totalPage: number;
}

export const getTemplatesRecommendation = async (
  params: GetTemplatesRecommendationRequest = {},
) => {
  const { summary = false } = params;

  // URL 쿼리 파라미터 구성
  const queryParams = new URLSearchParams();

  queryParams.append('summary', summary.toString());

  const queryString = queryParams.toString();
  const endpoint = `/templates/recommendation${queryString ? `?${queryString}` : ''}`;

  return customFetch<GetTemplatesRecommendationResponse>(endpoint);
};
