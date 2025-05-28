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
