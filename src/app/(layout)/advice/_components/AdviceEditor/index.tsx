'use client';

import { useState } from 'react';
import { useTemplateStore } from '@/stores/useTemplateStore';
import { Spacing } from '@/components/ui/Spacing';
import Toggle from '@/components/ui/Toggle';
import AdviceInputArea from '../AdviceInputArea';
import AdviceResult from '../AdviceResultBox';
import RecommendTemplates from '../RecommendTemplates';
import IconHelp from '@/assets/icons/icon-help.svg';
import { usePostAdvice } from '@/hooks/models/usePostAdvice';

export default function AdviceEditor() {
  const { currentTemplate } = useTemplateStore();
  const [draftContent, setDraftContent] = useState(currentTemplate?.content || '');
  const [tags, setTags] = useState<string[]>([]);
  const { mutate, data, status } = usePostAdvice();

  const isLoading = status === 'pending';
  const isError = status === 'error';

  const adviceResultContent = isLoading
    ? '텍스트 생성 중...'
    : isError
      ? '오류가 발생했어요. 다시 시도해 주세요.'
      : data?.result || '';

  const handleChangeDraftContent = (value: string) => {
    setDraftContent(value);
  };

  const handleChangeTags = (values: string[]) => {
    setTags(values);
  };

  const handleSubmit = () => {
    mutate({
      content: draftContent,
      tags: tags.filter((tag) => tag.trim() !== ''),
    });
  };

  return (
    <section className="flex">
      <section className="flex">
        <section className="flex flex-col">
          <section className="button-md text-layout-grey7 relative flex items-center justify-end gap-2">
            <IconHelp />
            AI 첨삭 모드
            <Toggle defaultState="on" />
          </section>
          <Spacing size={16} />
          <RecommendTemplates />
          <Spacing size={8} />
          <AdviceInputArea
            draftContent={draftContent}
            onChangeDraftContent={handleChangeDraftContent}
            onChangeTags={handleChangeTags}
            onSubmit={handleSubmit}
          />
        </section>
        <Spacing size={12} horizontal />
        <AdviceResult content={adviceResultContent} />
      </section>
    </section>
  );
}
