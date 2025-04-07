import { Spacing } from '@/components/ui/Spacing';

interface AdviceResultProps {
  content: string;
}

export default function AdviceResult({ content }: AdviceResultProps) {
  return (
    <section className="border-layout-grey3 bg-layout-grey1 flex h-[684px] w-[520px] flex-col rounded-[7px] border px-3 py-4">
      <p className="title-sm text-layout-grey7">AI 수정 결과</p>
      <Spacing size={12} />
      <div className="body-md text-layout-grey7 whitespace-pre-wrap">{content}</div>
      {/* TODO : svg 버튼들 추가하기 */}
    </section>
  );
}
