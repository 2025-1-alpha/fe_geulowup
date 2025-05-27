import { useAuthorDetail } from '@/hooks/template/useTemplateAuthor';
import { useModalStore } from '@/stores/useModalStore';

export default function ProfileModal() {
  const { selectedTemplateId, closeModal } = useModalStore();

  if (!selectedTemplateId) return null;

  const { data: authorData } = useAuthorDetail(selectedTemplateId);

  return (
    <section className="bg-layout-white flex h-[700px] w-[1204px] flex-col rounded-[10px] p-9">
      {authorData}
    </section>
  );
}
