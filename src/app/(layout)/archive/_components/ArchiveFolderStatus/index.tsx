'use client';

import { useState, useEffect, useRef } from 'react';
import IconTrash from '@/assets/icons/icon-trash.svg';

// 타입 정의
type FolderState = 'default' | 'hover' | 'click';

interface ArchiveFolderStatusProps {
  folderId: string;
  folderName: string;
  templateCount: number;
  isSelected?: boolean;
  isDeletable?: boolean;
  onClick?: (folderId: string) => void;
  onDoubleClick?: (folderId: string) => void;
  onDelete?: (folderId: string) => void;
}

export default function ArchiveFolderStatus({
  folderId,
  folderName,
  isDeletable = false,
  onClick,
  onDoubleClick,
  onDelete,
}: ArchiveFolderStatusProps) {
  const [currentState, setCurrentState] = useState<FolderState>('default');
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseEnter = () => {
    if (currentState !== 'click') {
      setCurrentState('hover');
    }
  };

  const handleMouseLeave = () => {
    if (currentState !== 'click') {
      setCurrentState('default');
    }
  };

  const handleClick = () => {
    setCurrentState('click');
    onClick?.(folderId);
  };

  const handleDoubleClick = () => {
    onDoubleClick?.(folderId);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 부모 클릭 이벤트 방지
    onDelete?.(folderId);
  };

  // 전역 클릭 이벤트 리스너로 클릭 상태 해제
  useEffect(() => {
    const handleGlobalClick = (event: MouseEvent) => {
      // 현재 버튼이 클릭된 것이 아니고, 클릭 상태인 경우에만 해제
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        currentState === 'click'
      ) {
        setCurrentState('default');
      }
    };

    // 전역 클릭 이벤트 리스너 등록
    document.addEventListener('click', handleGlobalClick);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener('click', handleGlobalClick);
    };
  }, [currentState]);

  // 상태별 스타일 정의
  const getStateStyles = () => {
    switch (currentState) {
      case 'hover':
        return 'bg-layout-grey3 text-layout-grey7';
      case 'click':
        return 'bg-transparent text-layout-grey7';
      default:
        return 'bg-transparent text-layout-grey5';
    }
  };

  return (
    <button
      ref={buttonRef}
      className={`group flex w-full items-center justify-between rounded-lg px-4 py-3 text-left transition-all duration-200 ${getStateStyles()} `}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      <span className="button-lg">{folderName}</span>

      {/* 삭제 버튼 - 삭제 가능한 폴더에만 표시 */}
      {isDeletable && (
        <div
          className="cursor-pointer p-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          onClick={handleDeleteClick}
        >
          <IconTrash className="text-layout-grey4 hover:text-red-500" />
        </div>
      )}
    </button>
  );
}
