'use client';

import { useState } from 'react';
import { useTemplateStore } from '@/stores/useTemplateStore';
import { Spacing } from '@/components/ui/Spacing';
import Toggle from '@/components/ui/Toggle';
import AdviceInputArea from '../AdviceInputArea';
import AdviceResult from '../AdviceResultBox';
import RecommendTemplates from '../RecommendTemplates';
import IconHelp from '@/assets/icons/icon-help.svg';

export default function AdviceEditor() {
  const { currentTemplate } = useTemplateStore();

  const [draftContent, setDraftContent] = useState(currentTemplate ? currentTemplate.content : '');
  const [adviceContent, setAdviceContent] = useState('');

  const handleChangeDraftContent = (value: string) => {
    setDraftContent(value);
  };

  const handleSubmit = () => {
    // 임시 코드 : 현재는 입력 그대로 set함
    setAdviceContent(draftContent);

    // TODO : API 연결 시 여기서 보내고, 작성된 글 set하기
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
            onSubmit={handleSubmit}
          />
        </section>
        <Spacing size={12} horizontal />
        <AdviceResult content={adviceContent} />
      </section>
    </section>
  );
}
