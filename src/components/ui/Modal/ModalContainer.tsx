'use client';

import { useModalStore } from '@/stores/useModalStore';
import ViewModal from './ViewModal';
import { useEffect } from 'react';

export default function ModalContainer() {
  const { currentModal } = useModalStore();

  useEffect(() => {
    if (currentModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [currentModal]);

  if (!currentModal) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center">
      <div onClick={(e) => e.stopPropagation()}>{currentModal === 'view' && <ViewModal />}</div>
    </div>
  );
}
