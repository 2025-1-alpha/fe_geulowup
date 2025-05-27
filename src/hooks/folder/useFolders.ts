import { useQuery } from '@tanstack/react-query';
import { getFolders } from '@/services/folders/getFolders';

export const useFolders = () => {
  return useQuery({
    queryKey: ['folders'],
    queryFn: getFolders,
  });
};
