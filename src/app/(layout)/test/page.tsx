'use client';

import { Button } from '@/components/ui/Button';
import ToggleButton from '@/components/ui/Toggle';

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-10 text-black">
      <h1 className="mb-10 text-center text-4xl font-bold text-white">카드 인터랙션 테스트</h1>

      <Button
        variant="primary"
        state=""
        size="medium"
        icon="dropdown"
        onClick={() => alert('버튼 테스트')}
      >
        버튼 테스트
      </Button>
      <ToggleButton />
    </div>
  );
}
