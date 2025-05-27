'use client';

import { clsx } from 'clsx';
import React, { useRef, useState, useEffect } from 'react';
import Arrow from '@/components/ui/Arrow';
import TagSearchButton from '@/components/ui/TagSearchButton';
import TagSearchPopup from '@/components/ui/TagSearchPopup';
import SearchIcon from '@/assets/icons/icon-tag-searchbar-popup.svg';
import { TagType } from '@/types';

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
  const [isSearchPopupOpen, setIsSearchPopupOpen] = useState(false);

  useEffect(() => {
    updateScrollState();
    window.addEventListener('resize', updateScrollState);
    return () => window.removeEventListener('resize', updateScrollState);
  }, [tags]);

  const updateScrollState = () => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    setScrollPosition(container.scrollLeft);
    setMaxScroll(container.scrollWidth - container.clientWidth);
  };

  const handleScroll = (direction: 'left' | 'right') => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scrollAmount = 200;
    const currentScroll = container.scrollLeft;
    const maxScrollWidth = container.scrollWidth - container.clientWidth;

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

  const handleTagClick = (tag: TagType) => {
    console.log('TagSearchBar - 태그 클릭:', tag, '현재 선택된 태그:', selectedTag);
    if (onTagSelect) {
      onTagSelect(tag);
    }
  };

  const handleSearchIconClick = () => {
    setIsSearchPopupOpen(!isSearchPopupOpen);
    if (onSearchClick) {
      onSearchClick();
    }
  };

  const handleSearchPopupTagSelect = (tag: TagType) => {
    if (onTagSelect) {
      onTagSelect(tag);
    }
    setIsSearchPopupOpen(false);
  };

  const handleSearchPopupClose = () => {
    setIsSearchPopupOpen(false);
  };

  return (
    <div
      className={clsx(
        'flex h-11 items-center rounded-md',
        'border-layout-grey3 border bg-white',
        sizeClass,
        className,
      )}
    >
      <div className="ml-[22px] flex flex-shrink-0 items-center">
        <Arrow
          direction="left"
          colorType="navy"
          disabled={isLeftArrowDisabled}
          onClick={() => handleScroll('left')}
        />
      </div>

      <div className="ml-1 flex-grow overflow-hidden">
        <div
          ref={containerRef}
          onScroll={handleScrollUpdate}
          className="scrollbar-hide flex w-full gap-[4px] overflow-x-auto px-4 py-1"
        >
          {tags.map((tag) => (
            <TagSearchButton
              key={tag}
              tag={tag}
              selected={tag === selectedTag}
              onClick={() => handleTagClick(tag)}
            />
          ))}
        </div>
      </div>

      <div className="ml-auto flex flex-shrink-0 items-center">
        <Arrow
          direction="right"
          colorType="navy"
          disabled={isRightArrowDisabled}
          onClick={() => handleScroll('right')}
        />

        <div className="relative ml-3">
          <button
            type="button"
            onClick={handleSearchIconClick}
            className="bg-primary-navy4 flex h-[44px] w-[44px] items-center justify-center rounded-tr-md rounded-br-md"
          >
            <div className="p-2">
              <SearchIcon />
            </div>
          </button>

          <TagSearchPopup
            tags={tags}
            selectedTag={selectedTag}
            onTagSelect={handleSearchPopupTagSelect}
            onClose={handleSearchPopupClose}
            isOpen={isSearchPopupOpen}
            className="right-0"
          />
        </div>
      </div>
    </div>
  );
};

export default TagSearchBar;
