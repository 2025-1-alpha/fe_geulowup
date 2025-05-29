'use client';

import { useState } from 'react';
import { TagType } from '@/types';
import TagSearchBar from '@/components/ui/TagSearchBar';
import { Spacing } from '@/components/ui/Spacing';
import ArrowUpDownIcon from '@/assets/icons/icon-arrow-up-down.svg';
import ArchiveCardGrid from '../ArchiveCardGrid';

interface ArchiveContentProps {
  selectedFolderId: string;
}

export default function ArchiveContent({ selectedFolderId }: ArchiveContentProps) {
  const [selectedTag, setSelectedTag] = useState<TagType | undefined>(undefined);
  const [sortType, setSortType] = useState<'popular' | 'latest'>('popular');

  const tagOptions: TagType[] = [
    '인사말',
    '자기소개',
    '사과문',
    '부탁글',
    '감사글',
    '제안글',
    '공지글',
    '소개글',
    '후기작성',
    '소셜글',
    '고객응대',
    '교수문의',
    '조별활동',
    '공모전',
    '지원서',
    '기타',
  ];

  const handleTagSelect = (tag: TagType) => {
    setSelectedTag(tag === selectedTag ? undefined : tag);
  };

  const handleSearchClick = () => {
  };

  const handleSortChange = () => {
    setSortType(sortType === 'popular' ? 'latest' : 'popular');
  };

  return (
    <div className="flex-1">
      {/* 태그 검색바 */}
      <TagSearchBar
        size="small"
        tags={tagOptions}
        selectedTag={selectedTag}
        onTagSelect={handleTagSelect}
        onSearchClick={handleSearchClick}
      />

      <Spacing size={28} />

      {/* 정렬 버튼 */}
      <div className="flex justify-end">
        <button
          onClick={handleSortChange}
          className="bg-layout-grey1 text-layout-grey6 flex h-[36px] w-[87px] items-center justify-center gap-1 rounded"
        >
          <ArrowUpDownIcon />
          <span>{sortType === 'popular' ? '인기순' : '최신순'}</span>
        </button>
      </div>

      <Spacing size={40} />

      {/* 카드 그리드 */}
      <ArchiveCardGrid
        selectedFolderId={selectedFolderId}
        selectedTag={selectedTag}
        sortType={sortType}
      />
    </div>
  );
}
