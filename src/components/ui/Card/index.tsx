'use client';

import React, { useState } from 'react';
import clsx from 'clsx';
import CardTag from '@/components/ui/CardTag';
import CardLike from '@/components/ui/CardLike';

type Variant = 'large' | 'medium' | 'small' | 'promote';

interface CardProps {
  variant: Variant;
  title: string;
  description: string;
  tags: string[];
  likes: number;
}

const Card: React.FC<CardProps> = ({ variant, title, description, tags, likes }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const state = isClicked ? 'click' : isHovered ? 'hover' : 'default';

  const sizeStyle: Record<Variant, string> = {
    large: 'w-[320px] h-[204px]',
    medium: 'w-[272px] h-[204px]',
    small: state === 'hover' ? 'w-[400px] h-[300px]' : 'w-[200px] h-[142px]',
    promote: 'w-[392px] h-[204px]',
  };

  const backgroundStyle: Record<Variant, Record<string, string>> = {
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
      hover: 'bg-layout-grey2',
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

  const descriptionStyle = clsx(
    'body-sm text-layout-grey6 mb-[16px]',
    variant === 'small' && state !== 'hover'
      ? 'w-[168px] h-[44px] overflow-hidden text-ellipsis line-clamp-2'
      : 'overflow-hidden text-ellipsis line-clamp-4',
  );

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsClicked(true)}
      className={clsx(
        'flex flex-col justify-between rounded-[8px] p-[16px] transition-all',
        sizeStyle[variant],
        backgroundStyle[variant][state],
      )}
    >
      <div className="flex h-full flex-col justify-between">
        <div>
          <div className="mb-[8px] flex flex-wrap gap-1">
            {tags.map((tag, idx) => (
              <CardTag key={idx} text={tag} />
            ))}
          </div>
          <div className={titleStyle}>{title}</div>
          <div className={descriptionStyle}>{description}</div>
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
