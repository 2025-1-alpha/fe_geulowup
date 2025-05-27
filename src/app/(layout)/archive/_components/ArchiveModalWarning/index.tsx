'use client';

import { useEffect } from 'react';
import IconTrashBig from '@/assets/icons/icon-trash-big.svg';

interface ArchiveModalWarningProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ArchiveModalWarning({
  isOpen,
  onConfirm,
  onCancel,
}: ArchiveModalWarningProps) {
  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCancel();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        backdropFilter: 'blur(4px)',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
      }}
    >
      {/* 400x240 외부 박스 */}
      <div className="rounded-lg bg-white shadow-lg" style={{ width: '400px', height: '240px' }}>
        {/* 368x208 내부 박스 - 16px 마진으로 배치 */}
        <div className="mx-4 my-4 flex h-52 flex-col" style={{ width: '368px', height: '208px' }}>
          {/* 상단 영역 - 아이콘과 텍스트를 왼쪽 정렬 */}
          <div className="flex flex-col items-start pt-4">
            {/* 60x60 navy4 원형 배경 + 휴지통 아이콘 */}
            <div className="bg-primary-navy4 flex h-15 w-15 items-center justify-center rounded-full">
              <IconTrashBig />
            </div>

            {/* 텍스트 - 8px 마진 후 */}
            <div className="mt-2">
              <p className="body-md-st text-layout-grey6">
                정말 삭제하시겠어요?
                <br />
                삭제한 파일은 되돌릴 수 없습니다.
              </p>
            </div>
          </div>

          {/* 하단 버튼들 - 오른쪽 정렬 */}
          <div className="flex flex-grow items-end justify-end">
            <div className="flex gap-2">
              <button
                className="border-primary-navy4 text-primary-navy4 hover:bg-layout-grey1 button-sm rounded-[5px] border bg-white px-4 py-2 transition-colors"
                onClick={onCancel}
              >
                취소
              </button>
              <button
                className="bg-primary-navy4 hover:bg-primary-navy5 button-sm rounded-[5px] px-4 py-2 text-white transition-colors"
                onClick={onConfirm}
              >
                삭제하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
