'use client';

import Link from 'next/link';
import { useState } from 'react';

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
    <section className="flex">
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
      {/* 아래 섹션은 카드 리스트들 삽입 */}
      <section></section>
    </section>
  );
}
