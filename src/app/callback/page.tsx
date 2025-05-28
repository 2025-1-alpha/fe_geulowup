'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { handleLoginSuccess } from '@/utils/loginHandler';

function CallbackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const type = searchParams.get('type');
    const accessToken = searchParams.get('token');

    switch (type) {
      case 'NEW_USER':
        router.replace('/sign-up/step1');

        if (accessToken) {
          localStorage.setItem('token', accessToken);
        } else {
          alert('다시 시도해 주세요!');
          router.replace('/login');
        }
        break;
      case 'SUCCESS':
      default:
        handleLoginSuccess(accessToken);
        router.replace('/advice');
        break;
    }
  }, [searchParams, router]);

  return <p>Redirecting...</p>;
}

export default function Callback() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <CallbackContent />
    </Suspense>
  );
}
