'use client';

import React from 'react';
import Card from '@/components/ui/Card';

const variants = ['large', 'medium', 'small', 'promote'] as const;

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-10 text-black">
      <h1 className="mb-10 text-center text-4xl font-bold text-white">카드 인터랙션 테스트</h1>

      <div className="flex flex-col gap-16">
        {variants.map((variant) => (
          <div key={variant}>
            <h2 className="mb-4 text-2xl font-semibold text-white">Variant: {variant}</h2>
            <Card
              variant={variant}
              title="글로우업을 소개하기"
              description="안녕하세요 잘 부탁드립니다. 글로우업 글쓰기 서비스는 여러 상황에서 사용자의 글쓰기 경험을 돕고자 합니다."
              tags={['정중하게', '상사에게']}
              likes={100}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
