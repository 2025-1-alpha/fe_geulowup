'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { Spacing } from '@/components/ui/Spacing';
import TagSearchBar from '@/components/ui/TagSearchBar';
import Card from '@/components/ui/Card';
import Arrow from '@/components/ui/Arrow';
import WandIcon from '@/assets/icons/icon-lucide-wand.svg';
import MagnifyIcon from '@/assets/icons/icon-magnify.svg';
import ArrowUpDownIcon from '@/assets/icons/icon-arrow-up-down.svg';
import TempTemplateModal from '@/components/ui/TemplateModal';

// TagSearchBar에서 사용하는 TagType 정의
type TagType =
  | '인사말'
  | '자기소개'
  | '사과문'
  | '부탁글'
  | '감사글'
  | '제안글'
  | '공지글'
  | '소개글'
  | '후기작성'
  | '소셜글'
  | '고객응대'
  | '교수문의'
  | '조별활동'
  | '공모전'
  | '지원서'
  | '기타';

// 템플릿 데이터 타입 정의
type TemplateType = {
  title: string;
  description: string;
  tags: string[];
  likes: number;
  content?: string; // 템플릿 내용 (필요시 추가)
};

// 전체 샘플 데이터 64개 생성을 위한 기본 데이터
const baseSampleData = [
  {
    title: '회사 소개 프레젠테이션',
    description:
      '회사를 외부 파트너나 고객에게 소개하기 위한 프레젠테이션 템플릿입니다. 기업 가치, 제품, 서비스, 성과를 간결하게 정리했습니다.',
    tags: ['소개글', '비즈니스', '제안글'],
    likes: 145,
    content: `[회사명] 소개

비전 및 미션:
- 비전: [회사의 장기적 목표와 지향점]
- 미션: [회사가 추구하는 핵심 가치와 존재 이유]

회사 개요:
- 설립: [설립 연도]
- 위치: [본사 및 지사 위치]
- 규모: [직원 수, 시장 점유율 등]

주요 제품 및 서비스:
1. [주요 제품/서비스 1]
   - 특징 및 장점
   - 시장 내 위치

2. [주요 제품/서비스 2]
   - 특징 및 장점
   - 시장 내 위치

경쟁 우위 요소:
- [차별화 요소 1]
- [차별화 요소 2]
- [차별화 요소 3]

주요 성과:
- [매출/성장률 등 재무적 성과]
- [수상 내역, 인증, 특허 등]
- [주요 고객사 및 파트너십]

향후 계획:
- [단기 목표]
- [중장기 전략 방향]

연락처:
[담당자 정보]
[웹사이트/소셜미디어]`,
  },
  {
    title: '대학원 연구계획서',
    description:
      '대학원 지원 시 필요한 연구계획서 작성 템플릿입니다. 연구 주제, 배경, 목적, 방법론, 기대효과까지 체계적으로 작성할 수 있습니다.',
    tags: ['교수문의', '지원서', '자기소개'],
    likes: 176,
  },
  {
    title: '면접 후 감사 이메일',
    description:
      '면접 후 인사담당자에게 보내는 감사 이메일 템플릿입니다. 면접 기회에 대한 감사와 추가 어필 포인트를 간결하게 전달할 수 있습니다.',
    tags: ['감사글', '취업', '인사말'],
    likes: 163,
  },
  {
    title: '고객 불만 응대 스크립트',
    description:
      '다양한 상황의 고객 불만에 대응하기 위한 매뉴얼입니다. 클레임 유형별 대응 방법과 적절한 보상 방안까지 포함되어 있습니다.',
    tags: ['고객응대', '비즈니스', '사과문'],
    likes: 137,
  },
  {
    title: '블로그 포스팅 구조',
    description:
      '효과적인 블로그 글쓰기를 위한 구조화된 템플릿입니다. 독자의 관심을 끄는 도입부터 행동 유도까지 콘텐츠 마케팅에 최적화되어 있습니다.',
    tags: ['소셜글', '소개글', '후기작성'],
    likes: 122,
  },
  {
    title: '학위 논문 구성 가이드',
    description:
      '학사, 석사, 박사 논문 작성을 위한 표준 구성 가이드입니다. 연구방법론부터 참고문헌 작성법까지 학술 규범을 준수한 형식을 제공합니다.',
    tags: ['교수문의', '공모전', '조별활동'],
    likes: 168,
  },
  {
    title: '재택근무 신청서',
    description:
      '회사에 재택근무를 신청할 때 사용할 수 있는 공식 양식입니다. 업무 계획, 성과 측정 방법, 필요 장비 등을 체계적으로 작성할 수 있습니다.',
    tags: ['부탁글', '비즈니스', '공지글'],
    likes: 149,
  },
  {
    title: '신제품 출시 보도자료',
    description:
      '새로운 제품이나 서비스 출시 시 언론에 배포할 보도자료 템플릿입니다. 주요 특징, 가격, 출시일 등을 효과적으로 전달할 수 있습니다.',
    tags: ['소개글', '공지글', '비즈니스'],
    likes: 132,
  },
  {
    title: '휴가 신청 이메일',
    description:
      '상사에게 휴가를 신청하는 이메일 템플릿입니다. 휴가 기간, 업무 인수인계 계획을 포함해 적절한 예의를 갖춘 형식으로 작성되어 있습니다.',
    tags: ['부탁글', '인사말', '비즈니스'],
    likes: 118,
  },
  {
    title: '창업 사업계획서',
    description:
      '투자자나 지원 기관에 제출할 창업 사업계획서 템플릿입니다. 사업 모델, 시장 분석, 수익 전략, 팀 소개까지 포괄적으로 구성되어 있습니다.',
    tags: ['제안글', '소개글', '공모전'],
    likes: 187,
  },
  {
    title: '결혼식 초대장 문구',
    description:
      '결혼식 초대장에 사용할 수 있는 다양한 문구 템플릿입니다. 격식 있는 표현부터 캐주얼한 문구까지 상황에 맞게 선택할 수 있습니다.',
    tags: ['인사말', '소셜글', '부탁글'],
    likes: 142,
  },
  {
    title: '성과 보고서',
    description:
      '프로젝트나 업무의 성과를 상사나 클라이언트에게 보고하기 위한 템플릿입니다. 정량적 지표와 정성적 성과를 균형있게 전달할 수 있습니다.',
    tags: ['공지글', '비즈니스', '후기작성'],
    likes: 159,
  },
  {
    title: '비즈니스 소개 이메일',
    description:
      '잠재 고객이나 파트너에게 처음 접촉하는 비즈니스 소개 이메일 템플릿입니다. 간결하면서도 핵심 가치 제안을 명확히 전달할 수 있습니다.',
    tags: ['인사말', '소개글', '비즈니스'],
    likes: 175,
  },
  {
    title: '제품 리콜 공지문',
    description:
      '제품 결함이나 안전 문제로 리콜이 필요할 때 사용하는 공지문 템플릿입니다. 문제 설명, 대응 절차, 보상 정보를 포함하고 있습니다.',
    tags: ['공지글', '사과문', '고객응대'],
    likes: 127,
  },
  {
    title: '연설문 작성 가이드',
    description:
      '각종 행사나 세미나에서 사용할 연설문 작성 가이드입니다. 도입부, 본론, 결론 구성과 청중을 사로잡는 레토릭 기법을 소개합니다.',
    tags: ['인사말', '소개글', '공지글'],
    likes: 155,
  },
  {
    title: '맞춤형 여행 제안서',
    description:
      '여행사나 플래너가 고객에게 제공하는 맞춤형 여행 제안서 템플릿입니다. 일정, 숙소, 교통, 예산을 한눈에 볼 수 있게 구성되어 있습니다.',
    tags: ['제안글', '소개글', '후기작성'],
    likes: 139,
  },
];

// 64개의 카드 데이터를 생성하는 함수
const generateCardData = (count: number) => {
  const result = [];
  const baseLength = baseSampleData.length;

  for (let i = 0; i < count; i++) {
    const baseItem = baseSampleData[i % baseLength];
    const batchNumber = Math.floor(i / baseLength) + 1;

    if (batchNumber === 1) {
      result.push({ ...baseItem });
    } else {
      result.push({
        ...baseItem,
        title: `${baseItem.title} ${batchNumber}`,
        likes: baseItem.likes + batchNumber * 10,
      });
    }
  }

  return result;
};

// 전체 64개의 카드 데이터 생성
const allCardItems = generateCardData(64);

export default function ExplorePage() {
  // 태그 선택 상태 관리
  const [selectedTag, setSelectedTag] = useState<TagType | undefined>(undefined);

  // 추천 템플릿 상태 관리
  const [currentRecommendIndex, setCurrentRecommendIndex] = useState(0);

  // 현재 로드된 카드 데이터 관리
  const [visibleCardCount, setVisibleCardCount] = useState(16);
  const [isLoading, setIsLoading] = useState(false);

  // 정렬 타입 상태
  const [sortType, setSortType] = useState<'popular' | 'recent'>('popular');

  // 모달 관련 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType | null>(null);

  // 태그 옵션 목록
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

  // 추천 템플릿 카드 데이터
  const recommendTemplates = [
    {
      title: '효과적인 입사지원서',
      description:
        '채용담당자의 시선을 사로잡는 입사지원서 템플릿입니다. 경력, 기술, 역량을 강조하는 구조화된 양식으로 합격률을 높일 수 있습니다. 맞춤형 예시와 작성 팁이 포함되어 있습니다.',
      tags: ['자기소개', '지원서', '취업'],
      likes: 214,
      content: `안녕하세요, [지원자 이름]입니다.

[회사명]의 [지원 포지션] 포지션에 지원합니다.

[직무 관련 주요 경력/경험 요약 - 1-2문장]

주요 역량 및 성과:
• [주요 성과 1: 구체적인 숫자와 결과 중심으로]
• [주요 성과 2: 구체적인 숫자와 결과 중심으로]
• [주요 성과 3: 구체적인 숫자와 결과 중심으로]

[회사에 기여할 수 있는 방법과 입사 의지를 표현]

[연락처 정보]
[링크드인/포트폴리오 등 추가 정보]

감사합니다.`,
    },
    {
      title: '고객 서비스 사과 메일',
      description:
        '서비스 불만이나 제품 문제에 대응하는 전문적인 사과 메일 템플릿입니다. 문제 인정, 해결 방안 제시, 보상 방법을 체계적으로 포함하여 고객 만족도를 회복할 수 있습니다.',
      tags: ['사과문', '고객응대', '비즈니스'],
      likes: 183,
      content: `안녕하세요, [고객명]님

[서비스/제품명] 이용 중 불편을 드려 진심으로 사과드립니다.

[발생한 문제에 대한 간략한 설명 - 책임을 인정하는 어조로]

저희 팀은 현재 다음과 같은 조치를 취하고 있습니다:
1. [즉각적인 해결 조치]
2. [중기적 개선 사항]
3. [재발 방지를 위한 시스템 개선]

또한 불편에 대한 보상으로 [구체적인 보상 내용]을 제공해 드리고자 합니다.

앞으로 더 나은 서비스로 보답하겠습니다. 추가 문의사항이 있으시면 언제든지 [연락처/담당자 정보]로 연락주시기 바랍니다.

감사합니다.
[회사명/담당자명]`,
    },
    {
      title: '투자 유치 제안서',
      description:
        '스타트업이나 사업 확장을 위한 투자 유치 제안서 템플릿입니다. 사업 모델, 시장 분석, 경쟁 우위, 재무 계획, 투자금 활용 계획을 명확하게 전달하는 구조로 설계되었습니다.',
      tags: ['제안글', '비즈니스', '소개글'],
      likes: 197,
      content: `[회사명] 투자 제안서

비전: [1-2문장으로 회사의 핵심 비전]

사업 개요:
- [제품/서비스 설명]
- [해결하려는 문제]
- [타겟 시장]

시장 기회:
- 시장 규모: [현재 및 예상 시장 규모, 성장률]
- 타겟 고객: [주요 고객층 설명]
- 경쟁 환경: [주요 경쟁사 및 차별점]

비즈니스 모델:
- [수익 모델 설명]
- [가격 책정 전략]
- [현재 트랙션: 사용자 수, 매출 등]

팀:
- [핵심 팀원 및 전문성]

투자 요청:
- 조달 금액: [목표 금액]
- 자금 사용 계획: [주요 사용처 및 비율]
- 투자 타임라인: [자금 유치 일정]

재무 전망:
- [향후 3-5년 주요 재무 지표 예측]

연락처:
[담당자 정보]`,
    },
    {
      title: '학술 연구 협업 제안',
      description:
        '학술 연구 협업을 위한 제안서 템플릿입니다. 연구 주제, 목적, 방법론, 예상 결과, 각 연구자의 역할 및 일정 계획을 체계적으로 정리하여 효율적인 협업을 가능하게 합니다.',
      tags: ['제안글', '교수문의', '조별활동'],
      likes: 176,
      content: `연구 협업 제안서

연구 제목: [제목]

연구 배경:
[연구 주제의 학술적 중요성 및 현재 연구 동향 요약]

연구 목적:
[이 연구를 통해 달성하고자 하는 구체적 목표]

연구 방법론:
- [데이터 수집 방법]
- [분석 기법]
- [필요한 리소스]

각 연구자 역할:
- [제안자 역할 및 기여]
- [협업 대상자에게 기대하는 역할 및 기여]

예상 결과 및 의의:
[예상되는 연구 결과 및 학술적/실용적 의의]

일정 계획:
[주요 단계별 일정 및 마일스톤]

필요한 자원:
[연구비, 장비, 인력 등]

연락처:
[제안자 정보]`,
    },
    {
      title: '멘토 감사 편지',
      description:
        '멘토나 지도교수에게 보내는 전문적이고 진정성 있는 감사 편지 템플릿입니다. 구체적인 도움과 그로 인한 성장, 앞으로의 계획을 담아 깊은 감사의 마음을 전달할 수 있습니다.',
      tags: ['감사글', '인사말', '교수문의'],
      likes: 165,
      content: `존경하는 [멘토/교수님] 께,

안녕하세요, [본인 이름]입니다.

[멘토링/지도] 기간 동안 베풀어주신 귀중한 가르침과 지원에 진심으로 감사드립니다.

특히 [구체적인 도움이나 조언]은 제게 큰 깨달음과 성장의 기회가 되었습니다. 교수님의 지도로 인해 저는 [구체적인 성장 영역]에서 크게 발전할 수 있었습니다.

교수님께서 가르쳐주신 [중요한 교훈/가치]는 앞으로의 [학업/연구/커리어]에 있어 중요한 지침이 될 것입니다. 앞으로 저는 [미래 계획]을 통해 교수님의 가르침을 실천하고자 합니다.

다시 한번 교수님의 소중한 시간과 지혜를 나눠주심에 깊은 감사를 드립니다.

감사의 마음을 담아,
[본인 이름]
[연락처]`,
    },
    {
      title: '디지털 제품 사용 후기',
      description:
        '디지털 제품이나 소프트웨어 서비스에 대한 구조화된 후기 작성 템플릿입니다. 기능, 사용성, 장단점, 가격 대비 가치에 대한 균형 잡힌 의견을 제시하는 방식으로 구성되어 있습니다.',
      tags: ['후기작성', '소셜글', '비즈니스'],
      likes: 158,
      content: `[제품/서비스명] 사용 후기

사용 기간: [사용 기간]
사용 환경: [하드웨어/소프트웨어 환경, 사용 목적]

장점:
• [주요 장점 1: 구체적인 기능과 그 유용성]
• [주요 장점 2: 구체적인 기능과 그 유용성]
• [주요 장점 3: 구체적인 기능과 그 유용성]

개선점:
• [개선점 1: 구체적인 문제와 개선 제안]
• [개선점 2: 구체적인 문제와 개선 제안]

가격 대비 가치: [가격 정보와 가치 평가]

종합 평가: [5점 만점에 몇 점인지, 그 이유]

추천 대상: [어떤 사용자에게 추천하는지]

[추가 스크린샷/증거 자료]`,
    },
  ];

  // 태그 필터링 로직
  const filteredCardItems = useMemo(() => {
    if (!selectedTag) {
      // 태그가 선택되지 않았으면 모든 아이템 반환
      return allCardItems;
    }

    // 선택된 태그를 포함하는 아이템만 필터링
    return allCardItems.filter((item) => item.tags.includes(selectedTag));
  }, [allCardItems, selectedTag]);

  // 정렬 로직
  const sortedCardItems = useMemo(() => {
    if (sortType === 'popular') {
      // 인기순 정렬 (좋아요 내림차순)
      return [...filteredCardItems].sort((a, b) => b.likes - a.likes);
    } else {
      // 최신순 정렬 (ID 내림차순 - 여기서는 단순히 배열 역순)
      return [...filteredCardItems].reverse();
    }
  }, [filteredCardItems, sortType]);

  // 현재 화면에 표시할 카드 아이템들
  const visibleCardItems = sortedCardItems.slice(0, visibleCardCount);

  // 더 불러오기 핸들러
  const handleLoadMore = useCallback(() => {
    if (visibleCardCount >= sortedCardItems.length) return;

    // 로딩 상태 표시
    setIsLoading(true);

    // API 호출을 시뮬레이션하기 위한 타임아웃
    setTimeout(() => {
      setVisibleCardCount((prev) => Math.min(prev + 16, sortedCardItems.length));
      setIsLoading(false);
    }, 800);
  }, [visibleCardCount, sortedCardItems.length]);

  // 태그 선택 핸들러
  const handleTagSelect = (tag: TagType) => {
    console.log('태그 선택:', tag, '이전 선택된 태그:', selectedTag);
    setSelectedTag(tag === selectedTag ? undefined : tag);
    // 태그가 변경되면 카드 카운트를 초기화
    setVisibleCardCount(16);
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
  const handleOpenModal = (template: TemplateType) => {
    setSelectedTemplate(template);
    setIsModalOpen(true);
    console.log('모달 열림, 선택된 템플릿:', template.title);
  };

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTemplate(null);
  };

  // 화면에 표시할 추천 템플릿 (3개씩)
  const visibleRecommendTemplates = recommendTemplates.slice(
    currentRecommendIndex,
    currentRecommendIndex + 3,
  );

  // 템플릿 사용 핸들러
  const handleUseTemplate = () => {
    if (selectedTemplate?.content) {
      // 클립보드에 템플릿 내용 복사
      navigator.clipboard
        .writeText(selectedTemplate.content)
        .then(() => {
          // 복사 성공 시 알림
          alert('템플릿 내용이 클립보드에 복사되었습니다.');

          // 편집 페이지로 이동 로직을 여기에 추가할 수 있습니다.
          // 예시: router.push('/edit?template=' + encodeURIComponent(selectedTemplate.title));

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
    <div className="mt-[100px] mb-[140px]">
      <section className="flex flex-col items-center">
        <section className="mx-[96px] w-full max-w-[1320px]">
          {/* 찾아보기 제목 */}
          <div className="h-[44px] w-[126px]">
            <p className="title-lg text-layout-grey7">찾아보기</p>
          </div>
          <Spacing size={40} />

          {/* 1320*1692 크기의 블록 */}
          <div className="w-[1320px]">
            {/* 섹션 1: 추천 템플릿 사용하기 */}
            <div className="border-secondary-purple2 relative rounded-[7px] border p-6">
              <div className="flex items-center">
                {/* 추가된 WandIcon 사용 */}
                <WandIcon className="mr-2" />
                <h2 className="text-layout-grey7 title-md">추천 템플릿 사용하기</h2>
              </div>
              <Spacing size={8} />
              <p className="body-md text-layout-grey7">
                AI가 [username]님을 위해 추천한 맞춤형 템플릿을 사용해 보세요!
              </p>
              <Spacing size={40} />

              {/* 추천 템플릿 카드 슬라이더 - 화살표 위치 균형 조정 */}
              <div className="flex w-full items-center justify-center px-8">
                {/* 왼쪽 화살표 */}
                <div className="mr-4 flex h-6 w-6 items-center justify-center">
                  <Arrow
                    direction="left"
                    colorType="navy"
                    onClick={handlePrevRecommend}
                    disabled={currentRecommendIndex === 0}
                    className="h-6 w-6"
                  />
                </div>

                {/* 카드 컨테이너 - 동일한 너비 확보 */}
                <div className="flex flex-1 justify-center gap-[12px]">
                  {visibleRecommendTemplates.map((template, index) => (
                    <Card
                      key={index}
                      variant="promote"
                      title={template.title}
                      description={template.description}
                      tags={template.tags}
                      likes={template.likes}
                      onClick={() => handleOpenModal(template)}
                      className="cursor-pointer transition-shadow hover:shadow-md"
                    />
                  ))}
                </div>

                {/* 오른쪽 화살표 */}
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

            {/* 섹션 2: 템플릿 찾아보기 (태그 검색) */}
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

            {/* 섹션 3: 템플릿 카드 나열 */}
            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-layout-grey7 title-md">템플릿 목록</h2>

                {/* 인기순 정렬 버튼 */}
                <button
                  onClick={handleSortChange}
                  className="bg-layout-grey1 text-layout-grey6 flex h-[36px] w-[87px] items-center justify-center gap-1 rounded"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span>{sortType === 'popular' ? '인기순' : '최신순'}</span>
                </button>
              </div>
              <Spacing size={40} />

              {/* 필터링 결과가 없을 때 표시할 메시지 */}
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
                      onClick={() => handleOpenModal(item)}
                      className="cursor-pointer transition-shadow hover:shadow-md"
                    />
                  ))}
                </div>
              )}

              {/* 더 불러오기 버튼 (필터링된 결과가 있고, 더 불러올 항목이 있을 때만 표시) */}
              {visibleCardItems.length > 0 && visibleCardCount < sortedCardItems.length && (
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

              {/* 선택된 태그 정보 표시 (디버깅용, 필요시 제거) */}
              <div className="text-layout-grey5 mt-4 text-xs">
                {selectedTag
                  ? `선택된 태그: ${selectedTag} | 결과: ${sortedCardItems.length}개`
                  : '모든 템플릿 표시 중'}
              </div>
            </div>
          </div>
        </section>
      </section>

      {/* TemplateModal 컴포넌트 사용 */}
      {selectedTemplate && (
        <TempTemplateModal
          isOpen={isModalOpen}
          template={selectedTemplate}
          onClose={handleCloseModal}
          onUse={handleUseTemplate}
        />
      )}
    </div>
  );
}
