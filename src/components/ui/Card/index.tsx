'use client';

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import CardTag from '@/components/ui/CardTag';
import CardLike from '@/components/ui/CardLike';

type variantType = 'large' | 'medium' | 'small' | 'promote';

interface CardProps {
  variant: variantType;
  title: string;
  description: string;
  tags: string[];
  likes: number;
  onClick?: () => void;
  className?: string;
  isSelected?: boolean;
  onSelectionChange?: (cardId: string) => void;
  cardId?: string;
}

const Card: React.FC<CardProps> = ({
  variant,
  title,
  description,
  tags,
  likes,
  onClick,
  className,
  isSelected = false,
  onSelectionChange,
  cardId,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const [truncatedDescription, setTruncatedDescription] = useState(description);

  const state = isSelected ? 'click' : isHovered ? 'hover' : 'default';

  const sizeStyle: Record<variantType, string> = {
    large: 'w-[320px] h-[204px]',
    medium: 'w-[272px] h-[204px]',
    small: state === 'hover' ? 'w-[400px] h-[300px]' : 'w-[200px] h-[142px]',
    promote: 'w-[392px] h-[204px]',
  };

  const backgroundStyle: Record<variantType, Record<string, string>> = {
    large: {
      default: 'bg-layout-grey1 border border-layout-grey3',
      hover: 'bg-layout-grey2',
      click: 'bg-layout-grey2 border border-primary-navy4',
    },
    medium: {
      default: 'bg-layout-grey1 border border-layout-grey3',
      hover: 'bg-layout-grey2',
      click: 'bg-layout-grey2 border border-primary-navy4',
    },
    small: {
      default: 'bg-layout-grey1 border border-layout-grey3',
      hover: 'bg-layout-grey2 ',
      click: 'bg-layout-grey2 border border-primary-navy4',
    },
    promote: {
      default: 'bg-secondary-purple1 border border-secondary-purple3',
      hover: 'bg-secondary-purple2',
      click: 'bg-secondary-purple2 border border-secondary-purple5',
    },
  };

  const showCardLike = variant !== 'small' || (variant === 'small' && state === 'hover');
  const showReadMore = variant === 'small' && state === 'hover';

  const titleStyle = clsx(
    'title-sm mb-[8px]',
    variant === 'small' &&
      state !== 'hover' &&
      'w-[168px] h-[26px] overflow-hidden text-ellipsis whitespace-nowrap',
  );

  // 3줄 제한을 위한 커스텀 로직
  useEffect(() => {
    function truncateToThreeLines() {
      const element = descriptionRef.current;
      if (!element) return;

      // hover 상태에서는 원본 텍스트를 보여줌
      if (variant === 'small' && state === 'hover') {
        setTruncatedDescription(description);
        element.textContent = description; // DOM에도 원본 텍스트 반영
        return;
      }

      // 원래 텍스트로 초기화
      element.textContent = description;

      const maxHeight = parseFloat(getComputedStyle(element).lineHeight) * 3;

      if (element.scrollHeight > maxHeight) {
        // 글자를 점점 줄여가며 3줄 이내로 맞추기
        let text = description;
        element.textContent = text;

        while (element.scrollHeight > maxHeight && text.length > 0) {
          text = text.substring(0, text.length - 5); // 5글자씩 줄이기
          element.textContent = text + '...';
        }

        setTruncatedDescription(text + '...');
      } else {
        setTruncatedDescription(description);
      }
    }

    // 최초 렌더링과 리사이즈 시 실행
    truncateToThreeLines();
    window.addEventListener('resize', truncateToThreeLines);

    return () => {
      window.removeEventListener('resize', truncateToThreeLines);
    };
  }, [description, variant, state]);

  const handleClick = () => {
    // 선택 상태 변경 (cardId가 있고 onSelectionChange가 제공된 경우에만)
    if (cardId && onSelectionChange) {
      onSelectionChange(cardId);
    }

    // 기존 onClick 핸들러 호출
    if (onClick) {
      onClick();
    }
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      className={clsx(
        'z-10 flex flex-col justify-between rounded-[6px] p-[16px] transition-all',
        sizeStyle[variant],
        backgroundStyle[variant][state],
        variant === 'small' && state === 'hover' ? 'z-30' : 'z-10',
        isSelected ? 'selected' : '', // 선택 상태를 나타내는 CSS 클래스
        className,
      )}
    >
      <div className="flex h-full flex-col justify-between">
        <div className="flex flex-1 flex-col">
          <div className="mb-[8px] flex flex-wrap gap-1">
            {tags &&
              tags
                .slice(0, variant === 'small' && state !== 'hover' ? 2 : tags.length)
                .map((tag, idx) => <CardTag key={idx} text={tag} />)}
          </div>
          <div className={titleStyle}>{title}</div>
          <div
            ref={descriptionRef}
            className="body-sm text-layout-grey6 mb-[16px]"
            style={{
              maxHeight:
                variant === 'small' && state !== 'hover'
                  ? '44px'
                  : variant === 'small' && state === 'hover'
                    ? 'none'
                    : 'calc(1.5em * 3)',
              overflow: 'hidden',
            }}
          >
            {truncatedDescription}
          </div>
        </div>

        <div className="flex items-end justify-between">
          {showCardLike && (
            <div className="ml-0">
              <CardLike count={likes} />
            </div>
          )}
          {showReadMore && (
            <div className="text-layout-grey6 mb-[3px] h-[21px] w-[45px] text-right text-sm underline">
              더보기
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
