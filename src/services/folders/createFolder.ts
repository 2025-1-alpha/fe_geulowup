import { customFetch } from '@/utils/customFetch';
import { Folder } from './getFolders';

export interface CreateFolderRequest {
  name: string;
}

export const createFolder = async (payload: CreateFolderRequest): Promise<Folder | null> => {
  const data = await customFetch<Folder>(`/folders`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return data ?? null;
};
