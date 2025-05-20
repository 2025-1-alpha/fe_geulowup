# 쿠키 기반 인증 및 상태 관리 가이드

이 문서는 `cookieUtils.ts`에 구현된 쿠키 관련 유틸리티 함수들의 사용법을 설명합니다.

## 목차

1. [기본 쿠키 사용법](#1-기본-쿠키-사용법)
2. [JSON 데이터 저장](#2-json-데이터-저장)
3. [인증 토큰 관리](#3-인증-토큰-관리)
4. [보안 및 옵션 설정](#4-보안-및-옵션-설정)
5. [서버 컴포넌트에서 사용](#5-서버-컴포넌트에서-사용)

## 1. 기본 쿠키 사용법

```typescript
import { getCookie, setCookie, removeCookie, COOKIE_DEFAULTS } from '@/utils/cookieUtils';

// 쿠키 설정 - 기본
setCookie('myCookie', '쿠키값');

// 쿠키 설정 - 유효기간 지정
setCookie('tempCookie', '임시값', { 
  'max-age': COOKIE_DEFAULTS.MAX_AGE.ONE_DAY // 1일
});

// 쿠키 읽기
const value = getCookie('myCookie'); // '쿠키값' 또는 null (쿠키가 없는 경우)

// 쿠키 삭제
removeCookie('myCookie');
```

## 2. JSON 데이터 저장

객체나 배열 같은 복잡한 데이터를 쿠키에 저장할 때 사용합니다.

```typescript
import { getJSONCookie, setJSONCookie } from '@/utils/cookieUtils';

// JSON 데이터 설정
const userPrefs = { 
  theme: 'dark', 
  fontSize: 16,
  notifications: true 
};
setJSONCookie('userPrefs', userPrefs);

// JSON 데이터 읽기
const prefs = getJSONCookie('userPrefs');
if (prefs) {
  console.log(prefs.theme); // 'dark'
}
```

## 3. 인증 토큰 관리

Zustand 스토어를 통한 인증 상태 관리:

```typescript
import { useAuthStore } from '@/stores/useAuthStore';

// 컴포넌트 내부에서
const { token, setToken, clearToken } = useAuthStore();

// 로그인 성공 후 토큰 저장
setToken('eyJhbGciOiJIUzI1NiIsInR5cCI6...');

// 현재 토큰 확인
console.log(token);

// 로그아웃 (토큰 삭제)
clearToken();
```

또는 컴포넌트 외부에서 사용:

```typescript
import { useAuthStore } from '@/stores/useAuthStore';

// API 호출 함수 내부 등에서
const token = useAuthStore.getState().token;
const clearToken = useAuthStore.getState().clearToken;
```

## 4. 보안 및 옵션 설정

다양한 옵션으로 쿠키 보안을 강화할 수 있습니다:

```typescript
import { setCookie, COOKIE_DEFAULTS } from '@/utils/cookieUtils';

// 보안 강화 쿠키
setCookie('secureData', '민감한 정보', {
  'max-age': COOKIE_DEFAULTS.MAX_AGE.ONE_WEEK,
  secure: true,  // HTTPS에서만 전송
  sameSite: 'strict',  // CSRF 방어
  path: '/account'  // 특정 경로에서만 접근 가능
});
```

## 5. 서버 컴포넌트에서 사용

Next.js 서버 컴포넌트에서는 다음과 같이 사용합니다:

```typescript
// 서버 컴포넌트 (.server.ts 또는 Server Component)
import { cookies } from 'next/headers';

export async function getServerSideProps(context) {
  // 쿠키 읽기
  const token = cookies().get('auth-storage')?.value;
  
  if (!token) {
    return { redirect: { destination: '/login', permanent: false } };
  }
  
  // 토큰으로 데이터 조회
  const userData = await fetchUserData(token);
  
  return { props: { userData } };
}
```

## 참고 사항

- `HttpOnly` 옵션은 클라이언트에서 설정할 수 없으므로, 서버 측 응답에서 설정해야 합니다.
- 로컬 개발 환경에서는 `secure: true` 옵션이 적용되지 않습니다. 프로덕션 환경에서만 자동으로 활성화됩니다.
- 쿠키 관련 상수는 `COOKIE_DEFAULTS`에서 제공되며, 필요에 따라 값을 변경할 수 있습니다. 