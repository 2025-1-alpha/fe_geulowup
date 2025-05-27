import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFolder, CreateFolderRequest } from '@/services/folders/createFolder';

export const useCreateFolder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateFolderRequest) => createFolder(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['folders'] });
    },
  });
};
