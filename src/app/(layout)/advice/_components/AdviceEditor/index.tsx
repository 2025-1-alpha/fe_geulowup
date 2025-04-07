import { Spacing } from '@/components/ui/Spacing';
import AdviceInputArea from '../AdviceInputArea';
import AdviceResult from '../AdviceResultBox';
import RecommendTemplates from '../RecommendTemplates';

export default function AdviceEditor() {
  return (
    <section className="flex">
      {/* AI 토글 넣기 */}
      <section className="flex">
        <section className="flex flex-col">
          <RecommendTemplates />
          <Spacing size={8} />
          <AdviceInputArea></AdviceInputArea>
        </section>
        <Spacing size={12} horizontal={true} />
        <AdviceResult />
      </section>
    </section>
  );
}
