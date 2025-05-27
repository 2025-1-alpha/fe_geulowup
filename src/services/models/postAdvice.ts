import { AdviceRequest, AdviceResponse } from '@/types/adviceRequest';
import { customFetch } from '@/utils/customFetch';

export const postAdvice = async (payload: AdviceRequest): Promise<AdviceResponse> => {
  const res = await customFetch<AdviceResponse | undefined>('/models/advices', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  if (!res) {
    throw new Error('응답이 없습니다.');
  }

  return res;
};
