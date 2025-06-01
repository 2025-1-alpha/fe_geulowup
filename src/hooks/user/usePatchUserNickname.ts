import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchUserNickname, PatchUserNicknameRequest } from '@/services/user/patchUserNickname';

export const usePatchUserNickname = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, PatchUserNicknameRequest>({
    mutationFn: patchUserNickname,
    onSuccess: () => {
      // 닉네임 변경 성공 시 'userMe' 쿼리를 무효화하여 사용자 정보를 다시 가져오도록 합니다.
      queryClient.invalidateQueries({ queryKey: ['userMe'] });
    },
    // onError 핸들링도 필요에 따라 추가할 수 있습니다.
  });
};
