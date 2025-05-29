import { Spacing } from '@/components/ui/Spacing';
import IconSave from '@/assets/icons/icon-save.svg';
import IconCopy from '@/assets/icons/icon-copy.svg';
import { useModalStore } from '@/stores/useModalStore';
import { useAuth } from '@/hooks/useAuth';

interface AdviceResultProps {
  content: string;
}

export default function AdviceResult({ content }: AdviceResultProps) {
  const { openModal } = useModalStore();
  const { requireAuth } = useAuth();

  return (
    <section className="border-layout-grey3 bg-layout-grey1 mt-11 flex h-[684px] w-[520px] flex-col rounded-[7px] border px-3 py-4">
      <p className="title-sm text-layout-grey7">AI 수정 결과</p>
      <Spacing size={12} />
      <div className="border-layout-grey3 flex h-full w-full flex-col overflow-y-auto rounded-[6px] border p-3">
        {content ? (
          <p className="body-md text-layout-grey7 whitespace-pre-wrap">{content}</p>
        ) : (
          <p className="body-md text-layout-grey4 whitespace-pre-wrap">
            왼쪽에 글을 입력하시면 AI가 수정한 글이 여기에 나타납니다.
          </p>
        )}
      </div>
      <Spacing size={12} />
      <div className="flex w-full items-end justify-end gap-6">
        <button
          className="transition-transform active:translate-y-[2px]"
          onClick={() => {
            if (requireAuth()) {
              openModal('create', {
                draftContent: content,
              });
            }
          }}
        >
          <IconSave />
        </button>
        <button
          className="transition-transform active:translate-y-[2px]"
          onClick={() => navigator.clipboard.writeText(content)}
        >
          <IconCopy />
        </button>
      </div>
    </section>
  );
}
