// CardComponent/CardTag.tsx
import React from 'react';

interface CardTagProps {
  text: string;
}

const CardTag: React.FC<CardTagProps> = ({ text }) => {
  return (
    <div className="bg-primary-navy4 flex h-[24px] w-[80px] items-center justify-center rounded-full text-sm text-white">
      {text}
    </div>
  );
};

export default CardTag;
