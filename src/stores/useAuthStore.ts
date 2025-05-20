import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { removeCookie, COOKIE_DEFAULTS, getJSONCookie, setJSONCookie } from '@/utils/cookieUtils';

interface AuthState {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
}

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
          return getJSONCookie(name);
        },
        setItem: (name: string, value: string) => {
          setJSONCookie(name, value, {
            'max-age': COOKIE_DEFAULTS.MAX_AGE.ONE_WEEK,
            sameSite: COOKIE_DEFAULTS.SAME_SITE,
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
