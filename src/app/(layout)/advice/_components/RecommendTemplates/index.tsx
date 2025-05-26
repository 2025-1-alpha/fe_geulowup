'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Card from '@/components/ui/Card';
import { TemplateType } from '@/types';
import { useTemplatesRecommendation } from '@/hooks/template/useTemplatesRecommendation';
import { useTemplatesLikes } from '@/hooks/template/useTemplateLikes';

export default function RecommendTemplates() {
  const { data: recommendData } = useTemplatesRecommendation();
  const { data: likeData } = useTemplatesLikes();

  const asideList = [
    { label: 'recommend', text: '추천 템플릿' },
    { label: 'like', text: '찜한 템플릿' },
  ];

  const [asideState, setAsideState] = useState('recommend');
  const [templates, setTemplates] = useState<TemplateType[]>([]);

  const handleAside = (label: string) => {
    setAsideState(label);
  };

  useEffect(() => {
    const response = asideState === 'recommend' ? recommendData : likeData;
    const templates =
      response?.templates.map((templates) => ({
        title: templates.title,
        description: templates.content,
        tags: templates.tags,
        likes: templates.likeCount,
        content: templates.content,
        templateId: templates.templateId,
      })) ?? [];

    setTemplates(templates);
  }, [recommendData, likeData, asideState]);

  return (
    <section className="z-10 flex">
      <aside className="bg-layout-grey2 border-layout-grey3 flex h-[156px] w-[132px] flex-col justify-between rounded-[5px] border p-3">
        <div className="flex flex-col gap-1">
          {asideList.map((item) => (
            <button
              key={item.label}
              onClick={() => handleAside(item.label)}
              className={`body-sst text-left ${asideState === item.label ? 'text-layout-grey7' : 'text-layout-grey5'}`}
            >
              {item.text}
            </button>
          ))}
        </div>

        <Link
          href="/explore"
          className="detail text-layout-grey6 decoration-layout-grey6 flex underline underline-offset-3"
        >
          더 찾아보기
        </Link>
      </aside>
      <section className="custom-scrollbar z-20 ml-4 flex w-[648px] flex-1 rotate-x-180 overflow-x-scroll scroll-smooth">
        <section className="mb-2 flex max-h-full rotate-x-180 gap-2">
          {templates.map((template) => (
            <Card
              key={template.templateId}
              variant="small"
              title={template.title}
              description={template.description}
              tags={template.tags}
              likes={template.likes}
            />
          ))}
        </section>
      </section>
    </section>
  );
}
