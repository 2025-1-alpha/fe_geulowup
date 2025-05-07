'use client';

import { clsx } from 'clsx';
import React, { useState } from 'react';
import Image from 'next/image';

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

const tagIconMap: Record<TagType, string> = {
  인사말: 'ic_gre_1',
  자기소개: 'ic_sel_2',
  사과문: 'ic_sor_3',
  부탁글: 'ic_fav_4',
  감사글: 'ic_tha_5',
  제안글: 'ic_sug_6',
  공지글: 'ic_ann_7',
  소개글: 'ic_int_8',
  후기작성: 'ic_rev_9',
  소셜글: 'ic_lik_10',
  고객응대: 'ic_cus_11',
  교수문의: 'ic_pro_12',
  조별활동: 'ic_gro_13',
  공모전: 'ic_com_14',
  지원서: 'ic_app_15',
  기타: 'ic_etc_16',
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

  const iconCode = tagIconMap[tag];
  const iconSrc = `/assets/icons/${iconCode}_${selected ? 'clicked' : 'default'}.png`;

  const getBackgroundClass = () => {
    if (selected) return 'bg-primary-navy4 border-primary-navy4 text-white';
    if (isHovered) return 'bg-layout-grey2';
    return 'bg-transparent';
  };

  return (
    <button
      type="button"
      onClick={onClick}
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
        <Image
          src={iconSrc}
          alt={`${tag} 아이콘`}
          width={24}
          height={24}
          className="h-6 w-6 flex-shrink-0"
          unoptimized
        />
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
