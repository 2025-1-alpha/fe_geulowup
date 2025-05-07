'use client';

import { clsx } from 'clsx';
import React, { useState } from 'react';
import LeftArrowIcon from '@/assets/icons/icon-arrow-left.svg';
import RightArrowIcon from '@/assets/icons/icon-arrow-right.svg';

type ArrowProps = {
  direction: 'left' | 'right';
  colorType: 'grey' | 'navy';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
};

export const Arrow: React.FC<ArrowProps> = ({
  direction,
  colorType,
  disabled = false,
  onClick,
  className,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const ArrowIcon = direction === 'left' ? LeftArrowIcon : RightArrowIcon;

  const colors = {
    grey: {
      default: 'text-layout-grey6',
      hover: 'text-layout-grey7',
      disabled: 'text-layout-grey4',
    },
    navy: {
      default: 'text-primary-navy4',
      hover: 'text-primary-navy5',
      disabled: 'text-layout-grey4',
    },
  };

  const getColorClass = () => {
    if (disabled) return colors[colorType].disabled;
    if (isHovered) return colors[colorType].hover;
    return colors[colorType].default;
  };

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => !disabled && setIsHovered(false)}
      className={clsx(
        'flex items-center justify-center p-1 transition-colors',
        getColorClass(),
        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        className,
      )}
      aria-disabled={disabled}
    >
      <ArrowIcon className="h-6 w-6" />
    </button>
  );
};

export default Arrow;
