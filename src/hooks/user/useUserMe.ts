import { useQuery } from '@tanstack/react-query';
import { getUserMe, UserMeResponse } from '@/services/user/getUserMe';

export const useUserMe = () => {
  return useQuery<UserMeResponse | undefined, Error>({
    queryKey: ['userMe'],
    queryFn: getUserMe,
  });
};
