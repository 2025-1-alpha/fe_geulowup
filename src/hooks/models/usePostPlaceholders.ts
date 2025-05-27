import { postPlaceholder } from '@/services/models/postPlaceholder';
import { PlaceholderRequest, PlaceholderResponse } from '@/types/placeholder';
import { useMutation } from '@tanstack/react-query';

export const usePostPlaceholder = () =>
  useMutation<PlaceholderResponse, Error, PlaceholderRequest>({
    mutationFn: (data) => postPlaceholder(data),
  });
