import { Spacing } from '@/components/ui/Spacing';
import AdviceInputArea from '../AdviceInputArea';
import RecommendTemplates from '../RecommendTemplates';

export default function AdviceEditor() {
  return (
    <section className="flex">
      {/* AI 토글 넣기 */}
      <section>
        <section className="flex flex-col">
          <RecommendTemplates />
          <Spacing size={8} />
          <AdviceInputArea></AdviceInputArea>
        </section>
        {/* 수정 결과 */}
      </section>
    </section>
  );
}
