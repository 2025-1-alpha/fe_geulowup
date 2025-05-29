import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchUserProfileImage } from '@/services/user/patchUserProfileImage';

export const usePatchUserProfileImage = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, FormData>({
    mutationFn: patchUserProfileImage,
    onSuccess: () => {
      // 프로필 이미지 변경 성공 시 'userMe' 쿼리를 무효화하여 사용자 정보를 다시 가져오도록 합니다.
      queryClient.invalidateQueries({ queryKey: ['userMe'] });
    },
    // onError 핸들링도 필요에 따라 추가할 수 있습니다.
  });
};
