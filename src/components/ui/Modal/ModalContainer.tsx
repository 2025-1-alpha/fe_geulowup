'use client';

import { useModalStore } from '@/stores/useModalStore';
import ViewModal from './ViewModal';
import EditModal from './EditModal';
import { useEffect } from 'react';

export default function ModalContainer() {
  const { currentModal, draftTitle, draftContent, draftTags, selectedTemplateId } = useModalStore();

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
      <div onClick={(e) => e.stopPropagation()}>
        {currentModal === 'view' && <ViewModal />}
        {currentModal === 'create' && <EditModal mode="create" draftContent={draftContent} />}
        {currentModal === 'edit' && selectedTemplateId != null && <EditModal mode="edit" selectedTemplateId={selectedTemplateId} draftTitle={draftTitle} draftContent={draftContent} draftTags={draftTags}/>}
      </div>
    </div>
  );
}
