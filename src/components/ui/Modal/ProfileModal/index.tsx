import { useState, useMemo } from 'react';
import Image from 'next/image';
import Card from '@/components/ui/Card';
import { Spacing } from '@/components/ui/Spacing';
import { useAuthorDetail } from '@/hooks/template/useTemplateAuthor';
import { useModalStore } from '@/stores/useModalStore';
import IconClose from '@/assets/icons/icon-close.svg';
import IconGlowScore from '@/assets/icons/icon-glow-score.svg';
import IconArrowUpDown from '@/assets/icons/icon-arrow-up-down.svg';

export default function ProfileModal() {
  const [sortType, setSortType] = useState<'latest' | 'popular'>('popular');

  const { selectedTemplateId, openModal, closeModal } = useModalStore();
  const { data: authorData } = useAuthorDetail(selectedTemplateId as number);

  const templates = authorData?.templates || [];

  const templateSort = () => {
    setSortType((prev) => (prev === 'latest' ? 'popular' : 'latest'));
  };

  const sortedTemplates = useMemo(() => {
    if (sortType === 'popular') {
      const sorted = [...templates].sort((a, b) => {
        const aLikes = a.likeCount || 0;
        const bLikes = b.likeCount || 0;
        return bLikes - aLikes;
      });
      return sorted;
    }

    return templates;
  }, [templates, sortType]);

  const handleClickCard = (templateId: number) => {
    closeModal();
    openModal('view', { templateId });
  };

  return (
    <section className="bg-layout-white flex h-[700px] w-[1204px] flex-col rounded-[10px] p-9">
      <section className="flex items-start justify-between">
        <section className="flex">
          <Image
            src={
              authorData?.author.profileImageUrl ||
              'https://github.com/user-attachments/assets/9c948b08-a78b-44cb-b572-f2a934b70c45'
            }
            alt="작성자 프로필"
            width={100}
            height={100}
            className="rounded-sm"
          />
          <Spacing size={16} horizontal={true} />
          <section className="flex flex-col gap-5">
            <div className="title-lg mt-1">{authorData?.author.name}</div>
            <div className="title-sm flex gap-2">
              <IconGlowScore />
              {authorData?.author.score}
            </div>
          </section>
          <Spacing size={36} horizontal={true} />
          <div className="border-l-layout-grey3 h-[100px] border-l-1" />
          <Spacing size={36} horizontal={true} />
          <div className="body-md flex flex-col items-center justify-center gap-2">
            <div className="title-lg text-layout-grey6">{authorData?.templateTotalCount}</div>
            작성한 템플릿
          </div>
        </section>
        <button onClick={closeModal}>
          <IconClose />
        </button>
      </section>

      <Spacing size={52} />

      <div className="w-full justify-items-end">
        <button
          onClick={templateSort}
          className="bg-layout-grey1 hover:bg-layout-grey2 flex h-9 w-22 items-center justify-center gap-1 rounded-md transition-colors"
        >
          <IconArrowUpDown />
          {sortType === 'popular' ? '인기순' : '최신순'}
        </button>
      </div>

      <Spacing size={20} />

      <section className="custom-scrollbar-y grid h-[420px] grid-cols-4 gap-3 overflow-auto">
        {sortedTemplates.map((item) => (
          <Card
            key={`${item.templateId}-${sortType}`}
            variant="medium"
            title={item.title}
            description={item.content}
            tags={item.tags}
            likes={item.likeCount}
            onClick={() => handleClickCard(item.templateId as number)}
          />
        ))}
      </section>
    </section>
  );
}
