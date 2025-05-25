'use client';

import { useState } from 'react';
import { TagType } from '@/types';
import TagSearchBar from '@/components/ui/TagSearchBar';
import { Spacing } from '@/components/ui/Spacing';
import ArchiveCardGrid from '../ArchiveCardGrid';

export default function ArchiveContent() {
  const [selectedTag, setSelectedTag] = useState<TagType | undefined>(undefined);

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
    // 검색 로직 (추후 구현)
    console.log('검색:', selectedTag);
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

      <Spacing size={40} />

      {/* 카드 그리드 */}
      <ArchiveCardGrid />
    </div>
  );
}
