const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface CustomFetchOptions extends RequestInit {
  skipAuth?: boolean;
}

export const customFetch = async <T>(
  endpoint: string,
  options: CustomFetchOptions = {},
): Promise<T> => {
  const url = `${BASE_URL}${endpoint}`;
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
      }
    }
    throw new Error(`API 요청 실패: ${res.status}`);
  }

  return res.json();
};
