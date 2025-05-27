'use client';

import { useState, useEffect } from 'react';
import IconTrash from '@/assets/icons/icon-trash.svg';

// 타입 정의
type FolderState = 'default' | 'hover';

interface ArchiveFolderStatusProps {
  folderId: string;
  folderName: string;
  isSelected?: boolean;
  isDeletable?: boolean;
  onClick?: (folderId: string) => void;
  onDoubleClick?: (folderId: string) => void;
  onDelete?: (folderId: string) => void;
}

export default function ArchiveFolderStatus({
  folderId,
  folderName,
  isSelected = false,
  isDeletable = false,
  onClick,
  onDoubleClick,
  onDelete,
}: ArchiveFolderStatusProps) {
  const [currentState, setCurrentState] = useState<FolderState>('default');

  // isSelected가 변경될 때 내부 상태 초기화
  useEffect(() => {
    if (isSelected) {
      setCurrentState('default'); // 선택된 상태에서는 내부 상태를 default로 초기화
    }
  }, [isSelected]);

  const handleMouseEnter = () => {
    // 선택된 상태가 아닐 때만 hover 상태로 변경
    if (!isSelected) {
      setCurrentState('hover');
    }
  };

  const handleMouseLeave = () => {
    // 선택된 상태가 아닐 때만 default 상태로 변경
    if (!isSelected) {
      setCurrentState('default');
    }
  };

  const handleClick = () => {
    onClick?.(folderId);
  };

  const handleDoubleClick = () => {
    onDoubleClick?.(folderId);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 부모 클릭 이벤트 방지
    onDelete?.(folderId);
  };

  // 상태별 스타일 정의
  const getStateStyles = () => {
    // 선택된 상태가 최우선 (click 상태)
    if (isSelected) {
      return 'bg-transparent text-layout-grey7'; // click 상태: 배경색 투명, 글자색 grey7
    }

    // 선택되지 않은 상태에서만 hover/default 적용
    switch (currentState) {
      case 'hover':
        return 'bg-layout-grey3 text-layout-grey7'; // hover 상태: 배경색 grey3, 글자색 grey7
      default:
        return 'bg-transparent text-layout-grey5'; // default 상태: 배경색 투명, 글자색 grey5
    }
  };

  return (
    <button
      className={`group flex w-full items-center justify-between rounded-lg px-4 py-3 text-left transition-all duration-200 ${getStateStyles()}`}
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
