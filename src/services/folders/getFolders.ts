import { customFetch } from '@/utils/customFetch';

export interface Folder {
  folderId: number;
  name: string;
}

export interface FolderResponse {
  folders: Folder[];
}

export const getFolders = async (): Promise<FolderResponse | null> => {
  const data = await customFetch<FolderResponse>('/folders');
  return data ?? null;
};
