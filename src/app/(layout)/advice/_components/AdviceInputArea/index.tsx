'use client';

import { Button } from '@/components/ui/Button';
import { Spacing } from '@/components/ui/Spacing';

interface AdviceInputAreaProps {
  draftContent: string;
  onChangeDraftContent: (value: string) => void;
  onSubmit: () => void;
}

export default function AdviceInputArea({
  draftContent,
  onChangeDraftContent,
  onSubmit,
}: AdviceInputAreaProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(); // 작성 완료 시 부모로 알림 -> 이후 result에서 API 호출하도록
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-layout-grey3 flex h-[520px] w-[788px] flex-col rounded-[7px] border p-3"
    >
      <div className="relative h-[336px] w-[760px]">
        <textarea
          placeholder="수정받고자 하는 글을 입력해 주세요."
          value={draftContent}
          onChange={(e) => onChangeDraftContent(e.target.value)}
          className="body-md text-layout-grey7 absolute top-0 left-0 h-full w-full resize-none p-4"
        />
      </div>
      <Spacing size={12} />
      <p className="button-md">키워드 입력</p>
      <Spacing size={8} />
      {/* TODO : 인풋태그 머지되면 넣기 */}
      <Spacing size={12} />
      <Button size="large" type="submit">
        작성 완료
      </Button>
    </form>
  );
}
