'use client';

import { Button } from '@/components/ui/Button';
import ToggleButton from '@/components/ui/Toggle';
import Card from '@/components/ui/Card';

export default function TestPage() {
  const dummyTags = ['태그텍스트', '태그텍스트'];
  const dummyTitle = '글로우업을 소개하기';
  const dummyDescription =
    '안녕하세요 잘 부탁드립니다. 글로우업 글쓰기 서비스는 여러 상황에서 사용자의 글쓰기 경험을 돕고자 합니다.';
  const dummyLikes = 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-10 text-black">
      <Button
        variant="primary"
        state=""
        size="medium"
        icon="dropdown"
        onClick={() => alert('버튼 테스트')}
      >
        버튼 테스트
      </Button>

      <ToggleButton />

      <div className="mt-10 space-y-10">
        <div>
          <h2 className="mb-2 text-lg font-bold text-white">Variant: large</h2>
          <div className="flex flex-wrap gap-4">
            <Card
              variant="large"
              state="default"
              title={dummyTitle}
              description={dummyDescription}
              tags={dummyTags}
              likes={dummyLikes}
            />
            <Card
              variant="large"
              state="hover"
              title={dummyTitle}
              description={dummyDescription}
              tags={dummyTags}
              likes={dummyLikes}
            />
            <Card
              variant="large"
              state="click"
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
              state="default"
              title={dummyTitle}
              description={dummyDescription}
              tags={dummyTags}
              likes={dummyLikes}
            />
            <Card
              variant="medium"
              state="hover"
              title={dummyTitle}
              description={dummyDescription}
              tags={dummyTags}
              likes={dummyLikes}
            />
            <Card
              variant="medium"
              state="click"
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
              state="default"
              title={dummyTitle}
              description={dummyDescription}
              tags={dummyTags}
              likes={dummyLikes}
            />
            <Card
              variant="small"
              state="hover"
              title={dummyTitle}
              description={dummyDescription}
              tags={dummyTags}
              likes={dummyLikes}
            />
            <Card
              variant="small"
              state="click"
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
              state="default"
              title={dummyTitle}
              description={dummyDescription}
              tags={dummyTags}
              likes={dummyLikes}
            />
            <Card
              variant="promote"
              state="hover"
              title={dummyTitle}
              description={dummyDescription}
              tags={dummyTags}
              likes={dummyLikes}
            />
            <Card
              variant="promote"
              state="click"
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
