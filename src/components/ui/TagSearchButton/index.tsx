'use client';

import { clsx } from 'clsx';
import React, { useState, useEffect } from 'react';

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

// 태그 아이콘 매핑을 새로운 SVG 파일명 패턴에 맞게 수정
const tagIconMap: Record<TagType, { id: number; code: string }> = {
  인사말: { id: 1, code: 'gre' },
  자기소개: { id: 2, code: 'sel' },
  사과문: { id: 3, code: 'sor' },
  부탁글: { id: 4, code: 'fav' },
  감사글: { id: 5, code: 'tha' },
  제안글: { id: 6, code: 'sug' },
  공지글: { id: 7, code: 'ann' },
  소개글: { id: 8, code: 'int' },
  후기작성: { id: 9, code: 'rev' },
  소셜글: { id: 10, code: 'lik' },
  고객응대: { id: 11, code: 'cus' },
  교수문의: { id: 12, code: 'pro' },
  조별활동: { id: 13, code: 'gro' },
  공모전: { id: 14, code: 'com' },
  지원서: { id: 15, code: 'app' },
  기타: { id: 16, code: 'etc' },
};

type TagSearchButtonProps = {
  tag: TagType;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
};

export const TagSearchButton: React.FC<TagSearchButtonProps> = ({
  tag,
  selected = false,
  onClick,
  className,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [Icon, setIcon] = useState<React.ComponentType<React.SVGProps<SVGSVGElement>> | null>(null);

  const { id, code } = tagIconMap[tag];

  // 컴포넌트 마운트 시와 selected 상태 변경 시 아이콘 로드
  useEffect(() => {
    // 동적으로 SVG 아이콘 불러오기
    const loadIcon = async () => {
      try {
        const iconModule = await import(
          `@/assets/icons/icon-ic-${id}-${code}-${selected ? 'clicked' : 'default'}.svg`
        );
        setIcon(() => iconModule.default);
      } catch (error) {
        console.error('아이콘 로딩 에러:', error);
        setIcon(null);
      }
    };

    loadIcon();
  }, [id, code, selected]);

  console.log('TagSearchButton 렌더링:', tag, '선택됨:', selected);

  const handleClick = () => {
    console.log('TagSearchButton 클릭:', tag, '현재 선택 상태:', selected);
    if (onClick) {
      onClick();
    }
  };

  const getBackgroundClass = () => {
    if (selected) return 'bg-primary-navy4 border-primary-navy4 text-white';
    if (isHovered) return 'bg-layout-grey2';
    return 'bg-transparent';
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={clsx(
        'flex items-center justify-center rounded px-3 py-2 transition-colors',
        'h-9 whitespace-nowrap',
        getBackgroundClass(),
        selected && 'border',
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center">
          {Icon && <Icon />}
        </div>
        <span
          className={clsx(
            'text-base font-medium whitespace-nowrap',
            selected ? 'text-white' : 'text-primary-navy4',
          )}
        >
          {tag}
        </span>
      </div>
    </button>
  );
};

export default TagSearchButton;
