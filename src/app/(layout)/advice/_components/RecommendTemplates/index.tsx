'use client';

import Link from 'next/link';
import { useState } from 'react';
import Card from '@/components/ui/Card';

const templates = [
  {
    templateId: 1,
    title: '글로우업을 소개하기',
    content:
      '안녕하세요 잘 부탁드립니다. 글로우업 글쓰기 서비스는 여러 상황에서 사용자의 글쓰기 경험을 돕고자 합니다.',
    likeCount: 100,
    tagText: ['태그 텍스트', '테스트'],
  },
  {
    templateId: 2,
    title: '글로우업을 소개하기',
    content:
      '안녕하세요 잘 부탁드립니다. 글로우업 글쓰기 서비스는 여러 상황에서 사용자의 글쓰기 경험을 돕고자 합니다.',
    likeCount: 50,
    tagText: ['태그 텍스트', '테스트'],
  },
  {
    templateId: 3,
    title: '글로우업을 소개하기',
    content:
      '안녕하세요 잘 부탁드립니다. 글로우업 글쓰기 서비스는 여러 상황에서 사용자의 글쓰기 경험을 돕고자 합니다.',
    likeCount: 50,
    tagText: ['태그 텍스트', '테스트'],
  },
  {
    templateId: 4,
    title: '글로우업을 소개하기',
    content:
      '안녕하세요 잘 부탁드립니다. 글로우업 글쓰기 서비스는 여러 상황에서 사용자의 글쓰기 경험을 돕고자 합니다.',
    likeCount: 50,
    tagText: ['태그 텍스트', '테스트'],
  },
];

export default function RecommendTemplates() {
  const asideList = [
    { label: 'recommend', text: '추천 템플릿' },
    { label: 'like', text: '찜한 템플릿' },
  ];

  const [asideState, setAsideState] = useState('recommend');

  const handleAside = (label: string) => {
    setAsideState(label);
    // 선택에 맞춰서 카드 리스트 api 연결
  };

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
              description={template.content}
              tags={template.tagText}
              likes={template.likeCount}
            />
          ))}
        </section>
      </section>
    </section>
  );
}
