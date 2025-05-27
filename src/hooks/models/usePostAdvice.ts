import { postAdvice } from '@/services/models/postAdvice';
import { AdviceRequest, AdviceResponse } from '@/types/adviceRequest';
import { useMutation } from '@tanstack/react-query';

export const usePostAdvice = () =>
  useMutation<AdviceResponse, Error, AdviceRequest>({
    mutationFn: (data) => postAdvice(data),
  });
