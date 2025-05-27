'use client';

import { useModalStore } from '@/stores/useModalStore';
import { useUnsaveModalStore } from '@/stores/useUnsaveModalStore';
import ViewModal from './ViewModal';
import EditModal from './EditModal';
import UsingModal from './UsingModal';
import UnSaveModal from './UnsaveModal';
import { useEffect } from 'react';

export default function ModalContainer() {
  const { currentModal, draftTitle, draftContent, draftTags, selectedTemplateId } = useModalStore();
  const { isUnsaveOpen } = useUnsaveModalStore();

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

  if (!currentModal && !isUnsaveOpen) return null;

  return (
    <>
      {/* 기본 모달들 */}
      {currentModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/25">
          <div onClick={(e) => e.stopPropagation()}>
            {currentModal === 'view' && <ViewModal />}
            {currentModal === 'create' && <EditModal mode="create" draftContent={draftContent} />}
            {currentModal === 'edit' && selectedTemplateId != null && (
              <EditModal
                mode="edit"
                selectedTemplateId={selectedTemplateId}
                draftTitle={draftTitle}
                draftContent={draftContent}
                draftTags={draftTags}
              />
            )}
            {currentModal === 'using' && <UsingModal />}
          </div>
        </div>
      )}

      {isUnsaveOpen && (
        <div className="fixed inset-0 z-[1010] flex items-center justify-center bg-black/40">
          <div onClick={(e) => e.stopPropagation()}>
            <UnSaveModal />
          </div>
        </div>
      )}
    </>
  );
}
