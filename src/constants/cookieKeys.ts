// 쿠키 키 상수 정의
export const COOKIE_KEYS = {
  // 인증 관련
  AUTH: 'auth-storage',

  // 사용자 설정
  USER_PREFS: 'user-preferences',

  // 페이지별 상태
  ADVICE_STATE: 'advice-state',
  EXPLORE_STATE: 'explore-state',
  ARCHIVE_STATE: 'archive-state',

  // 사용자 데이터
  USER_LIKES: 'user-likes',
  DRAFT_STORAGE: 'draft-storage',

  // 세션 관련
  SESSION_DATA: 'session-data',
} as const;

// 쿠키 키 타입
export type CookieKey = (typeof COOKIE_KEYS)[keyof typeof COOKIE_KEYS];
