import { AdviceRequest, AdviceResponse } from '@/types/adviceRequest';
import { customFetch } from '@/utils/customFetch';

export const postAdvice = async (payload: AdviceRequest): Promise<AdviceResponse> => {
  return customFetch('/models/advices', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
};
