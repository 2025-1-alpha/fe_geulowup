import { PlaceholderRequest, PlaceholderResponse } from '@/types/placeholder';
import { customFetch } from '@/utils/customFetch';

export const postPlaceholder = async (
  payload: PlaceholderRequest,
): Promise<PlaceholderResponse> => {
  const res = await customFetch<PlaceholderResponse | undefined>('/models/placeholders', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  if (!res) {
    throw new Error('응답이 없습니다.');
  }

  return res;
};
