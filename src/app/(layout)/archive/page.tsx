import { Spacing } from '@/components/ui/Spacing';
import ArchiveSidebar from './_components/ArchiveSidebar';
import ArchiveContent from './_components/ArchiveContent';

export default function ArchivePage() {
  return (
    <div className="mt-[100px] mb-[140px]">
      <section className="flex flex-col items-center">
        <section className="mx-[96px] w-full max-w-[1320px]">
          {/* 페이지 제목 */}
          <div className="h-[44px] w-[126px]">
            <p className="title-lg text-layout-grey7">보관함</p>
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
