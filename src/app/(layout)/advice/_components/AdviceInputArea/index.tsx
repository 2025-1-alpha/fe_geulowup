import { Button } from '@/components/ui/Button';
import { Spacing } from '@/components/ui/Spacing';

export default function AdviceInputArea() {
  return (
    <form className="border-layout-grey3 flex h-[520px] w-[788px] flex-col rounded-[7px] border p-3">
      <input
        type="input"
        placeholder="수정받고자 하는 글을 입력해 주세요."
        className="body-md text-layout-grey4 flex h-[336px] w-[760px] items-start"
      />
      <Spacing size={12} />
      <Button size="large">작성 완료</Button>
    </form>
  );
}
