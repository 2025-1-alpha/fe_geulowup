'use client';

import { clsx } from 'clsx';
import React, { useState, useEffect } from 'react';
import { TagType } from '@/types';

// 태그 아이콘 매핑
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

  useEffect(() => {
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

  const handleClick = () => {
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
