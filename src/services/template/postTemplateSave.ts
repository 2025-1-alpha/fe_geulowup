import { customFetch } from '@/utils/customFetch';

export interface TemplateSaveRequest {
  folderId: number;
  content: string | null | undefined;
}

export const saveTemplate = async (
  templateId: number,
  payload: TemplateSaveRequest,
): Promise<void> => {
  return customFetch(`/templates/${templateId}/save`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
};
