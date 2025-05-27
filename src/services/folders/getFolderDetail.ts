import { customFetch } from '@/utils/customFetch';
import { Folder } from './getFolders';
import { Template } from '@/services/template/getTemplates';

export interface FolderDetailResponse {
  folder: Folder;
  templates: Template[];
}

export const getFolderDetail = async (folderId: number): Promise<FolderDetailResponse | null> => {
  const data = await customFetch<FolderDetailResponse>(`/folders/${folderId}`);
  return data ?? null;
};
