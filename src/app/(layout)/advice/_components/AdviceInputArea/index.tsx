import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Spacing } from '@/components/ui/Spacing';
import { InputTag } from '@/components/ui/InputTag';

interface TagItem {
  id: string;
  value: string;
}

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
  const [tags, setTags] = useState<TagItem[]>([{ id: generateId(), value: '' }]);

  function generateId() {
    return Date.now().toString() + Math.random().toString(36).substring(2);
  }

  const handleTagConfirm = (id: string, value: string) => {
    setTags((prev) => {
      const newTags = prev.map((tag) => (tag.id === id ? { ...tag, value } : tag));
      const lastTag = newTags[newTags.length - 1];

      if (lastTag.id === id && value.trim() !== '') {
        newTags.push({ id: generateId(), value: '' });
      }

      return newTags;
    });
  };

  const handleTagRemove = (id: string) => {
    setTags((prev) => {
      const newTags = prev.filter((tag) => tag.id !== id);

      // 모두 삭제되면 빈 인풋 하나 추가
      if (newTags.length === 0) {
        return [{ id: generateId(), value: '' }];
      }

      return newTags;
    });
  };

  const tagErrCheck = () => {
    // TODO : 나중에 Error 체크 부분 추가하기. 현재는 무조건 false
    return false;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-layout-grey3 absolute top-[440px] h-[520px] w-[788px] flex-col rounded-[7px] border p-3"
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

      {/* TODO : 스크롤바 커스텀 하기 */}
      <div className="max-w-[760px] overflow-x-auto scroll-smooth">
        <div className="flex w-max flex-nowrap gap-2">
          {tags.map((tag) => (
            <InputTag
              key={tag.id}
              initialValue={tag.value}
              onConfirm={(value) => handleTagConfirm(tag.id, value)}
              onRemove={() => handleTagRemove(tag.id)}
              tagErrCheck={tagErrCheck}
            />
          ))}
        </div>
      </div>

      <Spacing size={12} />
      <Button size="large" type="submit">
        작성 완료
      </Button>
    </form>
  );
}
