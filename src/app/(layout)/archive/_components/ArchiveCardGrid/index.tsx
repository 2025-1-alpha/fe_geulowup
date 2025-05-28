'use client';

import { useState, useEffect } from 'react';
import Card from '@/components/ui/Card';
import { useModalStore } from '@/stores/useModalStore';
import { TagType } from '@/types';
import { useTemplatesLikes } from '@/hooks/template/useTemplateLikes';
import { useRecentlyUsedTemplates } from '@/hooks/template/useRecentlyUsedTemplates';
import { useFolderDetail } from '@/hooks/folder/useFolderDetail';
import { Template } from '@/services/template/getTemplates';

interface ArchiveCardGridProps {
  selectedFolderId: string;
  selectedTag?: TagType;
  sortType: 'popular' | 'latest';
}

export default function ArchiveCardGrid({
  selectedFolderId,
  selectedTag,
  sortType,
}: ArchiveCardGridProps) {
  const [visibleCards, setVisibleCards] = useState(15);
  const [isLoading, setIsLoading] = useState(false);
  const { openModal } = useModalStore();

  // 폴더별 데이터 API 연동
  const isLikes = selectedFolderId === '1';
  const isRecent = selectedFolderId === '2';
  const folderIdNum = Number(selectedFolderId);

  const { data: likesData } = useTemplatesLikes();
  const { data: recentData } = useRecentlyUsedTemplates();
  const { data: folderDetailData } = useFolderDetail(
    !isLikes && !isRecent && !isNaN(folderIdNum) ? folderIdNum : 0,
  );

  // 템플릿 데이터 추출
  let templates: Template[] = [];
  if (isLikes) {
    templates = likesData?.templates ?? [];
  } else if (isRecent) {
    templates = recentData?.templates ?? [];
  } else if (folderDetailData) {
    templates = folderDetailData.templates ?? [];
  }

  // 태그 필터링
  let filteredTemplates: Template[] = templates;
  if (selectedTag) {
    filteredTemplates = templates.filter((card) =>
      card.tags.some((tag: string) => tag === selectedTag),
    );
  }

  // 정렬
  if (sortType === 'popular') {
    filteredTemplates = [...filteredTemplates].sort((a, b) => b.likeCount - a.likeCount);
  } else {
    filteredTemplates = [...filteredTemplates].sort((a, b) => b.templateId - a.templateId);
  }

  // 페이징
  const displayedCards = filteredTemplates.slice(0, visibleCards);
  const hasMoreCards = visibleCards < filteredTemplates.length;

  // 폴더가 변경될 때 visibleCards 초기화
  useEffect(() => {
    setVisibleCards(15);
  }, [selectedFolderId]);

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCards((prev) => prev + 15);
      setIsLoading(false);
    }, 1000);
  };

  // 모달 열기 핸들러
  const handleCardClick = (templateId: number, cardData: Template) => {
    console.log('카드 클릭:', {
      templateId,
      folderId: selectedFolderId,
      cardData,
      source: 'archive',
      timestamp: new Date().toISOString(),
    });

    openModal('view', {
      templateId,
    });
  };

  return (
    <div>
      {/* 카드 그리드 - 3열로 배치 */}
      <div className="grid grid-cols-3 gap-x-[13.33px] gap-y-[12px]">
        {displayedCards.map((card) => (
          <Card
            key={card.templateId}
            variant="large"
            title={card.title}
            description={card.content}
            tags={card.tags}
            likes={card.likeCount}
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
