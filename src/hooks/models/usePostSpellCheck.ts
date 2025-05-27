import { postSpellCheck } from '@/services/models/postSpellCheck';
import { SpellCheckRequest, SpellCheckResponse } from '@/types/spellCheckRequest';
import { useMutation } from '@tanstack/react-query';

export const usePostPlaceholder = () =>
  useMutation<SpellCheckResponse, Error, SpellCheckRequest>({
    mutationFn: (data) => postSpellCheck(data),
  });
