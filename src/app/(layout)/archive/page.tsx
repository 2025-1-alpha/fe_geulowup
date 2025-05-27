'use client';

import { useState } from 'react';
import ArchiveSidebar from './_components/ArchiveSidebar';
import ArchiveContent from './_components/ArchiveContent';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

export default function ArchivePage() {
  // 기본값을 "찜한 템플릿" (id: '1')으로 설정
  const [selectedFolderId, setSelectedFolderId] = useState<string>('1');
  const router = useRouter();

  return (
    <div className="mt-[100px] mb-[140px]">
      <section className="flex flex-col items-center">
        <section className="mx-[96px] w-full max-w-[1320px]">
          {/* 페이지 제목과 새 템플릿 만들기 버튼 */}
          <div className="flex h-[44px] items-center justify-between">
            <p className="title-lg text-layout-grey7">보관함</p>
            <Button
              variant="primary"
              icon="add"
              size="medium"
              onClick={() => router.push('/advice')}
            >
              새 템플릿 만들기
            </Button>
          </div>

          <div className="mt-10" />

          {/* 사이드바와 메인 콘텐츠 */}
          <div className="flex gap-6">
            <ArchiveSidebar
              selectedFolderId={selectedFolderId}
              onFolderSelect={setSelectedFolderId}
            />
            <ArchiveContent selectedFolderId={selectedFolderId} />
          </div>
        </section>
      </section>
    </div>
  );
}
