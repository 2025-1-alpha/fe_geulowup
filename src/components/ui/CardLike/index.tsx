// CardComponent/CardLike.tsx
import React from 'react';
import ThumbsUpIcon from '@/assets/icons/icon-thumbs-up.svg';

interface CardLikeProps {
  count: number;
  className?: string;
}

const CardLike: React.FC<CardLikeProps> = ({ count, className }) => {
  return (
    <div className={`flex h-[24px] w-[60px] items-center gap-[8px] ${className || ''}`}>
      <div className="flex h-[24px] w-[24px] items-center justify-center overflow-hidden">
        <ThumbsUpIcon className="origin-center scale-[0.66]" />
      </div>
      <span className="text-layout-grey5 text-sm">{count}</span>
    </div>
  );
};

export default CardLike;
