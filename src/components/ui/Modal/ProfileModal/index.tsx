import Image from 'next/image';
import { useAuthorDetail } from '@/hooks/template/useTemplateAuthor';
import { useModalStore } from '@/stores/useModalStore';
import IconClose from '@/assets/icons/icon-close.svg';

export default function ProfileModal() {
  const { selectedTemplateId, closeModal } = useModalStore();

  const { data: authorData } = useAuthorDetail(selectedTemplateId as number);

  return (
    <section className="bg-layout-white flex h-[700px] w-[1204px] flex-col rounded-[10px] p-9">
      <section className="flex items-start justify-between">
        <section className="flex gap-4">
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
          <section className="gap-5">
            <div className="title-lg">{authorData?.author?.name}</div>
          </section>
        </section>
        <button onClick={closeModal}>
          <IconClose />
        </button>
      </section>
    </section>
  );
}
