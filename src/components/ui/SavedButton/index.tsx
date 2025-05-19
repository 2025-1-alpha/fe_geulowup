import React, { useState } from 'react';
import IconTrash from '@/assets/icons/icon-trash.svg';

interface SavedButtonProps {
  variant: 'default' | 'custom';
  text: string;
  onClick?: () => void;
  onDelete?: () => void;
}

const SavedButton: React.FC<SavedButtonProps> = ({ variant, text, onClick, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const getBgColor = () => {
    if (isHovered && !isClicked) return 'layout color/grey3';
    return 'transparent';
  };

  const getTextColor = () => {
    if (isHovered || isClicked) return 'layout color/grey7';
    return 'layout color/grey5';
  };

  const getBorderStyle = () => {
    if (isHovered || isClicked) return '1px solid layout color/grey3';
    return 'none';
  };

  const handleClick = () => {
    setIsClicked(true);
    if (onClick) onClick();
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsClicked(false);
  };

  return (
    <button
      className="relative flex h-[32px] w-[280px] items-center rounded-[3px] px-4 py-[5px]"
      style={{
        background: getBgColor(),
        color: getTextColor(),
        border: getBorderStyle(),
        fontFamily: 'Pretendard',
        fontSize: '14px',
        fontWeight: 'normal',
        textAlign: 'left',
      }}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="w-[150px] truncate">{text}</div>

      {variant === 'custom' && (
        <div
          className="absolute right-2"
          onClick={(e) => {
            e.stopPropagation();
            if (onDelete) onDelete();
          }}
        >
          <IconTrash
            width={16}
            height={16}
            style={{
              marginLeft: '8px',
              color: isHovered ? 'layout color/grey6' : 'layout color/grey5',
            }}
          />
        </div>
      )}
    </button>
  );
};

export default SavedButton;
