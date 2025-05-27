import { postSpellCheck } from '@/services/models/postSpellCheck';
import { SpellCheckRequest, SpellCheckResponse } from '@/types/spellCheckRequest';
import { useMutation } from '@tanstack/react-query';

export const useSpellCheck = () =>
  useMutation<SpellCheckResponse, Error, SpellCheckRequest>({
    mutationFn: (data) => postSpellCheck(data),
  });
