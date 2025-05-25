# 🍪 쿠키 사용 예제 페이지

이 페이지는 프로젝트에서 사용하는 모든 쿠키 관련 기능들의 실제 동작 예제를 제공합니다.

## 📋 제공하는 예제들

### 1. 기본 쿠키 사용
- `setCookie()`, `getCookie()`, `removeCookie()` 기본 함수 사용법
- 쿠키 옵션 설정 (만료시간, 경로 등)

### 2. JSON 쿠키 사용
- `setJSONCookie()`, `getJSONCookie()` 함수로 객체 데이터 저장
- 복잡한 데이터 구조 쿠키 관리

### 3. 인증 토큰 관리
- `useAuthStore` Zustand 스토어 사용법
- 토큰 설정/삭제 및 상태 확인

### 4. 사용자 선호도 관리 ⭐ NEW
- 테마, 폰트 크기, AI 모드 등 사용자 설정
- `useUserPreferences` 훅 사용법

### 5. 찜하기 기능 ⭐ NEW
- 템플릿 찜하기/해제 기능
- `useLikes` 훅으로 찜 상태 관리

### 6. 드래프트 저장 ⭐ NEW
- 임시 저장 기능 구현
- `useDrafts` 훅으로 드래프트 관리

### 7. 세션 정보 ⭐ NEW
- 페이지 방문 기록, 세션 ID 관리
- `useSession` 훅 사용법

### 8. 직접 헬퍼 함수 사용 ⭐ NEW
- React Hook 없이 직접 쿠키 조작
- 고급 사용법 및 커스터마이징

## 🚀 다른 페이지에서 사용하는 방법

### React Hook 사용 (권장)
```typescript
// 사용자 선호도
import { useUserPreferences } from '@/hooks/useCookieState';
const { prefs, updatePrefs } = useUserPreferences();

// 찜하기
import { useLikes } from '@/hooks/useCookieState';
const { likes, toggleLike, isLiked } = useLikes();

// 드래프트
import { useDrafts } from '@/hooks/useCookieState';
const { drafts, addDraft, removeDraft } = useDrafts();
```

### 직접 헬퍼 함수 사용
```typescript
import { userPrefsHelper, likesHelper, draftHelper } from '@/utils/cookieHelpers';

// 직접 조작
userPrefsHelper.update({ theme: 'dark' });
likesHelper.add(templateId);
draftHelper.add({ title: '제목', content: '내용', tags: [], sourcePageId: 'advice' });
```

## 📁 관련 파일 구조

```
src/
├── types/cookieTypes.ts          # 쿠키 데이터 타입 정의
├── constants/cookieKeys.ts       # 쿠키 키 상수
├── utils/
│   ├── cookieUtils.ts           # 기본 쿠키 유틸리티
│   └── cookieHelpers.ts         # 도메인별 헬퍼 함수
├── hooks/useCookieState.ts      # React Hook들
└── stores/useAuthStore.ts       # 인증 스토어
```

## 🎯 각 페이지별 활용 예시

### advice 페이지
```typescript
import { useAdviceState, useDrafts } from '@/hooks/useCookieState';

// 페이지 상태 저장
const { state, updateState } = useAdviceState();
updateState({ lastDraftContent: content, aiModeEnabled: true });

// 드래프트 자동 저장
const { addDraft } = useDrafts();
addDraft({ content, sourcePageId: 'advice' });
```

### explore 페이지
```typescript
import { useExploreState, useLikes } from '@/hooks/useCookieState';

// 검색/필터 상태 저장
const { state, updateState } = useExploreState();
updateState({ selectedTags: ['태그1'], sortType: 'popular' });

// 찜하기 기능
const { toggleLike, isLiked } = useLikes();
```

### archive 페이지
```typescript
import { useLikes, useDrafts } from '@/hooks/useCookieState';

// 찜한 템플릿 목록 표시
const { likes } = useLikes();

// 저장된 드래프트 목록 표시
const { drafts } = useDrafts();
```

## 🔧 커스터마이징

새로운 쿠키 데이터 타입이 필요한 경우:

1. `src/types/cookieTypes.ts`에 인터페이스 추가
2. `src/constants/cookieKeys.ts`에 키 상수 추가
3. `src/utils/cookieHelpers.ts`에 헬퍼 함수 추가
4. `src/hooks/useCookieState.ts`에 React Hook 추가

## 🐛 디버깅

- 브라우저 개발자 도구 > Application > Cookies에서 실제 쿠키 확인
- 콘솔에서 `document.cookie`로 모든 쿠키 확인
- 각 예제 버튼을 클릭하여 실시간으로 쿠키 변화 확인

## ⚠️ 주의사항

- 쿠키는 4KB 제한이 있으므로 큰 데이터는 적절히 분할
- 민감한 정보는 쿠키에 저장하지 말 것
- 개발 환경에서는 `secure: false`, 프로덕션에서는 `secure: true`
- 페이지별 쿠키는 해당 경로에서만 접근 가능 