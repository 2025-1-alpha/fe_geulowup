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
import { useSpellCheck } from '@/hooks/models/usePostSpellCheck';
import { useAuth } from '@/hooks/useAuth';

export default function AdviceEditor() {
  const { currentTemplate } = useTemplateStore();
  const { requireAuth } = useAuth();
  const [draftContent, setDraftContent] = useState(currentTemplate?.content || '');
  const [tags, setTags] = useState<string[]>([]);
  const [aiMode, setAiMode] = useState(true);

  const { mutate, data, status } = usePostAdvice();
  const {
    mutate: spellCheckMutate,
    data: spellCheckData,
    status: spellCheckStatus,
  } = useSpellCheck();

  const isLoading = status === 'pending';
  const isError = status === 'error';
  const isSpellCheckLoading = spellCheckStatus === 'pending';

  const adviceResultContent = aiMode
    ? isLoading
      ? '텍스트 생성 중...'
      : isError
        ? '오류가 발생했어요. 다시 시도해 주세요.'
        : data?.result || ''
    : isSpellCheckLoading
      ? '맞춤법 검사 중...'
      : spellCheckData?.result || '';

  const handleChangeDraftContent = (value: string) => {
    setDraftContent(value);
  };

  const handleChangeTags = (values: string[]) => {
    setTags(values);
  };

  const handleAIMode = () => {
    setAiMode((prev) => !prev);
  };

  const handleSubmit = () => {
    if (aiMode) {
      if (requireAuth()) {
        mutate({
          content: draftContent,
          tags: tags.filter((tag) => tag.trim() !== ''),
        });
      }
    } else {
      spellCheckMutate({
        content: draftContent,
      });
    }
  };

  return (
    <section className="flex">
      <section className="flex">
        <section className="flex flex-col">
          <section className="button-md text-layout-grey7 relative flex items-center justify-end gap-2">
            <IconHelp />
            AI 첨삭 모드
            <Toggle isOn={aiMode} onToggle={handleAIMode} />
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
