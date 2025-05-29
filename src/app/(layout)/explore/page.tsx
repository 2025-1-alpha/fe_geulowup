'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Spacing } from '@/components/ui/Spacing';
import TagSearchBar from '@/components/ui/TagSearchBar';
import Card from '@/components/ui/Card';
import Arrow from '@/components/ui/Arrow';
import WandIcon from '@/assets/icons/icon-lucide-wand.svg';
import MagnifyIcon from '@/assets/icons/icon-magnify.svg';
import ArrowUpDownIcon from '@/assets/icons/icon-arrow-up-down.svg';
import { Button } from '@/components/ui/Button';
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
  const { openModal, currentModal } = useModalStore();
  const [userName, setUserName] = useState<string>('사용자');

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

  // 사용자 이름 로드 및 설정
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payloadBase64Url = token.split('.')[1];

        if (payloadBase64Url) {
          // Base64URL을 표준 Base64로 변환
          let base64 = payloadBase64Url.replace(/-/g, '+').replace(/_/g, '/');
          while (base64.length % 4) {
            base64 += '=';
          }
          console.log('Payload Base64 (after B64URL to B64 conversion):', base64);

          const binaryString = atob(base64); // 변환된 base64 문자열 사용

          // 바이너리 문자열을 Uint8Array로 변환
          const bytes = new Uint8Array(binaryString.length);
          for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
          }

          // Uint8Array를 UTF-8 문자열로 디코딩
          const decodedPayloadUtf8 = new TextDecoder('utf-8').decode(bytes);

          const parsedPayload = JSON.parse(decodedPayloadUtf8);

          if (parsedPayload && parsedPayload.name) {
            setUserName(parsedPayload.name);
            console.log('User name set to state:', parsedPayload.name);

            localStorage.setItem('user', JSON.stringify({ name: parsedPayload.name }));
            console.log('User object saved to localStorage:', { name: parsedPayload.name });
          } else {
            console.log('Name not found in parsed payload or payload is null');
          }
        } else {
          console.log('payloadBase64Url is undefined or empty');
        }
      } catch (error) {
        console.error('토큰 디코딩, 사용자 이름 추출 또는 로컬 스토리지 저장 실패:', error);
      }
    }
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
    setSelectedTag(tag === selectedTag ? undefined : tag);
    setVisibleCardCount(16); // 태그 변경 시 초기 카드 수로 리셋
  };

  // 정렬 변경 핸들러
  const handleSortChange = () => {
    setSortType((prev) => (prev === 'popular' ? 'recent' : 'popular'));
  };

  // 검색 버튼 핸들러
  const handleSearchClick = () => {
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
    const templateToOpen =
      allTemplates.find((t) => t.templateId === templateId) ||
      recommendTemplates.find((t) => t.templateId === templateId);
    if (templateToOpen) {
      setSelectedTemplate(templateToOpen);
    }
    openModal('view', { templateId });
  };

  // 화면에 표시할 추천 템플릿 (3개씩)
  const visibleRecommendTemplates = recommendTemplates.slice(
    currentRecommendIndex,
    currentRecommendIndex + 3,
  );

  // 모달 상태 변경 감지하여 카드 선택 해제
  useEffect(() => {
    if (currentModal === null && selectedTemplate) {
      setSelectedTemplate(null);
      // Card 컴포넌트들이 클릭 상태를 해제하도록 이벤트 발생
      window.dispatchEvent(new Event('modal-closed'));
    }
  }, [currentModal, selectedTemplate]);

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
                  AI가 {userName}님을 위해 추천한 맞춤형 템플릿을 사용해 보세요!
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
                <Spacing size={24} />
                <TagSearchBar
                  tags={tagOptions}
                  selectedTag={selectedTag}
                  onTagSelect={handleTagSelect}
                  onSearchClick={handleSearchClick}
                  size="big"
                />
              </div>

              <Spacing size={40} />

              {/* 정렬 버튼 */}
              <div className="flex justify-end">
                <button
                  onClick={handleSortChange}
                  className="text-layout-grey5 hover:text-layout-grey7 body-sm mb-4 flex items-center"
                >
                  <ArrowUpDownIcon className="mr-1 h-4 w-4" />
                  {sortType === 'popular' ? '인기순' : '최신순'}
                </button>
              </div>

              {/* 템플릿 카드 목록 */}
              {isLoading && visibleCardItems.length === 0 ? (
                <div className="flex h-[200px] items-center justify-center">
                  <p className="text-layout-grey5 body-lg">템플릿을 불러오는 중입니다...</p>
                </div>
              ) : !isLoading && visibleCardItems.length === 0 ? (
                <div className="flex h-[200px] items-center justify-center">
                  <p className="text-layout-grey5 body-lg">
                    {selectedTag
                      ? `'${selectedTag}' 태그에 해당하는 템플릿이 없습니다.`
                      : '템플릿이 없습니다.'}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-x-[12px] gap-y-[20px] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {visibleCardItems.map((template, index) => (
                    <Card
                      key={index}
                      variant="large"
                      title={template.title}
                      description={template.description}
                      tags={template.tags}
                      likes={template.likes}
                      onClick={() => {
                        handleOpenModal(template.templateId);
                      }}
                    />
                  ))}
                </div>
              )}

              {/* 더보기 버튼 */}
              {visibleCardItems.length > 0 && totalPages > 1 && !isLoading && (
                <div className="mt-10 flex justify-center">
                  <Button variant="grey" state="line" size="large" onClick={handleLoadMore}>
                    더 보기
                  </Button>
                </div>
              )}
            </div>
          </section>
        </section>
      </div>
    </>
  );
}
