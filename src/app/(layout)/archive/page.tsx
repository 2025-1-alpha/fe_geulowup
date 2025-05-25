import { Spacing } from '@/components/ui/Spacing';
import ArchiveSidebar from './_components/ArchiveSidebar';
import ArchiveContent from './_components/ArchiveContent';
import ArchiveCreateButton from './_components/ArchiveCreateButton';

export default function ArchivePage() {
  return (
    <div className="mt-[100px] mb-[140px]">
      <section className="flex flex-col items-center">
        <section className="mx-[96px] w-full max-w-[1320px]">
          {/* 페이지 제목과 새 템플릿 만들기 버튼 */}
          <div className="flex h-[44px] items-center justify-between">
            <p className="title-lg text-layout-grey7">보관함</p>
            <ArchiveCreateButton />
          </div>

          <Spacing size={40} />

          {/* 사이드바와 메인 콘텐츠 */}
          <div className="flex gap-6">
            <ArchiveSidebar />
            <ArchiveContent />
          </div>
        </section>
      </section>
    </div>
  );
}
