interface CustomFetchOptions extends RequestInit {
  skipAuth?: boolean;
}

export const customFetch = async <T>(
  endpoint: string,
  options: CustomFetchOptions = {},
): Promise<T> => {
  const isAbsolute = /^https?:\/\//.test(endpoint);
  const url = isAbsolute ? endpoint : `/api${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;

  const headers = new Headers(options.headers || {});
  headers.set('Content-Type', 'application/json');

  if (typeof window !== 'undefined' && !options.skipAuth) {
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
  }

  const res = await fetch(url, {
    ...options,
    headers,
    credentials: options.skipAuth ? 'omit' : 'include',
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
