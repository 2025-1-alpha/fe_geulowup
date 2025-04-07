import { Spacing } from '@/components/ui/Spacing';
import AdviceEditor from './_components/AdviceEditor';

export default function Advice() {
  return (
    <section className="flex flex-col items-center">
      <section className="mx-[96px] mb-60 max-w-[1320px] items-start">
        <p className="title-lg text-layout-grey7">조언받기</p>
        <Spacing size={16} />
        <AdviceEditor />
      </section>
    </section>
  );
}
