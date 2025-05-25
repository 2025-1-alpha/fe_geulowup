import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

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
      // Next.js 서버 컴포넌트와 호환되도록 localStorage 대신 sessionStorage 사용
      storage: createJSONStorage(() => ({
        getItem: (name: string) => {
          if (typeof window !== 'undefined') {
            const value = sessionStorage.getItem(name);
            return value ? JSON.parse(value) : null;
          }
          return null;
        },
        setItem: (name: string, value: string) => {
          if (typeof window !== 'undefined') {
            sessionStorage.setItem(name, JSON.stringify(value));
          }
        },
        removeItem: (name: string) => {
          if (typeof window !== 'undefined') {
            sessionStorage.removeItem(name);
          }
        },
      })),
    },
  ),
);
