'use client';

import { Button } from '@/components/ui/Button';

export default function TestPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white">
      <h1 className="title-lg text-primary-navy4 mb-6 text-5xl font-bold">
        🎉 Tailwind 적용 성공!
      </h1>
      <p className="mb-4 text-lg">이 페이지가 잘 보이면 TailwindCSS가 정상 작동 중입니다.</p>

      <Button
        variant="grey"
        state="hover"
        size="medium"
        icon="add"
        onClick={() => alert('버튼 테스트')}
      >
        버튼 테스트
      </Button>
    </div>
  );
}
