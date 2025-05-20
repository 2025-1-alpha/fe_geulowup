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
): Promise<T> => {
  try {
    const isAbsolute = /^https?:\/\//.test(endpoint);
    const url = isAbsolute ? endpoint : `/api${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;

    const headers = new Headers(options.headers || {});
    headers.set('Content-Type', 'application/json');

    const res = await fetch(url, {
      ...options,
      headers,
      credentials: 'include', // 쿠키 항상 포함
    });

    if (!res.ok) {
      const responseText = await res.text();

      if (res.status === 401 && !options.skipAuth) {
        useAuthStore.getState().clearToken();

        if (typeof window !== 'undefined') {
          window.location.replace('/login');
        }
      }

      if (options.errorHandler) {
        options.errorHandler(res.status, responseText);
      }

      throw new Error(`API 요청 실패: ${res.status} - ${responseText || '응답 없음'}`);
    }

    // ✅ 응답이 JSON인지 확인
    const contentType = res.headers.get('Content-Type');
    if (contentType?.includes('application/json')) {
      const text = await res.text();
      if (!text) throw new Error('빈 응답입니다.');
      return JSON.parse(text) as T;
    }

    // ❌ JSON이 아닌 경우
    throw new Error('응답이 JSON 형식이 아닙니다.');
  } catch (error) {
    console.error('API 요청 중 오류 발생:', error);
    throw error;
  }
};
