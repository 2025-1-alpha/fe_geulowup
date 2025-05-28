'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Spacing } from '@/components/ui/Spacing';
import { Button } from '@/components/ui/Button';
import { StepBar } from '@/components/ui/StepBar';
import { useSignupStore } from '@/stores/signUpStore';
import { useSignUp } from '@/hooks/users/useSignUp';
import IconArrowDown from '@/assets/icons/icon-arrow-down.svg';
import IconArrowBack from '@/assets/icons/icon-arrow-back.svg';

const category = [
  [
    // TODO : svg로 아이콘 받으면 다시 넣기
    { label: '인사말', icon: IconArrowDown },
    { label: '자기소개', icon: IconArrowDown },
    { label: '사과문', icon: IconArrowDown },
    { label: '부탁글', icon: IconArrowDown },
    { label: '감사글', icon: IconArrowDown },
    { label: '제안글', icon: IconArrowDown },
    { label: '공지글', icon: IconArrowDown },
    { label: '소개글', icon: IconArrowDown },
  ],
  [
    { label: '후기작성', icon: IconArrowDown },
    { label: '소셜글', icon: IconArrowDown },
    { label: '고객상담', icon: IconArrowDown },
    { label: '교수문의', icon: IconArrowDown },
    { label: '조별활동', icon: IconArrowDown },
    { label: '공모전', icon: IconArrowDown },
    { label: '지원서', icon: IconArrowDown },
    { label: '기타', icon: IconArrowDown },
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
                    <Icon className="mr-2 h-5 w-5" />
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
