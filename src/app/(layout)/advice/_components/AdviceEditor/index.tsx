'use client';

import { useState } from 'react';
import { Spacing } from '@/components/ui/Spacing';
import AdviceInputArea from '../AdviceInputArea';
import AdviceResult from '../AdviceResultBox';
import RecommendTemplates from '../RecommendTemplates';

export default function AdviceEditor() {
  const [draftContent, setDraftContent] = useState('');
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
