'use client';

import { useState, useEffect } from 'react';
import {
  getCookie,
  setCookie,
  removeCookie,
  getJSONCookie,
  setJSONCookie,
  COOKIE_DEFAULTS,
} from '@/utils/cookieUtils';
import { useAuthStore } from '@/stores/useAuthStore';
import { useUserPreferences, useLikes, useDrafts, useSession } from '@/hooks/useCookieState';
import { userPrefsHelper, likesHelper } from '@/utils/cookieHelpers';
import { Spacing } from '@/components/ui/Spacing';

export default function CookieExamplePage() {
  const [basicCookie, setBasicCookie] = useState('');
  const [jsonCookie, setJsonCookie] = useState<{ name: string; value: number } | null>(null);
  const { token, setToken, clearToken } = useAuthStore();

  // 실제 사용 예제를 위한 훅들
  const { prefs, updatePrefs } = useUserPreferences();
  const { likes, toggleLike, isLiked } = useLikes();
  const { drafts, addDraft, removeDraft } = useDrafts();
  const { sessionData, visitPage } = useSession();

  // 페이지 로드 시 쿠키 상태 확인
  useEffect(() => {
    const cookieValue = getCookie('example-cookie');
    setBasicCookie(cookieValue || '');
    setJsonCookie(getJSONCookie('json-example'));

    // 세션 페이지 방문 기록
    visitPage('cookie-example');
  }, [visitPage]);

  // 실시간으로 변경된 쿠키 값을 보여주기 위한 폴링
  useEffect(() => {
    const interval = setInterval(() => {
      const cookieValue = getCookie('example-cookie');
      setBasicCookie(cookieValue || '');
      setJsonCookie(getJSONCookie('json-example'));
    }, 1000); // 1초마다 업데이트

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mx-auto mt-[100px] mb-[140px] max-w-4xl">
      <section className="flex flex-col items-center">
        <section className="w-full">
          <div className="h-[44px]">
            <p className="title-lg text-layout-grey7">쿠키 사용 예제</p>
          </div>
          <Spacing size={40} />

          <section className="bg-layout-grey1 mb-8 rounded-lg p-6">
            <h2 className="title-md text-layout-grey7 mb-4">1. 기본 쿠키 사용</h2>
            <div className="space-y-4">
              <div className="body-md bg-layout-white rounded p-4">
                <p>
                  현재 쿠키 값: <span className="font-mono">{basicCookie || '없음'}</span>
                </p>
              </div>
              <div className="code-block bg-layout-grey2 mb-4 overflow-x-auto rounded-md p-4">
                <pre className="text-sm">
                  {`// 쿠키 설정
setCookie('example-cookie', '테스트 값', { 
  'max-age': COOKIE_DEFAULTS.MAX_AGE.ONE_DAY 
});

// 쿠키 읽기
const value = getCookie('example-cookie');

// 쿠키 삭제
removeCookie('example-cookie');`}
                </pre>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setCookie('example-cookie', '테스트 값', {
                      'max-age': COOKIE_DEFAULTS.MAX_AGE.ONE_DAY,
                    });
                    setBasicCookie('테스트 값');
                  }}
                  className="bg-primary-navy4 rounded px-4 py-2 text-white"
                >
                  기본 쿠키 설정
                </button>
                <button
                  onClick={() => {
                    removeCookie('example-cookie');
                    setBasicCookie('');
                  }}
                  className="bg-layout-grey6 rounded px-4 py-2 text-white"
                >
                  쿠키 삭제
                </button>
              </div>
            </div>
          </section>

          <section className="bg-layout-grey1 mb-8 rounded-lg p-6">
            <h2 className="title-md text-layout-grey7 mb-4">2. JSON 쿠키 사용</h2>
            <div className="space-y-4">
              <div className="body-md bg-layout-white rounded p-4">
                <p>
                  현재 JSON 쿠키 값:{' '}
                  <span className="font-mono">
                    {jsonCookie ? JSON.stringify(jsonCookie) : '없음'}
                  </span>
                </p>
              </div>
              <div className="code-block bg-layout-grey2 mb-4 overflow-x-auto rounded-md p-4">
                <pre className="text-sm">
                  {`// JSON 데이터 설정
setJSONCookie('json-example', { name: '테스트 객체', value: 42 });

// JSON 데이터 읽기
const data = getJSONCookie('json-example');

// JSON 쿠키 삭제
removeCookie('json-example');`}
                </pre>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    const data = { name: '테스트 객체', value: Math.floor(Math.random() * 100) };
                    setJSONCookie('json-example', data);
                    setJsonCookie(data);
                  }}
                  className="bg-primary-navy4 rounded px-4 py-2 text-white"
                >
                  JSON 쿠키 설정
                </button>
                <button
                  onClick={() => {
                    removeCookie('json-example');
                    setJsonCookie(null);
                  }}
                  className="bg-layout-grey6 rounded px-4 py-2 text-white"
                >
                  JSON 쿠키 삭제
                </button>
              </div>
            </div>
          </section>

          <section className="bg-layout-grey1 mb-8 rounded-lg p-6">
            <h2 className="title-md text-layout-grey7 mb-4">3. Zustand 인증 스토어 사용</h2>
            <div className="space-y-4">
              <div className="body-md bg-layout-white rounded p-4">
                <p>
                  현재 인증 토큰: <span className="font-mono">{token || '없음'}</span>
                </p>
              </div>
              <div className="code-block bg-layout-grey2 mb-4 overflow-x-auto rounded-md p-4">
                <pre className="text-sm">
                  {`// useAuthStore에서 필요한 함수 불러오기
const { token, setToken, clearToken } = useAuthStore();

// 토큰 설정
setToken('사용자_인증_토큰');

// 토큰 삭제
clearToken();`}
                </pre>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => setToken(`token_${Date.now()}`)}
                  className="bg-primary-navy4 rounded px-4 py-2 text-white"
                >
                  토큰 설정
                </button>
                <button
                  onClick={clearToken}
                  className="bg-layout-grey6 rounded px-4 py-2 text-white"
                >
                  토큰 삭제
                </button>
              </div>
            </div>
          </section>

          <section className="bg-layout-grey1 mb-8 rounded-lg p-6">
            <h2 className="title-md text-layout-grey7 mb-4">
              4. 사용자 선호도 관리 (실제 사용 예제)
            </h2>
            <div className="space-y-4">
              <div className="body-md bg-layout-white rounded p-4">
                <p>
                  현재 테마: <span className="font-mono">{prefs?.theme || 'light'}</span>
                </p>
                <p>
                  폰트 크기: <span className="font-mono">{prefs?.fontSize || 16}px</span>
                </p>
                <p>
                  AI 모드: <span className="font-mono">{prefs?.aiMode ? 'ON' : 'OFF'}</span>
                </p>
              </div>
              <div className="code-block bg-layout-grey2 mb-4 overflow-x-auto rounded-md p-4">
                <pre className="text-sm">
                  {`// 사용자 선호도 훅 사용
import { useUserPreferences } from '@/hooks/useCookieState';

const { prefs, updatePrefs } = useUserPreferences();

// 테마 변경
updatePrefs({ theme: 'dark' });

// 여러 설정 동시 변경
updatePrefs({ fontSize: 18, aiMode: true });`}
                </pre>
              </div>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => updatePrefs({ theme: prefs?.theme === 'dark' ? 'light' : 'dark' })}
                  className="bg-primary-navy4 rounded px-4 py-2 text-white"
                >
                  테마 토글
                </button>
                <button
                  onClick={() => updatePrefs({ fontSize: (prefs?.fontSize || 16) + 2 })}
                  className="bg-primary-navy4 rounded px-4 py-2 text-white"
                >
                  폰트 크기 증가
                </button>
                <button
                  onClick={() => updatePrefs({ aiMode: !prefs?.aiMode })}
                  className="bg-primary-navy4 rounded px-4 py-2 text-white"
                >
                  AI 모드 토글
                </button>
              </div>
            </div>
          </section>

          <section className="bg-layout-grey1 mb-8 rounded-lg p-6">
            <h2 className="title-md text-layout-grey7 mb-4">5. 찜하기 기능 (실제 사용 예제)</h2>
            <div className="space-y-4">
              <div className="body-md bg-layout-white rounded p-4">
                <p>
                  찜한 템플릿: <span className="font-mono">{likes.join(', ') || '없음'}</span>
                </p>
                <p>
                  총 찜한 개수: <span className="font-mono">{likes.length}개</span>
                </p>
              </div>
              <div className="code-block bg-layout-grey2 mb-4 overflow-x-auto rounded-md p-4">
                <pre className="text-sm">
                  {`// 찜하기 훅 사용
import { useLikes } from '@/hooks/useCookieState';

const { likes, toggleLike, isLiked } = useLikes();

// 찜하기/해제
toggleLike(templateId);

// 찜 상태 확인
const liked = isLiked(templateId);`}
                </pre>
              </div>
              <div className="flex flex-wrap gap-4">
                {[101, 102, 103, 104].map((templateId) => (
                  <button
                    key={templateId}
                    onClick={() => toggleLike(templateId)}
                    className={`rounded px-4 py-2 text-white ${
                      isLiked(templateId) ? 'bg-red-500' : 'bg-primary-navy4'
                    }`}
                  >
                    템플릿 {templateId} {isLiked(templateId) ? '찜 해제' : '찜하기'}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-layout-grey1 mb-8 rounded-lg p-6">
            <h2 className="title-md text-layout-grey7 mb-4">6. 드래프트 저장 (실제 사용 예제)</h2>
            <div className="space-y-4">
              <div className="body-md bg-layout-white rounded p-4">
                <p>
                  저장된 드래프트: <span className="font-mono">{drafts.length}개</span>
                </p>
                <div className="mt-2 space-y-1">
                  {drafts.slice(0, 3).map((draft) => (
                    <div key={draft.id} className="flex items-center justify-between text-sm">
                      <span>{draft.content.slice(0, 30)}...</span>
                      <button
                        onClick={() => removeDraft(draft.id)}
                        className="text-xs text-red-500"
                      >
                        삭제
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="code-block bg-layout-grey2 mb-4 overflow-x-auto rounded-md p-4">
                <pre className="text-sm">
                  {`// 드래프트 훅 사용
import { useDrafts } from '@/hooks/useCookieState';

const { drafts, addDraft, removeDraft } = useDrafts();

// 드래프트 저장
const draftId = addDraft({
  title: '제목',
  content: '내용',
  tags: ['태그1', '태그2'],
  sourcePageId: 'advice'
});`}
                </pre>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() =>
                    addDraft({
                      title: `테스트 드래프트 ${Date.now()}`,
                      content: `이것은 테스트 드래프트입니다. 생성 시간: ${new Date().toLocaleString()}`,
                      tags: ['테스트', '예제'],
                      sourcePageId: 'advice',
                    })
                  }
                  className="bg-primary-navy4 rounded px-4 py-2 text-white"
                >
                  드래프트 추가
                </button>
              </div>
            </div>
          </section>

          <section className="bg-layout-grey1 mb-8 rounded-lg p-6">
            <h2 className="title-md text-layout-grey7 mb-4">7. 세션 정보 (실제 사용 예제)</h2>
            <div className="space-y-4">
              <div className="body-md bg-layout-white rounded p-4">
                <p>
                  세션 ID:{' '}
                  <span className="font-mono text-xs">{sessionData?.sessionId || '없음'}</span>
                </p>
                <p>
                  마지막 활동:{' '}
                  <span className="font-mono">
                    {sessionData?.lastActiveAt
                      ? new Date(sessionData.lastActiveAt).toLocaleString()
                      : '없음'}
                  </span>
                </p>
                <p>페이지 방문 횟수:</p>
                <div className="ml-4 text-sm">
                  {sessionData?.pageVisitCount &&
                    Object.entries(sessionData.pageVisitCount).map(([page, count]) => (
                      <div key={page}>
                        {page}: {count}회
                      </div>
                    ))}
                </div>
              </div>
              <div className="code-block bg-layout-grey2 mb-4 overflow-x-auto rounded-md p-4">
                <pre className="text-sm">
                  {`// 세션 훅 사용
import { useSession } from '@/hooks/useCookieState';

const { sessionData, visitPage } = useSession();

// 페이지 방문 기록
visitPage('advice');
visitPage('explore');`}
                </pre>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => visitPage('advice')}
                  className="bg-primary-navy4 rounded px-4 py-2 text-white"
                >
                  Advice 방문
                </button>
                <button
                  onClick={() => visitPage('explore')}
                  className="bg-primary-navy4 rounded px-4 py-2 text-white"
                >
                  Explore 방문
                </button>
              </div>
            </div>
          </section>

          <section className="bg-layout-grey1 rounded-lg p-6">
            <h2 className="title-md text-layout-grey7 mb-4">
              8. 직접 헬퍼 함수 사용 (고급 사용법)
            </h2>
            <div className="space-y-4">
              <div className="body-md bg-layout-white rounded p-4">
                <p>React Hook 없이 직접 쿠키 헬퍼 함수를 사용하는 방법입니다.</p>
              </div>
              <div className="code-block bg-layout-grey2 mb-4 overflow-x-auto rounded-md p-4">
                <pre className="text-sm">
                  {`// 헬퍼 함수 직접 사용
import { userPrefsHelper, likesHelper } from '@/utils/cookieHelpers';

// 사용자 설정 직접 조작
const prefs = userPrefsHelper.get();
userPrefsHelper.update({ theme: 'dark' });

// 찜하기 직접 조작
likesHelper.add(123);
const isLiked = likesHelper.isLiked(123);`}
                </pre>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    userPrefsHelper.update({ theme: 'dark', fontSize: 20 });
                    alert('사용자 설정이 직접 업데이트되었습니다.');
                  }}
                  className="bg-primary-navy4 rounded px-4 py-2 text-white"
                >
                  직접 설정 변경
                </button>
                <button
                  onClick={() => {
                    likesHelper.add(999);
                    alert('템플릿 999가 직접 찜 목록에 추가되었습니다.');
                  }}
                  className="bg-primary-navy4 rounded px-4 py-2 text-white"
                >
                  직접 찜하기
                </button>
              </div>
            </div>
          </section>
        </section>
      </section>
    </div>
  );
}
