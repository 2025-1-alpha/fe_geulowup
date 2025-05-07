'use client';

import { useRouter } from 'next/navigation';
import { useSignupStore } from '@/stores/signUpStore';
import { useState } from 'react';
import { Spacing } from '@/components/ui/Spacing';
import { Button } from '@/components/ui/Button';

export default function Step1() {
  const router = useRouter();
  const { setUsername } = useSignupStore();
  const [input, setInput] = useState('');

  const handleNext = () => {
    setUsername(input);
    router.push('/sign-up/step2');
  };

  return (
    <section>
      <div className="title-lg flex whitespace-pre-line">
        {`안녕하세요!
글로우업에서 사용할 이름을
입력해 주세요.`}
      </div>
      <Spacing size={148} />
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border-layout-grey5 body-lg w-100 rounded-md border px-3 py-2"
        placeholder="이름을 입력하세요"
      />
      <Spacing size={80} />
      <div className="flex w-full justify-end">
        <Button size="small" onClick={handleNext}>
          다음으로
        </Button>
      </div>
      <Spacing size={260} />
      {/* TODO : step bar 생성하기 */}
    </section>
  );
}
