'use client';

import { Button } from '@/components/ui/Button';
import ToggleButton from '@/components/ui/Toggle';
import { InputTagAdd } from '@/components/ui/InputTagAdd';
import Card from '@/components/ui/Card';
import { useCreateTemplate } from '@/hooks/template/useCreateTemplate';

export default function TestPage() {
  const dummyTags = ['태그텍스트', '태그텍스트'];
  const dummyTitle = '글로우업을 소개하기';
  const dummyDescription =
    '안녕하세요 잘 부탁드립니다. 글로우업 글쓰기 서비스는 여러 상황에서 사용자의 글쓰기 경험을 돕고자 합니다.';
  const dummyLikes = 100;

  const { mutate } = useCreateTemplate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutate({
      title: '정중한 사과문 작성법',
      content: '불편을 드려 죄송합니다. 본문에는 진심 어린 사과의 말을 담습니다...',
      likeCount: 7,
      tags: ['자기소개'],
      isPrivate: false,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-10 text-black">
      <Button variant="primary" size="medium" icon="dropdown" onClick={handleSubmit}>
        버튼 테스트
      </Button>

      <ToggleButton />
      <InputTagAdd onClick={() => console.log('추가 버튼 클릭됨')} />
      <div className="mt-10 space-y-10">
        <div>
          <h2 className="mb-2 text-lg font-bold text-white">Variant: large</h2>
          <div className="flex flex-wrap gap-4">
            <Card
              variant="large"
              title={dummyTitle}
              description={dummyDescription}
              tags={dummyTags}
              likes={dummyLikes}
            />
            <Card
              variant="large"
              title={dummyTitle}
              description={dummyDescription}
              tags={dummyTags}
              likes={dummyLikes}
            />
            <Card
              variant="large"
              title={dummyTitle}
              description={dummyDescription}
              tags={dummyTags}
              likes={dummyLikes}
            />
          </div>
        </div>

        <div>
          <h2 className="mb-2 text-lg font-bold text-white">Variant: medium</h2>
          <div className="flex flex-wrap gap-4">
            <Card
              variant="medium"
              title={dummyTitle}
              description={dummyDescription}
              tags={dummyTags}
              likes={dummyLikes}
            />
            <Card
              variant="medium"
              title={dummyTitle}
              description={dummyDescription}
              tags={dummyTags}
              likes={dummyLikes}
            />
            <Card
              variant="medium"
              title={dummyTitle}
              description={dummyDescription}
              tags={dummyTags}
              likes={dummyLikes}
            />
          </div>
        </div>

        <div>
          <h2 className="mb-2 text-lg font-bold text-white">Variant: small</h2>
          <div className="flex flex-wrap gap-4">
            <Card
              variant="small"
              title={dummyTitle}
              description={dummyDescription}
              tags={dummyTags}
              likes={dummyLikes}
            />
            <Card
              variant="small"
              title={dummyTitle}
              description={dummyDescription}
              tags={dummyTags}
              likes={dummyLikes}
            />
            <Card
              variant="small"
              title={dummyTitle}
              description={dummyDescription}
              tags={dummyTags}
              likes={dummyLikes}
            />
          </div>
        </div>

        <div>
          <h2 className="mb-2 text-lg font-bold text-white">Variant: promote</h2>
          <div className="flex flex-wrap gap-4">
            <Card
              variant="promote"
              title={dummyTitle}
              description={dummyDescription}
              tags={dummyTags}
              likes={dummyLikes}
            />
            <Card
              variant="promote"
              title={dummyTitle}
              description={dummyDescription}
              tags={dummyTags}
              likes={dummyLikes}
            />
            <Card
              variant="promote"
              title={dummyTitle}
              description={dummyDescription}
              tags={dummyTags}
              likes={dummyLikes}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
