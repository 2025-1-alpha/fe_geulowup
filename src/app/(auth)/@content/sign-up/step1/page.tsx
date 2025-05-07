'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSignupStore } from '@/stores/signUpStore';
import { Spacing } from '@/components/ui/Spacing';
import { Button } from '@/components/ui/Button';
import { StepBar } from '@/components/ui/StepBar';

export default function Step1() {
  const router = useRouter();
  const { setUsername } = useSignupStore();
  const [input, setInput] = useState('');

  const handleNextBtn = () => {
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
        {input ? (
          <Button size="small" onClick={handleNextBtn}>
            다음으로
          </Button>
        ) : (
          <Button size="small" variant="disabled">
            다음으로
          </Button>
        )}
      </div>
      <Spacing size={260} />
      <StepBar maxStep={4} currentStep={1} />
    </section>
  );
}
