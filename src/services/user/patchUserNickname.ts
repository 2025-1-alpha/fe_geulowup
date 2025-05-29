import { customFetch } from '@/utils/customFetch';

export interface PatchUserNicknameRequest {
  nickname: string;
}

// 닉네임 변경 API는 별도의 응답 본문이 없을 수 있으므로, Promise<void> 또는 Promise<undefined>를 사용할 수 있습니다.
// 성공 여부만 중요하므로, 여기서는 Promise<void>를 사용합니다.
export const patchUserNickname = async (data: PatchUserNicknameRequest): Promise<void> => {
  await customFetch<void>('/users/me/nickname', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};
