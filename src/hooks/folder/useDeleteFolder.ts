import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteFolder } from '@/services/folders/deleteFolder';

export const useDeleteFolder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (folderId: number) => deleteFolder(folderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['folders'] });
    },
  });
};
