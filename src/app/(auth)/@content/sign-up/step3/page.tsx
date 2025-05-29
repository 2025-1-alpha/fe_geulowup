'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Spacing } from '@/components/ui/Spacing';
import { Button } from '@/components/ui/Button';
import { StepBar } from '@/components/ui/StepBar';
import { useSignupStore } from '@/stores/signUpStore';
import { useSignUp } from '@/hooks/users/useSignUp';
import IconArrowBack from '@/assets/icons/icon-arrow-back.svg';
import IconLogin1 from '@/assets/icons/icon-login1.svg';
import IconLogin2 from '@/assets/icons/icon-login2.svg';
import IconLogin3 from '@/assets/icons/icon-login3.svg';
import IconLogin4 from '@/assets/icons/icon-login4.svg';
import IconLogin5 from '@/assets/icons/icon-login5.svg';
import IconLogin6 from '@/assets/icons/icon-login6.svg';
import IconLogin7 from '@/assets/icons/icon-login7.svg';
import IconLogin8 from '@/assets/icons/icon-login8.svg';
import IconLogin9 from '@/assets/icons/icon-login9.svg';
import IconLogin10 from '@/assets/icons/icon-login10.svg';
import IconLogin11 from '@/assets/icons/icon-login11.svg';
import IconLogin12 from '@/assets/icons/icon-login12.svg';
import IconLogin13 from '@/assets/icons/icon-login13.svg';
import IconLogin14 from '@/assets/icons/icon-login14.svg';
import IconLogin15 from '@/assets/icons/icon-login15.svg';
import IconLogin16 from '@/assets/icons/icon-login16.svg';

const category = [
  [
    { label: '인사말', icon: IconLogin1 },
    { label: '자기소개', icon: IconLogin2 },
    { label: '사과문', icon: IconLogin3 },
    { label: '부탁글', icon: IconLogin4 },
    { label: '감사글', icon: IconLogin5 },
    { label: '제안글', icon: IconLogin6 },
    { label: '공지글', icon: IconLogin7 },
    { label: '소개글', icon: IconLogin8 },
  ],
  [
    { label: '후기작성', icon: IconLogin9 },
    { label: '소셜글', icon: IconLogin10 },
    { label: '고객상담', icon: IconLogin11 },
    { label: '교수문의', icon: IconLogin12 },
    { label: '조별활동', icon: IconLogin13 },
    { label: '공모전', icon: IconLogin14 },
    { label: '지원서', icon: IconLogin15 },
    { label: '기타', icon: IconLogin16 },
  ],
];

export default function Step1() {
  const router = useRouter();
  const { username, role, preferences, setPreferences, clearPreferences } = useSignupStore();
  const { mutate: signUp } = useSignUp();

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));
  const handleNext = () => setCurrentIndex((prev) => Math.min(prev + 1, category.length - 1));
  const handleIndicatorClick = (index: number) => setCurrentIndex(index);

  const handleSkipBtn = () => {
    clearPreferences();
    router.push('/sign-up-complete');
  };

  const handleNextBtn = () => {
    router.push('/sign-up-complete');
  };

  const handleSignUp = () => {
    signUp({
      name: username,
      job: role,
      tags: preferences,
    });

    localStorage.setItem('user', JSON.stringify({ name: username }));
  };

  return (
    <section>
      <div className="title-lg flex whitespace-pre-line">
        {`관심 있는 카테고리를
        3개 이상 선택해 주세요.`}
      </div>
      <Spacing size={78} />
      <div className="w-[520px] overflow-hidden">
        <div
          className="flex transition-transform duration-300"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {category.map((categories, index) => (
            <div key={index} className="grid w-full shrink-0 grid-cols-2 gap-x-2 gap-y-3">
              {categories.map(({ label, icon: Icon }) => {
                const isActive = preferences.includes(label);
                return (
                  <button
                    key={label}
                    onClick={() => setPreferences(label)}
                    className={`title-sm border-primary-navy4 flex h-[68px] items-center justify-center rounded-md border py-3 font-medium transition-colors ${
                      isActive
                        ? 'bg-primary-navy4 text-layout-grey1'
                        : 'bg-primary-navy1 text-primary-navy4 hover:bg-primary-navy2'
                    } `}
                  >
                    <Icon className={`mr-2 h-6 w-6 ${isActive && 'brightness-0 invert'}`} />
                    {label}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* 인디케이터 */}
      <div className="mt-1 flex items-center justify-between">
        <button onClick={() => handlePrev()}>
          <IconArrowBack className="ml-1 scale-75" />
        </button>
        <div className="flex items-center justify-center space-x-2">
          {category.map((_, index) => (
            <button
              key={index}
              onClick={() => handleIndicatorClick(index)}
              className={`h-3 w-3 rounded-full ${
                currentIndex === index ? 'bg-primary-navy3 w-6' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        <button onClick={() => handleNext()}>
          <IconArrowBack className="mr-1 scale-75 rotate-180" />
        </button>
      </div>
      <Spacing size={40} />
      <div className="flex w-full justify-between">
        <Button
          size="small"
          state="line"
          onClick={() => {
            handleSkipBtn();
            handleSignUp();
          }}
        >
          건너뛰기
        </Button>
        {preferences.length >= 3 ? (
          <Button
            size="small"
            onClick={() => {
              handleNextBtn();
              handleSignUp();
            }}
          >
            다음으로
          </Button>
        ) : (
          <Button size="small" variant="disabled">
            다음으로
          </Button>
        )}
      </div>
      <Spacing size={120} />
      <StepBar currentStep={3} maxStep={4} />
    </section>
  );
}
