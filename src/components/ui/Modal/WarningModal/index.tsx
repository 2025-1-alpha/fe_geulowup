import React from 'react';
import IconTrash from '@/assets/icons/icon-trash.svg';

interface WarningModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const WarningModal: React.FC<WarningModalProps> = ({ isOpen, onClose, onDelete }) => {
  if (!isOpen) return null;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div
      className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div
        className="relative h-[240px] w-[400px] rounded-[7px] bg-white p-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 원형 아이콘 */}
        <div
          className="flex h-[60px] w-[60px] items-center justify-center rounded-full"
          style={{ backgroundColor: 'layout color/navy4' }}
        >
          <IconTrash width={16} height={16} color="layout color/navy1" />
        </div>

        {/* 텍스트 블록 */}
        <div className="mt-4 ml-2">
          <h3
            style={{
              fontFamily: 'Pretendard',
              fontSize: '20px',
              fontWeight: 'bold',
              color: 'layout color/grey6',
            }}
          >
            정말 삭제하시겠어요?
          </h3>
          <p
            className="mt-2"
            style={{
              fontFamily: 'Pretendard',
              fontSize: '16px',
              color: 'layout color/grey6',
            }}
          >
            삭제한 파일은 되돌릴 수 없습니다.
          </p>
        </div>

        {/* 버튼 블록 */}
        <div className="absolute right-4 bottom-4 flex space-x-2">
          <button
            className="rounded px-4 py-2"
            style={{
              border: '1px solid layout color/navy4',
              color: 'layout color/navy4',
              background: 'transparent',
              fontFamily: 'Pretendard',
              fontSize: '14px',
            }}
            onClick={onClose}
          >
            취소
          </button>
          <button
            className="rounded px-4 py-2 text-white"
            style={{
              backgroundColor: 'layout color/navy4',
              fontFamily: 'Pretendard',
              fontSize: '14px',
            }}
            onClick={onDelete}
          >
            삭제하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default WarningModal;
