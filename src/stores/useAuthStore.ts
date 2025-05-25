import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthState {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
}

// 쿠키 옵션 인터페이스 정의
interface CookieOptions {
  path?: string;
  expires?: Date | string;
  'max-age'?: number;
  domain?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
  [key: string]: string | number | boolean | Date | undefined;
}

// 쿠키 기반 헬퍼 함수
const getCookie = (name: string): string | null => {
  if (typeof document !== 'undefined') {
    const matches = document.cookie.match(
      new RegExp(`(?:^|; )${name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1')}=([^;]*)`),
    );
    return matches ? decodeURIComponent(matches[1]) : null;
  }
  return null;
};

const setCookie = (name: string, value: string, options: CookieOptions = {}): void => {
  if (typeof document !== 'undefined') {
    options = {
      path: '/',
      ...options,
    };

    if (options.expires instanceof Date) {
      options.expires = options.expires.toUTCString();
    }

    let updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    for (const optionKey in options) {
      updatedCookie += `; ${optionKey}`;
      const optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += `=${optionValue}`;
      }
    }

    document.cookie = updatedCookie;
  }
};

const removeCookie = (name: string): void => {
  if (typeof document !== 'undefined') {
    setCookie(name, '', {
      'max-age': -1,
    });
  }
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token) => set({ token }),
      clearToken: () => set({ token: null }),
    }),
    {
      name: 'auth-storage',
      // 쿠키 기반 스토리지로 변경
      storage: createJSONStorage(() => ({
        getItem: (name: string) => {
          const value = getCookie(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: (name: string, value: string) => {
          setCookie(name, JSON.stringify(value), {
            'max-age': 60 * 60 * 24 * 7, // 7일 유효
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
          });
        },
        removeItem: (name: string) => {
          removeCookie(name);
        },
      })),
    },
  ),
);
