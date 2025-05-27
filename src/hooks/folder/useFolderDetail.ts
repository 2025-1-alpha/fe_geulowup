import { useQuery } from '@tanstack/react-query';
import { getFolderDetail } from '@/services/folders/getFolderDetail';

export const useFolderDetail = (folderId: number) => {
  return useQuery({
    queryKey: ['folder', folderId],
    queryFn: () => getFolderDetail(folderId),
    enabled: !!folderId,
  });
};
