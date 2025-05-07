'use client';

import { Button } from '@/components/ui/Button';
import ToggleButton from '@/components/ui/Toggle';
import { InputTagAdd } from '@/components/ui/InputTagAdd';
import Card from '@/components/ui/Card';
import TagSearchBar from '@/components/ui/TagSearchBar';
import { useState } from 'react';

// TagSearchBar에서 사용하는 TagType과 동일한 타입 정의
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

export default function TestPage() {
  const dummyTags = ['태그텍스트', '태그텍스트'];
  const dummyTitle = '글로우업을 소개하기';
  const dummyDescription =
    '안녕하세요 잘 부탁드립니다. 글로우업 글쓰기 서비스는 여러 상황에서 사용자의 글쓰기 경험을 돕고자 합니다.';
  const dummyLikes = 100;

  // TagSearchBar 사용을 위한 상태와 핸들러
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
    console.log('TestPage - 태그 선택:', tag, '이전 선택된 태그:', selectedTag);
    setSelectedTag(tag === selectedTag ? undefined : tag);
    console.log('TestPage - 태그 선택 후:', tag === selectedTag ? undefined : tag);
  };

  const handleSearchClick = () => {
    alert(`검색: ${selectedTag || '선택된 태그 없음'}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-10 text-black">
      <Button
        variant="primary"
        state="default"
        size="medium"
        icon="dropdown"
        onClick={() => alert('버튼 테스트')}
      >
        버튼 테스트
      </Button>

      <ToggleButton />
      <InputTagAdd onClick={() => console.log('추가 버튼 클릭됨')} />

      <div className="mt-10 space-y-10">
        <div>
          <h2 className="mb-2 text-lg font-bold text-white">Variant: large</h2>
          <Card
            variant="large"
            title={dummyTitle}
            description={dummyDescription}
            tags={dummyTags}
            likes={dummyLikes}
          />
        </div>

        <div>
          <h2 className="mb-2 text-lg font-bold text-white">Variant: medium</h2>
          <Card
            variant="medium"
            title={dummyTitle}
            description={dummyDescription}
            tags={dummyTags}
            likes={dummyLikes}
          />
        </div>

        <div>
          <h2 className="mb-2 text-lg font-bold text-white">Variant: small</h2>
          <Card
            variant="small"
            title={dummyTitle}
            description={dummyDescription}
            tags={dummyTags}
            likes={dummyLikes}
          />
        </div>

        <div>
          <h2 className="mb-2 text-lg font-bold text-white">Variant: promote</h2>
          <Card
            variant="promote"
            title={dummyTitle}
            description={dummyDescription}
            tags={dummyTags}
            likes={dummyLikes}
          />
        </div>

        <div>
          <h2 className="mb-2 text-lg font-bold text-white">태그 검색바 (Big Size)</h2>
          <div className="rounded-lg bg-white p-4">
            <TagSearchBar
              size="big"
              tags={tagOptions}
              selectedTag={selectedTag}
              onTagSelect={handleTagSelect}
              onSearchClick={handleSearchClick}
            />
          </div>
        </div>

        <div>
          <h2 className="mb-2 text-lg font-bold text-white">태그 검색바 (Small Size)</h2>
          <div className="rounded-lg bg-white p-4">
            <TagSearchBar
              size="small"
              tags={tagOptions}
              selectedTag={selectedTag}
              onTagSelect={handleTagSelect}
              onSearchClick={handleSearchClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
