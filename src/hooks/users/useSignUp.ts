import { SignupRequest, userSignUp } from '@/services/users/postSignUp';
import { useMutation } from '@tanstack/react-query';

export const useSignUp = () =>
  useMutation<void, Error, SignupRequest>({
    mutationFn: (data) => userSignUp(data),
  });
