'use client';

import { useRouter } from 'next/navigation';
import { useSignupStore } from '@/stores/signUpStore';
import { Spacing } from '@/components/ui/Spacing';
import { Button } from '@/components/ui/Button';
import { StepBar } from '@/components/ui/StepBar';
import { RoleCard } from './_components/roleCard';

const roleList = [
  { label: '학생', icon: '✏️', color: 'purple' },
  { label: '직장인', icon: '👔', color: 'navy' },
  { label: '자영업자', icon: '👤', color: 'green' },
  { label: '기타', icon: '💬', color: 'pink' },
];

export default function Step2() {
  const router = useRouter();
  const { username, setRole, role, clearRole } = useSignupStore();

  const handleSkipBtn = () => {
    clearRole();
    router.push('/sign-up/step3');
  };

  const handleNextBtn = () => {
    router.push('/sign-up/step3');
  };

  return (
    <section>
      <div className="title-lg flex whitespace-pre-line">
        {`${username}님, 반갑습니다!
어떤 일을 하고 계신가요?`}
      </div>
      <Spacing size={64} />
      {/* TODO : 아이콘 넣을 수 있도록 변경하기 */}
      <div className="grid w-full grid-cols-2 gap-3">
        {roleList.map(({ label, icon, color }) => (
          <RoleCard
            key={label}
            label={label}
            icon={icon}
            color={color as 'purple' | 'navy' | 'green' | 'pink'}
            selected={role === label}
            onClick={() => setRole(label)}
          />
        ))}
      </div>
      <Spacing size={40} />
      <div className="flex w-full justify-between">
        <Button size="small" state="line" onClick={handleSkipBtn}>
          건너뛰기
        </Button>
        {role ? (
          <Button size="small" onClick={handleNextBtn}>
            다음으로
          </Button>
        ) : (
          <Button size="small" variant="disabled">
            다음으로
          </Button>
        )}
      </div>
      <Spacing size={180} />

      <StepBar currentStep={2} maxStep={4} />
    </section>
  );
}
