'use client';

import Image from 'next/image';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

type Props = {
  children: ReactNode;
};

const imageMap: { [key: string]: string } = {
  '/login': '/images/login-image.png',
  '/signup/step1': '/images/signUp-image1.png',
  '/signup/step2': '/images/signUp-image1.png',
  '/signup/step3': '/images/signUp-image2.png',
  '/signup/complete': '/images/signUp-image2.png',
};

export default function AuthLayout({ children }: Props) {
  const path = usePathname();
  const imageSrc = imageMap[path] || '/images/default.png';

  return (
    <div className="flex min-h-screen">
      <div className="flex w-1/2 items-center justify-center">{children}</div>

      <div className="relative w-1/2">
        <Image src={imageSrc} alt="페이지 이미지" fill className="object-cover" />
      </div>
    </div>
  );
}
