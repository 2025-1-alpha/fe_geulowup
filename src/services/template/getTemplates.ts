import { customFetch } from '@/utils/customFetch';

export interface Template {
  templateId: number;
  title: string;
  content: string;
  tags: string[];
  likeCount: number;
}

export interface GetTemplatesRequest {
  search?: string;
  tag?: string;
  page?: number;
  size?: number;
  sort?: string[];
}

export interface GetTemplatesResponse {
  templates: Template[];
  totalPage: number;
}

export const getTemplates = async (params: GetTemplatesRequest = {}) => {
  const { search, tag, page = 0, size = 20, sort } = params;

  // URL 쿼리 파라미터 구성
  const queryParams = new URLSearchParams();

  if (search) queryParams.append('search', search);
  if (tag) queryParams.append('tag', tag);
  if (page !== undefined) queryParams.append('page', page.toString());
  if (size !== undefined) queryParams.append('size', size.toString());
  if (sort && sort.length > 0) {
    sort.forEach((sortOption) => queryParams.append('sort', sortOption));
  }

  const queryString = queryParams.toString();
  const endpoint = `/templates${queryString ? `?${queryString}` : ''}`;

  return customFetch<GetTemplatesResponse>(endpoint);
};
