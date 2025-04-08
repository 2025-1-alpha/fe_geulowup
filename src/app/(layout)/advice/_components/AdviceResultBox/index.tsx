import { Spacing } from '@/components/ui/Spacing';
import IconShare from '@/assets/icons/icon-share.svg';
import IconSave from '@/assets/icons/icon-save.svg';
import IconCopy from '@/assets/icons/icon-copy.svg';

interface AdviceResultProps {
  content: string;
}

export default function AdviceResult({ content }: AdviceResultProps) {
  return (
    <section className="border-layout-grey3 bg-layout-grey1 flex h-[684px] w-[520px] flex-col rounded-[7px] border px-3 py-4">
      <p className="title-sm text-layout-grey7">AI 수정 결과</p>
      <Spacing size={12} />
      <div className="border-layout-grey3 relative flex h-[560px] w-full flex-col overflow-y-auto rounded-[6px] border p-3">
        {content ? (
          <p className="body-md text-layout-grey7 whitespace-pre-wrap">{content}</p>
        ) : (
          <p className="body-md text-layout-grey4 whitespace-pre-wrap">
            왼쪽에 글을 입력하시면 AI가 수정한 글이 여기에 나타납니다.
          </p>
        )}
      </div>
      <Spacing size={12} />
      {/* TODO : 디자인 맟줘서 수정 필요 */}
      <div className="flex w-full items-end justify-end gap-6">
        <IconShare />
        <IconSave />
        <IconCopy />
      </div>
    </section>
  );
}
