'use client';

import { useState, useEffect } from 'react';
import Card from '@/components/ui/Card';
import { useModalStore } from '@/stores/useModalStore';
import { TagType } from '@/types';

interface ArchiveCardGridProps {
  selectedFolderId: string;
  selectedTag?: TagType;
  sortType: 'popular' | 'latest';
}

// 템플릿 데이터 타입 정의
interface TemplateData {
  id: string;
  templateId: number;
  title: string;
  description: string;
  tags: string[];
  likes: number;
  content: string;
  folderId: string;
}

// 폴더별 더미 데이터
const folderData: Record<string, TemplateData[]> = {
  '1': Array.from({ length: 32 }, (_, index) => ({
    id: `fav_${index + 1}`,
    templateId: index + 1,
    title: `찜한 템플릿 ${index + 1}`,
    description:
      '찜한 템플릿입니다. 글로우업 글쓰기 서비스는 여러 상황에서 사용자의 글쓰기 경험을 돕고자 합니다.',
    tags: ['인사말', '자기소개'],
    likes: 150 + index,
    content: `찜한 템플릿 ${index + 1}의 내용입니다.\n\n안녕하세요 잘 부탁드립니다.`,
    folderId: '1',
  })),
  '2': Array.from({ length: 5 }, (_, index) => ({
    id: `recent_${index + 1}`,
    templateId: 100 + index + 1,
    title: `최근 사용한 템플릿 ${index + 1}`,
    description:
      '최근에 사용한 템플릿입니다. 글로우업 글쓰기 서비스는 여러 상황에서 사용자의 글쓰기 경험을 돕고자 합니다.',
    tags: ['감사글', '공지글'],
    likes: 80 + index,
    content: `최근 사용한 템플릿 ${index + 1}의 내용입니다.\n\n감사합니다.`,
    folderId: '2',
  })),
  '3': Array.from({ length: 8 }, (_, index) => ({
    id: `user1_${index + 1}`,
    templateId: 200 + index + 1,
    title: `사용자 폴더1 템플릿 ${index + 1}`,
    description:
      '사용자가 만든 폴더의 템플릿입니다. 글로우업 글쓰기 서비스는 여러 상황에서 사용자의 글쓰기 경험을 돕고자 합니다.',
    tags: ['부탁글', '제안글'],
    likes: 60 + index,
    content: `사용자 폴더1 템플릿 ${index + 1}의 내용입니다.\n\n잘 부탁드립니다.`,
    folderId: '3',
  })),
  '4': Array.from({ length: 3 }, (_, index) => ({
    id: `user2_${index + 1}`,
    templateId: 300 + index + 1,
    title: `사용자 폴더2 템플릿 ${index + 1}`,
    description:
      '사용자가 만든 폴더의 템플릿입니다. 글로우업 글쓰기 서비스는 여러 상황에서 사용자의 글쓰기 경험을 돕고자 합니다.',
    tags: ['후기작성', '소셜글'],
    likes: 40 + index,
    content: `사용자 폴더2 템플릿 ${index + 1}의 내용입니다.\n\n감사합니다.`,
    folderId: '4',
  })),
};

export default function ArchiveCardGrid({
  selectedFolderId,
  selectedTag,
  sortType,
}: ArchiveCardGridProps) {
  const [visibleCards, setVisibleCards] = useState(15);
  const [isLoading, setIsLoading] = useState(false);
  const { openModal, currentModal } = useModalStore();

  // 컴포넌트 마운트 시와 모달이 닫힐 때만 카드 클릭 상태 초기화
  useEffect(() => {
    // 모달이 닫힐 때만 카드 클릭 상태를 초기화
    if (currentModal === null) {
      // clearAllCards(); // useCardStore가 없으므로 주석 처리
    }
  }, [currentModal]);

  // 폴더가 변경될 때 visibleCards 초기화
  useEffect(() => {
    setVisibleCards(15);
  }, [selectedFolderId]);

  // 현재 폴더의 데이터 가져오기
  const getCurrentFolderData = () => {
    const data = folderData[selectedFolderId] || [];

    // 태그 필터링
    let filteredData = data;
    if (selectedTag) {
      filteredData = data.filter((card) => card.tags.some((tag: string) => tag === selectedTag));
    }

    // 정렬
    if (sortType === 'popular') {
      filteredData.sort((a, b) => b.likes - a.likes);
    } else {
      filteredData.sort((a, b) => b.templateId - a.templateId); // 최신순 (ID 기준)
    }

    return filteredData;
  };

  const handleLoadMore = () => {
    setIsLoading(true);
    // 더 불러오기 로직 (추후 API 연결)
    setTimeout(() => {
      setVisibleCards((prev) => prev + 15);
      setIsLoading(false);
    }, 1000);
  };

  // 모달 열기 핸들러 - 카드 클릭 시 모달 연결을 위한 상태 처리
  const handleCardClick = (templateId: number, cardData: TemplateData) => {
    console.log('카드 클릭:', {
      templateId,
      folderId: selectedFolderId,
      cardData,
      source: 'archive',
      timestamp: new Date().toISOString(),
    });

    // 모달 열기 - 모달 스토어에서 지원하는 파라미터만 전달
    openModal('view', {
      templateId,
    });
  };

  const currentData = getCurrentFolderData();
  const displayedCards = currentData.slice(0, visibleCards);
  const hasMoreCards = visibleCards < currentData.length;

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
            onClick={() => handleCardClick(card.templateId, card)}
            className="cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
          />
        ))}
      </div>

      {/* 빈 상태 표시 */}
      {displayedCards.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-layout-grey4 body-lg mb-2">
            {selectedTag
              ? `'${selectedTag}' 태그에 해당하는 템플릿이 없습니다.`
              : '템플릿이 없습니다.'}
          </p>
          <p className="text-layout-grey4 body-sm">
            다른 폴더를 선택하거나 새로운 템플릿을 만들어보세요.
          </p>
        </div>
      )}

      {/* 더 불러오기 버튼 */}
      {hasMoreCards && displayedCards.length > 0 && (
        <div className="mt-[80px] flex justify-center">
          <button
            onClick={handleLoadMore}
            disabled={isLoading}
            className={`border-primary-navy4 text-primary-navy4 hover:bg-primary-navy1 button-md h-[52px] w-[210px] rounded-[6px] border transition-colors ${
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
