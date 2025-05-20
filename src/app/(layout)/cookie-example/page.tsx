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
import { Spacing } from '@/components/ui/Spacing';

export default function CookieExamplePage() {
  const [basicCookie, setBasicCookie] = useState('');
  const [jsonCookie, setJsonCookie] = useState<{ name: string; value: number } | null>(null);
  const { token, setToken, clearToken } = useAuthStore();

  // 페이지 로드 시 쿠키 상태 확인
  useEffect(() => {
    const cookieValue = getCookie('example-cookie');
    setBasicCookie(cookieValue || '');
    setJsonCookie(getJSONCookie('json-example'));
  }, []);

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

          <section className="bg-layout-grey1 rounded-lg p-6">
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
        </section>
      </section>
    </div>
  );
}
