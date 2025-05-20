// 쿠키 옵션 인터페이스 정의
export interface CookieOptions {
  path?: string;
  expires?: Date | string;
  'max-age'?: number;
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
  [key: string]: string | number | boolean | Date | undefined;
}

// 쿠키 관련 상수
export const COOKIE_DEFAULTS = {
  PATH: '/',
  MAX_AGE: {
    ONE_DAY: 60 * 60 * 24,
    ONE_WEEK: 60 * 60 * 24 * 7,
    ONE_MONTH: 60 * 60 * 24 * 30,
  },
  SAME_SITE: 'strict' as const,
};

// 쿠키 기반 헬퍼 함수
export const getCookie = (name: string): string | null => {
  try {
    if (typeof document !== 'undefined') {
      const matches = document.cookie.match(
        new RegExp(`(?:^|; )${name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1')}=([^;]*)`),
      );
      return matches ? decodeURIComponent(matches[1]) : null;
    }
  } catch (error) {
    console.error('쿠키 읽기 오류:', error);
  }
  return null;
};

export const setCookie = (name: string, value: string, options: CookieOptions = {}): void => {
  try {
    if (typeof document !== 'undefined') {
      options = {
        path: COOKIE_DEFAULTS.PATH,
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
  } catch (error) {
    console.error('쿠키 설정 오류:', error);
  }
};

export const removeCookie = (name: string): void => {
  try {
    if (typeof document !== 'undefined') {
      setCookie(name, '', {
        'max-age': -1,
      });
    }
  } catch (error) {
    console.error('쿠키 삭제 오류:', error);
  }
};

// JSON 데이터를 쿠키에 저장/불러오는 유틸리티 함수
export const getJSONCookie = <T>(name: string): T | null => {
  try {
    const value = getCookie(name);
    return value ? (JSON.parse(value) as T) : null;
  } catch (error) {
    console.error('JSON 쿠키 파싱 오류:', error);
    return null;
  }
};

export const setJSONCookie = <T>(name: string, value: T, options: CookieOptions = {}): void => {
  try {
    setCookie(name, JSON.stringify(value), options);
  } catch (error) {
    console.error('JSON 쿠키 저장 오류:', error);
  }
};
