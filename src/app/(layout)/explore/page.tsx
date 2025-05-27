'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Spacing } from '@/components/ui/Spacing';
import TagSearchBar from '@/components/ui/TagSearchBar';
import Card from '@/components/ui/Card';
import CardTag from '@/components/ui/CardTag';
import Arrow from '@/components/ui/Arrow';
import WandIcon from '@/assets/icons/icon-lucide-wand.svg';
import MagnifyIcon from '@/assets/icons/icon-magnify.svg';
import ArrowUpDownIcon from '@/assets/icons/icon-arrow-up-down.svg';
import { TagType, TemplateType } from '@/types';
import { getTemplates } from '@/services/template/getTemplates';
import { getTemplatesRecommendation } from '@/services/template/getTemplatesRecommendation';
import { useModalStore } from '@/stores/useModalStore';

export default function ExplorePage() {
  const [selectedTag, setSelectedTag] = useState<TagType | undefined>(undefined);
  const [currentRecommendIndex, setCurrentRecommendIndex] = useState(0);
  const [visibleCardCount, setVisibleCardCount] = useState(16);
  const [isLoading, setIsLoading] = useState(false);
  const [sortType, setSortType] = useState<'popular' | 'recent'>('popular');
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType | null>(null);
  const [recommendTemplates, setRecommendTemplates] = useState<TemplateType[]>([]);
  const [allTemplates, setAllTemplates] = useState<TemplateType[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const { openModal } = useModalStore();

  const tagOptions: TagType[] = [
    '인사말',
    '자기소개',
    '사과문',
    '부탁글',
    '감사글',
    '제안글',
    '공지글',
    '소개글',
    '후기작성',
    '소셜글',
    '고객응대',
    '교수문의',
    '조별활동',
    '공모전',
    '지원서',
    '기타',
  ];

  // 추천 템플릿 데이터 가져오기
  useEffect(() => {
    const fetchRecommendTemplates = async () => {
      try {
        const response = await getTemplatesRecommendation();
        const templates =
          response?.templates.map((template) => ({
            title: template.title,
            description: template.content,
            tags: template.tags,
            likes: template.likeCount,
            content: template.content,
            templateId: template.templateId,
          })) ?? [];
        setRecommendTemplates(templates);
      } catch (error) {
        console.error('추천 템플릿 가져오기 오류:', error);
      }
    };

    fetchRecommendTemplates();
  }, []);

  // 전체 템플릿 데이터 가져오기
  useEffect(() => {
    const fetchTemplates = async () => {
      setIsLoading(true);
      try {
        const sortOptions = sortType === 'popular' ? ['likeCount,desc'] : ['createdAt,desc'];
        const response = await getTemplates({
          tag: selectedTag,
          page: 0,
          size: visibleCardCount,
          sort: sortOptions,
        });

        const templates = response?.templates.map((template) => ({
          title: template.title,
          description: template.content,
          tags: template.tags,
          likes: template.likeCount,
          content: template.content,
          templateId: template.templateId,
        }));

        setAllTemplates(templates ?? []);
        setTotalPages(response?.totalPage ?? 0);
      } catch (error) {
        console.error('템플릿 가져오기 오류:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTemplates();
  }, [selectedTag, sortType, visibleCardCount]);

  // 필터링 및 정렬된 아이템들은 이제 API에서 이미 처리해서 가져오기 때문에 제거
  const visibleCardItems = allTemplates;

  // 더 불러오기 핸들러
  const handleLoadMore = useCallback(() => {
    if (isLoading) return;
    setVisibleCardCount((prev) => prev + 16);
  }, [isLoading]);

  // 태그 선택 핸들러
  const handleTagSelect = (tag: TagType) => {
    console.log('태그 선택:', tag, '이전 선택된 태그:', selectedTag);
    setSelectedTag(tag === selectedTag ? undefined : tag);
    setVisibleCardCount(16); // 태그 변경 시 초기 카드 수로 리셋
  };

  // 정렬 변경 핸들러
  const handleSortChange = () => {
    setSortType((prev) => (prev === 'popular' ? 'recent' : 'popular'));
    console.log('정렬 변경:', sortType === 'popular' ? 'recent' : 'popular');
  };

  // 검색 버튼 핸들러
  const handleSearchClick = () => {
    console.log(`검색: ${selectedTag || '선택된 태그 없음'}`);
  };

  // 추천 템플릿 이전/다음 핸들러
  const handlePrevRecommend = () => {
    setCurrentRecommendIndex((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleNextRecommend = () => {
    setCurrentRecommendIndex((prev) =>
      prev < recommendTemplates.length - 3 ? prev + 1 : recommendTemplates.length - 3,
    );
  };

  // 모달 열기 핸들러
  const handleOpenModal = (templateId: number) => {
    openModal('view', { templateId });
  };

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setSelectedTemplate(null);
    // 모달 닫힘 이벤트 발생 - 모든 카드의 클릭 상태 초기화
    window.dispatchEvent(new Event('modal-closed'));
  };

  // 화면에 표시할 추천 템플릿 (3개씩)
  const visibleRecommendTemplates = recommendTemplates.slice(
    currentRecommendIndex,
    currentRecommendIndex + 3,
  );

  // 템플릿 사용 핸들러
  const handleUseTemplate = () => {
    if (selectedTemplate?.content) {
      navigator.clipboard
        .writeText(selectedTemplate.content)
        .then(() => {
          alert('템플릿 내용이 클립보드에 복사되었습니다.');
          console.log('템플릿 사용하기:', selectedTemplate.title);
          handleCloseModal();
        })
        .catch((err) => {
          console.error('클립보드 복사 실패:', err);
          alert('템플릿 복사에 실패했습니다. 다시 시도해주세요.');
        });
    } else {
      alert('템플릿 내용이 없습니다.');
    }
  };

  return (
    <>
      <div className="mt-[100px] mb-[140px]">
        <section className="flex flex-col items-center">
          <section className="mx-[96px] w-full max-w-[1320px]">
            <div className="h-[44px] w-[126px]">
              <p className="title-lg text-layout-grey7">찾아보기</p>
            </div>
            <Spacing size={40} />

            <div className="w-[1320px]">
              <div className="border-secondary-purple2 relative rounded-[7px] border p-6">
                <div className="flex items-center">
                  <WandIcon className="mr-2" />
                  <h2 className="text-layout-grey7 title-md">추천 템플릿 사용하기</h2>
                </div>
                <Spacing size={8} />
                <p className="body-md text-layout-grey7">
                  AI가 [username]님을 위해 추천한 맞춤형 템플릿을 사용해 보세요!
                </p>
                <Spacing size={40} />

                <div className="flex w-full items-center justify-center px-8">
                  <div className="mr-4 flex h-6 w-6 items-center justify-center">
                    <Arrow
                      direction="left"
                      colorType="navy"
                      onClick={handlePrevRecommend}
                      disabled={currentRecommendIndex === 0}
                      className="h-6 w-6"
                    />
                  </div>

                  <div className="flex flex-1 justify-center gap-[12px]">
                    {visibleRecommendTemplates.map((template, index) => (
                      <Card
                        key={index}
                        variant="promote"
                        title={template.title}
                        description={template.description}
                        tags={template.tags}
                        likes={template.likes}
                        onClick={() => handleOpenModal(template.templateId)}
                        className="cursor-pointer transition-shadow hover:shadow-md"
                      />
                    ))}
                  </div>

                  <div className="ml-4 flex h-6 w-6 items-center justify-center">
                    <Arrow
                      direction="right"
                      colorType="navy"
                      onClick={handleNextRecommend}
                      disabled={currentRecommendIndex >= recommendTemplates.length - 3}
                      className="h-6 w-6"
                    />
                  </div>
                </div>
                <Spacing size={20} />
              </div>

              <Spacing size={80} />

              <div>
                <div className="flex items-center">
                  <MagnifyIcon className="mr-2 h-[27px] w-[27px]" />
                  <h2 className="text-layout-grey7 title-md h-[30px] w-[159px]">템플릿 찾아보기</h2>
                </div>
                <Spacing size={8} />
                <p className="body-md text-layout-grey7 h-[25px] w-[850px]">
                  키워드 태그를 통해 다양한 상황에 맞는 템플릿을 찾아 보세요!
                </p>
                <Spacing size={40} />
                <TagSearchBar
                  size="big"
                  tags={tagOptions}
                  selectedTag={selectedTag}
                  onTagSelect={handleTagSelect}
                  onSearchClick={handleSearchClick}
                />
              </div>

              <Spacing size={80} />

              <div>
                <div className="flex items-center justify-between">
                  <h2 className="text-layout-grey7 title-md">템플릿 목록</h2>

                  <button
                    onClick={handleSortChange}
                    className="bg-layout-grey1 text-layout-grey6 flex h-[36px] w-[87px] items-center justify-center gap-1 rounded"
                  >
                    <ArrowUpDownIcon className="h-4 w-4" />
                    <span>{sortType === 'popular' ? '인기순' : '최신순'}</span>
                  </button>
                </div>
                <Spacing size={40} />

                {visibleCardItems.length === 0 ? (
                  <div className="text-layout-grey6 py-10 text-center">
                    <p>선택한 태그에 맞는 템플릿이 없습니다.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-4 gap-x-[13.33px] gap-y-[12px]">
                    {visibleCardItems.map((item, index) => (
                      <Card
                        key={index}
                        variant="large"
                        title={item.title}
                        description={item.description}
                        tags={item.tags}
                        likes={item.likes}
                        onClick={() => handleOpenModal(item.templateId)}
                        className="cursor-pointer transition-shadow hover:shadow-md"
                      />
                    ))}
                  </div>
                )}

                {visibleCardItems.length > 0 && visibleCardCount < totalPages * 16 && (
                  <div className="mt-[80px] flex justify-center">
                    <button
                      onClick={handleLoadMore}
                      disabled={isLoading}
                      className={`border-primary-navy4 text-primary-navy4 hover:bg-primary-navy1 rounded-[6px] border px-6 py-2 transition-colors ${isLoading ? 'cursor-not-allowed opacity-70' : ''}`}
                    >
                      {isLoading ? '로딩 중...' : '더 불러오기'}
                    </button>
                  </div>
                )}

                <div className="text-layout-grey5 mt-4 text-xs">
                  {selectedTag
                    ? `선택된 태그: ${selectedTag} | 결과: ${allTemplates.length}개`
                    : '모든 템플릿 표시 중'}
                </div>
              </div>
            </div>
          </section>
        </section>
      </div>

      {selectedTemplate && (
        <div
          className="fixed inset-0 z-50"
          style={{
            backgroundColor: 'rgba(0,0,0,0.05)',
            backdropFilter: 'blur(3px)',
          }}
          onClick={handleCloseModal}
        >
          <div className="flex h-full w-full items-center justify-center p-4">
            <div
              className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6 shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="title-md text-layout-grey7">
                  {selectedTemplate.title || '제목 없음'}
                </h3>
                <button
                  onClick={handleCloseModal}
                  className="text-layout-grey6 hover:text-layout-grey7"
                >
                  닫기
                </button>
              </div>

              <div className="mb-6">
                <p className="body-md text-layout-grey7 mb-4">
                  {selectedTemplate.description || '설명이 없는 템플릿입니다.'}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedTemplate.tags && selectedTemplate.tags.length > 0 ? (
                    selectedTemplate.tags.map((tag, idx) => <CardTag key={idx} text={tag} />)
                  ) : (
                    <p className="text-layout-grey5 text-sm">태그 정보가 없습니다.</p>
                  )}
                </div>
              </div>

              {selectedTemplate.content ? (
                <div className="bg-layout-grey1 mt-4 mb-6 rounded-md p-4">
                  <p className="text-layout-grey7 text-sm whitespace-pre-line">
                    {selectedTemplate.content}
                  </p>
                </div>
              ) : (
                <div className="bg-layout-grey1 mt-4 mb-6 flex items-center justify-center rounded-md p-4">
                  <p className="text-layout-grey6 py-8 text-sm">
                    현재 템플릿 내용을 불러올 수 없습니다.
                  </p>
                </div>
              )}

              <div className="mt-6 flex justify-end gap-3">
                <button
                  className="border-layout-grey3 hover:bg-layout-grey1 rounded-md border px-4 py-2 transition-colors"
                  onClick={handleCloseModal}
                >
                  취소
                </button>
                <button
                  className="bg-primary-navy4 hover:bg-primary-navy5 rounded-md px-4 py-2 text-white transition-colors"
                  onClick={handleUseTemplate}
                  disabled={!selectedTemplate.content}
                >
                  템플릿 사용하기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
