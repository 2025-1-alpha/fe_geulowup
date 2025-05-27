'use client';

import { useState, useEffect, useRef } from 'react';

// 타입 정의
type FolderEditState = 'default' | 'enabled' | 'wrote';

interface ArchiveFolderInputProps {
  mode?: 'create' | 'edit';
  initialValue?: string;
  initialState?: FolderEditState;
  onSave?: (folderName: string) => void;
  onCancel?: () => void;
}

export default function ArchiveFolderInput({
  initialValue = '',
  initialState = 'default',
  onSave,
  onCancel,
}: ArchiveFolderInputProps) {
  const [currentState, setCurrentState] = useState<FolderEditState>(initialState);
  const [inputValue, setInputValue] = useState(initialValue);
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // enabled 상태일 때 input에 포커스
  useEffect(() => {
    if (currentState === 'enabled' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentState]);

  // 외부 클릭 시 상태 초기화
  useEffect(() => {
    const handleGlobalClick = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        if (currentState === 'enabled' && inputValue.trim() === '') {
          setCurrentState('default');
        } else if (currentState === 'enabled' && inputValue.trim() !== '') {
          setCurrentState('wrote');
        }
      }
    };

    document.addEventListener('click', handleGlobalClick);
    return () => {
      document.removeEventListener('click', handleGlobalClick);
    };
  }, [currentState, inputValue]);

  const handleButtonClick = () => {
    setCurrentState('enabled');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (inputValue.trim() !== '') {
        setCurrentState('wrote');
        onSave?.(inputValue.trim());
      }
    } else if (e.key === 'Escape') {
      setCurrentState('default');
      setInputValue(initialValue);
      onCancel?.();
    }
  };

  const handleWriteClick = () => {
    setCurrentState('enabled');
  };

  // 상태별 스타일 정의
  const getButtonStyles = () => {
    if (isHovered) {
      return 'text-layout-grey6 bg-layout-grey3';
    }
    return 'text-layout-grey4 bg-transparent';
  };

  return (
    <div ref={containerRef} className="w-full">
      {currentState === 'default' && (
        <button
          className={`button-md w-full rounded-lg px-4 py-3 text-left transition-all duration-200 ${getButtonStyles()} `}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleButtonClick}
        >
          폴더 만들기
        </button>
      )}

      {currentState === 'enabled' && (
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          placeholder="폴더의 제목을 입력해주세요"
          className="detail text-layout-grey5 placeholder-layout-grey5 w-full rounded-lg border-none bg-white px-4 py-3 outline-none"
        />
      )}

      {currentState === 'wrote' && (
        <button
          className="button-md text-layout-grey6 w-full rounded-lg bg-transparent px-4 py-3 text-left transition-all duration-200"
          onClick={handleWriteClick}
        >
          {inputValue}
        </button>
      )}
    </div>
  );
}
