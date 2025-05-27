import { SpellCheckRequest, SpellCheckResponse } from '@/types/spellCheckRequest';
import { customFetch } from '@/utils/customFetch';

export const postSpellCheck = async (payload: SpellCheckRequest): Promise<SpellCheckResponse> => {
  const res = await customFetch<SpellCheckResponse | undefined>('/models/spell-check', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  if (!res) {
    throw new Error('응답이 없습니다.');
  }

  return res;
};
