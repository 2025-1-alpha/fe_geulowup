import { useAuthStore } from '@/stores/useAuthStore';

interface CustomFetchOptions extends RequestInit {
  skipAuth?: boolean;
  errorHandler?: (status: number, responseText: string) => void;
}

/**
 * 커스텀 API 요청 함수
 * @param endpoint API 엔드포인트
 * @param options 요청 옵션
 * @returns 응답 데이터
 */
export const customFetch = async <T>(
  endpoint: string,
  options: CustomFetchOptions = {},
): Promise<T | undefined> => {
  try {
    const isAbsolute = /^https?:\/\//.test(endpoint);
    const url = isAbsolute ? endpoint : `/api${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;

    const headers = new Headers(options.headers || {});
    headers.set('Content-Type', 'application/json');

    // 인증 토큰은 쿠키에 포함되어 자동으로 전송됨
    const res = await fetch(url, {
      ...options,
      headers,
      // credentials: 'include'를 설정하여 쿠키가 항상 전송되도록 함
      credentials: 'include',
    });

    if (!res.ok) {
      const responseText = await res.text();

      // 401 에러 처리 (인증 실패)
      if (res.status === 401 && !options.skipAuth) {
        // 스토어의 토큰 클리어
        useAuthStore.getState().clearToken();

        if (typeof window !== 'undefined') {
          // 로그인 페이지로 리다이렉트
          window.location.replace('/login');
        }
      }

      // 사용자 지정 에러 핸들러가 있으면 실행
      if (options.errorHandler) {
        options.errorHandler(res.status, responseText);
      }

      throw new Error(`API 요청 실패: ${res.status} - ${responseText || '응답 없음'}`);
    }

    // 응답 형식에 따라 처리
    const contentType = res.headers.get('Content-Type');
    if (contentType?.includes('application/json')) {
      const text = await res.text();
      return text ? JSON.parse(text) : undefined;
    }

    return undefined;
  } catch (error) {
    console.error('API 요청 중 오류 발생:', error);
    throw error;
  }
};
