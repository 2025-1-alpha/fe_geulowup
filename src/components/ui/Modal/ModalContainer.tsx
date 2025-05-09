'use client';

import { useModalStore } from '@/stores/useModalStore';
import ViewModal from './ViewModal';

export default function ModalContainer() {
  const { currentModal } = useModalStore();

  if (!currentModal) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center">
      {currentModal === 'view' && <ViewModal />}
    </div>
  );
}
