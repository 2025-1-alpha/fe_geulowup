'use client';

import { clsx } from 'clsx';
import React, { useState, useRef, useEffect } from 'react';
import { TagType } from '@/types';

type TagSearchPopupProps = {
  tags: TagType[];
  selectedTag?: TagType;
  onTagSelect?: (tag: TagType) => void;
  onClose?: () => void;
  isOpen: boolean;
  className?: string;
};

export const TagSearchPopup: React.FC<TagSearchPopupProps> = ({
  tags,
  selectedTag,
  onTagSelect,
  onClose,
  isOpen,
  className,
}) => {
  const [searchValue, setSearchValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  // 검색 결과 필터링
  const filteredTags = tags.filter((tag) => tag.toLowerCase().includes(searchValue.toLowerCase()));

  // 팝업 열릴 때 input에 포커스
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // 외부 클릭 시 팝업 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleTagClick = (tag: TagType) => {
    onTagSelect?.(tag);
    onClose?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose?.();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={popupRef}
      className={clsx(
        'border-layout-grey3 absolute z-50 overflow-hidden rounded-md border bg-white shadow-lg',
        className,
      )}
      style={{
        top: '100%',
        marginTop: '4px',
        width: '160px',
        maxHeight: searchValue ? '240px' : '44px',
      }}
    >
      {/* 검색 입력창 */}
      <div>
        <input
          ref={inputRef}
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="검색어 입력"
          className="bg-layout-grey1 detail text-layout-grey6 placeholder:text-layout-grey4 h-11 w-full rounded-md border-none px-3 focus:outline-none"
          style={{ width: '160px', height: '44px' }}
        />
      </div>

      {/* 검색 결과 목록 - 검색어가 있을 때만 표시 */}
      {searchValue && (
        <div className="scrollbar-hide border-layout-grey3 max-h-48 overflow-y-auto border-t bg-white">
          {filteredTags.length > 0 ? (
            <div className="space-y-1 p-2">
              {filteredTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={clsx(
                    'flex w-full items-center rounded px-3 py-2 text-left transition-colors',
                    tag === selectedTag
                      ? 'bg-primary-navy4 text-white'
                      : 'hover:bg-layout-grey1 text-layout-grey6',
                  )}
                >
                  <span className="detail">{tag}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center">
              <span className="detail text-layout-grey4">검색 결과가 없습니다</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TagSearchPopup;
