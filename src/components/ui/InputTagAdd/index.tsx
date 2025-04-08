'use client';

import { clsx } from 'clsx';
import IconAdd from '@/assets/icons/icon-add.svg';

type InputTagAddProps = {
  onClick: () => void;
  className?: string;
};

export const InputTagAdd = ({ onClick, className }: InputTagAddProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'h-[40px] w-[40px]',
        'flex items-center justify-center',
        'border-layout-grey6 rounded-[6px] border',
        'hover:bg-layout-grey1 bg-white',
        'transition-colors duration-150',
        className,
      )}
    >
      <IconAdd className="h-[14px] w-[14px] overflow-visible" />
    </button>
  );
};
