'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';

// 임시 더미 데이터
const dummyCards = Array.from({ length: 15 }, (_, index) => ({
  id: index + 1,
  title: `글로우업을 소개하기 ${index + 1}`,
  description:
    '안녕하세요 잘 부탁드립니다. 글로우업 글쓰기 서비스는 여러 상황에서 사용자의 글쓰기 경험을 돕고자 합니다.',
  tags: ['태그텍스트', '태그텍스트'],
  likes: 100 + index,
}));

export default function ArchiveCardGrid() {
  const [visibleCards, setVisibleCards] = useState(15);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadMore = () => {
    setIsLoading(true);
    // 더 불러오기 로직 (추후 API 연결)
    setTimeout(() => {
      setVisibleCards((prev) => prev + 15);
      setIsLoading(false);
    }, 1000);
  };

  const displayedCards = dummyCards.slice(0, visibleCards);

  return (
    <div>
      {/* 카드 그리드 - 3열로 배치 */}
      <div className="grid grid-cols-3 gap-x-[13.33px] gap-y-[12px]">
        {displayedCards.map((card) => (
          <Card
            key={card.id}
            variant="large"
            title={card.title}
            description={card.description}
            tags={card.tags}
            likes={card.likes}
            onClick={() => console.log(`카드 ${card.id} 클릭됨`)}
            className="cursor-pointer transition-shadow hover:shadow-md"
          />
        ))}
      </div>

      {/* 더 불러오기 버튼 */}
      {visibleCards < 50 && ( // 임시로 50개까지만
        <div className="mt-[80px] flex justify-center">
          <button
            onClick={handleLoadMore}
            disabled={isLoading}
            className={`border-primary-navy4 text-primary-navy4 hover:bg-primary-navy1 rounded-[6px] border px-6 py-2 transition-colors ${
              isLoading ? 'cursor-not-allowed opacity-70' : ''
            }`}
          >
            {isLoading ? '로딩 중...' : '더 불러오기'}
          </button>
        </div>
      )}
    </div>
  );
}
