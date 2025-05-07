'use client';

import { clsx } from 'clsx';
import React, { useRef, useState, useEffect } from 'react';
import Arrow from '@/components/ui/Arrow';
import TagSearchButton from '@/components/ui/TagSearchButton';
import SearchIcon from '@/assets/icons/icon-tag-searchbar-popup.svg';
import Spacing from '@/components/ui/Spacing';

type TagType =
  | '인사말'
  | '자기소개'
  | '사과문'
  | '부탁글'
  | '감사글'
  | '제안글'
  | '공지글'
  | '소개글'
  | '후기작성'
  | '소셜글'
  | '고객응대'
  | '교수문의'
  | '조별활동'
  | '공모전'
  | '지원서'
  | '기타';

type TagSearchBarProps = {
  size: 'big' | 'small';
  tags: TagType[];
  selectedTag?: TagType;
  onTagSelect?: (tag: TagType) => void;
  onSearchClick?: () => void;
  className?: string;
};

export const TagSearchBar: React.FC<TagSearchBarProps> = ({
  size,
  tags,
  selectedTag,
  onTagSelect,
  onSearchClick,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);

  // 컴포넌트 마운트 시와 tags 변경 시 스크롤 상태 업데이트
  useEffect(() => {
    updateScrollState();
    window.addEventListener('resize', updateScrollState);
    return () => window.removeEventListener('resize', updateScrollState);
  }, [tags]);

  // 스크롤 상태 업데이트 함수
  const updateScrollState = () => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    setScrollPosition(container.scrollLeft);
    setMaxScroll(container.scrollWidth - container.clientWidth);
  };

  const handleScroll = (direction: 'left' | 'right') => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scrollAmount = 200; // 스크롤 단위
    const currentScroll = container.scrollLeft;
    const maxScrollWidth = container.scrollWidth - container.clientWidth;

    // 최대 스크롤 위치 업데이트
    setMaxScroll(maxScrollWidth);

    let newScrollPosition;
    if (direction === 'left') {
      newScrollPosition = Math.max(0, currentScroll - scrollAmount);
    } else {
      newScrollPosition = Math.min(maxScrollWidth, currentScroll + scrollAmount);
    }

    container.scrollTo({
      left: newScrollPosition,
      behavior: 'smooth',
    });

    setScrollPosition(newScrollPosition);
  };

  const handleScrollUpdate = () => {
    updateScrollState();
  };

  const isLeftArrowDisabled = scrollPosition <= 0;
  const isRightArrowDisabled = scrollPosition >= maxScroll;

  const sizeClass = size === 'big' ? 'w-[1320px]' : 'w-[984px]';

  return (
    <div
      className={clsx(
        'flex h-11 items-center rounded-md',
        'border-layout-grey3 border bg-white',
        sizeClass,
        className,
      )}
    >
      <div className="ml-[22px] flex items-center">
        <Arrow
          direction="left"
          colorType="navy"
          disabled={isLeftArrowDisabled}
          onClick={() => handleScroll('left')}
        />
      </div>

      <Spacing size={4} />

      <div
        ref={containerRef}
        onScroll={handleScrollUpdate}
        className="scrollbar-hide flex flex-1 gap-[4px] overflow-x-auto px-4 py-1"
      >
        {tags.map((tag) => (
          <TagSearchButton
            key={tag}
            tag={tag}
            selected={tag === selectedTag}
            onClick={() => onTagSelect?.(tag)}
          />
        ))}
      </div>

      <div className="ml-auto flex items-center">
        <Arrow
          direction="right"
          colorType="navy"
          disabled={isRightArrowDisabled}
          onClick={() => handleScroll('right')}
        />

        <Spacing size={12} />

        <button
          type="button"
          onClick={onSearchClick}
          className="bg-primary-navy4 flex h-[44px] w-[44px] items-center justify-center rounded-tr-md rounded-br-md"
        >
          <div className="p-2">
            <SearchIcon />
          </div>
        </button>
      </div>
    </div>
  );
};

// 스크롤바를 숨기기 위한 글로벌 스타일
// src/app/globals.css에 추가될 내용
/*
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
*/

export default TagSearchBar;
