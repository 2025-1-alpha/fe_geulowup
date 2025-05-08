'use client';

import { useRouter } from 'next/navigation';
import IconArrowBack from '@/assets/icons/icon-arrow-back.svg';

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="text-layout-grey6 h-8 w-8"
      aria-label="뒤로가기"
    >
      <IconArrowBack />
    </button>
  );
}
