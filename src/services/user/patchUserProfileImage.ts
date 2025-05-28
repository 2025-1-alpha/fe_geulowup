import { customFetch } from '@/utils/customFetch';

// 프로필 이미지 변경 API는 FormData를 받습니다.
// 성공 시 별도 응답 본문이 없을 수 있으므로 Promise<void>를 사용합니다.
export const patchUserProfileImage = async (formData: FormData): Promise<void> => {
  await customFetch<void>('/users/me/profile-image', {
    method: 'PATCH',
    // FormData를 사용할 때는 Content-Type 헤더를 명시적으로 설정하지 않습니다.
    // 브라우저가 자동으로 적절한 Content-Type과 boundary를 설정합니다.
    body: formData,
    // FormData 사용 시 Content-Type을 브라우저가 설정하도록 하기 위해
    // customFetch의 기본 Content-Type 설정을 덮어쓰도록 빈 Headers 객체를 전달합니다.
    // 또는 customFetch에 Content-Type을 설정하지 않도록 하는 옵션이 있다면 해당 옵션을 사용합니다.
    headers: new Headers(),
  });
};
