import { customFetch } from '@/utils/customFetch';

export const deleteFolder = async (folderId: number): Promise<void> => {
  await customFetch(`/folders/${folderId}`, {
    method: 'DELETE',
  });
};
