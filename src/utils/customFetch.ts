import { useAuthStore } from '@/stores/useAuthStore';

interface CustomFetchOptions extends RequestInit {
  skipAuth?: boolean;
}

export const customFetch = async <T>(
  endpoint: string,
  options: CustomFetchOptions = {},
): Promise<T | undefined> => {
  const isAbsolute = /^https?:\/\//.test(endpoint);
  const url = isAbsolute ? endpoint : `/api${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;

  const headers = new Headers(options.headers || {});
  headers.set('Content-Type', 'application/json');

  const res = await fetch(url, {
    ...options,
    headers,
    credentials: 'include',
  });

  if (!res.ok) {
    if (res.status === 401 && !options.skipAuth) {
      if (typeof window !== 'undefined') {
        window.location.replace('/login');
        useAuthStore.getState().clearToken();
      }
    }
    throw new Error(`API 요청 실패: ${res.status}`);
  }

  const contentType = res.headers.get('Content-Type');
  if (contentType?.includes('application/json')) {
    const text = await res.text();
    return text ? JSON.parse(text) : undefined;
  }

  return undefined;
};
