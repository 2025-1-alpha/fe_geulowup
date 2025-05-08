'use client';

import { useRouter } from 'next/navigation';
import { Spacing } from '@/components/ui/Spacing';
import { Button } from '@/components/ui/Button';
import Logo from '@/assets/logo.svg';

export default function SignUpCompletePage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center">
      <div className="title-md flex">가입하신 것을 환영합니다!</div>
      <Spacing size={40} />
      <Logo className="scale-200" />
      <Spacing size={120} />
      <Button size="medium" onClick={() => router.push('/advice')}>
        지금 사용하러 가기
      </Button>
    </div>
  );
}
