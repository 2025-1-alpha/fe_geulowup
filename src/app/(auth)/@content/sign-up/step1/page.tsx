import { Spacing } from '@/components/ui/Spacing';
import { Button } from '@/components/ui/Button';

export default function Step1() {
  return (
    <section>
      <div className="title-lg flex whitespace-pre-line">
        {`안녕하세요!
글로우업에서 사용할 이름을
입력해 주세요.`}
      </div>
      <Spacing size={148} />
      {/* TODO : input 공컴 제작하기 */}
      <Spacing size={80} />
      <div className="flex w-full justify-end">
        <Button size="small">다음으로</Button>
      </div>
      <Spacing size={260} />
      {/* TODO : step bar 생성하기 */}
    </section>
  );
}
